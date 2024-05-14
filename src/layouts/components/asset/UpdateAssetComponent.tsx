import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import {
  IAssetDetail,
  IInfoAssetUpdate,
} from '../../../stores/types/manageAsset';
import InputFile from '../forms/InputFile';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { CollectionConstants } from '../../../stores/types/createProfile';
import { cloneDeep, map, set, unset } from 'lodash';
import { DEFAULT_PER_PAGE } from '../../../constants/constant';
import { useTranslation } from 'react-i18next';

const statuses = [
  { value: '0', label: 'Chọn trạng thái' },
  { value: 'active', label: 'Kích hoạt' },
  { value: 'inactive', label: 'Không kích hoạt' },
];
type IUpdateAssetComponent = {
  show?: boolean;
  onClose?: (submitSuccess?: boolean) => void;
  assetId?: string | null;
  assetDetail: IAssetDetail;
  updateAsset: (payload: {
    infoAsset: IInfoAssetUpdate;
    asset_id: string;
  }) => void;
  getListAsset: (payload: {
    perPage: number;
    page: string | number | undefined;
  }) => void;
  getAssetDetail: (id: string) => void;
  currentPage?: string | number;
  resetAsset;
};
const UpdateAssetComponent: React.FC<IUpdateAssetComponent> = ({
  show = false,
  onClose,
  assetId,
  assetDetail,
  updateAsset,
  getListAsset,
  getAssetDetail,
  resetAsset,
  currentPage,
}) => {
  const MEDIA = ['asset_images'];
  const [isShow, setIsShow] = useState(false);
  const [infoAsset, setInfoAsset] = useState<IInfoAssetUpdate>(
    assetDetail || {},
  );

  const handleInputNumber = (number: string): string => {
    let value = number.replace(/[^0-9]/g, '');
    value = value.slice(0, 15);
    return value;
  };
  const handleChangeData = (
    col: string,
    val: string | Date | number | boolean | undefined | null,
  ) => {
    if (
      (col == 'original_price' || col == 'residual_price') &&
      typeof val === 'string'
    ) {
      val = handleInputNumber(val);
    }
    const newInfoAsset = {
      ...infoAsset,
      [col]: val,
    };
    set(newInfoAsset, `${col}`, val);
    setInfoAsset(newInfoAsset);
  };
  const handleCloseModal = () => {
    setIsShow(false);
    onClose && onClose(true);
    return () => {
      resetAsset(undefined);
    };
  };
  const handleUpdateAssetFile = (col: string, id: string, files) => {
    if (MEDIA.includes(col)) {
      const newInfoAsset = cloneDeep(infoAsset);
      set(newInfoAsset, `${col}`, files);
      set(newInfoAsset, `media.new.${col}`, id);
      setInfoAsset(newInfoAsset);
    }
  };

  const handleRemoveAssetFile = (col: string, id: string) => {
    if (MEDIA.includes(col)) {
      const newInfoAsset = cloneDeep(infoAsset);
      unset(newInfoAsset, `${col}`);
      set(newInfoAsset, `media.delete.${col}`, id);
      setInfoAsset(newInfoAsset);
    }
  };
  const handleSubmit = () => {
    updateAsset({
      infoAsset: infoAsset,
      asset_id: assetId ?? '',
    });
    getListAsset({
      perPage: DEFAULT_PER_PAGE,
      page: currentPage,
    });
    handleCloseModal();
  };
  useEffect(() => {
    if (assetId) {
      getAssetDetail(assetId);
      setInfoAsset(assetDetail);
    }
  }, [assetId]);
  useEffect(() => {
    setIsShow(show);
  }, [show]);
  useEffect(() => {
    if (assetDetail) {
      setInfoAsset(assetDetail);
    }
  }, [assetDetail]);
  const { t } = useTranslation();

  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">
            {t('editAsset')} {infoAsset?.code}
          </h2>
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
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('nameAsset')}
              </label>
              <input
                type="text"
                className="form form-control"
                value={infoAsset?.name || ''}
                onChange={e => handleChangeData('name', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('manageCode')}
              </label>
              <input
                type="text"
                className="form form-control"
                value={infoAsset?.management_code || ''}
                onChange={e =>
                  handleChangeData('management_code', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('manageUnit')}
              </label>
              <input
                type="text"
                className="form form-control"
                value={infoAsset?.management_unit || ''}
                onChange={e =>
                  handleChangeData('management_unit', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('originalPrice')}
              </label>
              <input
                type="text"
                className="form form-control"
                maxLength={15}
                value={infoAsset?.original_price || ''}
                onChange={e =>
                  handleChangeData('original_price', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('residualPrice')}
              </label>
              <input
                type="text"
                className="form form-control"
                maxLength={15}
                value={infoAsset?.residual_price || ''}
                onChange={e =>
                  handleChangeData('residual_price', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('insuranceContract')}
              </label>
              <input
                type="text"
                className="form form-control"
                value={infoAsset?.insurance_contract || ''}
                onChange={e =>
                  handleChangeData('insurance_contract', e.target.value)
                }
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('selectStatus')}
              </label>
              <select
                className="form-select form-select-solid"
                data-control="select2"
                data-hide-search="true"
                data-placeholder="Chọn trạng thái"
                name="status"
                value={infoAsset?.status || ''}
                onChange={e => handleChangeData('status', e.target.value)}
              >
                {map(statuses, (statusItem, idx) => (
                  <option value={statusItem.value} key={idx}>
                    {statusItem.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('image')}
              </label>
              <InputFile
                name={CollectionConstants.ASSET_IMAGES}
                value={infoAsset?.asset_images || []}
                onChange={files => handleChangeData('asset_images', files)}
                onRemoveFile={id => handleRemoveAssetFile('asset_images', id)}
                onUpdateFile={(id, files) =>
                  handleUpdateAssetFile('asset_images', id, files)
                }
              />
            </div>
          </div>
          <div className="text-center pt-15">
            <button
              type="reset"
              className="btn btn-bg-secondary me-3"
              onClick={handleCloseModal}
            >
              {t('rejected')}
            </button>
            <button
              className="btn btn-danger me-3"
              onClick={() => handleSubmit()}
            >
              <span className="indicator-label">{t('confirm')}</span>
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  assetDetail: manageAsset.assetDetail,
  isLoading: manageAsset.isLoading,
  isError: manageAsset.isError,
  message: manageAsset.message,
});

const mapDispatchToProps = dispatch => ({
  updateAsset: payload =>
    dispatch({
      type: `${manageAssetActions.updateAssetPending.type}_saga`,
      payload,
    }),
  getAssetDetail: id =>
    dispatch({
      type: `${manageAssetActions.getAssetDetailPending.type}_saga`,
      payload: { id },
    }),
  getListAsset: payload =>
    dispatch({
      type: `${manageAssetActions.getListAssetPending.type}_saga`,
      payload,
    }),
  resetAsset: payload =>
    dispatch({
      type: `${manageAssetActions.resetAssetDetail.type}_saga`,
      payload,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateAssetComponent);
