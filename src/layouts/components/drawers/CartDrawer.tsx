import React from 'react';

const CartDrawer = () => {
  return (
    <div
      id="kt_shopping_cart"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="cart"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'md': '500px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_drawer_shopping_cart_toggle"
      data-kt-drawer-close="#kt_drawer_shopping_cart_close"
    >
      <div className="card card-flush w-100 rounded-0">
        <div className="card-header">
          <h3 className="card-title text-gray-900 fw-bold">Shopping Cart</h3>

          <div className="card-toolbar">
            <div
              className="btn btn-sm btn-icon btn-active-light-primary"
              id="kt_drawer_shopping_cart_close"
            >
              <i className="ki-outline ki-cross fs-2"></i>
            </div>
          </div>
        </div>

        <div className="card-body hover-scroll-overlay-y h-400px pt-5">
          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  Iblender
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  The best kitchen gadget in 2022
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 350</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">5</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-1.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  SmartCleaner
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Smart tool for cooking
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 650</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">4</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-3.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  CameraMaxr
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Professional camera for edge
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 150</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">3</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-8.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  $D Printer
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Manfactoring unique objekts
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 1450</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">7</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-26.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  MotionWire
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Perfect animation tool
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 650</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">7</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-21.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  Samsung
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Profile info,Timeline etc
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 720</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">6</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-34.jpg" alt="" />
            </div>
          </div>

          <div className="separator separator-dashed my-6"></div>

          <div className="d-flex flex-stack">
            <div className="d-flex flex-column me-3">
              <div className="mb-3">
                <a
                  href="../../demo38/dist/apps/ecommerce/sales/details.html"
                  className="text-gray-800 text-hover-primary fs-4 fw-bold"
                >
                  $D Printer
                </a>
                <span className="text-gray-400 fw-semibold d-block">
                  Manfactoring unique objekts
                </span>
              </div>

              <div className="d-flex align-items-center">
                <span className="fw-bold text-gray-800 fs-5">$ 430</span>
                <span className="text-muted mx-2">for</span>
                <span className="fw-bold text-gray-800 fs-5 me-3">8</span>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon-success btn-icon w-25px h-25px me-2"
                >
                  <i className="ki-outline ki-minus fs-4"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-light-success btn-icon w-25px h-25px"
                >
                  <i className="ki-outline ki-plus fs-4"></i>
                </a>
              </div>
            </div>

            <div className="symbol symbol-70px symbol-2by3 flex-shrink-0">
              <img src="assets/media/stock/600x400/img-27.jpg" alt="" />
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="d-flex flex-stack">
            <span className="fw-bold text-gray-600">Total</span>
            <span className="text-gray-800 fw-bolder fs-5">$ 1840.00</span>
          </div>

          <div className="d-flex flex-stack">
            <span className="fw-bold text-gray-600">Sub total</span>
            <span className="text-primary fw-bolder fs-5">$ 246.35</span>
          </div>

          <div className="d-flex justify-content-end mt-9">
            <a href="#" className="btn btn-primary d-flex justify-content-end">
              Pleace Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
