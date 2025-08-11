# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── catalogue/          # Product catalogue page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   ├── ui/                 # Chakra UI provider setup
│   ├── Header.tsx          # Main navigation header
│   └── ProductCard.tsx     # Product display component
├── lib/                    # Utilities and shared logic
│   ├── data.ts             # Static data/mock data
│   └── types.ts            # TypeScript type definitions
└── store/                  # State management
    └── cart.ts             # Zustand cart store
```

## Conventions

### File Naming
- React components: PascalCase (e.g., `ProductCard.tsx`)
- Pages: lowercase (e.g., `catalogue/page.tsx`)
- Utilities: camelCase (e.g., `data.ts`, `types.ts`)

### Import Patterns
- Use `@/` path alias for src imports
- External libraries first, then internal imports
- Components use `'use client'` directive when needed

### Component Structure
- Functional components with TypeScript interfaces
- Props interfaces defined above component
- Chakra UI components for consistent styling
- Specific color values and spacing used throughout (#BABFCE, #1C1C1E, etc.)

### Styling Approach
- Chakra UI component props for styling
- Consistent spacing and color palette
- Responsive design with fixed widths (1200px container)
- Custom CSS only when Chakra UI limitations require it