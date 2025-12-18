#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import mysql from 'mysql2/promise';

const server = new Server({
  name: 'mysql_database',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

let connection: mysql.Connection | null = null;

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'connect_database',
      description: 'Connect to MySQL database',
      inputSchema: {
        type: 'object',
        properties: {
          host: { type: 'string', description: 'Database host' },
          port: { type: 'number', description: 'Database port' },
          user: { type: 'string', description: 'Database user' },
          password: { type: 'string', description: 'Database password' },
          database: { type: 'string', description: 'Database name' }
        },
        required: ['host', 'user', 'password', 'database']
      }
    },
    {
      name: 'execute_query',
      description: 'Execute SQL query',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'SQL query to execute' },
          params: { type: 'array', description: 'Query parameters' }
        },
        required: ['query']
      }
    },
    {
      name: 'list_tables',
      description: 'List all tables in database',
      inputSchema: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  ]
}));

function validateString(value: any, name: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value.trim();
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'connect_database':
        return await connectDatabase(args);
      
      case 'execute_query':
        return await executeQuery(
          validateString(args?.query, 'query'),
          Array.isArray(args?.params) ? args.params : []
        );
      
      case 'list_tables':
        return await listTables();
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{
        type: 'text',
        text: `Error: ${message}`
      }]
    };
  }
});

async function connectDatabase(config: any) {
  try {
    if (connection) {
      await connection.end();
    }
    
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port || 3306,
      user: config.user,
      password: config.password,
      database: config.database
    });
    
    return {
      content: [{
        type: 'text',
        text: `Successfully connected to MySQL database: ${config.database}@${config.host}`
      }]
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Connection failed: ${message}`);
  }
}

async function executeQuery(query: string, params: any[] = []) {
  if (!connection) throw new Error('Not connected to database');
  
  try {
    const [results] = await connection.execute(query, params);
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          data: results
        }, null, 2)
      }]
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Query failed: ${message}`);
  }
}

async function listTables() {
  if (!connection) throw new Error('Not connected to database');
  
  const [rows] = await connection.execute('SHOW TABLES');
  const tables = (rows as any[]).map(row => Object.values(row)[0]);
  
  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        tables: tables
      }, null, 2)
    }]
  };
}

async function cleanup() {
  if (connection) {
    await connection.end();
    connection = null;
  }
}

process.on('SIGINT', async () => {
  await cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanup();
  process.exit(0);
});

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('MySQL MCP Server ready!');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to start server:', message);
    process.exit(1);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Unhandled error:', message);
  process.exit(1);
});