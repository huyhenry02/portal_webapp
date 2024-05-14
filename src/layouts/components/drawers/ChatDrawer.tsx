import React from 'react';

const ChatDrawer = () => {
  return (
    <div
      id="kt_drawer_chat"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="chat"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'md': '500px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_drawer_chat_toggle"
      data-kt-drawer-close="#kt_drawer_chat_close"
    >
      <div
        className="card w-100 border-0 rounded-0"
        id="kt_drawer_chat_messenger"
      >
        <div className="card-header pe-5" id="kt_drawer_chat_messenger_header">
          <div className="card-title">
            <div className="d-flex justify-content-center flex-column me-3">
              <a
                href="#"
                className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
              >
                Brian Cox
              </a>

              <div className="mb-0 lh-1">
                <span className="badge badge-success badge-circle w-10px h-10px me-1"></span>
                <span className="fs-7 fw-semibold text-muted">Active</span>
              </div>
            </div>
          </div>

          <div className="card-toolbar">
            <div className="me-0">
              <button
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
              >
                <i className="ki-outline ki-dots-square fs-2"></i>
              </button>

              <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3"
                data-kt-menu="true"
              >
                <div className="menu-item px-3">
                  <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
                    Contacts
                  </div>
                </div>

                <div className="menu-item px-3">
                  <a
                    href="#"
                    className="menu-link px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_users_search"
                  >
                    Add Contact
                  </a>
                </div>

                <div className="menu-item px-3">
                  <a
                    href="#"
                    className="menu-link flex-stack px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_invite_friends"
                  >
                    Invite Contacts
                    <span
                      className="ms-2"
                      data-bs-toggle="tooltip"
                      title="Specify a contact email to send an invitation"
                    >
                      <i className="ki-outline ki-information fs-7" />
                    </span>
                  </a>
                </div>

                <div
                  className="menu-item px-3"
                  data-kt-menu-trigger="hover"
                  data-kt-menu-placement="right-start"
                >
                  <a href="#" className="menu-link px-3">
                    <span className="menu-title">Groups</span>
                    <span className="menu-arrow"></span>
                  </a>

                  <div className="menu-sub menu-sub-dropdown w-175px py-4">
                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link px-3"
                        data-bs-toggle="tooltip"
                        title="Coming soon"
                      >
                        Create Group
                      </a>
                    </div>

                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link px-3"
                        data-bs-toggle="tooltip"
                        title="Coming soon"
                      >
                        Invite Members
                      </a>
                    </div>

                    <div className="menu-item px-3">
                      <a
                        href="#"
                        className="menu-link px-3"
                        data-bs-toggle="tooltip"
                        title="Coming soon"
                      >
                        Settings
                      </a>
                    </div>
                  </div>
                </div>

                <div className="menu-item px-3 my-1">
                  <a
                    href="#"
                    className="menu-link px-3"
                    data-bs-toggle="tooltip"
                    title="Coming soon"
                  >
                    Settings
                  </a>
                </div>
              </div>
            </div>

            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              id="kt_drawer_chat_close"
            >
              <i className="ki-outline ki-cross-square fs-2"></i>
            </div>
          </div>
        </div>

        <div className="card-body" id="kt_drawer_chat_messenger_body">
          <div
            className="scroll-y me-n5 pe-5"
            data-kt-element="messages"
            data-kt-scroll="true"
            data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body"
            data-kt-scroll-offset="0px"
          >
            <div className="d-flex justify-content-start mb-10">
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                  </div>

                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                    >
                      Brian Cox
                    </a>
                    <span className="text-muted fs-7 mb-1">2 mins</span>
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                  data-kt-element="message-text"
                >
                  How likely are you to recommend our company to your friends
                  and family ?
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mb-10">
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1">5 mins</span>
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1"
                    >
                      You
                    </a>
                  </div>

                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end"
                  data-kt-element="message-text"
                >
                  Hey there, we’re just writing to let you know that you’ve been
                  subscribed to a repository on GitHub.
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mb-10">
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                  </div>

                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                    >
                      Brian Cox
                    </a>
                    <span className="text-muted fs-7 mb-1">1 Hour</span>
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                  data-kt-element="message-text"
                >
                  Ok, Understood!
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mb-10">
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1">2 Hours</span>
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1"
                    >
                      You
                    </a>
                  </div>

                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end"
                  data-kt-element="message-text"
                >
                  You’ll receive notifications for all issues, pull requests!
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mb-10">
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                  </div>

                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                    >
                      Brian Cox
                    </a>
                    <span className="text-muted fs-7 mb-1">3 Hours</span>
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                  data-kt-element="message-text"
                >
                  You can unwatch this repository immediately by clicking here:
                  <a href="https://keenthemes.com">Keenthemes.com</a>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mb-10">
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1">4 Hours</span>
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1"
                    >
                      You
                    </a>
                  </div>

                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end"
                  data-kt-element="message-text"
                >
                  Most purchased Business courses during this sale!
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-start mb-10">
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                  </div>

                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                    >
                      Brian Cox
                    </a>
                    <span className="text-muted fs-7 mb-1">5 Hours</span>
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                  data-kt-element="message-text"
                >
                  Company BBQ to celebrate the last quater achievements and
                  goals. Food and drinks provided
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-end mb-10 d-none"
              data-kt-element="template-out"
            >
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1">Just now</span>
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary ms-1"
                    >
                      You
                    </a>
                  </div>

                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-1.jpg" />
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end"
                  data-kt-element="message-text"
                ></div>
              </div>
            </div>

            <div
              className="d-flex justify-content-start mb-10 d-none"
              data-kt-element="template-in"
            >
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol symbol-35px symbol-circle">
                    <img alt="Pic" src="assets/media/avatars/300-25.jpg" />
                  </div>

                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bold text-gray-900 text-hover-primary me-1"
                    >
                      Brian Cox
                    </a>
                    <span className="text-muted fs-7 mb-1">Just now</span>
                  </div>
                </div>

                <div
                  className="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start"
                  data-kt-element="message-text"
                >
                  Right before vacation season we have the next Big Deal for
                  you.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer pt-4" id="kt_drawer_chat_messenger_footer">
          <textarea
            className="form-control form-control-flush mb-3"
            rows={1}
            data-kt-element="input"
            placeholder="Type a message"
          ></textarea>

          <div className="d-flex flex-stack">
            <div className="d-flex align-items-center me-2">
              <button
                className="btn btn-sm btn-icon btn-active-light-primary me-1"
                type="button"
                data-bs-toggle="tooltip"
                title="Coming soon"
              >
                <i className="ki-outline ki-paper-clip fs-3"></i>
              </button>
              <button
                className="btn btn-sm btn-icon btn-active-light-primary me-1"
                type="button"
                data-bs-toggle="tooltip"
                title="Coming soon"
              >
                <i className="ki-outline ki-cloud-add fs-3"></i>
              </button>
            </div>

            <button
              className="btn btn-primary"
              type="button"
              data-kt-element="send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
