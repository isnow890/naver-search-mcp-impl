# Naver Search MCP Server

[![한국어](https://img.shields.io/badge/한국어-README-yellow)](README-ko.md)

[![Trust Score](https://archestra.ai/mcp-catalog/api/badge/quality/isnow890/naver-search-mcp)](https://archestra.ai/mcp-catalog/isnow890__naver-search-mcp)
[![smithery badge](https://smithery.ai/badge/@isnow890/naver-search-mcp)](https://smithery.ai/server/@isnow890/naver-search-mcp)
[![MCP.so](https://img.shields.io/badge/MCP.so-Naver%20Search%20MCP-blue)](https://mcp.so/server/naver-search-mcp/isnow890)

MCP server for Naver Search API and DataLab API integration, enabling comprehensive search across various Naver services and data trend analysis.

> ⚠️ **Smithery Installation Notice**: Due to compatibility issues with the Smithery platform, **npx installation is recommended starting from version 1.0.40**. Smithery installation is only supported up to version 1.0.30.

#### Version History

###### 1.0.44 (2025-08-31)

- `get_current_korean_time` tool added - Essential time context tool for Korean timezone
- Enhanced all existing tool descriptions to reference time tool for temporal queries
- Improved temporal context handling for "today", "now", "current" searches
- Comprehensive Korean time formatting with multiple output formats

###### 1.0.4 (2025-08-21)

- `find_category` tool added - with fuzzy matching and ranking system support
- Enhanced parameter validation with Zod schema
- Improved category search workflow

###### 1.0.30 (2025-08-04)

- MCP SDK upgraded to 1.17.1
- Fixed compatibility issues with Smithery specification changes
- Added comprehensive DataLab shopping category code documentation

###### 1.0.2 (2025-04-26)

- README updated: cafe article search tool and version history section improved

###### 1.0.1 (2025-04-26)

- Cafe article search feature added
- Shopping category info added to zod
- Source code refactored

###### 1.0.0 (2025-04-08)

- Initial release

#### Prerequisites

- Naver Developers API Key (Client ID and Secret)
- Node.js 18 or higher
- NPM 8 or higher
- Docker (optional, for container deployment)

#### Getting API Keys

1. Visit [Naver Developers](https://developers.naver.com/apps/#/register)
2. Click "Register Application"
3. Enter application name and select ALL of the following APIs:
   - Search (for blog, news, book search, etc.)
   - DataLab (Search Trends)
   - DataLab (Shopping Insight)
4. Set the obtained Client ID and Client Secret as environment variables

## Tool Details

### Available tools:

#### 🕐 Time & Context Tools

- **get_current_korean_time**: Get current Korean time (KST) with comprehensive date/time information. Essential for understanding "today", "now", or "current" context in Korean timezone. Always use this tool when temporal context is needed for searches or analysis.

#### 🆕 Category Search

- **find_category**: Category search tool - No more need to manually check category numbers via URL for trend and shopping insight searches. The LLM will find it out as you say.

#### Search Tools

- **search_webkr**: Search Naver web documents
- **search_news**: Search Naver news
- **search_blog**: Search Naver blogs
- **search_cafearticle**: Search Naver cafe articles
- **search_shop**: Search Naver shopping
- **search_image**: Search Naver images
- **search_kin**: Search Naver KnowledgeiN
- **search_book**: Search Naver books
- **search_encyc**: Search Naver encyclopedia
- **search_academic**: Search Naver academic papers
- **search_local**: Search Naver local places

#### DataLab Tools

- **datalab_search**: Analyze search term trends
- **datalab_shopping_category**: Analyze shopping category trends
- **datalab_shopping_by_device**: Analyze shopping trends by device
- **datalab_shopping_by_gender**: Analyze shopping trends by gender
- **datalab_shopping_by_age**: Analyze shopping trends by age group
- **datalab_shopping_keywords**: Analyze shopping keyword trends
- **datalab_shopping_keyword_by_device**: Analyze shopping keyword trends by device
- **datalab_shopping_keyword_by_gender**: Analyze shopping keyword trends by gender
- **datalab_shopping_keyword_by_age**: Analyze shopping keyword trends by age group

#### Complete Category List:

For a complete list of category codes, you can download from Naver Shopping Partner Center or extract them by browsing Naver Shopping categories.

### 🎯 Business Use Cases & Scenarios

#### 🛍️ E-commerce Market Research

```javascript
// Fashion trend discovery
find_category("fashion") → Check top fashion categories and codes
datalab_shopping_category → Analyze seasonal fashion trends
datalab_shopping_age → Identify fashion target demographics
datalab_shopping_keywords → Compare "dress" vs "jacket" vs "coat"
```

#### 📱 Digital Marketing Strategy

```javascript
// Beauty industry analysis
find_category("cosmetics") → Find beauty categories
datalab_shopping_gender → 95% female vs 5% male shoppers
datalab_shopping_device → Mobile dominance in beauty shopping
datalab_shopping_keywords → "tint" vs "lipstick" keyword performance
```

#### 🏢 Business Intelligence & Competitive Analysis

```javascript
// Tech product insights
find_category("smartphone") → Check electronics categories
datalab_shopping_category → Track iPhone vs Galaxy trends
datalab_shopping_age → 20-30s as main smartphone buyers
datalab_shopping_device → PC vs mobile shopping behavior
```

#### 📊 Seasonal Business Planning

```javascript
// Holiday shopping analysis
find_category("gift") → Gift categories
datalab_shopping_category → Black Friday, Christmas trends
datalab_shopping_keywords → "Mother's Day gift" vs "birthday gift"
datalab_shopping_age → Age-based gift purchasing patterns
```

#### 🎯 Customer Persona Development

```javascript
// Fitness market analysis
find_category("exercise") → Sports/fitness categories
datalab_shopping_gender → Male vs female fitness spending
datalab_shopping_age → Primary fitness demographics (20-40s)
datalab_shopping_keywords → "home workout" vs "gym" trend analysis
```

### 📈 Advanced Analysis Scenarios

#### Market Entry Strategy

1. **Category Discovery**: Use `find_category` to explore market segments
2. **Trend Analysis**: Identify growing vs declining categories
3. **Demographic Targeting**: Age/gender analysis for customer targeting
4. **Competitive Intelligence**: Keyword performance comparison
5. **Device Strategy**: Mobile vs PC shopping optimization

#### Product Launch Planning

1. **Market Validation**: Category growth trends and seasonality
2. **Target Customers**: Demographic analysis for product positioning
3. **Marketing Channels**: Device preferences for advertising strategy
4. **Competitive Landscape**: Keyword competition and opportunities
5. **Pricing Strategy**: Category performance and price correlation

#### Performance Monitoring

1. **Category Health**: Monitor product category trends
2. **Keyword Tracking**: Track brand and product keyword performance
3. **Demographic Shifts**: Monitor changing customer demographics
4. **Seasonal Patterns**: Plan inventory and marketing campaigns
5. **Competitive Benchmarking**: Compare performance against category averages

### Quick Reference: Popular Category Codes

| Category            | Code     | Korean        |
| ------------------- | -------- | ------------- |
| Fashion/Clothing    | 50000000 | 패션의류      |
| Cosmetics/Beauty    | 50000002 | 화장품/미용   |
| Digital/Electronics | 50000003 | 디지털/가전   |
| Sports/Leisure      | 50000004 | 스포츠/레저   |
| Food/Beverages      | 50000008 | 식품/음료     |
| Health/Medical      | 50000009 | 건강/의료용품 |

💡 **Tip**: Use `find_category` with fuzzy searches like "beauty", "fashion", "electronics" to easily find categories.

## Installation

### Method 1: NPX Installation (Recommended)

The easiest way to use this MCP server is through NPX. For detailed package information, see the [NPM package page](https://www.npmjs.com/package/@isnow890/naver-search-mcp).

#### Claude Desktop Configuration

Add to Claude Desktop config file (`%APPDATA%\Claude\claude_desktop_config.json` on Windows, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS/Linux):

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "npx",
      "args": ["-y", "@isnow890/naver-search-mcp"],
      "env": {
        "NAVER_CLIENT_ID": "your_client_id",
        "NAVER_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

#### Cursor AI Configuration

Add to `mcp.json`:

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "npx",
      "args": ["-y", "@isnow890/naver-search-mcp"],
      "env": {
        "NAVER_CLIENT_ID": "your_client_id",
        "NAVER_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

### Method 2: Local Installation

For local development or custom modifications:

#### Step 1: Download and Build Source Code

##### Clone with Git

```bash
git clone https://github.com/isnow890/naver-search-mcp.git
cd naver-search-mcp
npm install
npm run build
```

##### Or Download ZIP File

1. Download the latest version from [GitHub Releases](https://github.com/isnow890/naver-search-mcp/releases)
2. Extract the ZIP file to your desired location
3. Navigate to the extracted folder in terminal:

```bash
cd /path/to/naver-search-mcp
npm install
npm run build
```

⚠️ **Important**: You must run `npm run build` after installation to generate the `dist` folder that contains the compiled JavaScript files.

#### Step 2: Claude Desktop Configuration

After building, you'll need the following information:

- **NAVER_CLIENT_ID**: Client ID from Naver Developers
- **NAVER_CLIENT_SECRET**: Client Secret from Naver Developers
- **Installation Path**: Absolute path to the downloaded folder

##### Windows Configuration

Add to Claude Desktop config file (`%APPDATA%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "naver-search": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "node",
        "C:\\path\\to\\naver-search-mcp\\dist\\src\\index.js"
      ],
      "cwd": "C:\\path\\to\\naver-search-mcp",
      "env": {
        "NAVER_CLIENT_ID": "your-naver-client-id",
        "NAVER_CLIENT_SECRET": "your-naver-client-secret"
      }
    }
  }
}
```

##### macOS/Linux Configuration

Add to Claude Desktop config file (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "naver-search": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/naver-search-mcp/dist/src/index.js"],
      "cwd": "/path/to/naver-search-mcp",
      "env": {
        "NAVER_CLIENT_ID": "your-naver-client-id",
        "NAVER_CLIENT_SECRET": "your-naver-client-secret"
      }
    }
  }
}
```

##### Path Configuration Important Notes

⚠️ **Important**: You must change the following paths in the above configuration to your actual installation paths:

- **Windows**: Change `C:\\path\\to\\naver-search-mcp` to your actual downloaded folder path
- **macOS/Linux**: Change `/path/to/naver-search-mcp` to your actual downloaded folder path
- **Build Path**: Make sure the path points to `dist/src/index.js` (not just `index.js`)

Finding your path:

```bash
# Check current location
pwd

# Absolute path examples
# Windows: C:\Users\username\Downloads\naver-search-mcp
# macOS: /Users/username/Downloads/naver-search-mcp
# Linux: /home/username/Downloads/naver-search-mcp
```

#### Step 3: Restart Claude Desktop

After completing the configuration, completely close and restart Claude Desktop to activate the Naver Search MCP server.

---

## Alternative Installation Methods

### Method 3: Legacy Smithery Installation (Only for v1.0.30 and below)

⚠️ **Note**: This method only works for versions 1.0.30 and below due to platform compatibility issues.

#### For Claude Desktop:
```bash
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client claude
```

#### For other AI clients:
```bash
# Cursor
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client cursor

# Windsurf
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client windsurf

# Cline
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client cline
```

### Method 4: Docker Installation

For containerized deployment:

```bash
docker run -i --rm \
  -e NAVER_CLIENT_ID=your_client_id \
  -e NAVER_CLIENT_SECRET=your_client_secret \
  mcp/naver-search
```

Docker configuration for Claude Desktop:

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "NAVER_CLIENT_ID=your_client_id",
        "-e",
        "NAVER_CLIENT_SECRET=your_client_secret",
        "mcp/naver-search"
      ]
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/naver-search .
```

## License

MIT License
