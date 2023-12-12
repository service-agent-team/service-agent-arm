import { getTokens } from '@/helpers';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '.';
import { USER, getLocalStorage } from '../utils';
import { addNotification } from '../utils/addNotification';
import { useActions } from './use-actions';

export function useBootstrap() {
  const { setUser, setAuth, setToken, logout } = useActions();
  const { isAuth } = useTypedSelector((state) => state.auth);
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
  }, []);

  return { isAuth, isInitiated };
}
