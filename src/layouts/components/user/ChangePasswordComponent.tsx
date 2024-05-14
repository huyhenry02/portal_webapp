import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { manageUserActions } from '../../../stores/slices/manageUser.slice';
import { connect } from 'react-redux';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';
import { useTranslation } from 'react-i18next';

type IChangePasswordComponent = {
  show?: boolean;
  changePassUser: (payload: {
    old_password: string;
    new_password: string;
    password_confirm: string;
  }) => void;
  onClose?: () => void;
  isLoading: boolean;
};
const ChangePasswordComponent: React.FC<IChangePasswordComponent> = ({
  show = false,
  onClose,
  changePassUser,
  isLoading,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordRequired, setPasswordRequired] = useState('');
  const [isShown, setShown] = useState({
    oldPasswordShown: false,
    newPasswordShown: false,
    confirmPasswordShown: false,
  });
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const handleCloseModal = () => {
    setIsShow(false);
    setPassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setIsConfirmValid(false);
    setIsPasswordStrong(false);
    setPasswordRequired('');
    onClose && onClose();
  };
  const checkPasswordStrength = newPassword => {
    const testResult = zxcvbn(newPassword);
    setIsPasswordStrong(testResult.score >= 3);
  };
  const checkConfirmValid = () => {
    setIsConfirmValid(password.newPassword === password.confirmPassword);
  };
  const handleInputBlur = () => {
    if (
      password.oldPassword.trim() === '' ||
      password.newPassword.trim() === '' ||
      password.confirmPassword.trim() === ''
    ) {
      setPasswordRequired('Các trường mật khẩu không được bỏ trống');
    } else {
      setPasswordRequired('');
    }
  };
  const handleSubmitRequest = () => {
    if (
      password.oldPassword &&
      password.newPassword &&
      password.confirmPassword
    ) {
      changePassUser({
        old_password: password.oldPassword,
        new_password: password.newPassword,
        password_confirm: password.confirmPassword,
      });
      handleCloseModal();
    }
  };
  const handleCancelRequest = () => {
    handleCloseModal();
  };
  useEffect(() => {
    setIsShow(show);
    setPasswordRequired('');
  }, [show]);
  const { t } = useTranslation();
  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">{t('changePassword')}?</h2>
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
            <div className="fv-row mb-8">
              <label
                htmlFor="currentpassword"
                className="form-label fs-6 fw-bold mb-3"
              >
                {t('oldPassword')}
              </label>
              <div className="position-relative mb-3">
                <input
                  className="form-control bg-transparent"
                  type={isShown.oldPasswordShown ? 'text' : 'password'}
                  name="password"
                  value={password.oldPassword}
                  onChange={e => {
                    setPassword({
                      ...password,
                      oldPassword: e.target.value,
                    });
                  }}
                  onBlur={handleInputBlur}
                />
                <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
                  <i
                    className={
                      isShown.oldPasswordShown
                        ? 'ki-outline ki-eye-slash fs-2'
                        : 'ki-outline ki-eye fs-2'
                    }
                    onClick={() =>
                      setShown({
                        ...isShown,
                        oldPasswordShown: !isShown.oldPasswordShown,
                      })
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="fv-row mb-8">
              <label
                htmlFor="newpassword"
                className="form-label fs-6 fw-bold mb-3"
              >
                {t('newPassword')}
              </label>
              <div className="mb-1">
                <div className="position-relative mb-3">
                  <input
                    className="form-control bg-transparent"
                    type={isShown.newPasswordShown ? 'text' : 'password'}
                    name="password"
                    value={password.newPassword}
                    onChange={e => {
                      setPassword({
                        ...password,
                        newPassword: e.target.value,
                      });
                      checkPasswordStrength(e.target.value);
                      checkConfirmValid();
                    }}
                    onBlur={handleInputBlur}
                  />
                  <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
                    <i
                      className={
                        isShown.newPasswordShown
                          ? 'ki-outline ki-eye-slash fs-2'
                          : 'ki-outline ki-eye fs-2'
                      }
                      onClick={() =>
                        setShown({
                          ...isShown,
                          newPasswordShown: !isShown.newPasswordShown,
                        })
                      }
                    ></i>
                  </span>
                </div>
                <PasswordStrengthMeter newPassword={password.newPassword} />
              </div>
            </div>
            <div className="fv-row mb-8">
              <label
                htmlFor="confirmpassword"
                className="form-label fs-6 fw-bold mb-3"
              >
                {t('confirmPassword')}
              </label>
              <div className="position-relative mb-3">
                <input
                  className="form-control bg-transparent"
                  type={isShown.confirmPasswordShown ? 'text' : 'password'}
                  name="password"
                  value={password.confirmPassword}
                  onChange={e => {
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    });
                    checkConfirmValid();
                  }}
                  onBlur={handleInputBlur}
                />
                <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
                  <i
                    className={
                      isShown.confirmPasswordShown
                        ? 'ki-outline ki-eye-slash fs-2'
                        : 'ki-outline ki-eye fs-2'
                    }
                    onClick={() =>
                      setShown({
                        ...isShown,
                        confirmPasswordShown: !isShown.confirmPasswordShown,
                      })
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="form-text mb-5">
              Mật khẩu mới phải có ít nhất 8 ký tự và phải bao gồm chữ hoa, chữ
              thường, số và ký tự đặc biệt. VD: Superadminn123@
            </div>
            {passwordRequired && (
              <div className="invalid-feedback text-danger">
                {passwordRequired}
              </div>
            )}
            {!isConfirmValid || (
              <div className="invalid-feedback text-danger">
                Mật khẩu xác nhận không khớp.
              </div>
            )}
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
                disabled={
                  isLoading ||
                  password.oldPassword.trim() === '' ||
                  password.newPassword.trim() === '' ||
                  password.confirmPassword.trim() === '' ||
                  !isPasswordStrong ||
                  isConfirmValid
                }
                onClick={() => {
                  handleSubmitRequest();
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
const mapStateToProps = ({ manageUser }) => ({
  isLoading: manageUser.isLoading,
  isError: manageUser.isError,
  message: manageUser.message,
});

const mapDispatchToProps = dispatch => {
  return {
    changePassUser: payload =>
      dispatch({
        type: `${manageUserActions.changePassUserPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordComponent);
