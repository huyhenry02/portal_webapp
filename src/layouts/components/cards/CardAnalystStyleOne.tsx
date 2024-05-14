import React from 'react';

const CardAnalystStyleOne = () => {
  return (
    <div className="card overflow-hidden h-md-50 mb-5 mb-xl-10">
      <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
        <div className="mb-4 px-9">
          <div className="d-flex align-items-center mb-2">
            <span className="fs-4 fw-semibold text-gray-400 align-self-start me-1&gt;">
              $
            </span>

            <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1">
              69,700
            </span>

            <span className="badge badge-light-success fs-base">
              <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
              2.2%
            </span>
          </div>

          <span className="fs-6 fw-semibold text-gray-400">
            Total Online Sales
          </span>
        </div>

        <div
          id="kt_card_widget_8_chart"
          className="min-h-auto"
          style={{ height: '125px' }}
        ></div>
      </div>
    </div>
  );
};

export default CardAnalystStyleOne;
