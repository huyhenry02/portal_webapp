import React from 'react';

const CardQuestionStyleOne = () => {
  return (
    <div className="card h-md-100" dir="ltr">
      <div className="card-body d-flex flex-column flex-center">
        <div className="mb-2">
          <h1 className="fw-semibold text-gray-800 text-center lh-lg">
            Have you tried
            <br />
            new
            <span className="fw-bolder">Invoice Manager ?</span>
          </h1>

          <div className="py-10 text-center">
            <img
              src="assets/media/svg/illustrations/easy/2.svg"
              className="theme-light-show w-200px"
              alt=""
            />
            <img
              src="assets/media/svg/illustrations/easy/2-dark.svg"
              className="theme-dark-show w-200px"
              alt=""
            />
          </div>
        </div>

        <div className="text-center mb-1">
          <a
            className="btn btn-sm btn-primary me-2"
            href="../../demo38/dist/apps/ecommerce/customers/listing.html"
          >
            Try now
          </a>

          <a
            className="btn btn-sm btn-light"
            href="../../demo38/dist/apps/invoices/view/invoice-1.html"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardQuestionStyleOne;
