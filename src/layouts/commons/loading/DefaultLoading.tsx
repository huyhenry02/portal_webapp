import React from 'react';
import ReactLoading from 'react-loading';
import CommonModal from '../../components/modals/CommonModal';
import './DefaultLoadding.css';

const DefaultLoading = ({ isShow = false }) => {
  return (
    <div className={'common_loading'}>
      <CommonModal isShow={isShow}>
        <ReactLoading type={'spin'} color={'green'} height={75} width={75} />
      </CommonModal>
    </div>
  );
};

export default DefaultLoading;
