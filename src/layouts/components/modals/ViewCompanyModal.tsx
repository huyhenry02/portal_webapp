import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { isEmpty, map, omit } from 'lodash';
import moment from 'moment';
import { LevelCode } from '../../../stores/types/manageCompany';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { useTranslation } from 'react-i18next';

const ViewCompanyModal = ({
  isUpdate = false,
  setIsShowModal,
  handleCreateUnit,
  handleUpdateUnit,
}) => {
  const [inputValues, setInputValues] = useState({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { units, unitDetailEdit, positions } = useSelector(
    (state: RootState) => state.manageCompany,
  );

  const isDateValid = dateStr => {
    return moment(dateStr, 'YYYY-MM-DD', true).isValid();
  };

  const handleValidation = (fields: {
    [key: string]: string | boolean | Date | null | undefined;
  }) => {
    const { date_of_issue } = fields;
    let formIsValid = true;
    const errorObject = {};

    if (!fields['name']) {
      formIsValid = false;
      errorObject['name'] = 'Tên đơn vị là bắt buộc';
    }

    if (!fields['tax_code']) {
      formIsValid = false;
      errorObject['tax_code'] = 'Mã số thuế là bắt buộc';
    }
    if (!fields['address']) {
      formIsValid = false;
      errorObject['address'] = 'Địa chỉ là bắt buộc';
    }
    if (!fields['establishment_date']) {
      formIsValid = false;
      errorObject['establishment_date'] = 'Ngày thành lập là bắt buộc';
    }
    if (!fields['registration_number']) {
      formIsValid = false;
      errorObject['registration_number'] = 'Ngày cấp là bắt buộc';
    }

    if (!date_of_issue) {
      formIsValid = false;
      errorObject['date_of_issue'] = 'Ngày cấp là bắt buộc';
    } else if (!isDateValid(date_of_issue)) {
      formIsValid = false;
      errorObject['date_of_issue'] = 'Ngày cấp không đúng định dạng';
    } else if (
      typeof date_of_issue === 'string' &&
      new Date(date_of_issue) > new Date()
    ) {
      formIsValid = false;
      errorObject['date_of_issue'] = 'Ngày cấp không hợp lệ';
    }

    if (!fields['place_of_issue']) {
      formIsValid = false;
      errorObject['place_of_issue'] = 'Nơi cấp là bắt buộc';
    }
    if (!fields['representative']) {
      formIsValid = false;
      errorObject['representative'] = 'Người đại diện là bắt buộc';
    }
    if (!fields['position']) {
      formIsValid = false;
      errorObject['position'] = 'Chức danh là bắt buộc';
    }

    setErrors(errorObject);

    return formIsValid;
  };

  const handleClickSubmit = () => {
    if (handleValidation(inputValues)) {
      if (isUpdate && unitDetailEdit?.id) {
        handleUpdateUnit(
          {
            ...omit(inputValues, ['parent_id', 'unit_code']),
            is_company: unitDetailEdit.is_company,
            // oldParentId:
            //   unitDetailEditState?.parent_id != inputValues?.parent_id
            //     ? unitDetailEditState?.parent_id
            //     : null,
          },
          LevelCode.COMPANY,
        );
      } else {
        const data = inputValues['parent_id']
          ? inputValues
          : omit(inputValues, ['parent_id']);
        handleCreateUnit({ ...data, is_company: true }, LevelCode.COMPANY);
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
      unitDetailEdit.unit_level.code === LevelCode.COMPANY
    ) {
      setInputValues({
        id: unitDetailEdit.id,
        name: unitDetailEdit.name,
        unit_code: unitDetailEdit?.unit_code,
        tax_code: unitDetailEdit?.tax_code,
        parent_id: unitDetailEdit?.parent_id,
        establishment_date: moment(
          unitDetailEdit?.establishment_date,
          'DD/MM/YYYY',
        ).format('YYYY/MM/DD'),
        status: unitDetailEdit?.status,
        address: unitDetailEdit?.address,
        registration_number: unitDetailEdit?.registration_number,
        date_of_issue: moment(
          unitDetailEdit?.date_of_issue,
          'DD/MM/YYYY',
        ).format('YYYY/MM/DD'),
        place_of_issue: unitDetailEdit?.place_of_issue,
        representative: unitDetailEdit?.representative,
        position: unitDetailEdit?.position,
      });
    }
  }, []);
  const { t } = useTranslation();
  return (
    <div className="modal-content">
      <div className="modal-header pb-0 border-1 justify-content-between">
        <div>
          <h1>{t('edit')}</h1>
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
            <label className="required form-label" htmlFor="tax-number">
              {t('taxCode')}
            </label>
            <input
              id="tax-number"
              type="text"
              className="form-control"
              value={inputValues['tax_code'] || ''}
              onChange={e => handleInputChange(e.target.value, 'tax_code')}
            />
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors.tax_code}</div>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-6 col-sm-12">
            <label className="required form-label" htmlFor="address">
              {t('address')}
            </label>
            <input
              id="address"
              type="text"
              className="form-control"
              value={inputValues['address'] || ''}
              onChange={e => handleInputChange(e.target.value, 'address')}
            />
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors.address}</div>
            </div>
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
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                onChange={date =>
                  handleInputChange(
                    moment(date).format('YYYY-MM-DD'),
                    'establishment_date',
                  )
                }
              />
              <label htmlFor="establishment-date" className="icon-end">
                <i className="fa-solid fa-calendar-days fs-1"></i>
              </label>
            </div>
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors.establishment_date}</div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row mb-5">
          <div className="col-md-12 mb-5">
            <label
              className="required form-label"
              htmlFor="registration-number"
            >
              {t('registrationNumber')}
            </label>
            <input
              id="registration-number"
              type="text"
              className="form-control"
              value={inputValues['registration_number'] || ''}
              onChange={e =>
                handleInputChange(e.target.value, 'registration_number')
              }
            />
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors.registration_number}</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="required form-label" htmlFor="issue-date">
              {t('dateOfIssue')}
            </label>
            <div className="custom-datepicker position-relative">
              <DatePicker
                id="issue-date"
                className="form-control"
                selected={
                  inputValues['date_of_issue']
                    ? new Date(inputValues['date_of_issue'])
                    : null
                }
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                onChange={date =>
                  handleInputChange(
                    moment(date).format('YYYY-MM-DD'),
                    'date_of_issue',
                  )
                }
              />
              <label htmlFor="issue-date" className="icon-end">
                <i className="fa-solid fa-calendar-days fs-1"></i>
              </label>
            </div>
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
              <div>{errors.date_of_issue}</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div>
              <label className="required form-label" htmlFor="place-issue">
                {t('placeOfIssue')}
              </label>
              <input
                id="place-issue"
                type="text"
                className="form-control"
                value={inputValues['place_of_issue'] || ''}
                onChange={e =>
                  handleInputChange(e.target.value, 'place_of_issue')
                }
              />
              <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                <div>{errors.place_of_issue}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 col-sm-12">
            <div>
              <label className="required form-label" htmlFor="representative">
                {t('representative')}
              </label>
              <input
                id="representative"
                type="text"
                className="form-control"
                value={inputValues['representative'] || ''}
                onChange={e =>
                  handleInputChange(e.target.value, 'representative')
                }
              />
              <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                <div>{errors.representative}</div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div>
              <label className="required form-label" htmlFor="position">
                {t('jobTitle')}
              </label>
              <select
                id="position"
                className="form-select form-select-lg mb-3"
                value={inputValues['position'] || ''}
                onChange={e => handleInputChange(e.target.value, 'position')}
              >
                <option value="" disabled={true}></option>
                {map(positions, (item, idx) => (
                  <option key={idx} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                <div>{errors.position}</div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 fv-row">
            <label className="form-label">{t('subsidiary')}</label>
            <select
              className="form-select"
              data-control="select2"
              data-hide-search="true"
              data-placeholder="Select a unit"
              name="unit"
              disabled={isUpdate}
              value={inputValues['parent_id'] || ''}
              onChange={e => handleInputChange(e.target.value, 'parent_id')}
            >
              <option value=""></option>
              {map(units, (unitItem, idx) => (
                <option value={unitItem.id} key={idx}>
                  {unitItem.name}
                </option>
              ))}
            </select>
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
              defaultChecked={inputValues['status'] || true}
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

export default ViewCompanyModal;
