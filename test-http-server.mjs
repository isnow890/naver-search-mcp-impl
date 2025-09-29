#!/usr/bin/env node

// Simple HTTP test server for MCP
import express from 'express';
import cors from 'cors';
import { createNaverSearchServer, configSchema } from './dist/src/index.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/mcp', async (req, res) => {
  try {
    console.log('Received MCP request:', req.body);
    
    // Mock config for testing
    const config = {
      NAVER_CLIENT_ID: 'test-client-id',
      NAVER_CLIENT_SECRET: 'test-client-secret'
    };
    
    const server = createNaverSearchServer({ config });
    
    res.json({
      message: 'MCP Server created successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('MCP Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP MCP Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 MCP endpoint: http://localhost:${PORT}/mcp`);
});