import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

console.log("Main.tsx carregado"!)

createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </StrictMode>,
)
