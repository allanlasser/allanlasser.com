import cx from "classnames";
import { Metadata } from "next";
import { Inter, Source_Serif_4, Fira_Code } from "next/font/google";
import Page from "src/components/page";
import "src/styles/app.css";
import "src/styles/typography.module.css";
import getSiteUrl from "src/utils/getSiteUrl";

const inter = Inter({
  variable: "--font-sans-serif",
  subsets: ["latin"]
});
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  style: ["normal", "italic"],
  subsets: ["latin"]
});
const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Allan Lasser",
  viewport: { width: "device-width", initialScale: 1 },
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
  return (
    <html
      lang='en'
      className={cx(inter.variable, sourceSerif.variable, firaCode.variable)}
    >
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
