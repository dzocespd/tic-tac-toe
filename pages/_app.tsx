import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { App as q } from "@capacitor/app";
import { Container } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Container
        fixed
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#cfe8fc",
        }}
      >
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}
