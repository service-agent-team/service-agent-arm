import { history } from '@/libs';
import { Router } from '@/router';
import { store } from '@/store';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Router />
          <Toaster />
        </HistoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
