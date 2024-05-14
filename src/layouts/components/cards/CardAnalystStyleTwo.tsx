import React from 'react';

const CardAnalystStyleTwo = () => {
  return (
    <div className="card card-flush h-md-50 mb-xl-10">
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
              1,836
            </span>

            <span className="badge badge-light-danger fs-base">
              <i className="ki-outline ki-arrow-down fs-5 text-danger ms-n1"></i>
              2.2%
            </span>
          </div>

          <span className="text-gray-400 pt-1 fw-semibold fs-6">
            Total Sales
          </span>
        </div>
      </div>

      <div className="card-body d-flex align-items-end pt-0">
        <div className="d-flex align-items-center flex-column mt-3 w-100">
          <div className="d-flex justify-content-between w-100 mt-auto mb-2">
            <span className="fw-bolder fs-6 text-dark">1,048 to Goal</span>
            <span className="fw-bold fs-6 text-gray-400">62%</span>
          </div>
          <div className="h-8px mx-3 w-100 bg-light-success rounded">
            <div
              className="bg-success rounded h-8px"
              role="progressbar"
              style={{ width: '62%' }}
              aria-valuenow={50}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnalystStyleTwo;
