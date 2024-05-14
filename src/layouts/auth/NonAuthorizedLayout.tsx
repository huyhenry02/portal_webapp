import React from 'react';
import { connect } from 'react-redux';
import { BlankLayout } from '../index';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthorizedLayout = ({ tokenState }) => {
  if (tokenState) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  );
};

const mapStateToProps = ({ authenticate }) => ({
  tokenState: authenticate?.token,
});

export default connect(mapStateToProps)(NonAuthorizedLayout);
