import React, { useEffect, useState } from 'react';
import TabComponent from '../../layouts/components/tabs/TabComponent';
import AppointmentTableComponent from '../../layouts/components/appointment/AppointmentTableComponent';
import { DEFAULT_PER_PAGE } from '../../constants/constant';
import { manageAppointmentActions } from '../../stores/slices/manageAppointment.slice';
import { connect } from 'react-redux';
import PageTitle from '../../layouts/commons/pageTilte/PageTitle';
import { IPageTitle } from '../../stores/types';
import './Appointment.css';
import { IPaginateResponse } from '../../stores/slices/manageRole.slice';
import Paginate from '../../layouts/commons/paginate/Paginate';
import { useLocation } from 'react-router-dom';
import DefaultLoading from '../../layouts/commons/loading/DefaultLoading';
import { translate } from '../../translates/translate';

const tabs = [
  { id: 'all', label: translate('all') },
  { id: 'pending', label: translate('pending') },
  { id: 'approved', label: translate('approved') },
  { id: 'processing', label: translate('processing') },
  { id: 'completed', label: translate('completed') },
  { id: 'rejected', label: translate('rejected') },
];
const ManageAppointment = ({
  appointments,
  getListAppointment,
  paginateState,
  isLoading,
}) => {
  const pageTitle: IPageTitle = {
    label: translate('manageAppointment'),
    links: [
      {
        name: translate('home'),
        path: '/',
      },
    ],
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageParam = queryParams.get('page');
  const [paginate, setPaginate] = useState<IPaginateResponse | undefined>();
  const [isLoadDefault, setIsLoadDefault] = useState(false);
  const handleTabClick = tabKey => {
    setCurrentTab(tabKey);
    getListAppointment({
      perPage: DEFAULT_PER_PAGE,
      page: pageParam ?? currentPage,
      status: tabs[tabKey]?.id === 'all' ? undefined : tabs[tabKey]?.id,
    });
  };
  const handlerChangePage = page => {
    getListAppointment({ perPage: DEFAULT_PER_PAGE, page: page + 1 });
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
  useEffect(() => {
    if (!isLoadDefault) {
      getListAppointment({
        perPage: DEFAULT_PER_PAGE,
        page: pageParam ?? currentPage,
        status:
          tabs[currentTab]?.id === 'all' ? undefined : tabs[currentTab]?.id,
      });
      setIsLoadDefault(true);
    }
  }, []);
  return (
    <div className={'kt_app_content_appointment'}>
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex align-items-stretch"
        >
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <PageTitle pageTitle={pageTitle} />
          </div>
        </div>
      </div>
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="card">
            <div className="card-header card-header-stretch">
              <div className="card-toolbar m-0">
                <TabComponent
                  tabs={tabs}
                  currentTab={currentTab}
                  onChangeCurrentTab={handleTabClick}
                />
              </div>
            </div>
            <div className="tab-content">
              <AppointmentTableComponent
                key={currentTab}
                data={appointments}
                page={currentPage}
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
          </div>
        </div>
      </div>
      <DefaultLoading isShow={isLoading} />
    </div>
  );
};

const mapStateToProps = ({ manageAppointment }) => ({
  appointments: manageAppointment.appointments,
  paginateState: manageAppointment.paginate,
  isLoading: manageAppointment.isLoading,
  isError: manageAppointment.isError,
  message: manageAppointment.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListAppointment: payload =>
      dispatch({
        type: `${manageAppointmentActions.getListAppointmentPending.type}_saga`,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAppointment);
