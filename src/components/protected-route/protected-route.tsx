import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  publicRoute,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (publicRoute) {
    if (isLoggedIn) {
      const from = location.state?.from || { pathname: '/' };
      return <Navigate replace to={from} />;
      // return <Navigate replace to='/' state={{ from: location }} />;
    } else {
      return children;
    }
  }

  if (!isLoggedIn) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
