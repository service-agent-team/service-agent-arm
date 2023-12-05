import { ThemeProvider } from './theme-provider';
import { HistoryRouter } from './history-router';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { history } from '@/libs';
import { Router } from '@/router';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Router />
        </HistoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
