import React from 'react';

const ViewUserModal = () => {
  return (
    <div
      className="modal fade"
      id="kt_modal_view_users"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog mw-650px">
        <div className="modal-content">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <i className="ki-outline ki-cross fs-1"></i>
            </div>
          </div>

          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
            <div className="text-center mb-13">
              <h1 className="mb-3">Browse Users</h1>

              <div className="text-muted fw-semibold fs-5">
                If you need more info, please check out our
                <a href="#" className="link-primary fw-bold">
                  Users Directory
                </a>
                .
              </div>
            </div>

            <div className="mb-15">
              <div className="mh-375px scroll-y me-n7 pe-7">
                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-6.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Emma Smith
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Art Director
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        smith@kpmg.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$23,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-danger text-danger fw-semibold">
                        M
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Melody Macy
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Marketing Analytic
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        melody@altbox.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$50,500</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Max Smith
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Software Enginer
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">max@kt.com</div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$75,900</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-5.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Sean Bean
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Web Developer
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        sean@dellito.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$10,500</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Brian Cox
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          UI/UX Designer
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        brian@exchange.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$20,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-warning text-warning fw-semibold">
                        C
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Mikaela Collins
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Head Of Marketing
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">mik@pex.com</div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$9,300</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-9.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Francis Mitcham
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Software Arcitect
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        f.mit@kpmg.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$15,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-danger text-danger fw-semibold">
                        O
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Olivia Wild
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          System Admin
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        olivia@corpmail.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$23,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-primary text-primary fw-semibold">
                        N
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Neil Owen
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Account Manager
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        owen.neil@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$45,800</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-23.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Dan Wilson
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Web Desinger
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        dam@consilting.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$90,500</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-danger text-danger fw-semibold">
                        E
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Emma Bold
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Corporate Finance
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        emma@intenso.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$5,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <img alt="Pic" src="assets/media/avatars/300-12.jpg" />
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Ana Crown
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Customer Relationship
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        ana.cf@limtel.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$70,000</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-stack py-5">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-35px symbol-circle">
                      <span className="symbol-label bg-light-info text-info fw-semibold">
                        A
                      </span>
                    </div>

                    <div className="ms-6">
                      <a
                        href="#"
                        className="d-flex align-items-center fs-5 fw-bold text-dark text-hover-primary"
                      >
                        Robert Doe
                        <span className="badge badge-light fs-8 fw-semibold ms-2">
                          Marketing Executive
                        </span>
                      </a>

                      <div className="fw-semibold text-muted">
                        robert@benko.com
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="text-end">
                      <div className="fs-5 fw-bold text-dark">$45,500</div>
                      <div className="fs-7 text-muted">Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="fw-semibold">
                <label className="fs-6">Adding Users by Team Members</label>
                <div className="fs-7 text-muted">
                  If you need more info, please check budget planning
                </div>
              </div>

              <label className="form-check form-switch form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  defaultChecked={true}
                />
                <span className="form-check-label fw-semibold text-muted">
                  Allowed
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
