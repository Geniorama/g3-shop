import { ThemeConfig } from '@/config/theme.config'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { wrapper } from '@/store'

function App({ Component, pageProps, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);
  const persistor = (store as any).__persistor;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeConfig>
        <Component {...pageProps} />
      </ThemeConfig>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(App)
