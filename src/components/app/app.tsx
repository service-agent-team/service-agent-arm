import { history } from '@/common';
import { useBootstrap } from '@/common/hooks';
import { Loading } from '@/components';
import { Routes } from '@/router';
import { Toaster } from 'react-hot-toast';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (isInitiated) {
    return <Loading />;
  }

  return (
    <>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Routes isAuth={isAuth} />
          <Toaster />
        </HistoryRouter>
      </ThemeProvider>
    </>
  );
};
