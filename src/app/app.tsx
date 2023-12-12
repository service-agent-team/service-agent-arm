import { Loading } from '@/components';
import { history, useBootstrap } from '@/libs';
import { Routes } from '@/router';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (!isInitiated) {
    return <Loading />;
  }

  return (
    <>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Routes isAuth={isAuth} />
        </HistoryRouter>
      </ThemeProvider>
    </>
  );
};
