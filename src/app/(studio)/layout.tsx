import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homebase",
  viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
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
