import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/hooks/modal-provider";
import ToasterProvider from "@/components/ToasterProvider";
import CrispProvider from "@/components/CrispProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius AI",
  description:
    "Genius is an AI-SAAS platform, created by Chandrabhan Singh Rathore!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" as="logo" />
        </head>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
