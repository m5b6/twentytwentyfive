import { useEffect } from 'react';
import Head from 'next/head';
import { initSpinAnimation } from '../utils/SpinAnimation';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initSpinAnimation();
  }, []);

  return (
    <>
      <Head>
        <title>twentytwentyfive</title>
        <meta name="description" content="the best to-do app / tracker you will ever use. plan 2025 with style." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#111111" />
        <meta property="og:title" content="twentytwentyfive" />
        <meta property="og:description" content="the best to-do app / tracker you will ever use. plan 2025 with style." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"></link>

      </Head>
      <style jsx global>{`
        html, body {
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }
        #__next {
          min-height: 100vh;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
