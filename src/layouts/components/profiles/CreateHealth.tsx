import React, { useEffect, useState } from 'react';
import InputFile from '../forms/InputFile';
import { CollectionConstants } from '../../../stores/types/createProfile';
import { cloneDeep, set, unset } from 'lodash';
import { IInfoHealthUpdate } from '../../../stores/types/editProfile';
import Log from '../../commons/log/Log';
import { logHealth, logTitleType } from '../../../stores/types/manageLog';
import { useTranslation } from 'react-i18next';

const CreateHealth = ({
  infoHealthData,
  onChangeInfoHealth,
  errors,
  isShowLogHealth,
  setIsShowLogHealth,
}) => {
  const [infoHealth, setInfoHealth] = useState<IInfoHealthUpdate>(
    infoHealthData || {},
  );
  const HEALTH_MEDIA = ['healthRecords'];
  const handleChangeInfoHealth = (col: string, val: string | number) => {
    const newInfoHealth = {
      ...infoHealth,
      [col]: val,
    };
    setInfoHealth(newInfoHealth);
    onChangeInfoHealth('infoHealth', newInfoHealth);
  };

  useEffect(() => {
    if (infoHealthData) {
      setInfoHealth(infoHealthData);
    }
  }, [infoHealthData]);

  const handleUpdateInfoHealthFile = (col: string, id: string, files) => {
    if (HEALTH_MEDIA.includes(col)) {
      const newInfoHealth = cloneDeep(infoHealth);
      set(newInfoHealth, `${col}`, files);
      set(newInfoHealth, `media.new.${col}`, id);
      setInfoHealth(newInfoHealth);
      onChangeInfoHealth('infoHealth', newInfoHealth);
    }
  };

  const handleRemoveInfoHealthFile = (col: string, id: string) => {
    if (HEALTH_MEDIA.includes(col)) {
      const newInfoHealth = cloneDeep(infoHealth);
      unset(newInfoHealth, `${col}`);
      set(newInfoHealth, `media.delete.${col}`, id);
      setInfoHealth(newInfoHealth);
      onChangeInfoHealth('infoHealth', newInfoHealth);
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="col-md-6 text-left">
            <h1>{t('health')}</h1>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">
                {t('bloodPressure')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bloodPressure')}
                value={infoHealth?.bloodPressure || ''}
                onChange={e =>
                  handleChangeInfoHealth('bloodPressure', e.target.value)
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('heartbeat')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('heartbeat')}
                value={infoHealth?.heartbeat || ''}
                onChange={e =>
                  handleChangeInfoHealth('heartbeat', e.target.value)
                }
              />
            </div>
            <div className="col-md-4 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('height')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('height')}
                value={infoHealth?.height || ''}
                onChange={e => handleChangeInfoHealth('height', e.target.value)}
              />
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('weight')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('weight')}
                value={infoHealth?.weight || ''}
                onChange={e => handleChangeInfoHealth('weight', e.target.value)}
              />
            </div>
            <div className="col-md-6 fv-row">
              <label className="fs-6 fw-semibold mb-2">{t('bloodGroup')}</label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('bloodGroup')}
                value={infoHealth?.bloodGroup || ''}
                onChange={e =>
                  handleChangeInfoHealth('bloodGroup', e.target.value)
                }
              />
              {errors && errors.bloodGroup ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.bloodGroup}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('medicalNote')}
              </label>
              <input
                type="text"
                className="form form-control"
                placeholder={t('medicalNote')}
                value={infoHealth?.note || ''}
                onChange={e => handleChangeInfoHealth('note', e.target.value)}
              />
              {errors && errors.note ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.note}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('healthRecords')}
              </label>
              <InputFile
                name={CollectionConstants.HEALTH_RECORDS}
                value={infoHealth?.healthRecords || []}
                onChange={files =>
                  handleChangeInfoHealth('healthRecords', files)
                }
                onRemoveFile={id =>
                  handleRemoveInfoHealthFile('healthRecords', id)
                }
                onUpdateFile={(id, files) =>
                  handleUpdateInfoHealthFile('healthRecords', id, files)
                }
              />
              {errors && errors.infoInsurance ? (
                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                  {errors.infoInsurance}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Log
        show={isShowLogHealth}
        onClose={() => setIsShowLogHealth(false)}
        logKey={logTitleType.HEALTH}
        logId={infoHealthData?.id}
        logTitle={logHealth}
      />
    </>
  );
};
export default CreateHealth;
