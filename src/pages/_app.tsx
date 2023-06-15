import "../../globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/Button.styled";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            paddingRight: 20,
            background: "lighblue",
          }}
        >
          {user ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={signInWithGoogle}>Login</Button>
          )}
        </div>
        {user && <Component {...pageProps} />}
      </>
    </QueryClientProvider>
  );
}

export default MyApp;
