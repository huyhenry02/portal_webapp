import React from 'react';
import { useRoutes } from 'react-router';
import Login from '../pages/Auth/Login';
import NonAuthorizedLayout from '../layouts/auth/NonAuthorizedLayout';
import AuthorizedLayout from '../layouts/auth/AuthorizedLayout';
import { authorizedRoutes } from './routeData';
import SendMailForgotPassword from '../pages/Auth/SendMailForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import ResetPasswordSuccess from '../pages/Auth/ResetPasswordSuccess';

const Router = () => {
  return useRoutes([
    {
      element: <NonAuthorizedLayout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/forgot-password',
          element: <SendMailForgotPassword />,
        },
        {
          path: '/reset-password',
          element: <ResetPassword />,
        },
        {
          path: '/reset-password-success',
          element: <ResetPasswordSuccess />,
        },
      ],
    },
    {
      element: <AuthorizedLayout />,
      children: authorizedRoutes,
    },
  ]);
};

export default Router;
