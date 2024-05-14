import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { manageAppointmentActions } from '../../../stores/slices/manageAppointment.slice';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

type IAcceptAppointment = {
  show?: boolean;
  onClose?: () => void;
  acceptAppointment: (payload: { id: string; status: string }) => void;
  isLoading: boolean;
};
const AppointmentAcceptComponent: React.FC<IAcceptAppointment> = ({
  show = false,
  onClose,
  acceptAppointment,
  isLoading,
}) => {
  const { id } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose();
  };
  useEffect(() => {
    setIsShow(show);
  }, [show]);
  useEffect(() => {
    if (isApproved) {
      handleCloseModal();
    }
  }, [isApproved]);
  const handleCancelRequest = () => {
    handleCloseModal();
  };
  const handleSubmitRequest = () => {
    if (id) {
      acceptAppointment({
        id,
        status: 'approved',
      });
    }
  };
  return (
    <CommonModal isShow={isShow} maxWidth={'mw-550px'}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">Xác nhận lịch hẹn ?</h2>
          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-kt-permissions-modal-action="close"
          >
            <i
              className="ki-outline ki-cross fs-1"
              onClick={handleCloseModal}
            ></i>
          </div>
        </div>
        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <form
            id="kt_modal_update_permission_form"
            className="form"
            action="#"
          >
            <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
              <i className="ki-outline ki-information fs-2tx text-warning me-4"></i>
              <div className="d-flex flex-stack flex-grow-1">
                <div className="fw-semibold">
                  <div className="fs-6 text-gray-700">
                    Bạn chắc chắn muốn xác nhận lịch hẹn ?
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pt-15">
              <button
                type="reset"
                className="btn btn-bg-secondary me-3"
                onClick={handleCancelRequest}
              >
                Hủy bỏ
              </button>
              <button
                className="btn btn-danger me-3"
                disabled={isLoading}
                onClick={() => {
                  handleSubmitRequest();
                  setIsApproved(true);
                }}
              >
                <span className="indicator-label">
                  {!isLoading ? (
                    'Xác nhận '
                  ) : (
                    <>
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </CommonModal>
  );
};
const mapStateToProps = ({ manageAppointment }) => ({
  isLoading: manageAppointment.isLoading,
  isError: manageAppointment.isError,
  message: manageAppointment.message,
});

const mapDispatchToProps = dispatch => ({
  acceptAppointment: payload =>
    dispatch({
      type: `${manageAppointmentActions.updateStatusAppointmentPending.type}_saga`,
      payload,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentAcceptComponent);
