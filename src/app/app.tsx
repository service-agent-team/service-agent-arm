import { history, useBootstrap } from '@/libs';
import { Routes } from '@/router';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  // if (!isInitiated) {
  //   return <Loading />;
  // }
  console.log(isInitiated);

  return (
    <ThemeProvider>
      <HistoryRouter history={history}>
        <Routes isAuth={isAuth} />
      </HistoryRouter>
    </ThemeProvider>
  );
};
