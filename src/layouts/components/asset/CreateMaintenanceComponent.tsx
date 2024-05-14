import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { connect } from 'react-redux';
import { manageAssetActions } from '../../../stores/slices/manageAsset.slice';
import { useParams } from 'react-router';
import InputDate from '../forms/InputDate';
import moment from 'moment';
import {
  DEFAULT_PER_PAGE,
  FORMAT_YYY_MM_DD_HH_MM_SS,
} from '../../../constants/constant';
import { isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';

type ICreateMaintenanceComponent = {
  show?: boolean;
  onClose?: () => void;
  createAssetMaintenance: (payload: {
    asset_id?: string;
    created_date: string;
    created_by: string;
    reason: string;
    description: string;
    proposal: string;
    code: string;
    causal: string;
  }) => void;
  getListAssetMaintenance: (payload: {
    perPage: number;
    page: number;
    status: string;
    asset_id?: string;
  }) => void;
};
const CreateMaintenanceComponent: React.FC<ICreateMaintenanceComponent> = ({
  show = false,
  onClose,
  createAssetMaintenance,
  getListAssetMaintenance,
}) => {
  const { id } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    created_date: '',
    created_by: '',
    reason: '',
    description: '',
    proposal: '',
    code: '',
    causal: '',
  });
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
      created_by: !formData.created_by && 'Người tạo phiếu không được để trống',
      reason: !formData.reason && 'Lý do sửa chữa không được để trống',
      description:
        !formData.description && 'Mô tả hỏng hóc không được để trống',
      proposal: !formData.proposal && 'Đề xuất xử lý không được để trống',
      code: !formData.code && 'Số kiểm soát không được để trống',
      causal: !formData.causal && 'Nguyên nhân gây hư hỏng không được để trống',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };
  const handleResetFormData = () => {
    setFormData({
      created_date: '',
      created_by: '',
      reason: '',
      description: '',
      proposal: '',
      code: '',
      causal: '',
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
      createAssetMaintenance({
        asset_id: id,
        ...formData,
      });
    }
    getListAssetMaintenance({
      perPage: DEFAULT_PER_PAGE,
      page: 1,
      status: 'active',
      asset_id: id,
    });
    handleCloseModal();
  };
  useEffect(() => {
    setIsShow(show);
  }, [show]);
  const { t } = useTranslation();
  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="fw-bold">
            {t('damageReport')}/{t('lostDevice')}
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
                {t('ticketCreator')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('phoneNumber')}
                onChange={e => handleChangeData('created_by', e.target.value)}
                value={formData.created_by || ''}
              />
              {errors['created_by'] && (
                <div className="invalid-feedback">{errors['created_by']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('reasonRepair')}
              </label>
              <input
                type="text"
                className="form form-control"
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
                {t('describeFailure')}
              </label>
              <input
                type="text"
                className="form form-control"
                onChange={e => handleChangeData('description', e.target.value)}
                value={formData.description || ''}
              />
              {errors['description'] && (
                <div className="invalid-feedback">{errors['description']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('causeOfDamage')}
              </label>
              <input
                type="text"
                className="form form-control"
                onChange={e => handleChangeData('causal', e.target.value)}
                value={formData.causal || ''}
              />
              {errors['causal'] && (
                <div className="invalid-feedback">{errors['causal']}</div>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-12 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('propose')}
              </label>
              <input
                type="text"
                className="form form-control"
                onChange={e => handleChangeData('proposal', e.target.value)}
                value={formData.proposal || ''}
              />
              {errors['proposal'] && (
                <div className="invalid-feedback">{errors['proposal']}</div>
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
    createAssetMaintenance: payload =>
      dispatch({
        type: `${manageAssetActions.createAssetMaintenancePending.type}_saga`,
        payload,
      }),
    getListAssetMaintenance: payload =>
      dispatch({
        type: `${manageAssetActions.getListAssetMaintenancePending.type}_saga`,
        payload,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateMaintenanceComponent);
