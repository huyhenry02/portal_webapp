import React, { useEffect, useState } from 'react';
import CommonModal from '../../components/modals/CommonModal';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';
type IConfirmModalComponent = {
  show?: boolean;
  title: string;
  action: string;
  message: string;
  width?: string;
  onConfirm: () => void;
  onClose: () => void;
};
const ConfirmModal: React.FC<IConfirmModalComponent> = ({
  show = false,
  title,
  action,
  message,
  onConfirm,
  onClose,
  width,
}) => {
  const actionType = {
    delete: translate('delete'),
    add: translate('createNew'),
    update: translate('update'),
    pause: translate('pause'),
  };
  const styleActionConfirm = {
    delete: 'btn-danger',
    add: 'btn-primary',
    update: 'btn-warning',
    pause: 'btn-warning',
  };
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(show);
  }, [show]);
  const handleCancelRequest = () => {
    setIsShow(false);
    onClose && onClose();
  };
  const handleConfirmRequest = () => {
    onConfirm();
    onClose && onClose();
  };
  const { t } = useTranslation();
  return (
    <div className={'common_confirm'}>
      <CommonModal isShow={isShow} maxWidth={width}>
        <div className="modal-content rounded">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <i
                className="ki-outline ki-cross fs-1"
                onClick={handleCancelRequest}
              ></i>
            </div>
          </div>
          <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
            <div className="mb-13 text-left">
              <h1 className="mb-3">{title}</h1>
            </div>
            <hr />
            <div className="row g-9 mb-3">
              <div className="col-md-12 fv-row">
                <div className="mt-5 mb-5 fs-3">
                  {message != ''
                    ? message
                    : 'Bạn có muốn thực hiện hành động này'}
                </div>
              </div>
            </div>
            <hr />
            <div className="text-end">
              <button
                type="reset"
                className="btn btn-bg-secondary me-3 h-40px fs-7 fw-bold"
                onClick={handleCancelRequest}
              >
                <span className="indicator-label">{t('rejected')}</span>
              </button>
              <button
                className={`btn btn-flex h-40px fs-7 fw-bold ${
                  styleActionConfirm[action] ?? 'btn-primary'
                }`}
                onClick={handleConfirmRequest}
              >
                <span className="indicator-label">
                  {actionType[action] ?? translate('confirm')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default ConfirmModal;
