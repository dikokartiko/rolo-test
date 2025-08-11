"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "./toaster";

const customConfig = {
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...defaultConfig.theme.tokens,
      fonts: {
        ...defaultConfig.theme.tokens.fonts,
        body: { value: "var(--font-poppins), system-ui, sans-serif" },
        heading: { value: "var(--font-poppins), system-ui, sans-serif" },
      },
    },
  },
};

const system = createSystem(customConfig);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <ChakraProvider value={system}>
        {children}
        <Toaster />
      </ChakraProvider>
    </NextThemesProvider>
  );
}
