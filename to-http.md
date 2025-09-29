이제 모든 마이그레이션 가이드를 정리해서 하나의 Markdown 문서로 만들어드리겠습니다.

STDIO에서 HTTP로 마이그레이션 가이드
개요
HTTP로 마이그레이션해야 하는 이유
HTTP 전송은 STDIO보다 상당한 개선사항을 제공합니다:

20배 높은 동시성: 훨씬 더 많은 동시 요청 처리
낮은 대기시간: 더 빠른 응답 시간을 위한 직접 HTTP 통신
더 나은 리소스 효율성: 더 효율적인 리소스 활용
미래 보장: HTTP는 MCP 사양에서 권장되는 원격 전송
중요: 2025년 9월 7일부터 Smithery는 호스팅 서버의 STDIO 전송 지원을 중단합니다. 계속된 서비스를 위해 HTTP 전송으로 마이그레이션하세요.

마이그레이션 방법
Smithery는 HTTP MCP 서버 호스팅을 위한 두 가지 방법을 지원합니다:

TypeScript with Smithery CLI (권장) - 최소한의 설정으로 TypeScript 프로젝트를 위한 자동 빌드 및 배포
TypeScript Custom Container - 커스텀 미들웨어와 의존성을 위한 완전한 Docker 제어
Python Custom Container - 완전한 컨테이너 제어가 필요한 Python 프로젝트를 위한 FastMCP
방법 1: TypeScript with Smithery CLI (권장)
언제 이 방법을 사용하는가?
STDIO에서 HTTP로 가장 간단한 마이그레이션 경로를 원하는 경우
공식 MCP SDK를 사용하고 있고 커스텀 미들웨어가 필요하지 않은 경우
Smithery가 컨테이너화 및 배포를 처리하기를 원하는 경우
STDIO 전송과의 하위 호환성을 유지하고 싶은 경우
테스트를 위한 완전한 기능의 대화형 개발 플레이그라운드가 필요한 경우
Step 1: Import 및 설정 스키마 업데이트
// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 세션 설정 스키마 정의
export const configSchema = z.object({
caseSensitive: z.boolean().optional().default(false).describe("Whether character matching should be case sensitive"),
});

