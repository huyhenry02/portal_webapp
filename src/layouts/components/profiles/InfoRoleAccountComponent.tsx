import React, { useEffect, useState } from 'react';
import { manageProfileActions } from '../../../stores/slices/manageProfile.slice';
import { connect } from 'react-redux';
import { IListPermissions } from '../../../stores/types';
import { every, map } from 'lodash';

type IInfoRoleAccountComponent = {
  roleSelected: string | undefined;
  permissionsOfRoleState: IListPermissions;
  getListPermissionOfRole: (param: { roleId: string }) => void;
};
const InfoRoleAccountComponent: React.FC<IInfoRoleAccountComponent> = ({
  roleSelected,
  permissionsOfRoleState,
  getListPermissionOfRole,
}) => {
  const [permissions, setPermissions] = useState<IListPermissions>([]);
  useEffect(() => {
    if (roleSelected === '0' || !roleSelected) {
      setPermissions([]);
    } else {
      getListPermissionOfRole({ roleId: roleSelected });
    }
  }, [roleSelected]);

  useEffect(() => {
    setPermissions(permissionsOfRoleState);
  }, [permissionsOfRoleState]);

  return (
    <>
      <div className="mb-13 text-left">
        <h1 className="mb-3">Chi tiết quyền</h1>
      </div>
      <div className="g-9 mb-3 mh-300px overflow-auto">
        {permissions.length ? (
          map(permissions, (item, idx) => (
            <div key={idx}>
              <label className="form-check form-check-custom form-check-solid align-items-start mb-3">
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  checked={every(item.permissions, x => x.enable)}
                  disabled
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
                        disabled
                      />
                      <span className="d-flex flex-column align-items-start">
                        <span className="fs-5 mb-0">{permission.name}</span>
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

const mapStateToProps = ({ manageProfile }) => ({
  permissionsOfRoleState: manageProfile.permissionsOfRole,
});

const mapDispatchToProps = dispatch => {
  return {
    getListPermissionOfRole: payload =>
      dispatch({
        type: `${manageProfileActions.getListPermissionOfRolePending.type}_saga`,
        payload,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoRoleAccountComponent);
