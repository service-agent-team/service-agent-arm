<<<<<<< HEAD
import { history } from '@/libs';
import { Router } from '@/router';
import { store } from '@/store/store';
import { GlobalStyles } from '@/styles';
import { Toaster } from 'react-hot-toast';
=======
import { Loading } from '@/components';
import { history, useBootstrap } from '@/libs';
import { Routes } from '@/router';
import { store } from '@/store';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
import { Provider } from 'react-redux';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (!isInitiated) {
    return <Loading />;
  }
  return (
    <ThemeProvider>
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Routes isAuth={isAuth} />
        </Provider>
      </HistoryRouter>
    </ThemeProvider>
  );
};
