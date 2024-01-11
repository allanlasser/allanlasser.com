import type { Metadata } from "next";
import "src/styles/sanity.css";

export const metadata: Metadata = {
  title: "Homebase",
  robots: "noindex",
  referrer: "same-origin",
  other: {
    charset: "utf-8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
