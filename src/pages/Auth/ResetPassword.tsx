import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateActions } from '../../stores/slices/authenticate.slice';
import zxcvbn from 'zxcvbn';
import PasswordStrengthMeter from '../../layouts/components/user/PasswordStrengthMeter';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import ResetPasswordSuccess from './ResetPasswordSuccess';

type IResetPassword = {
  resetPassword: (payload: {
    token: string | null;
    new_password: string;
    password_confirm: string;
  }) => void;
  isLoading: boolean;
  statusCodeResetPass: number;
  updateStatusResetPassCode: () => void;
};
const ResetPassword: React.FC<IResetPassword> = ({
  resetPassword,
  isLoading,
  statusCodeResetPass,
  updateStatusResetPassCode,
}) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('token');
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordValidError, setPasswordValidError] = useState('');
  const [isShown, setShown] = useState({
    newPasswordShown: false,
    confirmPasswordShown: false,
  });
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const checkPasswordStrength = newPassword => {
    const testResult = zxcvbn(newPassword);
    setIsPasswordStrong(testResult.score >= 3);
  };
  const handleInputBlur = () => {
    if (
      password.newPassword.trim() === '' ||
      password.confirmPassword.trim() === ''
    ) {
      setPasswordValidError('Các trường mật khẩu không được bỏ trống');
    } else {
      setPasswordValidError('');
    }
  };
  const handleSubmitRequest = () => {
    if (
      password.newPassword &&
      password.confirmPassword &&
      password.newPassword === password.confirmPassword
    ) {
      resetPassword({
        token: token,
        new_password: password.newPassword,
        password_confirm: password.confirmPassword,
      });
    } else {
      setPasswordValidError('Mật khẩu xác nhận không khớp.');
    }
  };
  useEffect(() => {
    if (statusCodeResetPass == 200) {
      setIsResetPassword(true);
    }
    return () => {
      updateStatusResetPassCode();
    };
  }, [statusCodeResetPass]);
  return (
    <>
      {!isResetPassword ? (
        <>
          <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 custom-auth-wrap">
            <div className="d-flex flex-center flex-column flex-lg-row-fluid">
              <div className="w-lg-500px p-10">
                <form
                  className="form w-100"
                  id="kt_new_password_form"
                  data-kt-redirect-url="#"
                  action="#"
                >
                  <div className="text-center mb-10">
                    <h1 className="text-dark fw-bolder mb-3">
                      Thiết lập mật khẩu mới
                    </h1>
                    <div className="text-gray-500 fw-semibold fs-6">
                      Bạn đã đặt lại mật khẩu ?
                      <Link
                        to={{
                          pathname: `/login`,
                        }}
                        className="link-primary"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                  <div className="fv-row mb-8" data-kt-password-meter="true">
                    <div className="mb-1">
                      <div className="position-relative mb-3">
                        <input
                          className="form-control bg-transparent"
                          type={isShown.newPasswordShown ? 'text' : 'password'}
                          placeholder="Mật khẩu mới"
                          name="password"
                          value={password.newPassword}
                          onChange={e => {
                            setPassword({
                              ...password,
                              newPassword: e.target.value,
                            });
                            checkPasswordStrength(e.target.value);
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
                      <PasswordStrengthMeter
                        newPassword={password.newPassword}
                      />
                    </div>
                    <div className="text-muted">
                      Mật khẩu mới phải có ít nhất 8 ký tự và phải bao gồm chữ
                      hoa, thường, số và ký tự đặc biệt. VD: Superadmin1@
                    </div>
                  </div>
                  <div className="fv-row mb-8">
                    <div className="mb-1">
                      <div className="position-relative mb-3">
                        <input
                          className="form-control bg-transparent"
                          type={
                            isShown.confirmPasswordShown ? 'text' : 'password'
                          }
                          placeholder="Xác nhận mật khẩu"
                          name="confirm-password"
                          value={password.confirmPassword}
                          onChange={e => {
                            setPassword({
                              ...password,
                              confirmPassword: e.target.value,
                            });
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
                                confirmPasswordShown:
                                  !isShown.confirmPasswordShown,
                              })
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  {passwordValidError && (
                    <div className="invalid-feedback text-danger">
                      {passwordValidError}
                    </div>
                  )}
                  <div className="d-grid mb-10">
                    <button
                      type="button"
                      id="kt_new_password_submit"
                      className="btn btn-primary"
                      disabled={
                        isLoading ||
                        password.newPassword.trim() === '' ||
                        password.confirmPassword.trim() === '' ||
                        !isPasswordStrong
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
          </div>
          <DefaultLoading isShow={isLoading} />
        </>
      ) : (
        <ResetPasswordSuccess />
      )}
    </>
  );
};
const mapStateToProps = ({ authenticate }) => ({
  isLoading: authenticate.isLoading,
  isError: authenticate.isError,
  message: authenticate.message,
  statusCodeResetPass: authenticate.statusCodeResetPass,
});

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: payload =>
      dispatch({
        type: `${authenticateActions.postResetPasswordPending.type}_saga`,
        payload,
      }),
    updateStatusResetPassCode: () =>
      dispatch({
        type: `${authenticateActions.updateStatusCode.type}_saga`,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
