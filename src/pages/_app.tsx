import { AppProps } from "next/app";
import "src/styles/app.css";
import "src/styles/typography.module.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
