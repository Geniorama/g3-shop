import { ThemeConfig } from '@/config/theme.config'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeConfig>
      <Component {...pageProps} />
    </ThemeConfig>
  )
}
