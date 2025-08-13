# Rolo - E-commerce Application

## Project Overview
Rolo is a modern e-commerce web application built with **Next.js 15**, **React 19**, and **Chakra UI v3**. It provides a seamless shopping experience with a comprehensive product catalog, robust cart functionality, and integrated payment processing.

## Tech Stack
- **Framework**: Next.js 15 (with Turbopack)
- **Frontend**: React 19 (with React Compiler)
- **UI Library**: Chakra UI v3
- **Language**: TypeScript
- **Icons**: React Icons
- **Theming**: Next Themes
- **State Management**: Zustand
- **Payment**: Stripe Integration
- **Data Storage**: Google Sheets Integration
- **Package Manager**: pnpm

## Getting Started

First, install dependencies:

```bash
pnpm install
# or
npm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_google_sheets_spreadsheet_id
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
