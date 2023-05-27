// _app.tsx
import { AppProps } from 'next/app';
import { CounterProvider } from './components/CounterContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CounterProvider>
      <Component {...pageProps} />
    </CounterProvider>
  );
}

export default MyApp;
