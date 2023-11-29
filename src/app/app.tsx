import { history } from '@/libs';
import { store } from '@/libs/store';
import { Router } from '@/router';
import { GlobalStyles } from '@/styles';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { HistoryRouter } from './history-router';

export const App = () => {
  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <GlobalStyles />
        <Router />
        <Toaster />
      </Provider>
    </HistoryRouter>
  );
};
