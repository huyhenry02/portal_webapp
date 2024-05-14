import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { IAssetMaintenance } from '../../../stores/types/manageAsset';
type IMaintenanceDetailComponent = {
  show?: boolean;
  onClose?: () => void;
  assetMaintenanceId: string | null;
  getAssetMaintenance: (payload: string | null) => void;
  assetMaintenanceDetail: IAssetMaintenance;
};
const MaintenanceDetailComponent: React.FC<IMaintenanceDetailComponent> = ({
  show = false,
  onClose,
  assetMaintenanceId,
  getAssetMaintenance,
  assetMaintenanceDetail,
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose();
  };
  useEffect(() => {
    setIsShow(show);
    if (assetMaintenanceId) {
      getAssetMaintenance(assetMaintenanceId);
    }
  }, [assetMaintenanceId, show]);
  return (
    <CommonModal isShow={isShow} maxWidth={'200px'}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">Phiếu {assetMaintenanceDetail?.code}</h2>
          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-kt-permissions-modal-action="close"
          >
            <i
              className="ki-outline ki-cross fs-1"
              onClick={handleCloseModal}
            ></i>
          </div>
        </div>
        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <div className="card-body p-9">
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Ngày tạo
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetMaintenanceDetail?.created_date}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Người tạo
              </label>
              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">
                  {assetMaintenanceDetail?.created_by}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Lý do
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></span>
              </label>
              <div className="col-lg-8 d-flex align-items-center">
                <span className="fw-bold fs-6 text-gray-800 me-2">
                  {assetMaintenanceDetail?.reason}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">Mô tả</label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetMaintenanceDetail?.description}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Đề xuất xử lý
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetMaintenanceDetail?.proposal}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Nguyên nhân
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetMaintenanceDetail?.causal}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Số kiểm soát
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetMaintenanceDetail?.code}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assetMaintenanceDetail: manageAsset.assetMaintenanceDetail,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getAssetMaintenance: payload =>
      dispatch({
        type: `${manageAssetActions.getAssetMaintenanceDetailPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaintenanceDetailComponent);
