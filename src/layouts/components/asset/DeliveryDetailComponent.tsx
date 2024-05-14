import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { IAssetDelivery } from '../../../stores/types/manageAsset';
type IDeliveryDetailComponent = {
  show?: boolean;
  onClose?: () => void;
  assetDeliveryId: string | null;
  getAssetDelivery: (payload: string | null) => void;
  assetDeliveryDetail: IAssetDelivery;
};
const DeliveryDetailComponent: React.FC<IDeliveryDetailComponent> = ({
  show = false,
  onClose,
  assetDeliveryId,
  getAssetDelivery,
  assetDeliveryDetail,
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose();
  };
  useEffect(() => {
    setIsShow(show);
    if (assetDeliveryId) {
      getAssetDelivery(assetDeliveryId);
    }
  }, [assetDeliveryId, show]);
  return (
    <CommonModal isShow={isShow} maxWidth={'200px'}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">Phiếu {assetDeliveryDetail?.code}</h2>
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
                  {assetDeliveryDetail?.created_date}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Người nhận
              </label>
              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">
                  {assetDeliveryDetail?.receiver}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Người tạo phiếu
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Phone number must be active"
                ></span>
              </label>
              <div className="col-lg-8 d-flex align-items-center">
                <span className="fw-bold fs-6 text-gray-800 me-2">
                  {assetDeliveryDetail?.deliver}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Lý do giao nhận
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetDeliveryDetail?.reason}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Địa điểm sử dụng
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetDeliveryDetail?.place_of_use}
                </span>
              </div>
            </div>
            <div className="row mb-7">
              <label className="col-lg-4 fw-semibold text-muted">
                Tài liệu kèm theo
                <span
                  className="ms-1"
                  data-bs-toggle="tooltip"
                  title="Country of origination"
                ></span>
              </label>
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {assetDeliveryDetail?.attachments}
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
                  {assetDeliveryDetail?.code}
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
  assetDeliveryDetail: manageAsset.assetDeliveryDetail,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getAssetDelivery: payload =>
      dispatch({
        type: `${manageAssetActions.getAssetDeliveryDetailPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryDetailComponent);
