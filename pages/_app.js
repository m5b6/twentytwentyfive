import { useEffect } from 'react';
import { initSpinAnimation } from '../utils/SpinAnimation';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initSpinAnimation();
  }, []);

  return (
    <>
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
