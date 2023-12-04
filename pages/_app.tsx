import type { AppProps } from "next/app";
import "styles/Home.module.css"

import { ChakraProvider, Heading, extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;