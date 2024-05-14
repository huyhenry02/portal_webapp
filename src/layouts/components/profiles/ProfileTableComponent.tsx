import React from 'react';
import { map, get } from 'lodash';
import { Link } from 'react-router-dom';
import { translate } from '../../../translates/translate';

const labels = [
  { id: 1, name: translate('fullName'), className: 'min-w-125px text-left' },
  { id: 2, name: translate('email'), className: 'min-w-125px text-left' },
  { id: 3, name: translate('position'), className: 'min-w-60px text-left' },
  { id: 4, name: translate('status'), className: 'min-w-125px text-left' },
  {
    id: 5,
    name: translate('createdAtElectronicRecord'),
    className: 'min-w-100px text-left',
  },
  {
    id: 6,
    name: translate('createdAtAccount'),
    className: 'min-w-100px text-left',
  },
  { id: 7, name: translate('action'), className: 'min-w-125px text-center' },
];

type IProfile = {
  id: string;
  fullName: string;
  email: string;
  position: string;
  status: string;
  createdProfileAt: string;
  createdAt: string;
};

type IProfileTableComponent = {
  data: IProfile[];
  onRemoveDbClickItem?: () => void;
  onEditProfile?: (id: string) => void;
  onDeleteProfile?: (id: string) => void;
  onRClickItem?: (profile, positionTop: number, positionLeft: number) => void;
};
const handleContextMenu = event => {
  event.preventDefault(); // Prevent the default context menu from appearing
};

const ProfileTableComponent: React.FC<IProfileTableComponent> = ({
  data,
  onRemoveDbClickItem,
  onEditProfile,
  onDeleteProfile,
  onRClickItem,
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
          {map(data, profile => (
            <tr key={profile.id} onClick={onRemoveDbClickItem}>
              <td
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {profile.fullName}
              </td>
              <td
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {profile.email}
              </td>
              <td
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {profile.position}
              </td>
              <td
                className={profile.status}
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {translate(profile.status) ?? profile.status}
              </td>
              <td
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {profile.createdProfileAt}
              </td>
              <td
                onContextMenu={event => {
                  handleContextMenu(event);
                  if (onRClickItem) {
                    onRClickItem(
                      profile,
                      get(event, 'nativeEvent.layerX', 0),
                      get(event, 'nativeEvent.layerY', 0),
                    );
                  }
                }}
              >
                {profile.createdAt}
              </td>
              <td className="text-center">
                <Link to={{ pathname: `/manage_profile/${profile.id}` }}>
                  <a
                    type="button"
                    className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                    onClick={() => onEditProfile && onEditProfile(profile.id)}
                  >
                    <i className="fas fa-user-edit fs-2"></i>
                  </a>
                </Link>
                <a
                  type="button"
                  className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                  onClick={() => onDeleteProfile && onDeleteProfile(profile.id)}
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

export default ProfileTableComponent;
