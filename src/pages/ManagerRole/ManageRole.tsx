import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RoleTableComponent from '../../layouts/components/roles/RoleTableComponent';
import {
  IPaginateResponse,
  IRole,
  manageRoleActions,
} from '../../stores/slices/manageRole.slice';
import { connect } from 'react-redux';
import { DEFAULT_PER_PAGE } from '../../constants/constant';
import CreateUpdateRoleComponent from '../../layouts/components/roles/CreateUpdateRoleComponent';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { IPageTitle } from '../../stores/types';
import Paginate from '../../layouts/commons/paginate/Paginate';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import ConfirmModal from '../../layouts/commons/confirmModal/ConfirmModel';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';

const ManageRole = ({
  getListRole,
  rolesState,
  paginateState,
  deleteRole,
  deleteStatusStage,
  updateDeleteStatusStage,
  createOrUpdateStatusStage,
  updateCreateOrUpdateStatusStage,
  isLoading,
}) => {
  const pageTitle: IPageTitle = {
    label: translate('role'),
    links: [
      {
        name: translate('home'),
        path: '/',
      },
      {
        name: translate('rolePermission'),
        path: '/role-permission',
      },
    ],
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roles, setRole] = useState<IRole[]>([]);
  const [isShowCreateUpdateRoleModal, setIsShowCreateUpdateRoleModal] =
    useState(false);
  const [roleId, setRoleId] = useState<string>('');
  const [roleIdDelete, setRoleIdDelete] = useState<string>('');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState<boolean>(false);
  const handleEditRole = (id = '') => {
    setRoleId(id);
    setIsShowCreateUpdateRoleModal(prev => !prev);
  };
  const handleAddRole = () => {
    setRoleId('');
    setIsShowCreateUpdateRoleModal(prev => !prev);
  };
  const handleCloseModalCreateUpdateRole = (submitSuccess?: boolean) => {
    setIsShowCreateUpdateRoleModal(false);
    if (submitSuccess) {
      getListRole({ perPage: DEFAULT_PER_PAGE, page: currentPage });
    }
  };
  const handlerChangePage = page => {
    getListRole({ perPage: DEFAULT_PER_PAGE, page: page + 1 });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', page + 1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.history.replaceState(null, null, `?${queryParams.toString()}`);
  };
  useEffect(() => {
    if (!isLoadDefault) {
      getListRole({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
      });
      setIsLoadDefault(true);
    }
  }, []);
  useEffect(() => {
    setRole(rolesState);
  }, [rolesState]);
  useEffect(() => {
    setRoleId('');
  });
  useEffect(() => {
    setPaginate(paginateState);
  }, [paginateState]);
  useEffect(() => {
    setCurrentPage(paginate?.current_page ?? 1);
  }, [paginate]);

  useEffect(() => {
    if (createOrUpdateStatusStage) {
      getListRole({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
      });
      updateCreateOrUpdateStatusStage(!createOrUpdateStatusStage);
      setIsShowCreateUpdateRoleModal(prev => !prev);
    }
  }, [createOrUpdateStatusStage]);
  const confirmDeleteRole = () => {
    deleteRole({
      roleId: roleIdDelete,
    });
  };
  const handleCloseModalConfirmDelete = () => {
    setIsShowConfirmDeleteModal(false);
    setRoleIdDelete('');
  };

  const handleBeforeDeleteRole = (roleId: string) => {
    setRoleIdDelete(roleId);
    setIsShowConfirmDeleteModal(true);
  };
  const handleMessageDeleteRole = (roleId: string) => {
    const roleSelected = roles.find(role => role.id === roleId);
    return (
      translate('confirm_delete') +
      ': " ' +
      (roleSelected?.description ?? '') +
      ' "'
    );
  };
  useEffect(() => {
    if (deleteStatusStage) {
      getListRole({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
      });
      updateDeleteStatusStage(!deleteStatusStage);
      setRoleIdDelete('');
    }
  }, [deleteStatusStage]);
  const { t } = useTranslation();
  return (
    <>
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex align-items-stretch"
        >
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <PageTitle pageTitle={pageTitle} />
            <div className="d-flex align-items-center gap-2 gap-lg-3">
              <a
                href="#"
                className="btn btn-flex btn-primary h-40px fs-7 fw-bold"
                onClick={handleAddRole}
              >
                {t('addRole')}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="card">
            <div className="tab-content">
              <RoleTableComponent
                data={roles}
                onEditRole={handleEditRole}
                onDeleteRole={handleBeforeDeleteRole}
                page={currentPage}
              />
            </div>
            <div className={'paginate'}>
              <hr />
              <div id="container"></div>
              {paginate?.total ? (
                <Paginate
                  itemsPerPage={DEFAULT_PER_PAGE}
                  total={paginate?.total ?? 0}
                  onClickItem={handlerChangePage}
                  currentPage={currentPage}
                />
              ) : null}
            </div>
          </div>
          <CreateUpdateRoleComponent
            show={isShowCreateUpdateRoleModal}
            roleId={roleId}
            onClose={handleCloseModalCreateUpdateRole}
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
          message={handleMessageDeleteRole(roleIdDelete)}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = ({ manageRole }) => ({
  rolesState: manageRole.roles,
  paginateState: manageRole.paginate,
  isLoading: manageRole.isLoading,
  isError: manageRole.isError,
  deleteStatusStage: manageRole.deleteStatus,
  createOrUpdateStatusStage: manageRole.createOrUpdateStatus,
});

const mapDispatchToProps = dispatch => {
  return {
    getListRole: payload =>
      dispatch({
        type: `${manageRoleActions.getListRolePending.type}_saga`,
        payload,
      }),
    deleteRole: payload =>
      dispatch({
        type: `${manageRoleActions.deleteRolePending.type}_saga`,
        payload,
      }),
    updateDeleteStatusStage: payload =>
      dispatch({
        type: `${manageRoleActions.updateDeleteStatusStage.type}`,
        payload,
      }),
    updateCreateOrUpdateStatusStage: payload =>
      dispatch({
        type: `${manageRoleActions.updateCreateOrUpdateStatusStage.type}`,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRole);
