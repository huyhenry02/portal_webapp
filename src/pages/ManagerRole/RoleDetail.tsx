import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  useFetchPermissionByRoleId,
  useFetchRoleById,
} from '../../hooks/_RoleQuery';
import { toast } from 'react-toastify';
import { every, get, map } from 'lodash';
import { IPageTitle, IPermission } from '../../stores/types';
import './RoleDetail.css';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import ConfirmModal from '../../layouts/commons/confirmModal/ConfirmModel';
import CreateUpdateRoleComponent from '../../layouts/components/roles/CreateUpdateRoleComponent';
import { manageRoleActions } from '../../stores/slices/manageRole.slice';
import { connect } from 'react-redux';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';

type IRoleDetail = {
  id: string;
  name: string;
  description: string;
  status: string;
  permissions: string[];
};

type IRole = {
  name: string;
  description: string;
  permissions: IListPermissions;
};

type IListPermissions = {
  id: string;
  description: string;
  name: string;
  permissions: IPermission;
}[];

const pageTitle: IPageTitle = {
  label: translate('informationRolePermission'),
  links: [
    {
      name: translate('home'),
      path: '/',
    },
    {
      name: translate('rolePermission'),
      path: '/role-permission/role',
    },
  ],
};

const RoleDetail = ({
  deleteRole,
  createOrUpdateStatus,
  updateCreateOrUpdateStatus,
}) => {
  const [roleDetail, setRoleDetail] = useState<IRoleDetail>({} as IRoleDetail);
  const [listPermission, setListPermission] = useState<IRole[]>({} as IRole[]);
  const [roleId, setRoleId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowCreateUpdateRoleModal, setIsShowCreateUpdateRoleModal] =
    useState(false);
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState<boolean>(false);
  const { id } = useParams();
  const {
    isError: isErrorFetchRole,
    error: errorFetchRole,
    data: responseFetchRole,
    isSuccess: isSuccessFetchRole,
  } = useFetchRoleById(id);
  const {
    isError: isErrorFetchPermission,
    error: errorFetchPermission,
    data: responseFetchPermission,
    isSuccess: isSuccessFetchPermission,
  } = useFetchPermissionByRoleId(id);
  if (isErrorFetchRole || isErrorFetchPermission) {
    toast.error(
      get(errorFetchRole || errorFetchPermission, 'message', 'Server Error'),
      { toastId: 1 },
    );
  }

  const updateDetail = (params: IRoleDetail) => {
    setRoleDetail(params);
  };
  const handleCloseModalCreateUpdateRole = () => {
    setIsShowCreateUpdateRoleModal(false);
  };
  const confirmDeleteRole = () => {
    deleteRole({
      roleId: roleId,
    });
    setIsShowConfirmDeleteModal(false);
  };
  const handleEditRole = () => {
    setIsShowCreateUpdateRoleModal(prev => !prev);
  };
  const handleCloseModalConfirmDelete = () => {
    setIsShowConfirmDeleteModal(false);
  };

  const handleMessageDeleteRole = () => {
    return (
      translate('confirm_delete') +
      ': " ' +
      (roleDetail?.description ?? '') +
      ' "'
    );
  };

  const handleBeforeDeleteRole = () => {
    setIsShowConfirmDeleteModal(true);
  };

  useEffect(() => {
    if (isSuccessFetchPermission && responseFetchPermission?.data?.data) {
      const roles = responseFetchPermission?.data?.data;
      setListPermission(
        roles.map((role: IRole) => ({
          name: role.name,
          description: role.description,
          permissions: role.permissions.map(permission => {
            return {
              id: permission.id,
              name: permission.name,
              description: permission.description,
            };
          }),
        })),
      );
    }
  }, [isSuccessFetchPermission]);

  useEffect(() => {
    if (isSuccessFetchRole && responseFetchRole?.data?.data) {
      const role = responseFetchRole?.data?.data;
      setRoleDetail({
        id: role.id,
        name: role.name,
        description: role.description,
        status: role.status,
        permissions: role?.permissions.map(
          (permission: { name: string }) => permission.name,
        ),
      });
      if (isLoading) {
        setIsLoading(false);
      }
      setRoleId(role.id);
    }
  }, [isSuccessFetchRole]);

  useEffect(() => {
    if (createOrUpdateStatus) {
      updateCreateOrUpdateStatus(!createOrUpdateStatus);
      setIsShowCreateUpdateRoleModal(prev => !prev);
    }
  }, [createOrUpdateStatus]);

  const { t } = useTranslation();
  return (
    <div className="app-container mt-2">
      <div className="card mb-5 mb-xl-10">
        <div className="card-header cursor-pointer">
          <PageTitle pageTitle={pageTitle} />
          <div className="d-flex align-items-center">
            <a
              href="#"
              className="btn btn-sm btn-primary align-self-center me-2"
              onClick={handleEditRole}
            >
              {t('edit')}
            </a>
            <a
              href="#"
              className="btn btn-sm btn-danger align-self-center"
              onClick={handleBeforeDeleteRole}
            >
              {t('delete')}
            </a>
          </div>
        </div>
        <div className="card-body pt-9 pb-0">
          <div className="row mb-7">
            <label className="col-lg-2 fw-semibold text-muted">
              {t('nameRolePermission')}
            </label>
            <div className="col-lg-4">
              <span className="fw-bold fs-6 text-gray-800">
                {roleDetail?.name}
              </span>
            </div>
            <label className="col-lg-2 fw-semibold text-muted">
              {t('describe')}
            </label>
            <div className="col-lg-4">
              <span className="fw-bold fs-6 text-gray-800">
                {roleDetail?.description}
              </span>
            </div>
          </div>
        </div>
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">{t('detailRolePermission')}</h3>
          </div>
        </div>
        <div className="card-body pt-9 pb-0">
          <div className="g-9 mb-3 list-permission overflow-auto">
            {listPermission.length > 0 && roleDetail?.permissions ? (
              map(listPermission, (item, idx) => (
                <div key={idx}>
                  <label className="form-check form-check-custom form-check-solid align-items-start mb-3">
                    <input
                      className="form-check-input me-3"
                      type="checkbox"
                      checked={
                        item?.permissions.length > 0 &&
                        every(
                          item.permissions,
                          x => roleDetail?.permissions.includes(x.name),
                        )
                      }
                      disabled={true}
                    />
                    <span className="d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">
                        {item.description}
                      </span>
                    </span>
                  </label>
                  {item?.permissions.length ? (
                    map(item.permissions, (permission, pIdx) => (
                      <div key={`${idx}_${pIdx}`}>
                        <label className="form-check form-check-custom form-check-solid align-items-start mb-3 ms-10">
                          <input
                            className="form-check-input me-3"
                            type="checkbox"
                            checked={
                              roleDetail?.permissions.length > 0 &&
                              roleDetail?.permissions.includes(permission.name)
                            }
                            disabled={true}
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
          <CreateUpdateRoleComponent
            show={isShowCreateUpdateRoleModal}
            roleId={roleId}
            onClose={handleCloseModalCreateUpdateRole}
            detailRole={{ ...roleDetail, createdAt: '' }}
            updateDetail={updateDetail}
          />
        </div>
      </div>
      <DefaultLoading isShow={isLoading} />
      {isShowConfirmDeleteModal ? (
        <ConfirmModal
          show={isShowConfirmDeleteModal}
          onConfirm={confirmDeleteRole}
          onClose={handleCloseModalConfirmDelete}
          title={t('delete')}
          action={'delete'}
          message={handleMessageDeleteRole()}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ manageRole }) => ({
  createOrUpdateStatus: manageRole.createOrUpdateStatus,
});

const mapDispatchToProps = dispatch => {
  return {
    deleteRole: payload =>
      dispatch({
        type: `${manageRoleActions.deleteRolePending.type}_saga`,
        payload,
      }),
    updateCreateOrUpdateStatus: payload =>
      dispatch({
        type: `${manageRoleActions.updateCreateOrUpdateStatusStage.type}`,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetail);
