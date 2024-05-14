import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import InputDate from '../forms/InputDate';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import moment from 'moment/moment';
import {
  DEFAULT_PER_PAGE,
  FORMAT_YYY_MM_DD_HH_MM_SS,
} from '../../../constants/constant';
import { isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';

type ICreateDeliveryComponent = {
  show?: boolean;
  onClose?: () => void;
  createAssetDelivery: (payload: {
    asset_id?: string;
    created_date: string;
    receiver: string;
    deliver: string;
    reason: string;
    place_of_use: string;
    attachments: string;
    code: string;
  }) => void;
  getListAssetDelivery: (payload: {
    perPage: number;
    page: number;
    status: string;
    asset_id?: string;
  }) => void;
};
const CreateDeliveryComponent: React.FC<ICreateDeliveryComponent> = ({
  show = false,
  onClose,
  createAssetDelivery,
  getListAssetDelivery,
}) => {
  const { id } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    created_date: '',
    receiver: '',
    deliver: '',
    reason: '',
    place_of_use: '',
    attachments: '',
    code: '',
  });
  const [errors, setErrors] = useState({});
  const handleChangeData = (
    col: string,
    val: string | number | null | Date | undefined,
  ) => {
    if (['created_date'].includes(col) && !isValid(new Date(val as string))) {
      val = null;
    }
    setFormData({
      ...formData,
      [col]: val,
    });
  };
  const checkValid = () => {
    const newErrors = {
      created_date:
        !formData.created_date && 'Ngày tạo phiếu không được để trống',
      receiver: !formData.receiver && 'Người nhận không được để trống',
      deliver: !formData.deliver && 'Đơn vị giao không được để trống',
      reason: !formData.reason && 'Lý do giao nhận không được để trống',
      attachments:
        !formData.attachments && 'Tài liệu kèm theo không được để trống',
      place_of_use:
        !formData.place_of_use && 'Địa điểm sử dụng không được để trống',
      code: !formData.code && 'Số kiểm soát không được để trống',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };
  const handleResetFormData = () => {
    setFormData({
      created_date: '',
      receiver: '',
      deliver: '',
      reason: '',
      place_of_use: '',
      attachments: '',
      code: '',
    });
    setErrors({});
  };
  const handleCloseModal = () => {
    setIsShow(false);
    handleResetFormData();
    onClose && onClose();
  };
  const handleSubmit = () => {
    const isValid = checkValid();
    if (isValid) {
      createAssetDelivery({
        asset_id: id,
        ...formData,
      });
      getListAssetDelivery({
        perPage: DEFAULT_PER_PAGE,
        page: 1,
        status: 'active',
        asset_id: id,
      });
      handleCloseModal();
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
          <h2 className="fw-bold">{t('createNewDelivery')}</h2>
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
              <label className="fs-6 fw-semibold mb-2">{t('creationAt')}</label>
              <InputDate
                className="form form-control"
                wrapperClassName="w-100"
                showTimeSelect
                selected={
                  formData?.created_date
                    ? new Date(formData.created_date)
                    : null
                }
                onChange={date =>
                  handleChangeData(
                    'created_date',
                    moment(date).format(FORMAT_YYY_MM_DD_HH_MM_SS),
                  )
                }
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd h:mmaa"
                timeCaption="Time"
              />
              {errors['created_date'] && (
                <div className="invalid-feedback">{errors['created_date']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('recipients')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('fullName')}
                onChange={e => handleChangeData('receiver', e.target.value)}
                value={formData.receiver || ''}
              />
              {errors['receiver'] && (
                <div className="invalid-feedback">{errors['receiver']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('deliveryUnit')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('phoneNumber')}
                onChange={e => handleChangeData('deliver', e.target.value)}
                value={formData.deliver || ''}
              />
              {errors['deliver'] && (
                <div className="invalid-feedback">{errors['deliver']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('reasonDelivery')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder="Theo PGV số..."
                onChange={e => handleChangeData('reason', e.target.value)}
                value={formData.reason || ''}
              />
              {errors['reason'] && (
                <div className="invalid-feedback">{errors['reason']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('address')}
              </label>
              <input
                type="text"
                className="form form-control"
                onChange={e => handleChangeData('place_of_use', e.target.value)}
                value={formData.place_of_use || ''}
              />
              {errors['place_of_use'] && (
                <div className="invalid-feedback">{errors['place_of_use']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('attachments')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('attachments')}
                onChange={e => handleChangeData('attachments', e.target.value)}
                value={formData.attachments || ''}
              />
              {errors['attachments'] && (
                <div className="invalid-feedback">{errors['attachments']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('controlNumber')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder="146/TB/2022"
                onChange={e => handleChangeData('code', e.target.value)}
                value={formData.code || ''}
              />
              {errors['code'] && (
                <div className="invalid-feedback">{errors['code']}</div>
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
  isLoading: manageAsset.isLoading,
  isErrorState: manageAsset.isError,
});
const mapDispatchToProps = dispatch => {
  return {
    createAssetDelivery: payload =>
      dispatch({
        type: `${manageAssetActions.createAssetDeliveryPending.type}_saga`,
        payload,
      }),
    getListAssetDelivery: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetDeliveryPending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDeliveryComponent);
