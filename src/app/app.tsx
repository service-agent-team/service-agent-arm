import { history, useBootstrap } from '@/libs';
import { Loading } from '@/components';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';
import { Routes } from '@/router';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  // if (!isInitiated) {
  //   return <Loading />;
  // }

  return (
    <ThemeProvider>
      <HistoryRouter history={history}>
        <Routes isAuth={isAuth} />
      </HistoryRouter>
    </ThemeProvider>
  );
};
