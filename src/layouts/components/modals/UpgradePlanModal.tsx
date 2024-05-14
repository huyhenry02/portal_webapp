import React from 'react';

const UpgradePlanModal = () => {
  return (
    <div
      className="modal fade"
      id="kt_modal_upgrade_plan"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header justify-content-end border-0 pb-0">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <i className="ki-outline ki-cross fs-1"></i>
            </div>
          </div>

          <div className="modal-body pt-0 pb-15 px-5 px-xl-20">
            <div className="mb-13 text-center">
              <h1 className="mb-3">Upgrade a Plan</h1>
              <div className="text-muted fw-semibold fs-5">
                If you need more info, please check
                <a href="#" className="link-primary fw-bold">
                  Pricing Guidelines
                </a>
                .
              </div>
            </div>

            <div className="d-flex flex-column">
              <div
                className="nav-group nav-group-outline mx-auto"
                data-kt-buttons="true"
              >
                <button
                  className="btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2 active"
                  data-kt-plan="month"
                >
                  Monthly
                </button>
                <button
                  className="btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3"
                  data-kt-plan="annual"
                >
                  Annual
                </button>
              </div>

              <div className="row mt-10">
                <div className="col-lg-6 mb-10 mb-lg-0">
                  <div className="nav flex-column">
                    <label
                      className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 active mb-6"
                      data-bs-toggle="tab"
                      data-bs-target="#kt_upgrade_plan_startup"
                    >
                      <div className="d-flex align-items-center me-2">
                        <div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="plan"
                            defaultChecked={true}
                            value="startup"
                          />
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center fs-2 fw-bold flex-wrap">
                            Startup
                          </div>
                          <div className="fw-semibold opacity-75">
                            Best for startups
                          </div>
                        </div>
                      </div>

                      <div className="ms-5">
                        <span className="mb-2">$</span>
                        <span
                          className="fs-3x fw-bold"
                          data-kt-plan-price-month="39"
                          data-kt-plan-price-annual="399"
                        >
                          39
                        </span>
                        <span className="fs-7 opacity-50">
                          /<span data-kt-element="period">Mon</span>
                        </span>
                      </div>
                    </label>

                    <label
                      className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6"
                      data-bs-toggle="tab"
                      data-bs-target="#kt_upgrade_plan_advanced"
                    >
                      <div className="d-flex align-items-center me-2">
                        <div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="plan"
                            value="advanced"
                          />
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center fs-2 fw-bold flex-wrap">
                            Advanced
                          </div>
                          <div className="fw-semibold opacity-75">
                            Best for 100+ team size
                          </div>
                        </div>
                      </div>

                      <div className="ms-5">
                        <span className="mb-2">$</span>
                        <span
                          className="fs-3x fw-bold"
                          data-kt-plan-price-month="339"
                          data-kt-plan-price-annual="3399"
                        >
                          339
                        </span>
                        <span className="fs-7 opacity-50">
                          /<span data-kt-element="period">Mon</span>
                        </span>
                      </div>
                    </label>

                    <label
                      className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6"
                      data-bs-toggle="tab"
                      data-bs-target="#kt_upgrade_plan_enterprise"
                    >
                      <div className="d-flex align-items-center me-2">
                        <div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="plan"
                            value="enterprise"
                          />
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center fs-2 fw-bold flex-wrap">
                            Enterprise
                            <span className="badge badge-light-success ms-2 py-2 px-3 fs-7">
                              Popular
                            </span>
                          </div>
                          <div className="fw-semibold opacity-75">
                            Best value for 1000+ team
                          </div>
                        </div>
                      </div>

                      <div className="ms-5">
                        <span className="mb-2">$</span>
                        <span
                          className="fs-3x fw-bold"
                          data-kt-plan-price-month="999"
                          data-kt-plan-price-annual="9999"
                        >
                          999
                        </span>
                        <span className="fs-7 opacity-50">
                          /<span data-kt-element="period">Mon</span>
                        </span>
                      </div>
                    </label>

                    <label
                      className="nav-link btn btn-outline btn-outline-dashed btn-color-dark btn-active btn-active-primary d-flex flex-stack text-start p-6 mb-6"
                      data-bs-toggle="tab"
                      data-bs-target="#kt_upgrade_plan_custom"
                    >
                      <div className="d-flex align-items-center me-2">
                        <div className="form-check form-check-custom form-check-solid form-check-success flex-shrink-0 me-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="plan"
                            value="custom"
                          />
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center fs-2 fw-bold flex-wrap">
                            Custom
                          </div>
                          <div className="fw-semibold opacity-75">
                            Requet a custom license
                          </div>
                        </div>
                      </div>

                      <div className="ms-5">
                        <a href="#" className="btn btn-sm btn-success">
                          Contact Us
                        </a>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="tab-content rounded h-100 bg-light p-10">
                    <div
                      className="tab-pane fade show active"
                      id="kt_upgrade_plan_startup"
                    >
                      <div className="pb-5">
                        <h2 className="fw-bold text-dark">
                          What’s in Startup Plan?
                        </h2>
                        <div className="text-muted fw-semibold">
                          Optimal for 10+ team size and new startup
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 10 Active Users
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 30 Project Integrations
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Analytics Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Finance Module
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Accounting Module
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Network Platform
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>

                        <div className="d-flex align-items-center">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Unlimited Cloud Space
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="kt_upgrade_plan_advanced"
                    >
                      <div className="pb-5">
                        <h2 className="fw-bold text-dark">
                          What’s in Startup Plan?
                        </h2>
                        <div className="text-muted fw-semibold">
                          Optimal for 100+ team size and grown company
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 10 Active Users
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 30 Project Integrations
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Analytics Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Finance Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Accounting Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Network Platform
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>

                        <div className="d-flex align-items-center">
                          <span className="fw-semibold fs-5 text-muted flex-grow-1">
                            Unlimited Cloud Space
                          </span>
                          <i className="ki-outline ki-cross-circle fs-1"></i>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="kt_upgrade_plan_enterprise"
                    >
                      <div className="pb-5">
                        <h2 className="fw-bold text-dark">
                          What’s in Startup Plan?
                        </h2>
                        <div className="text-muted fw-semibold">
                          Optimal for 1000+ team and enterpise
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 10 Active Users
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Up to 30 Project Integrations
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Analytics Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Finance Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Accounting Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Network Platform
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Unlimited Cloud Space
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="kt_upgrade_plan_custom">
                      <div className="pb-5">
                        <h2 className="fw-bold text-dark">
                          What’s in Startup Plan?
                        </h2>
                        <div className="text-muted fw-semibold">
                          Optimal for corporations
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Unlimited Users
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Unlimited Project Integrations
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Analytics Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Finance Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Accounting Module
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center mb-7">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Network Platform
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>

                        <div className="d-flex align-items-center">
                          <span className="fw-semibold fs-5 text-gray-700 flex-grow-1">
                            Unlimited Cloud Space
                          </span>
                          <i className="ki-outline ki-check-circle fs-1 text-success"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-center flex-row-fluid pt-12">
              <button
                type="reset"
                className="btn btn-light me-3"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="kt_modal_upgrade_plan_btn"
              >
                <span className="indicator-label">Upgrade Plan</span>

                <span className="indicator-progress">
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanModal;
