import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { LoggedIn } from '../../stories/Header.stories';

type TProtectedRoute = {
  children: ReactNode;
  isProtected?: boolean;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
  children,
  isProtected
}) => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoading) {
    return <Preloader />;
  }
  if (!isLoggedIn && isProtected) {
    return <Navigate to='/login' />;
  }
  return children;
};
