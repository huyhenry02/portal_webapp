import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { IAccount, IEmployeeDetail, IRoles } from '../../../stores/types';

const statuses = [
  { value: '0', label: 'Chọn trạng thái' },
  { value: 'active', label: 'Kích hoạt' },
  { value: 'inactive', label: 'Không kích hoạt' },
];

type IInfoAccountComponent = {
  roles: IRoles[];
  employeeDetail: IEmployeeDetail | undefined;
  password: string;
  setPassword: (param: string) => void;
  role: string;
  setRole: (param: string) => void;
  status: string;
  setStatus: (param: string) => void;
  isUpdate?: boolean;
  accountData: IAccount;
};

const InfoAccountComponent: React.FC<IInfoAccountComponent> = ({
  roles,
  employeeDetail,
  password = '',
  setPassword,
  role = '0',
  setRole,
  status = '0',
  setStatus,
  isUpdate = false,
  accountData,
}) => {
  const [listRoles, setListRoles] = useState<
    { value: string; label?: string }[]
  >([]);
  useEffect(() => {
    setListRoles(
      map(roles, role => ({ value: role.id, label: role.description })),
    );
  }, [roles]);

  useEffect(() => {
    if (isUpdate && accountData) {
      setRole(accountData.roleId);
      setStatus(accountData.status);
    }
  }, [accountData]);

  return (
    <>
      <div className="mb-13 text-left">
        <h1 className="mb-3">
          {isUpdate ? 'Cập nhật tài khoản' : 'Tạo tài khoản'}
        </h1>
      </div>
      <div className="row g-9 mb-3">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Username</label>
          <input
            type="text"
            className="form-control form-control-solid"
            placeholder="Tài khoản đăng nhập"
            name="username"
            defaultValue={
              isUpdate ? accountData.username : employeeDetail?.username
            }
            disabled={true}
          />
        </div>

        <div className="col-md-6 fv-row">
          <label
            className={
              isUpdate
                ? 'fs-6 fw-semibold mb-2'
                : 'required  fs-6 fw-semibold mb-2'
            }
          >
            Password
          </label>
          <input
            type="password"
            className="form-control form-control-solid"
            placeholder={isUpdate ? '********' : 'Mật khẩu'}
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="row g-9 mb-3">
        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Role</label>
          <select
            className="form-select form-select-solid"
            data-control="select2"
            data-hide-search="true"
            data-placeholder="Select a role"
            name="role"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="0">Select a role</option>
            {map(listRoles, (roleItem, idx) => (
              <option value={roleItem.value} key={idx}>
                {roleItem.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 fv-row">
          <label className="fs-6 fw-semibold mb-2">Trạng thái</label>
          <select
            className="form-select form-select-solid"
            data-control="select2"
            data-hide-search="true"
            data-placeholder="Chọn trạng thái"
            name="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {map(statuses, (statusItem, idx) => (
              <option value={statusItem.value} key={idx}>
                {statusItem.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default InfoAccountComponent;
