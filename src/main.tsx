import { App } from '@/components/app';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './report-web-vitals';
import { store } from './store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

reportWebVitals();
