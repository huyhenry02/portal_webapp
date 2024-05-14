import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { IEmployeeDetail } from '../../../stores/types';

type IInfoUserAccountComponent = {
  employeeDetail?: IEmployeeDetail;
};

const InfoUserAccountComponent: React.FC<IInfoUserAccountComponent> = ({
  employeeDetail = {},
}) => {
  return (
    <>
      <div className="mt-15 mb-13 text-left">
        <h1 className="mb-3">Thông tin cá nhân</h1>
      </div>

      <div className="row g-9 mb-8">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Mã nhân viên</label>
          <input
            type="text"
            className="form-control form-control-solid"
            placeholder="Mã nhân viên"
            name="employee_code"
            value={employeeDetail.employeeCode ?? ''}
            disabled
          />
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Họ tên</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="full_name"
            value={employeeDetail.fullName ?? ''}
            disabled
          />
        </div>
      </div>
      <div className="row g-9 mb-8">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Ngày sinh</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="birthday"
            value={employeeDetail.birthday ?? ''}
            disabled
          />
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Đơn vị công tác</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="company"
            value={employeeDetail.company ?? ''}
            disabled
          />
        </div>
      </div>
      <div className="row g-9 mb-8">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Phòng ban</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="department"
            value={employeeDetail.department ?? ''}
            disabled
          />
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Chức danh</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="possition"
            value={employeeDetail.position ?? ''}
            disabled
          />
        </div>
      </div>
      <div className="row g-9 mb-8">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Email</label>
          <input
            type="text"
            className="form-control form-control-solid"
            placeholder="Email"
            name="email"
            value={employeeDetail.email ?? ''}
            disabled
          />
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Số điện thoại</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="phone_number"
            value={employeeDetail.phoneNumber ?? ''}
            disabled
          />
        </div>
      </div>
      <div className="row g-9 mb-8">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Quê quán</label>
          <input
            type="text"
            className="form-control form-control-solid"
            name="home_town"
            value={employeeDetail.homeTown ?? ''}
            disabled
          />
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Ngày tạo</label>
          <div className="position-relative d-flex align-items-center">
            <input
              type="text"
              className="form-control form-control-solid"
              name="home_town"
              value={employeeDetail.createdAt ?? ''}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoUserAccountComponent;
