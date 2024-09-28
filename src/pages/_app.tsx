import { ThemeConfig } from "@/config/theme.config";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { pageview } from "@/lib/gtm"; 
import { useGTM } from "@/hooks/useGTM";
import { useRouter } from "next/router";
import { useEffect } from "react";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = (store as any).__persistor;
  const router = useRouter();

  useGTM();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeConfig>
          <Component {...props.pageProps} />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);
