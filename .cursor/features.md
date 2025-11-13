# Weaver Tools - Feature Documentation

## Overview

Weaver Tools is a Next.js-based web application providing a collection of developer utility tools. The application features a modern UI with a sidebar navigation and responsive design.

## Technology Stack

- **Framework**: Next.js 14.1.0 (App Router)
- **Language**: TypeScript 5.9.3
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.18
- **UI Components**: Radix UI primitives (@radix-ui/react-*)
- **Icons**: Lucide React
- **State Management**: nuqs (for URL-based state)
- **Utilities**: 
  - class-variance-authority
  - clsx & tailwind-merge
  - comment-json
  - pretty-print-json
  - zod

## Features

### 1. Base64 Encoder/Decoder
**Route**: `/tools/base64-encoder`

**Description**: Encode text to Base64 or decode Base64 strings back to text.

**Features**:
- Toggle between encode/decode modes
- Real-time processing as user types
- URL state persistence (input and mode stored in URL query params)
- Copy to clipboard functionality
- Error handling with user-friendly messages
- Monospace font for better readability

**Implementation**:
- Uses `btoa()` and `atob()` for encoding/decoding
- State managed via `nuqs` for URL persistence
- Base64 utilities in `lib/base64-utils.ts`

### 2. JSON Formatter
**Route**: `/tools/json-formatter`

**Description**: Format and validate JSON with the ability to fetch JSON from URLs.

**Features**:
- Paste or type JSON for formatting
- Fetch JSON from remote URLs
- Real-time JSON validation and formatting
- Error display for invalid JSON or fetch failures
- Loading states during fetch operations
- Uses `CodeText` component for syntax highlighting

**Implementation**:
- Server action `fetch-json-url.ts` for fetching JSON
- URL validation before fetching
- Uses `comment-json` and `pretty-print-json` libraries

### 3. Query String Diff
**Route**: `/tools/query-string-diff`

**Description**: Compare two URLs and identify differences in their query parameters.

**Features**:
- Two URL input fields for comparison
- URL validation with visual feedback (red border for invalid URLs)
- Automatic parsing of query strings from both URLs
- Visual diff display showing:
  - Common parameters with different values
  - Parameters exclusive to first URL
  - Parameters exclusive to second URL
- URL state persistence for both URLs

**Implementation**:
- Uses `splitQueryString()` utility to parse query params
- `createDiffMap()` function creates diff structure
- `DiffList` component displays the differences
- State managed via `nuqs` for URL persistence

### 4. Query String Split
**Route**: `/tools/query-string-split`

**Description**: Split a URL into its component parts (protocol, domain, path, query string, etc.).

**Features**:
- Single URL input field
- Displays URL parts (Scheme, Protocol, Authority, Host, Hostname, Domain, TLD, Resource, Directory, Path, FileName, QueryString)
- Displays query string parameters as key-value pairs
- URL validation with visual feedback
- Empty state when no valid URL is provided
- URL state persistence (base64 encoded in URL)

**Implementation**:
- `splitUrl()` function parses URL into components
- `splitQueryString()` extracts query parameters
- `DataList` component displays structured data
- State managed via `nuqs` with base64 encoding for URL persistence

## Common Components

### Layout
- **BaseLayout**: Main application layout with sidebar navigation
  - Responsive sidebar (hidden on mobile, visible on desktop)
  - Mobile hamburger menu
  - Navigation items with icons
  - Active route highlighting

### UI Components
- **TitleHeader**: Page title with optional subtitle and copy URL button
- **UrlInput**: Specialized input for URLs with validation styling
- **CodeText**: Code editor component for JSON formatting
- **DataList**: Displays key-value pairs in a structured list
- **DiffList**: Displays differences between two data sets
- **CopyButton**: Reusable copy to clipboard button
- **NoticeEmptyStateDashedWithIcon**: Empty state component with icon

### Utilities

#### URL Utilities
- `is-valid-url.ts`: Validates URL format
- `split-url.ts`: Parses URL into component parts
- `split-query-string.ts`: Extracts query parameters from URL

#### Data Utilities
- `create-diff-map.ts`: Creates diff structure between two arrays of key-value pairs
- `base64-utils.ts`: Base64 encoding/decoding utilities (including URL-safe variants)

#### Other Utilities
- `fetch-json-url.ts`: Server action to fetch JSON from URLs
- `utils.ts`: General utility functions (likely cn() for className merging)

## State Management

The application uses `nuqs` (Next.js URL Query State) for managing state in the URL:
- Base64 Encoder: Stores input text and mode in URL
- Query String Diff: Stores both URLs in URL query params
- Query String Split: Stores URL in URL (base64 encoded)

This allows:
- Sharing URLs with pre-filled data
- Browser back/forward navigation
- Bookmarking specific tool states

## Styling

- Tailwind CSS for utility-first styling
- Custom color scheme (gray-900 for sidebar, white for main content)
- Responsive design with mobile-first approach
- Sticky headers for tool inputs
- Monospace fonts for code/data display

## Code Style

- TypeScript with strict typing
- Functional components with hooks
- Early returns for error handling
- Strict equality checks (===)
- Snake case for WordPress/PHP variables (if applicable)
- Prettier configuration with import sorting

## File Structure

```
app/
  tools/          # Tool pages (Next.js App Router)
  layout.tsx      # Root layout
  page.tsx        # Home page
  globals.css     # Global styles

components/
  pages/          # Page-specific components
  ui/             # Reusable UI components (Radix-based)
  *.tsx           # Shared components

lib/              # Utility functions
actions/          # Next.js server actions
hooks/            # Custom React hooks
```

## Development

- Development server: `npm run dev` / `pnpm dev` / `bun dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Port: 3000 (default Next.js)

## Future Considerations

- Additional utility tools can be added following the existing pattern
- Each tool should have its own route under `/tools/`
- Components should be reusable and follow the established UI patterns
- State should use `nuqs` for URL persistence when appropriate

