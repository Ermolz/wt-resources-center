import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@app/providers';
import App from '@app';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h1>Error loading application</h1>
        <p><strong>${error.message}</strong></p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error.stack}</pre>
        <p>Check the browser console for more details.</p>
      </div>
    `;
  }
}

