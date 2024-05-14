import React from 'react';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { IAccount } from '../../../stores/types';
import { translate } from '../../../translates/translate';

const labels = [
  { id: 1, name: translate('fullName'), className: 'min-w-125px text-left' },
  { id: 2, name: translate('email'), className: 'min-w-125px text-left' },
  { id: 3, name: translate('position'), className: 'min-w-60px text-left' },
  { id: 4, name: translate('status'), className: 'min-w-125px text-left' },
  { id: 5, name: translate('createdAt'), className: 'min-w-100px text-left' },
  { id: 6, name: translate('action'), className: 'min-w-125px text-center' },
];

type IAccountTableComponent = {
  data: IAccount[];
  onPauseAccount: (id: string) => void;
  onActiveAccount: (id: string) => void;
  onEditAccount: (account: IAccount) => void;
};

const AccountTableComponent: React.FC<IAccountTableComponent> = ({
  data,
  onPauseAccount,
  onActiveAccount,
  onEditAccount,
}) => {
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
          {map(data, account => (
            <tr key={account.id}>
              <td>{account.fullName}</td>
              <td>{account.email}</td>
              <td>{account.position}</td>
              <td className={account.status}>
                {translate(account.status) ?? account.status}
              </td>
              <td>{account.createdAt}</td>
              <td className="text-center">
                <Link
                  to={`/accounts/detail/${account.id}`}
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                >
                  <i className="fas fa-eye fs-2"></i>
                </Link>
                <a
                  href="#"
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                  onClick={() => onEditAccount(account)}
                >
                  <i className="fas fa-pencil fs-2"></i>
                </a>
                {account.status === 'inactive' ? (
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                    onClick={() => onActiveAccount(account.id)}
                  >
                    <i className="fas fa-play fs-2"></i>
                  </a>
                ) : (
                  <a
                    href="#"
                    className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                    onClick={() => onPauseAccount(account.id)}
                  >
                    <i className="fas fa-circle-stop fs-2"></i>
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTableComponent;
