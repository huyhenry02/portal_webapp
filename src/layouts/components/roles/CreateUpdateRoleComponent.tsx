import React, { useEffect, useState } from 'react';
import CommonModal from '../modals/CommonModal';
import { map } from 'lodash';
import DetailPermissionInRoleComponent from './DetailPermissionInRoleComponent';
import { connect } from 'react-redux';
import {
  IRole,
  manageRoleActions,
} from '../../../stores/slices/manageRole.slice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { translate } from '../../../translates/translate';

const statuses = [
  { value: '0', label: translate('selectStatus') },
  { value: 'active', label: translate('activate') },
  { value: 'inactive', label: translate('inactivate') },
];

type IRoleDetail = {
  id: string;
  name: string;
  description: string;
  status: string;
  permissions: string[];
};

type ICreateUpdateRoleComponent = {
  show?: boolean;
  roleId: string;
  getListPermissionOfRole: (param: { roleId: string }) => void;
  onClose?: (submitSuccess?: boolean) => void;
  rolesStage?: IRole[];
  detailRole?: IRole;
  updateDetail?: (params: IRoleDetail) => void;
  createOrUpdateRolePermissions: (param: {
    role: { id: string; description: string; status: string };
    permissions: string[] | [];
  }) => void;
};

const CreateUpdateRoleComponent: React.FC<ICreateUpdateRoleComponent> = ({
  show = false,
  roleId,
  getListPermissionOfRole,
  onClose,
  rolesStage,
  createOrUpdateRolePermissions,
  detailRole,
  updateDetail,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [roles, setRoles] = useState<IRole[] | undefined>();
  // const [role, setRole] = useState<IRole | undefined>();
  const [role, setRole] = useState({
    id: '',
    name: '',
    description: '',
    status: '0',
  });
  const [actionSubmit, setActionSubmit] = useState('Tạo mới');
  const [dataCreateOrUpdatePermission, setDataCreateOrUpdate] = useState<
    string[] | []
  >([]);

  const handleCloseModal = () => {
    setIsShow(false);
    setRole({
      id: '',
      name: '',
      description: '',
      status: '0',
    });
    onClose && onClose();
  };
  const handleCancelRequest = () => {
    handleCloseModal();
    setIsShow(false);
    setRole({
      id: '',
      name: '',
      description: '',
      status: '0',
    });
    onClose && onClose();
  };
  const [descriptionError, setDescriptionError] = useState('');
  const [statusError, setStatusError] = useState('');
  useEffect(() => {
    if (detailRole) {
      setRoles([detailRole]);
    } else {
      setRoles(rolesStage);
    }
  }, [rolesStage]);

  useEffect(() => {
    setDescriptionError('');
    setStatusError('');
    setIsShow(show);
    if (show) {
      getListPermissionOfRole({ roleId: roleId });
    }
    if (roles) {
      const roleSelected = roles.find(role => role.id === roleId);
      setRole({
        id: roleSelected?.id ?? '',
        name: roleSelected?.name ?? '',
        status: roleSelected?.status ?? '0',
        description: roleSelected?.description ?? '',
      });
      if (detailRole) {
        setRole(detailRole);
      }
    }
    roleId == ''
      ? setActionSubmit(translate('createNew'))
      : setActionSubmit(translate('update'));
  }, [show]);
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == 'description') {
      if (value.length < 3) {
        setDescriptionError('Tên role phải có ít nhất 3 ký tự.');
      } else {
        setDescriptionError('');
      }
      setRole({ ...role, description: value });
    }
    if (name == 'status') {
      if (value === '0') {
        setStatusError('Trạng thái Không được để trống.');
      } else {
        setStatusError('');
      }
      setRole({ ...role, status: value });
    }
  };
  const handleCreateOrUpdateRole = rolePermissionCreateOrUpdate => {
    const data: string[] = [];
    for (const itemPermissions of rolePermissionCreateOrUpdate) {
      for (const item of itemPermissions.permissions) {
        if (item.enable === true) {
          data.push(item.name);
        }
      }
    }
    setDataCreateOrUpdate(data);
  };
  const handleCreateOrUpdateRolePermission = () => {
    if (!role.description || !role.status || role.status == '0') {
      toast.error('Cần nhập đầy đủ các trường bắt buộc');
      return;
    }
    createOrUpdateRolePermissions({
      role: {
        id: role.id,
        description: role.description,
        status: role.status,
      },
      permissions: dataCreateOrUpdatePermission,
    });
    if (updateDetail) {
      updateDetail({
        id: role.id,
        name: role.name,
        description: role.description,
        status: role.status,
        permissions: dataCreateOrUpdatePermission,
      });
    }
  };
  const { t } = useTranslation();
  return (
    <CommonModal isShow={isShow}>
      <div className="modal-content rounded">
        <div className="modal-header pb-0 border-0 justify-content-end">
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <i
              className="ki-outline ki-cross fs-1"
              onClick={handleCloseModal}
            ></i>
          </div>
        </div>
        <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <div className="mb-13 text-left">
            <h1 className="mb-3">{t('createRole')}</h1>
          </div>
          <div className="row g-9 mb-3">
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('nameRole')}
              </label>
              <input
                type="text"
                className="form-control form-control-solid"
                placeholder={t('nameRole')}
                name="description"
                value={role.description}
                onChange={handleInputChange}
              />
              <span className="error">{descriptionError}</span>
            </div>
            <div className="col-md-6 fv-row">
              <label className="required fs-6 fw-semibold mb-2">
                {t('status')}
              </label>
              <select
                className="form-select form-select-solid"
                data-control="select2"
                data-hide-search="true"
                data-placeholder="Chọn trạng thái"
                name="status"
                value={role.status}
                onChange={handleInputChange}
              >
                {map(statuses, (statusItem, idx) => (
                  <option value={statusItem.value} key={idx}>
                    {statusItem.label}
                  </option>
                ))}
              </select>
              <span className="error">{statusError}</span>
            </div>
          </div>
          <hr />
          <div className="mb-13 text-left">
            <DetailPermissionInRoleComponent
              onCreateOrUpdateRole={handleCreateOrUpdateRole}
            />
          </div>
          <hr />
          <div className="text-end">
            <button
              type="reset"
              className="btn btn-bg-secondary me-3 h-40px fs-7 fw-bold"
              onClick={handleCancelRequest}
            >
              <span className="indicator-label">{t('rejected')}</span>
            </button>
            <button
              className="btn btn-flex btn-primary h-40px fs-7 fw-bold"
              onClick={handleCreateOrUpdateRolePermission}
            >
              <span className="indicator-label">{actionSubmit}</span>
            </button>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

const mapStateToProps = ({ manageRole }) => ({
  rolesStage: manageRole.roles,
  paginateStage: manageRole.paginate,
});
const mapDispatchToProps = dispatch => {
  return {
    getListPermissionOfRole: payload =>
      dispatch({
        type: `${manageRoleActions.getListPermissionOfRolePending.type}_saga`,
        payload,
      }),
    createOrUpdateRolePermissions: payload =>
      dispatch({
        type: `${manageRoleActions.createOrUpdateRolePermissionsPending.type}_saga`,
        payload,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateUpdateRoleComponent);
