import React from 'react';

const CardAnalystStyleThree = () => {
  return (
    <div className="card overflow-hidden h-md-50 mb-5 mb-xl-10">
      <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
        <div className="mb-4 px-9">
          <div className="d-flex align-items-center mb-2">
            <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1">
              29,420
            </span>

            <span className="badge badge-light-success fs-base">
              <i className="ki-outline ki-arrow-up fs-5 text-success ms-n1"></i>
              2.6%
            </span>
          </div>

          <span className="fs-6 fw-semibold text-gray-400">
            Total Online Visitors
          </span>
        </div>

        <div
          id="kt_card_widget_9_chart"
          className="min-h-auto"
          style={{ height: '125px' }}
        ></div>
      </div>
    </div>
  );
};

export default CardAnalystStyleThree;
