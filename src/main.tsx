import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from '@/app';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

console.log('ok');

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
