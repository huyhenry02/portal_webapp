import React from 'react';

const SweetAlertDelete = ({
  dataInfo,
  handleCloseSweetAlert,
  handleSubmitSweetAlert,
}) => {
  /*
    Action:
      0 = Default
      1 = Warning 
      2 = Success
  */
  const { isShow, action = 0, content = 'bản ghi', data } = dataInfo;

  return (
    <div
      className={`swal2-container swal2-center swal2-backdrop-show ${
        isShow ? 'd-gird' : 'd-none'
      }`}
    >
      <div
        aria-labelledby="swal2-title"
        aria-describedby="swal2-html-container"
        className="swal2-popup swal2-modal swal2-icon-warning swal2-show d-grid"
        tabIndex={-1}
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
      >
        <div
          className={`swal2-icon swal2-warning swal2-icon-show ${
            action === 1 ? 'd-flex' : 'd-none'
          }`}
        >
          <div className="swal2-icon-content">!</div>
        </div>
        <div
          className={`swal2-icon swal2-success swal2-icon-show ${
            action === 2 ? 'd-flex' : 'd-none'
          }`}
        >
          <div className="swal2-success-circular-line-left"></div>
          <span className="swal2-success-line-tip"></span>
          <span className="swal2-success-line-long"></span>
          <div className="swal2-success-ring"></div>
          <div className="swal2-success-fix"></div>
          <div className="swal2-success-circular-line-right"></div>
        </div>
        <div className="swal2-html-container d-block" id="swal2-html-container">
          {action === 1
            ? `Bạn có chắc chắn muốn xóa ${content} này không?`
            : action === 2
              ? 'Xóa thành công'
              : ''}
        </div>

        <div className="swal2-actions d-flex">
          <div className="swal2-loader"></div>
          <button
            type="button"
            className={`swal2-confirm btn btn-light-primary ${
              action === 2 ? 'd-inline-block' : 'd-none'
            }`}
            onClick={handleCloseSweetAlert}
          >
            OK
          </button>
          <button
            type="button"
            className={`swal2-confirm btn btn-light-primary ${
              action === 1 ? 'd-inline-block' : 'd-none'
            }`}
            onClick={() => handleSubmitSweetAlert(data)}
          >
            Có
          </button>
          <button
            type="button"
            className={`swal2-deny btn btn-danger d-inline-block  ${
              action === 1 ? 'd-inline-block' : 'd-none'
            }`}
            onClick={handleCloseSweetAlert}
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetAlertDelete;
