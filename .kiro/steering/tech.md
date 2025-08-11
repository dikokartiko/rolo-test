# Technology Stack

## Framework & Runtime
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library with React Compiler enabled
- **TypeScript 5** - Type-safe JavaScript

## UI & Styling
- **Chakra UI 3.24.2** - Component library for consistent design
- **next-themes 0.4.6** - Theme management
- **react-icons 5.5.0** - Icon library
- **Poppins font** - Primary typography via Google Fonts

## State Management
- **Zustand 5.0.7** - Lightweight state management for cart functionality

## Development Tools
- **ESLint 9** - Code linting with Next.js config
- **Turbopack** - Fast bundler for development
- **pnpm** - Package manager (based on lock file)

## Common Commands

### Development
```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Configuration Notes
- React Compiler is enabled in `next.config.ts`
- Path aliases configured: `@/*` maps to `./src/*`
- Strict TypeScript configuration with ES2017 target