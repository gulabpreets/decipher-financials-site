import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope/index.css';
import '@fontsource-variable/dm-sans/index.css';
import '@fontsource/playfair-display/500-italic.css';
import './styles.css';
import { App } from './App';
import { Preloader } from './Preloader';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preloader>
      <App />
    </Preloader>
  </StrictMode>,
);
