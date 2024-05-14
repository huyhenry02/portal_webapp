import React from 'react';
import { Link } from 'react-router-dom';
const SendMailSuccess = () => {
  return (
    <div
      className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 flex-root custom-auth-wrap"
      id="kt_app_root"
    >
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <div className="mb-14">
                <a href="../../demo38/dist/index.html" className="">
                  <img
                    alt="Logo"
                    src="/assets/media/logos/default.svg"
                    className="h-40px"
                  />
                </a>
              </div>
              <h1 className="fw-bolder text-gray-900 mb-5">
                Email đã được gửi{' '}
              </h1>
              <div className="fs-6 fw-semibold text-gray-500 mb-10">
                Thành công! Email đã được gửi. Vui lòng kiểm tra hộp thư đến.
                Nếu bạn gặp vấn đề gì liên hệ qua mail {''}
                <a href="#" className="link-primary fw-semibold">
                  max@keenthemes.com
                </a>
                <br />
                hoặc sử dụng tính năng hỗ trợ trên trang web của chúng tôi.
              </div>
              <div className="mb-11">
                <Link
                  to={{
                    pathname: `/login`,
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Quay trở về trang đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendMailSuccess;
