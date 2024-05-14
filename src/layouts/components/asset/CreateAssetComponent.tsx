import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { CollectionConstants } from '../../../stores/types/createProfile';
import InputFile from '../forms/InputFile';
import { IFileInfo } from '../../../stores/types';
import isNumeric from 'antd/es/_util/isNumeric';
import { useTranslation } from 'react-i18next';

type ICreateAssetComponent = {
  show?: boolean;
  onClose?: (submitSuccess?: boolean) => void;
  createAsset: (payload: {
    name: string;
    management_code: string;
    management_unit: string;
    insurance_contract: string;
    status: string;
    original_price: string;
    residual_price: string;
    asset_images?: IFileInfo[];
  }) => void;
  getListAsset: (payload: {
    perPage: number;
    page: string | number | undefined;
  }) => void;
};
const CreateAssetComponent: React.FC<ICreateAssetComponent> = ({
  show = false,
  onClose,
  createAsset,
  getListAsset,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    management_code: '',
    management_unit: '',
    insurance_contract: '',
    status: '',
    original_price: '',
    residual_price: '',
    asset_images: [],
  });
  const [errors, setErrors] = useState({});
  const handleResetFormData = () => {
    setFormData({
      name: '',
      management_code: '',
      management_unit: '',
      insurance_contract: '',
      status: '',
      original_price: '',
      residual_price: '',
      asset_images: [],
    });
    setErrors({});
  };
  const handleCloseModal = () => {
    setIsShow(false);
    handleResetFormData();
    getListAsset({ perPage: 10, page: 1 });
    onClose && onClose();
  };
  const checkValid = () => {
    const newErrors = {
      name: !formData.name && 'Tên thiết bị không được để trống',
      management_code:
        !formData.management_code && 'Mã quản lý không được để trống',
      management_unit:
        !formData.management_unit && 'Đơn vị quản lý không được để trống',
      insurance_contract:
        !formData.insurance_contract && 'Hợp đồng bảo hiểm không được để trống',
      original_price: !formData.original_price
        ? 'Giá thực tế không được để trống'
        : !isNumeric(formData.original_price)
          ? 'Giá thực tế phải là số'
          : undefined,
      residual_price: !formData.residual_price
        ? 'Gá dư không được để trống'
        : !isNumeric(formData.residual_price)
          ? 'Giá dư phải là số'
          : undefined,
      asset_images:
        !formData.asset_images && 'Ảnh thiết bị không được để trống',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };
  const handleChangeData = (col: string, val: string | number) => {
    setFormData({
      ...formData,
      [col]: val,
    });
  };
  const handleSubmit = () => {
    const isValid = checkValid();
    if (isValid) {
      createAsset(formData);
      handleResetFormData();
      onClose && onClose(true);
    }
  };
  useEffect(() => {
    setIsShow(show);
    setErrors('');
  }, [show]);
  const { t } = useTranslation();
  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">{t('createAsset')}</h2>
          <div className="btn btn-icon btn-sm btn-active-icon-primary">
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
                onChange={e => handleChangeData('name', e.target.value)}
                value={formData.name || ''}
              />
              {errors['name'] && (
                <div className="invalid-feedback">{errors['name']}</div>
              )}
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
                onChange={e =>
                  handleChangeData('management_code', e.target.value)
                }
                value={formData.management_code || ''}
              />
              {errors['management_code'] && (
                <div className="invalid-feedback">
                  {errors['management_code']}
                </div>
              )}
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
                onChange={e =>
                  handleChangeData('management_unit', e.target.value)
                }
                value={formData.management_unit || ''}
              />
              {errors['management_unit'] && (
                <div className="invalid-feedback">
                  {errors['management_unit']}
                </div>
              )}
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
                onChange={e =>
                  handleChangeData('original_price', e.target.value)
                }
                value={formData.original_price || ''}
              />
              {errors['original_price'] && (
                <div className="invalid-feedback">
                  {errors['original_price']}
                </div>
              )}
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
                onChange={e =>
                  handleChangeData('residual_price', e.target.value)
                }
                value={formData.residual_price || ''}
              />
              {errors['residual_price'] && (
                <div className="invalid-feedback">
                  {errors['residual_price']}
                </div>
              )}
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
                onChange={e =>
                  handleChangeData('insurance_contract', e.target.value)
                }
                value={formData.insurance_contract || ''}
              />
              {errors['insurance_contract'] && (
                <div className="invalid-feedback">
                  {errors['insurance_contract']}
                </div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('assetImages')}
              </label>
              <InputFile
                name={CollectionConstants.ASSET_IMAGES}
                value={formData.asset_images || null}
                onChange={files => handleChangeData('asset_images', files)}
              />
              {errors['asset_images'] && (
                <div className="invalid-feedback">{errors['asset_images']}</div>
              )}
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
            <button className="btn btn-danger me-3" onClick={handleSubmit}>
              <span className="indicator-label">{t('confirm')}</span>
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
const mapStateToProps = ({ manageAsset }) => ({
  isLoading: manageAsset.isLoading,
  isErrorState: manageAsset.isError,
});
const mapDispatchToProps = dispatch => {
  return {
    createAsset: payload =>
      dispatch({
        type: `${manageAssetActions.createAssetPending.type}_saga`,
        payload,
      }),
    getListAsset: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAssetComponent);
