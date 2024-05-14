import React, { useEffect, useRef, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import '../../../pages/ManageAppointment/Appointment.css';
import { manageAppointmentActions } from '../../../stores/slices/manageAppointment.slice';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';

type IRejectAppointment = {
  show?: boolean;
  onClose?: () => void;
  rejectAppointment: (payload: {
    id: string;
    reject_reason: string;
    status: string;
  }) => void;
  isLoading: boolean;
};
const AppointmentRejectComponent: React.FC<IRejectAppointment> = ({
  show = false,
  onClose,
  rejectAppointment,
  isLoading,
}) => {
  const { id } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectReasonError, setRejectReasonError] = useState('');
  const [isRejected, setIsRejected] = useState(false);
  const textareaRef = useRef(null);

  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose();
  };
  useEffect(() => {
    setIsShow(show);
    setRejectReason('');
    setRejectReasonError('');
  }, [show]);
  useEffect(() => {
    if (isRejected) {
      handleCloseModal();
    }
  }, [isRejected]);
  const handleCancelRequest = () => {
    handleCloseModal();
  };

  const handleSubmitRequest = () => {
    if (rejectReason && id) {
      rejectAppointment({
        id,
        status: 'rejected',
        reject_reason: rejectReason,
      });
      setIsRejected(true);
    }
  };
  const handleTextareaBlur = () => {
    if (rejectReason.trim() === '') {
      setRejectReasonError('Lý do hủy lịch hẹn là bắt buộc');
    } else {
      setRejectReasonError('');
    }
  };

  const { t } = useTranslation();
  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold"> {t('rejectAppointment')}?</h2>
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
            <div className="fv-row mb-7">
              <textarea
                ref={textareaRef}
                className={`form-control form-control-solid custom-input-reject ${
                  rejectReasonError ? 'is-invalid' : ''
                }`}
                placeholder={t('reasonReject')}
                name="reject_reason"
                value={rejectReason}
                onChange={e => {
                  setRejectReason(e.target.value);
                  setRejectReasonError('');
                }}
                onBlur={handleTextareaBlur}
              />
              {rejectReasonError && (
                <div className="invalid-feedback text-danger">
                  {rejectReasonError}
                </div>
              )}
            </div>
            <div className="text-center pt-15">
              <button
                type="reset"
                className="btn btn-bg-secondary me-3"
                onClick={handleCancelRequest}
              >
                {t('rejected')}
              </button>
              <button
                className="btn btn-danger me-3"
                disabled={isLoading || isRejected || rejectReason.trim() === ''}
                onClick={() => {
                  handleSubmitRequest();
                }}
              >
                <span className="indicator-label">
                  {!isLoading ? (
                    translate('')
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
  rejectAppointment: payload =>
    dispatch({
      type: `${manageAppointmentActions.updateStatusAppointmentPending.type}_saga`,
      payload,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentRejectComponent);
