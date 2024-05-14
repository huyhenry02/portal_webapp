import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { translate } from '../../../translates/translate';

const labels = [
  { id: 1, name: translate('stt'), className: 'min-w-50px text-left' },
  {
    id: 2,
    name: translate('nameRolePermission'),
    className: 'min-w-125px text-left',
  },
  { id: 3, name: translate('status'), className: 'min-w-125px text-left' },
  { id: 4, name: translate('createdAt'), className: 'min-w-100px text-left' },
  { id: 5, name: translate('action'), className: 'min-w-125px text-center' },
];

type IRole = {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
};

type IRoleTableComponent = {
  data: IRole[];
  page: number | string;
  onEditRole?: (id: string) => void;
  onDeleteRole?: (id: string) => void;
};

const RoleTableComponent: React.FC<IRoleTableComponent> = ({
  data,
  onEditRole,
  onDeleteRole,
  page,
}) => {
  const handleIndex = index => {
    let currentPage = Number(page);
    if (currentPage < 2) currentPage = 1;
    return (currentPage - 1) * 10 + (index + 1);
  };
  return (
    <div className="table-responsive">
      <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
        <thead className="border-gray-200 fs-5 fw-semibold bg-gray-200">
          <tr>
            {map(labels, (label, idx) => (
              <th key={idx} className={label.className ?? 'text-center'}>
                {label.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="fs-6 fw-semibold text-gray-600">
          {map(data, (role, index) => (
            <tr key={role.id}>
              <td>{handleIndex(index)}</td>
              <td>{role.description}</td>
              <td className={role.status}>
                {translate(role.status) ?? role.status}
              </td>
              <td>{role.createdAt}</td>
              <td className="text-center">
                <Link
                  to={`/role-permission/role/${role.id}`}
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                >
                  <i className="fas fa-eye fs-2"></i>
                </Link>
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                  onClick={() => onEditRole && onEditRole(role.id)}
                >
                  <i className="fas fa-user-edit fs-2"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                  onClick={() => onDeleteRole && onDeleteRole(role.id)}
                >
                  <i className="fas fa-trash fs-2"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTableComponent;
