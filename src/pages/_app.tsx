// _app.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
