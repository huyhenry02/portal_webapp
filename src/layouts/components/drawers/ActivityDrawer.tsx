import React from 'react';

const ActivityDrawer = () => {
  return (
    <div
      id="kt_activities"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="activities"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '900px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_activities_toggle"
      data-kt-drawer-close="#kt_activities_close"
    >
      <div className="card shadow-none border-0 rounded-0">
        <div className="card-header" id="kt_activities_header">
          <h3 className="card-title fw-bold text-dark">Activity Logs</h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary me-n5"
              id="kt_activities_close"
            >
              <i className="ki-outline ki-cross fs-1"></i>
            </button>
          </div>
        </div>

        <div className="card-body position-relative" id="kt_activities_body">
          <div
            id="kt_activities_scroll"
            className="position-relative scroll-y me-n5 pe-5"
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_activities_body"
            data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer"
            data-kt-scroll-offset="5px"
          >
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-message-text-2 fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      There are 2 new tasks for you in “AirPlus Mobile App”
                      project:
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Added at 4:23 PM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Nina Nilson"
                      >
                        <img src="assets/media/avatars/300-14.jpg" alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto pb-5">
                    <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-5">
                      <a
                        href="../../demo38/dist/apps/projects/project.html"
                        className="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px"
                      >
                        Meeting with customer
                      </a>

                      <div className="min-w-175px pe-2">
                        <span className="badge badge-light text-muted">
                          Application Design
                        </span>
                      </div>

                      <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px pe-2">
                        <div className="symbol symbol-circle symbol-25px">
                          <img src="assets/media/avatars/300-2.jpg" alt="img" />
                        </div>

                        <div className="symbol symbol-circle symbol-25px">
                          <img
                            src="assets/media/avatars/300-14.jpg"
                            alt="img"
                          />
                        </div>

                        <div className="symbol symbol-circle symbol-25px">
                          <div className="symbol-label fs-8 fw-semibold bg-primary text-inverse-primary">
                            A
                          </div>
                        </div>
                      </div>

                      <div className="min-w-125px pe-2">
                        <span className="badge badge-light-primary">
                          In Progress
                        </span>
                      </div>

                      <a
                        href="../../demo38/dist/apps/projects/project.html"
                        className="btn btn-sm btn-light btn-active-light-primary"
                      >
                        View
                      </a>
                    </div>

                    <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-750px px-7 py-3 mb-0">
                      <a
                        href="../../demo38/dist/apps/projects/project.html"
                        className="fs-5 text-dark text-hover-primary fw-semibold w-375px min-w-200px"
                      >
                        Project Delivery Preparation
                      </a>

                      <div className="min-w-175px">
                        <span className="badge badge-light text-muted">
                          CRM System Development
                        </span>
                      </div>

                      <div className="symbol-group symbol-hover flex-nowrap flex-grow-1 min-w-100px">
                        <div className="symbol symbol-circle symbol-25px">
                          <img
                            src="assets/media/avatars/300-20.jpg"
                            alt="img"
                          />
                        </div>

                        <div className="symbol symbol-circle symbol-25px">
                          <div className="symbol-label fs-8 fw-semibold bg-success text-inverse-primary">
                            B
                          </div>
                        </div>
                      </div>

                      <div className="min-w-125px">
                        <span className="badge badge-light-success">
                          Completed
                        </span>
                      </div>

                      <a
                        href="../../demo38/dist/apps/projects/project.html"
                        className="btn btn-sm btn-light btn-active-light-primary"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-flag fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n2">
                  <div className="overflow-auto pe-3">
                    <div className="fs-5 fw-semibold mb-2">
                      Invitation for crafting engaging designs that speak human
                      workshop
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Sent at 4:23 PM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Alan Nilson"
                      >
                        <img src="assets/media/avatars/300-1.jpg" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-disconnect fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="mb-5 pe-3">
                    <a
                      href="#"
                      className="fs-5 fw-semibold text-gray-800 text-hover-primary mb-2"
                    >
                      3 New Incoming Project Files:
                    </a>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Sent at 10:30 PM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Jan Hummer"
                      >
                        <img src="assets/media/avatars/300-23.jpg" alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto pb-5">
                    <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-5">
                      <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                        <img
                          alt=""
                          className="w-30px me-3"
                          src="assets/media/svg/files/pdf.svg"
                        />

                        <div className="ms-1 fw-semibold">
                          <a
                            href="../../demo38/dist/apps/projects/project.html"
                            className="fs-6 text-hover-primary fw-bold"
                          >
                            Finance KPI App Guidelines
                          </a>

                          <div className="text-gray-400">1.9mb</div>
                        </div>
                      </div>

                      <div className="d-flex flex-aligns-center pe-10 pe-lg-20">
                        <img
                          alt="../../demo38/dist/apps/projects/project.html"
                          className="w-30px me-3"
                          src="assets/media/svg/files/doc.svg"
                        />

                        <div className="ms-1 fw-semibold">
                          <a
                            href="#"
                            className="fs-6 text-hover-primary fw-bold"
                          >
                            Client UAT Testing Results
                          </a>

                          <div className="text-gray-400">18kb</div>
                        </div>
                      </div>

                      <div className="d-flex flex-aligns-center">
                        <img
                          alt="../../demo38/dist/apps/projects/project.html"
                          className="w-30px me-3"
                          src="assets/media/svg/files/css.svg"
                        />

                        <div className="ms-1 fw-semibold">
                          <a
                            href="#"
                            className="fs-6 text-hover-primary fw-bold"
                          >
                            Finance Reports
                          </a>

                          <div className="text-gray-400">20mb</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-abstract-26 fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      Task
                      <a href="#" className="text-primary fw-bold me-1">
                        #45890
                      </a>
                      merged with
                      <a href="#" className="text-primary fw-bold me-1">
                        #45890
                      </a>
                      in “Ads Pro Admin Dashboard project:
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Initiated at 4:23 PM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Nina Nilson"
                      >
                        <img src="assets/media/avatars/300-14.jpg" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-pencil fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      3 new application design concepts added:
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Created at 4:23 PM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Marcus Dotson"
                      >
                        <img src="assets/media/avatars/300-2.jpg" alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto pb-5">
                    <div className="d-flex align-items-center border border-dashed border-gray-300 rounded min-w-700px p-7">
                      <div className="overlay me-10">
                        <div className="overlay-wrapper">
                          <img
                            alt="img"
                            className="rounded w-150px"
                            src="assets/media/stock/600x400/img-29.jpg"
                          />
                        </div>

                        <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                          <a
                            href="#"
                            className="btn btn-sm btn-primary btn-shadow"
                          >
                            Explore
                          </a>
                        </div>
                      </div>

                      <div className="overlay me-10">
                        <div className="overlay-wrapper">
                          <img
                            alt="img"
                            className="rounded w-150px"
                            src="assets/media/stock/600x400/img-31.jpg"
                          />
                        </div>

                        <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                          <a
                            href="#"
                            className="btn btn-sm btn-primary btn-shadow"
                          >
                            Explore
                          </a>
                        </div>
                      </div>

                      <div className="overlay">
                        <div className="overlay-wrapper">
                          <img
                            alt="img"
                            className="rounded w-150px"
                            src="assets/media/stock/600x400/img-40.jpg"
                          />
                        </div>

                        <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                          <a
                            href="#"
                            className="btn btn-sm btn-primary btn-shadow"
                          >
                            Explore
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-sms fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      New case
                      <a href="#" className="text-primary fw-bold me-1">
                        #67890
                      </a>
                      is assigned to you in Multi-platform Database Design
                      project
                    </div>

                    <div className="overflow-auto pb-5">
                      <div className="d-flex align-items-center mt-1 fs-6">
                        <div className="text-muted me-2 fs-7">
                          Added at 4:23 PM by
                        </div>

                        <a href="#" className="text-primary fw-bold me-1">
                          Alice Tan
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-pencil fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mb-10 mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      You have received a new order:
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Placed at 5:05 AM by
                      </div>

                      <div
                        className="symbol symbol-circle symbol-25px"
                        data-bs-toggle="tooltip"
                        data-bs-boundary="window"
                        data-bs-placement="top"
                        title="Robert Rich"
                      >
                        <img src="assets/media/avatars/300-4.jpg" alt="img" />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-auto pb-5">
                    <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed min-w-lg-600px flex-shrink-0 p-6">
                      <i className="ki-outline ki-devices-2 fs-2tx text-primary me-4"></i>

                      <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                        <div className="mb-3 mb-md-0 fw-semibold">
                          <h4 className="text-gray-900 fw-bold">
                            Database Backup Process Completed!
                          </h4>
                          <div className="fs-6 text-gray-700 pe-7">
                            Login into Admin Dashboard to make sure the data
                            integrity is OK
                          </div>
                        </div>

                        <a
                          href="#"
                          className="btn btn-primary px-6 align-self-center text-nowrap"
                        >
                          Proceed
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-line w-40px"></div>

                <div className="timeline-icon symbol symbol-circle symbol-40px">
                  <div className="symbol-label bg-light">
                    <i className="ki-outline ki-basket fs-2 text-gray-500"></i>
                  </div>
                </div>

                <div className="timeline-content mt-n1">
                  <div className="pe-3 mb-5">
                    <div className="fs-5 fw-semibold mb-2">
                      New order
                      <a href="#" className="text-primary fw-bold me-1">
                        #67890
                      </a>
                      is placed for Workshow Planning & Budget Estimation
                    </div>

                    <div className="d-flex align-items-center mt-1 fs-6">
                      <div className="text-muted me-2 fs-7">
                        Placed at 4:23 PM by
                      </div>

                      <a href="#" className="text-primary fw-bold me-1">
                        Jimmy Bold
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer py-5 text-center" id="kt_activities_footer">
          <a
            href="../../demo38/dist/pages/user-profile/activity.html"
            className="btn btn-bg-body text-primary"
          >
            View All Activities
            <i className="ki-outline ki-arrow-right fs-3 text-primary"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityDrawer;
