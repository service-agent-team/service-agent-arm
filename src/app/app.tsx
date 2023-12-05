import { history } from '@/libs';
import { Router } from '@/router';
import { store } from '@/store/store';
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
