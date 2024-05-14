import React, { useState } from 'react';
import './Auth.css';
import { authenticateActions } from '../../stores/slices/authenticate.slice';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Login = ({ postLogin }) => {
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Validation rules for the username and password
    if (name === 'username') {
      if (value.length < 3) {
        setErrors({
          ...errors,
          username: 'Username must be at least 3 characters',
        });
      } else {
        setErrors({ ...errors, username: '' });
      }
    }

    if (name === 'password') {
      if (value.length < 6) {
        setErrors({
          ...errors,
          password: 'Password must be at least 8 characters',
        });
      } else {
        setErrors({ ...errors, password: '' });
      }
    }
  };

  const handleLogin = () => {
    postLogin(formData);
  };

  return (
    <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 custom-auth-wrap">
      <div className="d-flex flex-center flex-column flex-lg-row-fluid">
        <div className="w-lg-500px p-10">
          <form
            className="form w-100"
            id="kt_sign_in_form"
            data-kt-redirect-url="../../demo38/dist/index.html"
            action="#"
          >
            <div className="text-center mb-11">
              <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
              <div className="text-gray-500 fw-semibold fs-6">
                Your Wishcare Account
              </div>
            </div>
            <span>superadmin@wishcare.com - Superadmin1@</span>
            <div className="form-text mb-5">
              <input
                type="text"
                placeholder="Tài khoản"
                name="username"
                autoComplete="off"
                className="form-control bg-transparent"
                onChange={handleInputChange}
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
            <div className="form-text mb-5">
              <div className="position-relative mb-3">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  name="password"
                  autoComplete="off"
                  className="form-control bg-transparent"
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
                <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
                  <i
                    className={
                      passwordShown
                        ? 'ki-outline ki-eye-slash fs-2'
                        : 'ki-outline ki-eye fs-2'
                    }
                    onClick={togglePassword}
                  ></i>
                </span>
              </div>
            </div>
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
              <div></div>
              <Link
                to={{
                  pathname: `/forgot-password`,
                }}
                className="link-primary"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="d-grid mb-10">
              <button
                type="button"
                id="kt_sign_in_submit"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                <span className="indicator-label">Sign In</span>
                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <div className="text-gray-500 text-center fw-semibold fs-6">
              Not a Member yet?
              <a href="#" className="link-primary">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authenticate }) => ({
  isLoading: authenticate.isLoading,
  isError: authenticate.isError,
  message: authenticate.message,
});

const mapDispatchToProps = dispatch => {
  return {
    postLogin: payload =>
      dispatch({
        type: `${authenticateActions.postLoginPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
