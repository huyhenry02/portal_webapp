import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authenticateActions } from '../../stores/slices/authenticate.slice';
import { Link } from 'react-router-dom';
import SendMailSuccess from './SendMailSuccess';

type ISendEmail = {
  sendEmail: (payload: { email: string }) => void;
  statusCodeSendMail: number;
  updateStatusSendMailCode: () => void;
};
const SendMailForgotPassword: React.FC<ISendEmail> = ({
  sendEmail,
  statusCodeSendMail,
  updateStatusSendMailCode,
}) => {
  const [email, setEmail] = useState('');
  const [isSendMail, setSendMail] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };
  const handleSubmitRequest = () => {
    if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ.');
    }
    sendEmail({
      email: email,
    });
  };
  useEffect(() => {
    if (statusCodeSendMail === 200) {
      setSendMail(true);
    }
    return () => {
      updateStatusSendMailCode();
    };
  }, [statusCodeSendMail]);
  return (
    <>
      <>
        {!isSendMail ? (
          <>
            <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 custom-auth-wrap">
              <div className="d-flex flex-center flex-column flex-lg-row-fluid">
                <div className="w-lg-500px p-10">
                  <form
                    className="form w-100"
                    id="kt_password_reset_form"
                    action="#"
                  >
                    <div className="text-center mb-10">
                      <h1 className="text-dark fw-bolder mb-3">
                        Quên mật khẩu ?
                      </h1>
                      <div className="text-gray-500 fw-semibold fs-6">
                        Nhập email của bạn để thiết lập lại mật khẩu của bạn.
                      </div>
                    </div>
                    <div className="fv-row mb-8">
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        autoComplete="off"
                        className="form-control bg-transparent"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                      />
                      {emailError && (
                        <div className="text-danger">{emailError}</div>
                      )}
                    </div>
                    <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                      <button
                        type="button"
                        id="kt_password_reset_submit"
                        className="btn btn-primary me-4"
                      >
                        <span
                          className="indicator-label"
                          onClick={() => {
                            handleSubmitRequest();
                          }}
                        >
                          Xác nhận
                        </span>
                      </button>
                      <Link
                        to={{
                          pathname: `/login`,
                        }}
                        className="btn btn-light"
                      >
                        Huỷ bỏ
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SendMailSuccess />
        )}
      </>
    </>
  );
};
const mapStateToProps = ({ authenticate }) => ({
  isLoading: authenticate.isLoading,
  isError: authenticate.isError,
  message: authenticate.message,
  statusCodeSendMail: authenticate.statusCodeSendMail,
});
const mapDispatchToProps = dispatch => {
  return {
    sendEmail: payload =>
      dispatch({
        type: `${authenticateActions.postSendEmailPending.type}_saga`,
        payload,
      }),
    updateStatusSendMailCode: () =>
      dispatch({
        type: `${authenticateActions.updateStatusCode.type}_saga`,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendMailForgotPassword);