// 설정이 선택사항: MCP 서버가 설정이 필요하지 않다면 모든 config 스키마와 검증 코드를 제거할 수 있습니다.
Step 2: 서버 함수 생성 및 도구 등록
// src/index.ts
export default function createServer({
config,
}: {
config: z.infer<typeof configSchema>;
}) {
const server = new McpServer({
name: "Character Counter",
version: "1.0.0",
});

server.registerTool("count_characters", {
title: "Count Characters",
description: "Count occurrences of a specific character in text",
inputSchema: {
text: z.string().describe("The text to search in"),
character: z.string().describe("The character to count (single character)"),
},
}, async ({ text, character }) => {
// 설정에서 사용자 기본 설정 적용
const searchText = config.caseSensitive ? text : text.toLowerCase();
const searchChar = config.caseSensitive ? character : character.toLowerCase();

    // 특정 문자의 출현 횟수 계산
    const count = searchText.split(searchChar).length - 1;

    return {
      content: [
        {
          type: "text",
          text: `The character "${character}" appears ${count} times in the text.`
        }
      ],
    };

});

return server.server;
}
Step 3: STDIO 호환성 유지 (선택사항)
// src/index.ts
async function main() {
// 대소문자 구분이 활성화되었는지 확인
const caseSensitive = process.env.CASE_SENSITIVE === 'true';

// 설정으로 서버 생성
const server = createServer({
config: { caseSensitive },
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Server running in stdio mode");
}

// 기본적으로 stdio 전송으로 서버 실행
main().catch((error) => {
console.error("Server error:", error);
process.exit(1);
});
Step 4: package.json 업데이트
{
"name": "my-mcp-server",
"version": "1.0.0",
"type": "module",
"module": "src/index.ts",
"scripts": {
"dev": "smithery dev",
"build": "npm run build:http",
"build:stdio": "tsc",
"build:http": "smithery build",
"start": "npm run start:http",
"start:http": "node .smithery/index.cjs",
"start:stdio": "node dist/index.js",
"prepublishOnly": "npm run build:stdio"
},
"dependencies": {
"@modelcontextprotocol/sdk": "^1.18.2",
"@smithery/sdk": "^1.6.4",
"zod": "^3.25.46"
},
"devDependencies": {
"@smithery/cli": "^1.4.0"
}
}
Step 5: smithery.yaml 업데이트
Before (STDIO):

startCommand:
type: stdio
commandFunction: |
(config) => ({
command: 'node',
args: ['dist/index.js'],
env: {
CASE_SENSITIVE: config.caseSensitive
}
})
After (HTTP):

runtime: "typescript"
configSchema:
type: object
properties:
caseSensitive:
type: boolean
description: Whether character matching should be case sensitive
default: false
의존성 설치
npm i -D @smithery/cli
npm i @modelcontextprotocol/sdk @smithery/sdk
로컬 테스트

# Smithery 대화형 플레이그라운드로 개발 서버 시작

npm run dev

# 프로덕션용 빌드

npm run build

# STDIO 모드로 로컬 테스트

npm run build:stdio
CASE_SENSITIVE=true npm run start:stdio
방법 2: TypeScript Custom Container
언제 이 방법을 사용하는가?
Docker 환경에 대한 완전한 제어가 필요한 경우
복잡한 의존성이나 커스텀 빌드 프로세스가 있는 경우
HTTP 전송을 수동으로 구현하고 싶은 경우
특정 미들웨어나 커스텀 서버 로직이 필요한 경우
Step 1: Express 서버 설정 및 Import 업데이트
// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT || 8081;

// 브라우저 기반 MCP 클라이언트용 CORS 설정
app.use(cors({
origin: '\*', // 프로덕션에서는 적절하게 설정
exposedHeaders: ['Mcp-Session-Id', 'mcp-protocol-version'],
allowedHeaders: ['Content-Type', 'mcp-session-id'],
}));

app.use(express.json());
Step 2: 설정 처리 (선택사항)
설정이 필요하지 않으면 이 단계를 건너뛸 수 있습니다.

// src/index.ts (설정이 필요한 경우에만 추가)
import { parseAndValidateConfig } from "@smithery/sdk"

// 세션 설정 스키마 정의
export const configSchema = z.object({
serverToken: z.string().optional().describe("Server access token"),
caseSensitive: z.boolean().optional().default(false).describe("Whether character matching should be case sensitive"),
})
Step 3: 서버 함수 생성 및 도구 등록
// src/index.ts
export default function createServer({
config,
}: {
config: z.infer<typeof configSchema>;
}) {
const server = new McpServer({
name: "Character Counter",
version: "1.0.0",
});

server.registerTool("count_characters", {
title: "Count Characters",
description: "Count occurrences of a specific character in text",
inputSchema: {
text: z.string().describe("The text to search in"),
character: z.string().describe("The character to count (single character)"),
},
}, async ({ text, character }) => {
// 서버 액세스 검증
if (!validateServerAccess(config.serverToken)) {
throw new Error("Server access validation failed. Please provide a valid serverToken.");
}

    // 설정에서 사용자 기본 설정 적용
    const searchText = config.caseSensitive ? text : text.toLowerCase();
    const searchChar = config.caseSensitive ? character : character.toLowerCase();

    // 특정 문자의 출현 횟수 계산
    const count = searchText.split(searchChar).length - 1;

    return {
      content: [
        {
          type: "text",
          text: `The character "${character}" appears ${count} times in the text.`
        }
      ],
    };

});

return server.server;
}
Step 4: MCP 요청 핸들러
// src/index.ts
// /mcp 엔드포인트에서 MCP 요청 처리
app.all('/mcp', async (req: Request, res: Response) => {
try {
const result = parseAndValidateConfig(req, configSchema)
if (result.error) {
return res.status(result.value.status).json(result.value)
}

    const server = createServer({ config: result.value });
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    // 요청 종료 시 정리
    res.on('close', () => {
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);

} catch (error) {
console.error('Error handling MCP request:', error);
if (!res.headersSent) {
res.status(500).json({
jsonrpc: '2.0',
error: {
code: -32603,
message: 'Internal server error'
},
id: null,
});
}
}
});
Step 5: STDIO 호환성 유지 (선택사항)
// src/index.ts
// 적절한 모드에서 서버를 시작하는 메인 함수
async function main() {
const transport = process.env.TRANSPORT || 'stdio';

if (transport === 'http') {
// HTTP 모드로 실행
app.listen(PORT, () => {
console.log(`MCP HTTP Server listening on port ${PORT}`);
});
} else {
// 하위 호환성을 위한 stdio 전송 추가 (선택사항)
const serverToken = process.env.SERVER_TOKEN;
const caseSensitive = process.env.CASE_SENSITIVE === 'true';

    // 설정으로 서버 생성
    const server = createServer({
      config: { serverToken, caseSensitive },
    });

    // stdin에서 메시지 수신 및 stdout으로 메시지 전송 시작
    const stdioTransport = new StdioServerTransport();
    await server.connect(stdioTransport);
    console.error("MCP Server running in stdio mode");

}
}

// 서버 시작
main().catch((error) => {
console.error("Server error:", error);
process.exit(1);
});
Step 6: smithery.yaml 업데이트
Before (STDIO):

startCommand:
type: stdio
commandFunction: |
(config) => ({
command: 'node',
args: ['dist/index.js'],
env: {
SERVER_TOKEN: config.serverToken,
CASE_SENSITIVE: config.caseSensitive
}
})
After (HTTP Container):

startCommand:
type: container
dockerfile: Dockerfile
port: 8081
endpoint: /mcp
configSchema:
type: object
properties:
serverToken:
type: string
description: Server access token
caseSensitive:
type: boolean
description: Whether character matching should be case sensitive
default: false
exampleConfig:
serverToken: "your-server-token"
caseSensitive: false
Step 7: Dockerfile 업데이트
Before (STDIO):

FROM node:22-slim

WORKDIR /app

# 패키지 파일 복사

COPY package\*.json ./

# 의존성 설치

RUN npm ci --only=production

# 소스 코드 복사

COPY . .

# TypeScript 코드 빌드

RUN npm run build

# STDIO 서버는 포트를 노출하지 않음

CMD ["node", "dist/index.js"]
After (HTTP Container):

FROM node:22-slim

WORKDIR /app

# 패키지 파일 복사

COPY package\*.json ./

# 의존성 설치

RUN npm ci --only=production

# 소스 코드 복사

COPY . .

# TypeScript 코드 빌드

RUN npm run build

# HTTP 서버용 포트 노출

EXPOSE 8081

# HTTP 모드로 서버 시작

CMD ["npm", "run", "start:http"]
Step 8: package.json 업데이트
{
"name": "smithery-typescript-custom",
"version": "1.0.0",
"description": "Custom TypeScript MCP server with Express HTTP transport",
"type": "module",
"scripts": {
"dev": "TRANSPORT=http npx tsx src/index.ts",
"build": "npx tsc",
"start": "npm run start:http",
"start:http": "TRANSPORT=http node dist/index.js",
"start:stdio": "node dist/index.js"
},
"dependencies": {
"@modelcontextprotocol/sdk": "^1.18.2",
"@smithery/sdk": "^1.6.4",
"express": "^4.18.0",
"cors": "^2.8.5",
"zod": "^3.25.46"
},
"devDependencies": {
"tsx": "^4.19.4",
"@smithery/cli": "^1.4.0"
}
}
의존성 설치
npm i @modelcontextprotocol/sdk @smithery/sdk express cors zod
npm i -D @smithery/cli tsx typescript
로컬 테스트

# 서버 빌드 및 실행

npm run build
npm run start:http

# 또는 Docker로

docker build -t my-mcp-server .
docker run -p 8080:8080 -e PORT=8080 my-mcp-server

# 대화형 테스트

npx @smithery/cli playground --port 8080
