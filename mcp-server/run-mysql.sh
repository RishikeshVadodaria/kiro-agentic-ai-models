#!/bin/bash
cd /mnt/ollama/rishi-testing/mcp-server
node --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));' mysql_server.ts