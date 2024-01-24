import cx from "classnames";
import { Metadata } from "next";
import { Inter, Source_Serif_4, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "src/styles/app.css";
import "src/styles/typography.module.css";
import layout from "src/styles/layout.module.css";
import Navigation from "src/components/navigation";
import getSiteUrl from "src/utils/getSiteUrl";

const inter = Inter({
  variable: "--font-sans-serif",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-mono",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Allan Lasser",
  icons: [{ type: "image/x-icon", url: "/static/favicon.ico" }],
  alternates: {
    canonical: getSiteUrl(),
    types: {
      "application/rss+xml": `${getSiteUrl()}/feeds/rss.xml`,
      "application/atom+xml": `${getSiteUrl()}/feeds/atom.xml`,
      "application/json": `${getSiteUrl()}/feeds/feed.json`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <html
      lang='en'
      className={cx(inter.variable, sourceSerif.variable, sourceCode.variable)}
    >
      <body>
        <header className={layout.header}>
          <Navigation />
        </header>
        <div className={layout.container}>{children}</div>
        <footer className={layout.footer}></footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
