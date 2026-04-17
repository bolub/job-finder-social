import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Part-Time Job Finder",
  description:
    "A simple website for finding part-time jobs around Bermondsey, London.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
