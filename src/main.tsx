import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

let root = (window as any).__REACT_ROOT__;
const container = document.getElementById('root')!;
if (!root) {
  root = createRoot(container);
  (window as any).__REACT_ROOT__ = root;
}
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
