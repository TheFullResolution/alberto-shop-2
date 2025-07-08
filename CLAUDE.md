# Project: Alberto Shop - Primer.io Checkout Demo

## Project Overview
A TurboRepo monorepo containing a modern e-commerce checkout demo that integrates with Primer.io's Universal Checkout system. The project demonstrates a complete payment flow for an online LEGO store.

## Architecture
- **Monorepo Structure**: TurboRepo with workspaces
- **Frontend**: Vanilla JavaScript + Vite + Tailwind CSS (port 5173)
- **Backend**: Node.js + Express (port 3001)
- **Payment Processing**: Primer.io Universal Checkout integration

## Key Commands

### Development
```bash
npm run dev          # Start both frontend and backend in development mode
npm run build        # Build both applications for production
npm run clean        # Clean build artifacts
```

### Code Quality
```bash
npm run lint         # Run ESLint on both applications
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
```

### Individual Apps
```bash
# Frontend only
cd apps/frontend
npm run dev          # Start frontend dev server
npm run build        # Build frontend
npm run lint         # Lint frontend code
npm run format       # Format frontend code

# Backend only  
cd apps/server
npm run dev          # Start server with file watching
npm start            # Start server in production mode
npm run lint         # Lint server code
npm run format       # Format server code
```

## Environment Configuration

### Required Environment Variables (apps/server/.env)
```bash
PRIMER_API_KEY=your_primer_api_key_here
PRIMER_API_VERSION=2.4
PRIMER_API_ENVIRONMENT=SANDBOX
PORT=3001
```

## Key Files & Locations

### Frontend Structure
- `apps/frontend/index.html` - Main HTML page
- `apps/frontend/main.js` - Application entry point and form handling
- `apps/frontend/js/config.js` - Configuration and demo data
- `apps/frontend/js/checkout.js` - Primer.io checkout integration
- `apps/frontend/js/form-utils.js` - Form validation and utilities
- `apps/frontend/js/ui-utils.js` - UI helper functions
- `apps/frontend/style.css` - Tailwind CSS styles

### Backend Structure
- `apps/server/server.js` - Express server with Primer.io API integration
- `apps/server/.env` - Environment variables (create from .env.example)

### Configuration Files
- `eslint.config.js` - ESLint configuration for code linting
- `.prettierrc` - Prettier configuration for code formatting
- `turbo.json` - TurboRepo task configuration
- `package.json` - Root package with workspace configuration

## Testing & Demo
- Use "Autofill Demo Data" button to quickly populate the checkout form
- Test with Primer.io test card numbers:
  - `4000 0000 0000 0002` - Successful payment
  - `4000 0000 0000 0127` - Insufficient funds
  - `4000 0000 0000 0119` - Processing error

## Common Issues
- **Client session errors**: Check PRIMER_API_KEY in .env file
- **Port conflicts**: Ensure ports 3001 (server) and 5173 (frontend) are available
- **Environment variables**: Variable names must match exactly (PRIMER_API_KEY, not API_KEY)

## Tech Stack
- **Build Tool**: TurboRepo for monorepo management
- **Frontend**: Vite, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express, dotenv, cors
- **Payment**: Primer.io Universal Checkout
- **Code Quality**: ESLint, Prettier
- **Development**: Hot reload on both frontend and backend