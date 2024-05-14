import React from 'react';
import { STATUS } from '../../../constants/constant';
import { useTranslation } from 'react-i18next';
const AssetDetailInfoComponent = ({ assetDetail }) => {
  const { t } = useTranslation();
  return (
    <div
      className="tab-pane fade show active"
      id="kt_asset_information"
      role="tab-panel"
    >
      <div className="d-flex flex-column gap-7 gap-lg-10">
        <div className="card card-flush py-4">
          <div
            className="card-header pe-5"
            id="kt_drawer_chat_messenger_header"
          >
            <div className="card-title">
              <div className="d-flex justify-content-center flex-column me-3">
                <a
                  href="#"
                  className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                >
                  {t('informationAsset')}
                </a>
              </div>
            </div>
          </div>
          <div className="card-body p-9">
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('nameAsset')}
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetDetail?.name}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('status')}
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {STATUS[assetDetail?.status]}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('assetCode')}
              </label>
              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">
                  {assetDetail?.code}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('manageCode')}
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></span>
              </label>
              <div className="col-lg-8 d-flex align-items-center">
                <span className="fw-bold fs-6 text-gray-800 me-2">
                  {assetDetail?.management_code}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('manageUnit')}
              </label>
              <div className="col-lg-8">
                <a
                  href="#"
                  className="fw-semibold fs-6 text-gray-800 text-hover-primary"
                >
                  {assetDetail?.management_unit}
                </a>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('originalPrice')}
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {parseInt(assetDetail?.original_price ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('residualPrice')}
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {parseInt(assetDetail?.residual_price ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                {t('insuranceContract')}
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetDetail?.insurance_contract}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetDetailInfoComponent;
