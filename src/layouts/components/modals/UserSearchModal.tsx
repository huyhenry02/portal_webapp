import React from 'react';

const UserSearchModal = () => {
  return (
    <div
      className="modal fade"
      id="kt_modal_users_search"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered mw-650px">
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
              <h1 className="mb-3">Search Users</h1>
              <div className="text-muted fw-semibold fs-5">
                Invite Collaborators To Your Project
              </div>
            </div>

            <div
              id="kt_modal_users_search_handler"
              data-kt-search-keypress="true"
              data-kt-search-min-length="2"
              data-kt-search-enter="enter"
              data-kt-search-layout="inline"
            >
              <form
                data-kt-search-element="form"
                className="w-100 position-relative mb-5"
                autoComplete="off"
              >
                <input type="hidden" />

                <i className="ki-outline ki-magnifier fs-2 fs-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y"></i>

                <input
                  type="text"
                  className="form-control form-control-lg form-control-solid px-15"
                  name="search"
                  defaultValue=""
                  placeholder="Search by username, full name or email..."
                  data-kt-search-element="input"
                />

                <span
                  className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                  data-kt-search-element="spinner"
                >
                  <span className="spinner-border h-15px w-15px align-middle text-muted"></span>
                </span>

                <span
                  className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none"
                  data-kt-search-element="clear"
                >
                  <i className="ki-outline ki-cross fs-2 fs-lg-1 me-0" />
                </span>
              </form>

              <div className="py-5">
                <div data-kt-search-element="suggestions">
                  <h3 className="fw-semibold mb-5">Recently searched:</h3>

                  <div className="mh-375px scroll-y me-n7 pe-7">
                    <a
                      href="#"
                      className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1"
                    >
                      <div className="symbol symbol-35px symbol-circle me-5">
                        <img alt="Pic" src="assets/media/avatars/300-6.jpg" />
                      </div>

                      <div className="fw-semibold">
                        <span className="fs-6 text-gray-800 me-2">
                          Emma Smith
                        </span>
                        <span className="badge badge-light">Art Director</span>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1"
                    >
                      <div className="symbol symbol-35px symbol-circle me-5">
                        <span className="symbol-label bg-light-danger text-danger fw-semibold">
                          M
                        </span>
                      </div>

                      <div className="fw-semibold">
                        <span className="fs-6 text-gray-800 me-2">
                          Melody Macy
                        </span>
                        <span className="badge badge-light">
                          Marketing Analytic
                        </span>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1"
                    >
                      <div className="symbol symbol-35px symbol-circle me-5">
                        <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                      </div>

                      <div className="fw-semibold">
                        <span className="fs-6 text-gray-800 me-2">
                          Max Smith
                        </span>
                        <span className="badge badge-light">
                          Software Enginer
                        </span>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1"
                    >
                      <div className="symbol symbol-35px symbol-circle me-5">
                        <img alt="Pic" src="assets/media/avatars/300-5.jpg" />
                      </div>

                      <div className="fw-semibold">
                        <span className="fs-6 text-gray-800 me-2">
                          Sean Bean
                        </span>
                        <span className="badge badge-light">Web Developer</span>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1"
                    >
                      <div className="symbol symbol-35px symbol-circle me-5">
                        <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                      </div>

                      <div className="fw-semibold">
                        <span className="fs-6 text-gray-800 me-2">
                          Brian Cox
                        </span>
                        <span className="badge badge-light">
                          UI/UX Designer
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                <div data-kt-search-element="results" className="d-none">
                  <div className="mh-375px scroll-y me-n7 pe-7">
                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="0"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='0']"
                            value="0"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img alt="Pic" src="assets/media/avatars/300-6.jpg" />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Emma Smith
                          </a>
                          <div className="fw-semibold text-muted">
                            smith@kpmg.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="1"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='1']"
                            value="1"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-danger text-danger fw-semibold">
                            M
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Melody Macy
                          </a>
                          <div className="fw-semibold text-muted">
                            melody@altbox.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="2"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='2']"
                            value="2"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Max Smith
                          </a>
                          <div className="fw-semibold text-muted">
                            max@kt.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="3"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='3']"
                            value="3"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img alt="Pic" src="assets/media/avatars/300-5.jpg" />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Sean Bean
                          </a>
                          <div className="fw-semibold text-muted">
                            sean@dellito.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="4"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='4']"
                            value="4"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img
                            alt="Pic"
                            src="assets/media/avatars/300-25.jpg"
                          />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Brian Cox
                          </a>
                          <div className="fw-semibold text-muted">
                            brian@exchange.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="5"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='5']"
                            value="5"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-warning text-warning fw-semibold">
                            C
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Mikaela Collins
                          </a>
                          <div className="fw-semibold text-muted">
                            mik@pex.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="6"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='6']"
                            value="6"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img alt="Pic" src="assets/media/avatars/300-9.jpg" />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Francis Mitcham
                          </a>
                          <div className="fw-semibold text-muted">
                            f.mit@kpmg.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="7"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='7']"
                            value="7"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-danger text-danger fw-semibold">
                            O
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Olivia Wild
                          </a>
                          <div className="fw-semibold text-muted">
                            olivia@corpmail.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="8"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='8']"
                            value="8"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-primary text-primary fw-semibold">
                            N
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Neil Owen
                          </a>
                          <div className="fw-semibold text-muted">
                            owen.neil@gmail.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="9"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='9']"
                            value="9"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img
                            alt="Pic"
                            src="assets/media/avatars/300-23.jpg"
                          />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Dan Wilson
                          </a>
                          <div className="fw-semibold text-muted">
                            dam@consilting.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="10"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='10']"
                            value="10"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-danger text-danger fw-semibold">
                            E
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Emma Bold
                          </a>
                          <div className="fw-semibold text-muted">
                            emma@intenso.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="11"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='11']"
                            value="11"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img
                            alt="Pic"
                            src="assets/media/avatars/300-12.jpg"
                          />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Ana Crown
                          </a>
                          <div className="fw-semibold text-muted">
                            ana.cf@limtel.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="12"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='12']"
                            value="12"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-info text-info fw-semibold">
                            A
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Robert Doe
                          </a>
                          <div className="fw-semibold text-muted">
                            robert@benko.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="13"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='13']"
                            value="13"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img
                            alt="Pic"
                            src="assets/media/avatars/300-13.jpg"
                          />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            John Miller
                          </a>
                          <div className="fw-semibold text-muted">
                            miller@mapple.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="14"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='14']"
                            value="14"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <span className="symbol-label bg-light-success text-success fw-semibold">
                            L
                          </span>
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Lucy Kunic
                          </a>
                          <div className="fw-semibold text-muted">
                            lucy.m@fentech.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="15"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='15']"
                            value="15"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img
                            alt="Pic"
                            src="assets/media/avatars/300-21.jpg"
                          />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Ethan Wilder
                          </a>
                          <div className="fw-semibold text-muted">
                            ethan@loop.com.au
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-bottom border-gray-300 border-bottom-dashed"></div>

                    <div
                      className="rounded d-flex flex-stack bg-active-lighten p-4"
                      data-user-id="16"
                    >
                      <div className="d-flex align-items-center">
                        <label className="form-check form-check-custom form-check-solid me-5">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="users"
                            data-kt-check="true"
                            data-kt-check-target="[data-user-id='16']"
                            value="16"
                          />
                        </label>

                        <div className="symbol symbol-35px symbol-circle">
                          <img alt="Pic" src="assets/media/avatars/300-5.jpg" />
                        </div>

                        <div className="ms-5">
                          <a
                            href="#"
                            className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                          >
                            Sean Bean
                          </a>
                          <div className="fw-semibold text-muted">
                            sean@dellito.com
                          </div>
                        </div>
                      </div>

                      <div className="ms-2 w-100px">
                        <select
                          className="form-select form-select-solid form-select-sm"
                          data-control="select2"
                          data-hide-search="true"
                          defaultValue="1"
                        >
                          <option value="1">Guest</option>
                          <option value="2">Owner</option>
                          <option value="3">Can Edit</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-center mt-15">
                    <button
                      type="reset"
                      id="kt_modal_users_search_reset"
                      data-bs-dismiss="modal"
                      className="btn btn-active-light me-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="kt_modal_users_search_submit"
                      className="btn btn-primary"
                    >
                      Add Selected Users
                    </button>
                  </div>
                </div>

                <div
                  data-kt-search-element="empty"
                  className="text-center d-none"
                >
                  <div className="fw-semibold py-10">
                    <div className="text-gray-600 fs-3 mb-2">
                      No users found
                    </div>
                    <div className="text-muted fs-6">
                      Try to search by username, full name or email...
                    </div>
                  </div>

                  <div className="text-center px-5">
                    <img
                      src="assets/media/illustrations/sketchy-1/1.png"
                      alt=""
                      className="w-100 h-200px h-sm-325px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
