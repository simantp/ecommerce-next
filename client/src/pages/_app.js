import "@/styles/globals.css";
import RootLayout from "./components/RootLayout";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ChakraProvider>
  );
}
