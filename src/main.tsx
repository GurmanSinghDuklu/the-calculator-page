import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import App from './App';
import './index.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ app, router, isClient }) => {
    // Client-side only setup
    if (isClient) {
      // Add any client-only initialization here
    }
  }
);