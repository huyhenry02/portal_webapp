import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IListPermissionsCommon } from '../../../stores/types';
import { every, map } from 'lodash';
import { useTranslation } from 'react-i18next';

type IDetailPermissionInRoleComponent = {
  permissionsOfRoleState: IListPermissionsCommon;
  onCreateOrUpdateRole: (id: IListPermissionsCommon) => void;
};
const DetailPermissionInRoleComponent: React.FC<
  IDetailPermissionInRoleComponent
> = ({ permissionsOfRoleState, onCreateOrUpdateRole }) => {
  const [permissions, setPermissions] = useState<IListPermissionsCommon>([]);
  useEffect(() => {
    setPermissions(permissionsOfRoleState);
  }, [permissionsOfRoleState]);
  const handleChange = (idx, pIdx) => {
    if (pIdx !== null) {
      setPermissions(prevPermissions => {
        const updatedPermissions = [...prevPermissions];
        updatedPermissions[idx] = {
          ...updatedPermissions[idx],
          permissions: [...updatedPermissions[idx].permissions],
        };
        updatedPermissions[idx].permissions[pIdx] = {
          ...updatedPermissions[idx].permissions[pIdx],
          enable: !updatedPermissions[idx].permissions[pIdx]['enable'],
        };
        return updatedPermissions;
      });
    } else {
      const check = permissions[idx].permissions;
      const hasDisabledPermission = check.some(
        permission => !permission.enable,
      );
      setPermissions(prevPermissions => {
        const updatedPermissions = [...prevPermissions];
        updatedPermissions[idx] = {
          ...updatedPermissions[idx],
          permissions: updatedPermissions[idx].permissions.map(permission => ({
            ...permission,
            enable: hasDisabledPermission,
          })),
        };
        return updatedPermissions;
      });
    }
  };
  useEffect(() => {
    onCreateOrUpdateRole(permissions);
  }, [permissions]);
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-13 text-left">
        <h1 className="mb-3">{t('detailRole')}</h1>
      </div>
      <div className="g-9 mb-3 mh-400px overflow-auto">
        {permissions.length ? (
          map(permissions, (item, idx) => (
            <div key={idx}>
              <label className="form-check form-check-custom form-check-solid align-items-start mb-3">
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  checked={every(item.permissions, x => x.enable)}
                  onChange={() => handleChange(idx, null)}
                />
                <span className="d-flex flex-column align-items-start">
                  <span className="fw-bold fs-5 mb-0">{item.description}</span>
                </span>
              </label>
              {item.permissions?.length ? (
                map(item.permissions, (permission, pIdx) => (
                  <div key={`${idx}_${pIdx}`}>
                    <label className="form-check form-check-custom form-check-solid align-items-start mb-3 ms-10">
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        checked={permission.enable}
                        onChange={() => handleChange(idx, pIdx)}
                      />
                      <span className="d-flex flex-column align-items-start">
                        <span className="fs-5 mb-0">
                          {permission.description}
                        </span>
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
const mapStateToProps = ({ manageRole }) => ({
  permissionsOfRoleState: manageRole.permissionsOfRoleModule,
});

export default connect(mapStateToProps, null)(DetailPermissionInRoleComponent);
