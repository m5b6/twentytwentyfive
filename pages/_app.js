import { useEffect } from 'react';
import { initSpinAnimation } from '../utils/SpinAnimation';
import { Space_Mono } from 'next/font/google';
import '../styles/global.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSpinAnimation();
  }, []);

  return (
    <main className={spaceMono.className}>
      <Component {...pageProps} />
    </main>
  );
}
