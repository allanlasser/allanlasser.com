import cx from "classnames";
import { Inter, Source_Serif_4, Fira_Code } from "@next/font/google";
import Page from "src/components/page";
import "src/styles/app.css";
import "src/styles/typography.module.css";

const inter = Inter({
  variable: "--font-sans-serif",
});
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  style: ["normal", "italic"],
});
const firaCode = Fira_Code({
  variable: "--font-mono",
});

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
