import React, { useEffect, useRef, useState } from 'react';
import TabComponent from '../../layouts/components/tabs/TabComponent';
import ProfileTableComponent from '../../layouts/components/profiles/ProfileTableComponent';
import { manageProfileActions } from '../../stores/slices/manageProfile.slice';
import { connect } from 'react-redux';
import { DEFAULT_PER_PAGE } from '../../constants/constant';
import CreateAccountComponent from '../../layouts/components/profiles/CreateAccountComponent';
import {
  IEmployeeDetail,
  IPageTitle,
  IProfile,
  IRoles,
} from '../../stores/types';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { Link, useLocation } from 'react-router-dom';
import Paginate from '../../layouts/commons/paginate/Paginate';
import { IPaginateResponse } from '../../stores/slices/manageRole.slice';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';

import { translate } from '../../translates/translate';
import { useTranslation } from 'react-i18next';

const tabs = [
  { id: 1, label: translate('active') },
  { id: 2, label: translate('pause') },
  { id: 3, label: translate('all') },
];

const STATUS_ACTIVE = 'active';
const STATUS_DEACTIVATE = 'inactive';

const pageTitle: IPageTitle = {
  label: translate('manageElectronicRecord'),
  links: [
    {
      name: translate('home'),
      path: '/',
    },
  ],
};

const newAccount = {
  id: '',
  username: '',
  employeeId: '',
  roleId: '',
  fullName: '',
  email: '',
  position: '',
  status: '',
  createdAt: '',
};

const ManageProfile = ({
  profilesState,
  employeeDetailState,
  rolesState,
  getListEmployee,
  getEmployeeDetail,
  getListRoles,
  paginateState,
  isLoading,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();
  const pageParam = queryParams.get('page');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const [isShowCreateAccountModal, setIsShowCreateAccountModal] =
    useState(false);
  const [profiles, setProfile] = useState<IProfile[]>([]);
  const [employeeDetail, setEmployeeDetail] = useState<
    IEmployeeDetail | undefined
  >();
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [canCreateAccount, setCanCreateAccount] = useState(true);
  const [employeeIdSelected, setEmployeeIdSelected] = useState('');

  const handleClickItem = (profile, left: number, top: number) => {
    setX(top);
    setY(left);
    getEmployeeDetail({ employeeId: profile.id });
    setEmployeeIdSelected(profile.id);
    setCanCreateAccount(!profile.createdProfileAt);
  };

  const handleRemoveDbClickItem = () => {
    setX(undefined);
    setY(undefined);
  };

  const handleEditProfile = (profileId: string) => {
    console.log(profileId, 'handleEditProfile');
  };

  const handleDeleteProfile = (profileId: string) => {
    console.log(profileId, 'handleDeleteProfile');
  };

  useEffect(() => {
    if (!isLoadDefault) {
      getListEmployee({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status: STATUS_ACTIVE,
      });
      getListRoles();
      setIsLoadDefault(true);
    }
  }, []);

  useEffect(() => {
    if (isLoadDefault) {
      let status: string | undefined;
      if (currentTab === 0) {
        status = STATUS_ACTIVE;
      } else if (currentTab === 1) {
        status = STATUS_DEACTIVATE;
      }
      getListEmployee({ perPage: DEFAULT_PER_PAGE, page: currentPage, status });
    }
    handleRemoveDbClickItem();
  }, [currentTab]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleRemoveDbClickItem && handleRemoveDbClickItem();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleCloseModalCreateAccount = (submitSuccess?: boolean) => {
    setIsShowCreateAccountModal(prev => !prev);
    if (submitSuccess) {
      let status: string | undefined;
      if (currentTab === 0) {
        status = STATUS_ACTIVE;
      } else if (currentTab === 1) {
        status = STATUS_DEACTIVATE;
      }
      getListEmployee({ perPage: DEFAULT_PER_PAGE, page: currentPage, status });
    }
  };

  useEffect(() => {
    setProfile(profilesState);
  }, [profilesState]);

  useEffect(() => {
    setEmployeeDetail(employeeDetailState);
  }, [employeeDetailState]);

  useEffect(() => {
    setRoles(rolesState);
  }, [rolesState]);
  const handlerChangePage = page => {
    getListEmployee({ perPage: DEFAULT_PER_PAGE, page: page + 1 });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', page + 1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.history.replaceState(null, null, `?${queryParams.toString()}`);
  };
  useEffect(() => {
    setPaginate(paginateState);
  }, [paginateState]);
  useEffect(() => {
    setCurrentPage(paginate?.current_page ?? 1);
  }, [paginate]);
  const { t } = useTranslation();
  return (
    <div className="app-container" ref={ref}>
      <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100  pt-7 pt-lg-10 pb-5 pb-lg-8">
        <PageTitle pageTitle={pageTitle} />
        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <Link
            to="/manage_profile/create"
            className="menu-title btn btn-flex btn-primary h-40px fs-7 fw-bold"
          >
            {t('createdElectronicRecord')}
          </Link>
        </div>
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
          <ProfileTableComponent
            key={currentTab}
            data={profiles}
            onRemoveDbClickItem={handleRemoveDbClickItem}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
            onRClickItem={handleClickItem}
          />
        </div>
        <div className={'paginate'}>
          <hr />
          <div id="container"></div>
          <Paginate
            itemsPerPage={DEFAULT_PER_PAGE}
            total={paginate?.total ?? 0}
            onClickItem={handlerChangePage}
            currentPage={currentPage}
          />
        </div>

        <div
          className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-250px ${
            x && y ? 'show' : ''
          }`}
          data-kt-menu="true"
          style={{
            zIndex: 107,
            position: 'absolute',
            inset: '0px 0px auto auto',
            margin: '0px',
            top: x,
            left: y,
          }}
          data-popper-placement="bottom-end"
        >
          <div className="menu-item px-3">
            <a
              className={
                canCreateAccount ? 'menu-link px-3' : 'menu-link px-3 disabled'
              }
              href="#"
              onClick={() => {
                if (canCreateAccount) {
                  handleRemoveDbClickItem();
                  setIsShowCreateAccountModal(true);
                }
              }}
            >
              Tạo tài khoản
            </a>
          </div>

          <div className="separator opacity-75"></div>

          <div className="menu-item px-3">
            <a className="menu-link px-3" href="#">
              Cập nhật trạng thái hồ sơ
            </a>
          </div>
        </div>
      </div>

      <CreateAccountComponent
        employeeId={employeeIdSelected}
        show={isShowCreateAccountModal && !!employeeIdSelected}
        roles={roles}
        employeeDetail={employeeDetail}
        onClose={handleCloseModalCreateAccount}
        isUpdate={false}
        accountData={newAccount}
      />
      <DefaultLoading isShow={isLoading} />
    </div>
  );
};

const mapStateToProps = ({ manageProfile }) => ({
  profilesState: manageProfile.profiles,
  employeeDetailState: manageProfile.employeeDetail,
  paginateState: manageProfile.paginate,
  rolesState: manageProfile.roles,
  isLoading: manageProfile.isLoading,
  isError: manageProfile.isError,
  message: manageProfile.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListEmployee: payload =>
      dispatch({
        type: `${manageProfileActions.getListEmployeePending.type}_saga`,
        payload,
      }),
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfile);
