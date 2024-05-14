import React from 'react';

const CommonModal: React.FC<{
  children: React.ReactNode;
  isShow: boolean;
  maxWidth?: string;
}> = ({ children, isShow = false, maxWidth = 'mw-950px' }) => {
  return (
    <>
      <div
        className={isShow ? 'modal fade show' : 'modal fade'}
        tabIndex={-1}
        aria-hidden={true}
        role="dialog"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <div className={`modal-dialog modal-dialog-centered ${maxWidth}`}>
          {children}
        </div>
      </div>
      {isShow && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default CommonModal;
