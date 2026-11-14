import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alikhan Seisembekov | Materials × Neuro × AI",
  description:
    "Alikhan Seisembekov, materials engineer: nanowire biosensors, neural signal analysis, and AI agents for materials discovery. MEng, University of Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
