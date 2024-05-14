import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../defaultLayout/DefaultLayout';

const NonAuthorizedLayout = ({ tokenState }) => {
  if (!tokenState) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const mapStateToProps = ({ authenticate }) => ({
  tokenState: authenticate.token,
});

export default connect(mapStateToProps)(NonAuthorizedLayout);
