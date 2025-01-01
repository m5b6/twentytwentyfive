import { useEffect } from 'react';
import { initSpinAnimation } from '../utils/SpinAnimation';
import Head from 'next/head';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSpinAnimation();
  }, []);

  return (
    <>
      <Head>
        <title>twentytwentyfive</title>
        <meta name="description" content="the best to-do app you will ever use. plan 2025 with style." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>" />
        <meta property="og:title" content="2025 - The best to-do app you will ever use" />
        <meta property="og:description" content="Plan your 2025 with style. The most beautiful and intuitive to-do app." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1a1a1a" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
