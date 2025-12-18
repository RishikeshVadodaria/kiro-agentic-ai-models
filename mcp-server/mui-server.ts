#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server({
  name: 'mui-components-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

// Tool to get component info from MUI
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_mui_component',
        description: 'Get React component code and documentation from Material-UI',
        inputSchema: {
          type: 'object',
          properties: {
            component: {
              type: 'string',
              description: 'Name of the MUI component (e.g., Button, TextField, Card)',
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'list_mui_components',
        description: 'List available Material-UI components',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_mui_component') {
    const { component } = args as { component: string };
    
    try {
      const response = await fetch(`https://mui.com/material-ui/api/${component.toLowerCase()}/`);
      if (!response.ok) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${component}" not found. Try checking the component name or use list_mui_components to see available options.`,
            },
          ],
        };
      }

      const html = await response.text();
      
      // Extract basic component info from the page
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : `${component} API`;
      
      // Basic component template
      const componentCode = `import { ${component} } from '@mui/material';

// Basic ${component} usage
function Example${component}() {
  return (
    <${component}>
      {/* Add your content here */}
    </${component}>
  );
}

export default Example${component};`;

      return {
        content: [
          {
            type: 'text',
            text: `# ${title}

## Basic Usage

\`\`\`jsx
${componentCode}
\`\`\`

## Documentation
For complete documentation, props, and examples, visit:
https://mui.com/material-ui/api/${component.toLowerCase()}/

## Installation
\`\`\`bash
npm install @mui/material @emotion/react @emotion/styled
\`\`\``,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching component "${component}": ${error}`,
          },
        ],
      };
    }
  }

  if (name === 'list_mui_components') {
    const commonComponents = [
      'Button', 'TextField', 'Card', 'Typography', 'Box', 'Grid',
      'AppBar', 'Toolbar', 'IconButton', 'Menu', 'MenuItem',
      'Dialog', 'DialogTitle', 'DialogContent', 'DialogActions',
      'Snackbar', 'Alert', 'Chip', 'Avatar', 'Badge',
      'Checkbox', 'Radio', 'Switch', 'Slider', 'Select',
      'Table', 'TableBody', 'TableCell', 'TableHead', 'TableRow',
      'Tabs', 'Tab', 'Accordion', 'AccordionSummary', 'AccordionDetails'
    ];

    return {
      content: [
        {
          type: 'text',
          text: `# Material-UI Components

## Common Components:
${commonComponents.map(comp => `- ${comp}`).join('\n')}

## Usage:
Use \`get_mui_component\` with any component name to get code examples and documentation.

## Full Component List:
Visit https://mui.com/material-ui/all-components/ for the complete list of available components.`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MUI Components MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});