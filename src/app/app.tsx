// import { Loading } from '@/components';
// import { history, useBootstrap } from '@/libs';
import { Loading } from '@/components';
import { history, useBootstrap } from '@/libs';
import { Routes } from '@/router';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { HistoryRouter } from './history-router';
import { ThemeProvider } from './theme-provider';
// import { ThemeProvider } from './theme-provider';

export const App = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (!isInitiated) {
    return <Loading />;
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes isAuth={isAuth} />
        </HistoryRouter>
      </Provider>
    </ThemeProvider>
  );
};
