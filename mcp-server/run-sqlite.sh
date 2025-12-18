#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" >/dev/null 2>&1
nvm use 18 >/dev/null 2>&1
cd /mnt/ollama/rishi-testing/mcp-server
exec npx tsx mysql_server.ts