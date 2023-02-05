import Navigator from "../components/Navigator";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navigator />
      <Component {...pageProps} />
    </>
  );
}
