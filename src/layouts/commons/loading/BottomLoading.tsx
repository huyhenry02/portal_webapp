import React from 'react';
import ReactLoading from 'react-loading';
import './DefaultLoadding.css';

const BottomLoading = ({ isShow = false }) => {
  return isShow ? (
    <div className={'common_loading text-center'}>
      <ReactLoading
        className="d-inline-block"
        type={'spin'}
        color={'green'}
        height={35}
        width={35}
      />
    </div>
  ) : (
    <></>
  );
};

export default BottomLoading;
