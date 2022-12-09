import type { AppProps } from "next/app";
import { FileTokenProvider } from "../shared/contexts/FileTokenContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FileTokenProvider>
      <Component {...pageProps} />
    </FileTokenProvider>
  );
}
