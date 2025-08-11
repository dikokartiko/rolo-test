import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/ui/provider";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rolo",
  description: "Rolo E-commerce Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
