# Alberto Shop - Primer.io Checkout Demo

A TurboRepo monorepo demonstrating Primer.io's Universal Checkout integration. Includes a frontend checkout form and backend API server.

## Structure
```
alberto-shop-2/
├── apps/frontend/    ← Vite + Tailwind CSS checkout form
├── apps/server/      ← Express.js API server  
└── package.json      ← Monorepo configuration
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp apps/server/.env.example apps/server/.env
   ```
   Edit `apps/server/.env` with your Primer.io API key:
   ```bash
   PRIMER_API_KEY=your_primer_api_key_here
   PRIMER_API_VERSION=2.4
   PRIMER_API_ENVIRONMENT=SANDBOX
   PORT=3001
   ```

3. **Start development servers**:
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both apps in development |
| `npm run build` | Build both apps |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |

## Configuration

**Server** (`apps/server/.env`):
```bash
PRIMER_API_KEY=your_primer_api_key
PRIMER_API_VERSION=2.4
PRIMER_API_ENVIRONMENT=SANDBOX
PORT=3001
```

**Frontend** (`apps/frontend/.env`):
```bash
VITE_SERVER_URL=http://localhost:3001
```

## Testing

**Test Cards:**

| Card Number | Result |
|-------------|--------|
| `4000 0000 0000 0002` | Successful payment |
| `4000 0000 0000 0127` | Insufficient funds |
| `4000 0000 0000 0119` | Processing error |

Use any future expiry date, any 3-digit CVV, and any name.

**Demo Data:** Click "Autofill Demo Data" to quickly populate the checkout form.