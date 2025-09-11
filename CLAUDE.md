# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Main Application (unified-app)
```bash
cd unified-app
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Multi-App Development
```bash
cd unified-app
npm run dev:all      # Start all apps concurrently (main + microsaas-curriculo + gerador-propostas-meis)
npm run install:all  # Install dependencies for all apps
```

### Docker Commands
```bash
# Production build
docker build -t geradocumentos:latest .
docker run -p 8080:80 geradocumentos:latest

# Development with hot reload
docker-compose --profile dev up

# Production deployment
docker-compose up -d

# Health check
curl http://localhost:8080/health
```

## Architecture Overview

This is a **monorepo** containing multiple document generation applications unified under a single interface:

### Main Components:
- **`unified-app/`**: Main React/Vite application serving as the unified interface
- **`microsaas-curriculo/`**: Standalone curriculum generator (can run independently)
- **`gerador-propostas-meis/`**: Standalone proposal generator for MEIs/freelancers
- **Root HTML files**: Landing pages (`index.html`, `404.html`, etc.)

### Unified App Structure:
- **Framework**: React 18 + Vite + React Router
- **Styling**: TailwindCSS + Radix UI components
- **State Management**: React Context (ToastContext)
- **PDF Generation**: jsPDF library
- **Analytics**: Vercel Analytics & Speed Insights

### Key Directories:
- `unified-app/src/components/`: Reusable UI components and app-specific components
- `unified-app/src/pages/`: Route pages (HomePage, CurriculumPage, ProposalPage, etc.)
- `unified-app/src/config/apps.js`: Central app configuration for integrated applications
- `unified-app/src/lib/`: Utilities for error handling and common functions
- `unified-app/src/hooks/`: Custom React hooks for URL validation, toast, redirect

### Application Integration:
The architecture allows both **integrated** and **standalone** operation modes:
- **Integrated Mode**: Apps run within the unified interface (`/curriculo-ia`, `/gera-proposta`)
- **Standalone Mode**: Independent operation on different ports (3001, 3002)

### Docker Setup:
- **Multi-stage builds** for optimized production images
- **Nginx** serving static files with security headers and gzip compression  
- **Health check endpoints** for container orchestration
- **Development containers** with hot reload support

## Testing Configuration

The project includes TestSprite configuration in `testsprite.config.json` for:
- Functional testing
- Security testing  
- Performance testing
- UI testing
- Integration testing

## SEO and Analytics

The landing page (`index.html`) includes comprehensive SEO optimization:
- Google Analytics and AdSense integration
- Structured data (JSON-LD schemas)
- Open Graph and Twitter Card meta tags
- Multilingual hreflang tags
- Cookie consent functionality

## Key Configuration Files

- `unified-app/package.json`: Main app dependencies and scripts
- `unified-app/src/config/apps.js`: Application routing and integration config
- `docker-compose.yml`: Container orchestration
- `testsprite.config.json`: Testing framework configuration