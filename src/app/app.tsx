import { HistoryRouter } from './history-router';
import { history } from '@/libs';
import { Router } from '@/router';
import { GlobalStyles } from '@/styles';

export const App = () => {
  return (
    <HistoryRouter history={history}>
      <GlobalStyles />
      <Router />
    </HistoryRouter>
  );
};
