import { getTokens } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect, useState } from 'react';
<<<<<<<< HEAD:src/libs/hooks/use-bootsrap.ts
import { useActions } from './use-actions';
import { useTypedSelector } from './use-selector';
========
import { USER, getLocalStorage } from '../utils';
import { useActions } from './use-actions';
import { useAppSelector } from './use-selector';
>>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178:src/libs/hooks/use-bootstrap.ts

export function useBootstrap() {
  const { setAuth, setToken, logout, setUser } = useActions();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [isInitiated, setIsInitiated] = useState(true);

  const user = getLocalStorage(USER);
  const accessToken = getTokens().accessToken;

  const setApp = () => {
    if (accessToken != undefined) {
      setUser(JSON.parse(user as string));
      setAuth(true);
      setToken(accessToken);
    } else {
      logout();
    }
  };

  useEffect(() => {
    const appConfig = () => {
      try {
        setApp();
        setIsInitiated(false);
      } catch (error) {
        addNotification(error);
      }
    };

    appConfig();
  }, [setApp]);

  return { isAuth, isInitiated };
}
