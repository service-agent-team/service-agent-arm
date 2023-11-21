import { history } from '@/libs';
import { store } from '@/libs/store';
import { Router } from '@/router';
import { GlobalStyles } from '@/styles';
import { Provider } from 'react-redux';
import { HistoryRouter } from './history-router';

export const App = () => {
  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <GlobalStyles />
        <Router />
      </Provider>
    </HistoryRouter>
  );
};
