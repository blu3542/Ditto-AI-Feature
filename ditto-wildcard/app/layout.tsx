import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ditto — Wildcard Feature",
  description: "Spicy Question of the Week — Ditto dating app feature prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
