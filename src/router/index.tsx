import { Loading } from '@/components';
import { useBootstrap } from '@/libs';
import { Routes } from './router';

export const Router = () => {
  const { isAuth, isInitiated } = useBootstrap();

  if (!isInitiated) {
    return <Loading />;
  }

  return <Routes isAuth={isAuth} />;
};
