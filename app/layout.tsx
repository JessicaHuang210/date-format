import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Date Format Tool",
  description:
    "A simple date format tool that allows you to format dates in different ways",
  icons: {
    icon: "/favico.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
