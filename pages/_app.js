import { useEffect } from 'react';
import { initSpinAnimation } from '../utils/SpinAnimation';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initSpinAnimation();
  }, []);

  return <Component {...pageProps} />;
}
