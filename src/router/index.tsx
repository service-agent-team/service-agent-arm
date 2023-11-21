import { Loading } from '@/components';
import { useBootstrap } from '@/libs/hooks';
import { Routes } from '@/router/router';

export const Router = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (isInitiated) {
    return <Loading />;
  }

  return <Routes isAuth={isAuth} />;
};
