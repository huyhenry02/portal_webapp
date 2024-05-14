import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { TreeSelect } from 'antd';
import moment from 'moment';
import { isEmpty, omit } from 'lodash';
import { LevelCode } from '../../../stores/types/manageCompany';
import { RootState } from '../../../stores/store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ViewDepartmentModal = ({
  isUpdate,
  setIsShowModal,
  handleCreateUnit,
  handleUpdateUnit,
  treeData,
}) => {
  const [inputValues, setInputValues] = useState({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { unitDetailEdit } = useSelector(
    (state: RootState) => state.manageCompany,
  );

  const handleValidation = (fields: {
    [key: string]: string | boolean | Date | null | undefined;
  }) => {
    let formIsValid = true;
    const errorObject = {};

    if (!fields['name']) {
      formIsValid = false;
      errorObject['name'] = 'Tên đơn vị là bắt buộc';
    }

    if (!fields['establishment_date']) {
      formIsValid = false;
      errorObject['establishment_date'] = 'Ngày thành lập là bắt buộc';
    }

    if (!fields['parent_id']) {
      formIsValid = false;
      errorObject['parent_id'] = 'Đơn vị công tác/ Người quản lý là bắt buộc';
    }

    setErrors(errorObject);

    return formIsValid;
  };

  const handleClickSubmit = () => {
    if (handleValidation(inputValues)) {
      if (unitDetailEdit?.id && isUpdate) {
        handleUpdateUnit(
          { ...omit(inputValues, ['unit_code']) },
          LevelCode.DEPARTMENT,
        );
      } else {
        handleCreateUnit(inputValues, LevelCode.DEPARTMENT);
      }

      setInputValues({});
    }
  };

  const handleCloseModal = async () => {
    setInputValues({});
    setErrors({});
    setIsShowModal(false);
  };

  const handleInputChange = (newValue, key) => {
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
    setInputValues(prevValues => ({
      ...prevValues,
      [key]: newValue,
    }));
  };

  useEffect(() => {
    if (
      isUpdate &&
      !isEmpty(unitDetailEdit) &&
      unitDetailEdit.unit_level.code === LevelCode.DEPARTMENT
    ) {
      setInputValues({
        id: unitDetailEdit.id,
        name: unitDetailEdit.name,
        unit_code: unitDetailEdit.unit_code,
        establishment_date: moment(
          unitDetailEdit?.establishment_date,
          'DD/MM/YYYY',
        ).format('YYYY/MM/DD'),
        parent_id: unitDetailEdit.parent_id,
        status: unitDetailEdit.status,
        mandates: unitDetailEdit.mandates,
      });
    }
  }, []);
  const { t } = useTranslation();
  return (
    <div className="modal-content">
      <div className="modal-header pb-0 border-1 justify-content-between">
        <div>
          <h1>{t('Department')}</h1>
        </div>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          data-bs-dismiss="modal"
          onClick={handleCloseModal}
        >
          <i className="ki-outline ki-cross fs-1"></i>
        </div>
      </div>

      <div className="modal-body">
        <div className="row mb-5">
          <div>
            <label className="required form-label" htmlFor="unit-name">
              {t('nameUnit')}
            </label>
            <input
              id="unit-name"
              type="text"
              className="form-control"
              value={inputValues['name'] || ''}
              onChange={e => handleInputChange(e.target.value, 'name')}
            />
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors?.name}</div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-6 col-sm-12">
            <label className="required form-label">{t('unitCode')}</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={inputValues['unit_code'] || ''}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="required form-label" htmlFor="establishment-date">
              {t('establishmentDate')}
            </label>
            <div className="custom-datepicker position-relative">
              <DatePicker
                id="establishment-date"
                className="form-control"
                selected={
                  inputValues['establishment_date']
                    ? new Date(inputValues['establishment_date'])
                    : null
                }
                onChange={date =>
                  handleInputChange(
                    moment(date).format('YYYY-MM-DD'),
                    'establishment_date',
                  )
                }
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
              />
              <label htmlFor="establishment-date" className="icon-end">
                <i className="fa-solid fa-calendar-days fs-1"></i>
              </label>
            </div>
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors?.establishment_date}</div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-6 col-sm-12"></div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12 mb-5">
            <label className="required form-label" htmlFor="unit-list">
              {t('subsidiary')}/ {t('managers')}
            </label>
            <TreeSelect
              id="unit-list"
              className="d-block min-h-40px"
              dropdownStyle={{
                maxHeight: 500,
                overflow: 'auto',
              }}
              showSearch
              treeLine
              treeData={treeData}
              treeDefaultExpandAll
              value={inputValues['parent_id'] || null}
              onChange={value => handleInputChange(value, 'parent_id')}
            />
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors?.parent_id}</div>
            </div>
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="mandates"
                style={{ height: '100px' }}
                value={inputValues['mandates'] || ''}
                onChange={e => handleInputChange(e.target.value, 'mandates')}
              ></textarea>
              <label htmlFor="mandates">{t('mandates')}</label>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="form-check form-switch">
            <label
              className="form-check-label text-black fw-bold"
              htmlFor="active-checked"
            >
              Active
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="active-checked"
              checked={inputValues['status'] || true}
              onChange={e => handleInputChange(e.target.checked, 'status')}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary me-5" onClick={handleCloseModal}>
            {t('rejected')}
          </button>
          <button className="btn btn-success" onClick={handleClickSubmit}>
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentModal;
