import React from 'react';

const CardAnalystStyleFour = () => {
  return (
    <div className="card card-flush h-md-50 mb-xl-10">
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">6.3k</span>

          <span className="text-gray-400 pt-1 fw-semibold fs-6">
            Total New Customers
          </span>
        </div>
      </div>

      <div className="card-body d-flex flex-column justify-content-end pe-0">
        <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
          Today’s Heroes
        </span>

        <div className="symbol-group symbol-hover flex-nowrap">
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Alan Warden"
          >
            <span className="symbol-label bg-warning text-inverse-warning fw-bold">
              A
            </span>
          </div>
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Michael Eberon"
          >
            <img alt="Pic" src="assets/media/avatars/300-11.jpg" />
          </div>
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Susan Redwood"
          >
            <span className="symbol-label bg-primary text-inverse-primary fw-bold">
              S
            </span>
          </div>
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Melody Macy"
          >
            <img alt="Pic" src="assets/media/avatars/300-2.jpg" />
          </div>
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Perry Matthew"
          >
            <span className="symbol-label bg-danger text-inverse-danger fw-bold">
              P
            </span>
          </div>
          <div
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            title="Barry Walter"
          >
            <img alt="Pic" src="assets/media/avatars/300-12.jpg" />
          </div>
          <a
            href="#"
            className="symbol symbol-35px symbol-circle"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_view_users"
          >
            <span className="symbol-label bg-light text-gray-400 fs-8 fw-bold">
              +42
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardAnalystStyleFour;
