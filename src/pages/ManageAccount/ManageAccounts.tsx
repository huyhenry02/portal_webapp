import React, { useEffect, useState } from 'react';
import TabComponent from '../../layouts/components/tabs/TabComponent';
import {
  IAccount,
  IEmployeeDetail,
  IPageTitle,
  IRoles,
} from '../../stores/types';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { useFetchUsers, useUpdateUser } from '../../hooks/_userQuery';
import { toast } from 'react-toastify';
import { get, isArray, map } from 'lodash';
import ConfirmModal from '../../layouts/commons/confirmModal/ConfirmModel';
import AccountTableComponent from '../../layouts/components/users/AccountTableComponent';
import {
  FORMAT_YYYY_MM_DD,
  STATUS_ACTIVE,
  STATUS_DEACTIVATE,
} from '../../constants/constant';
import moment from 'moment';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';
import CreateAccountComponent from '../../layouts/components/profiles/CreateAccountComponent';
import { manageProfileActions } from '../../stores/slices/manageProfile.slice';
import { connect } from 'react-redux';

const tabs = [
  { id: 1, label: translate('active') },
  { id: 2, label: translate('pause') },
  { id: 3, label: translate('all') },
];

const pageTitle: IPageTitle = {
  label: translate('manageUser'),
  links: [
    {
      name: translate('home'),
      path: '/',
    },
  ],
};

const ManageAccounts = ({
  employeeDetailState,
  rolesState,
  getListRoles,
  getEmployeeDetail,
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage] = useState(0);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowConfirmPauseModal, setIsShowConfirmPauseModal] = useState(false);
  const [isShowConfirmActiveModal, setIsShowConfirmActiveModal] =
    useState(false);
  const [selected, setSelected] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [employeeDetail, setEmployeeDetail] = useState<
    IEmployeeDetail | undefined
  >();
  const [roles, setRoles] = useState<IRoles[]>([]);
  const {
    isLoading: isLoadingUsers,
    isError: isErrorFetchUsers,
    error: errorFetchUsers,
    data: responseFetchUsers,
    isSuccess: isSuccessFetchUsers,
    isRefetching: isRefetchingUser,
    refetch: reFectchUsers,
  } = useFetchUsers({ currentTab, currentPage });

  const {
    mutate: updateUser,
    isLoading: isLoadingUpdateUser,
    isSuccess: isSuccessUpdateUser,
  } = useUpdateUser();

  if (isErrorFetchUsers) {
    toast.error(get(errorFetchUsers, 'message', 'Server Error'), {
      toastId: 1,
    });
  }

  useEffect(() => {
    if (
      !isLoadingUsers &&
      isSuccessFetchUsers &&
      isArray(responseFetchUsers?.data?.data)
    ) {
      setAccounts(
        map(responseFetchUsers?.data?.data, user => ({
          id: user.id,
          username: user.username,
          employeeId: user.employee_id,
          roleId: user.role_id,
          fullName: user.name,
          email: user.email,
          position: user.position,
          status: user.status,
          createdAt: moment(user.created_at).format(FORMAT_YYYY_MM_DD),
        })),
      );
    }
  }, [isLoadingUsers, isRefetchingUser]);

  useEffect(() => {
    setEmployeeDetail(employeeDetailState);
  }, [employeeDetailState]);
  useEffect(() => {
    setRoles(rolesState);
  }, [rolesState]);

  const handleClickPauseAccount = (id: string) => {
    setIsShowConfirmPauseModal(true);
    setSelected(id);
  };
  const handleClickActiveAccount = (id: string) => {
    setIsShowConfirmActiveModal(true);
    setSelected(id);
  };
  const handleClickEditAccount = (account: IAccount) => {
    setIsShowEditModal(true);
    setSelected(account.id);
    setSelectedEmployeeId(account.employeeId);
    setSelectedAccount(account);
    getListRoles();
    getEmployeeDetail({ employeeId: account.employeeId });
  };
  const handlePauseAccount = () => {
    if (selected) {
      updateUser({ user_id: selected, status: STATUS_DEACTIVATE });
    }
  };
  const handleActiveAccount = () => {
    if (selected) {
      updateUser({ user_id: selected, status: STATUS_ACTIVE });
    }
  };

  useEffect(() => {
    if (isLoadingUpdateUser) {
      return;
    }
    if (isSuccessUpdateUser) {
      setIsShowConfirmPauseModal(false);
      setIsShowConfirmActiveModal(false);
      reFectchUsers();
    }
  }, [isLoadingUpdateUser]);

  const { t } = useTranslation();
  return (
    <div className="app-container">
      <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100  pt-7 pt-lg-10 pb-5 pb-lg-8">
        <PageTitle pageTitle={pageTitle} character=">" />
      </div>
      <div className="card">
        <div className="card-header card-header-stretch">
          <div className="card-toolbar m-0">
            <TabComponent
              tabs={tabs}
              currentTab={currentTab}
              onChangeCurrentTab={tab => setCurrentTab(tab)}
            />
          </div>
        </div>

        <div className="tab-content">
          <AccountTableComponent
            key={currentTab}
            onPauseAccount={handleClickPauseAccount}
            onActiveAccount={handleClickActiveAccount}
            onEditAccount={handleClickEditAccount}
            data={accounts}
          />
        </div>
        {isShowConfirmPauseModal ? (
          <ConfirmModal
            show={isShowConfirmPauseModal}
            onConfirm={handlePauseAccount}
            onClose={() => {
              setIsShowConfirmPauseModal(false);
              setSelected('');
            }}
            title={t('pauseAccount')}
            action="pause"
            message="Bạn có chắc chắn muốn tạm dừng tài khoản này không?"
            width="450"
          />
        ) : (
          <></>
        )}
        {isShowEditModal && selectedAccount ? (
          <CreateAccountComponent
            key={selected}
            employeeId={selectedEmployeeId}
            show={isShowEditModal && !!selected}
            roles={roles}
            employeeDetail={employeeDetail}
            isUpdate={true}
            accountData={selectedAccount}
            onClose={() => {
              setIsShowEditModal(false);
              setSelected('');
              setSelectedAccount(undefined);
            }}
          />
        ) : (
          <></>
        )}
        {isShowConfirmActiveModal ? (
          <ConfirmModal
            show={isShowConfirmActiveModal}
            onConfirm={handleActiveAccount}
            onClose={() => {
              setIsShowConfirmActiveModal(false);
              setSelected('');
            }}
            title={t('activeAccount')}
            action="update"
            message="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
            width="450"
          />
        ) : (
          <></>
        )}
      </div>
      <DefaultLoading isShow={isLoadingUsers} />
    </div>
  );
};

const mapStateToProps = ({ manageProfile }) => ({
  employeeDetailState: manageProfile.employeeDetail,
  rolesState: manageProfile.roles,
  isLoading: manageProfile.isLoading,
  isError: manageProfile.isError,
  message: manageProfile.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeDetail: payload =>
      dispatch({
        type: `${manageProfileActions.getEmployeeDetailPending.type}_saga`,
        payload,
      }),
    getListRoles: () =>
      dispatch({
        type: `${manageProfileActions.getListRolePending.type}_saga`,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccounts);
