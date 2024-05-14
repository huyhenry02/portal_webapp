import React, { useEffect, useState } from 'react';
import AppointmentRejectComponent from './AppointmentRejectComponent';
import AppointmentAcceptComponent from './AppointmentAcceptComponent';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import PageTitle from '../../commons/pageTilte/PageTitle';
import { IPageTitle } from '../../../stores/types';
import DefaultLoading from '../../commons/loading/DefaultLoading';
import { manageAppointmentActions } from '../../../stores/slices/manageAppointment.slice';
import { manageLogActions } from '../../../stores/slices/manageLog.slice';
import Log from '../../commons/log/Log';
import { map } from 'lodash';
import { logTitleType } from '../../../stores/types/manageLog';
import { logAppointment } from '../../../stores/types/manageLog';
import { translate } from '../../../translates/translate';
import { useTranslation } from 'react-i18next';

const statusColorMap = {
  pending: 'text-warning',
  rejected: 'text-danger',
  approved: 'text-primary',
  completed: 'text-primary',
  processing: 'text-success',
};
const statusMap = {
  'Chờ duyệt': 'pending',
  'Đã hủy': 'rejected',
  'Đã duyệt': 'approved',
  'Đã hoàn thành': 'completed',
  'Đang diễn ra': 'processing',
};
const pageTitle: IPageTitle = {
  label: translate('detailAppointment'),
  links: [
    {
      name: translate('home'),
      path: '/',
    },
    {
      name: translate('manageAppointment'),
      path: '/appointment',
    },
  ],
};

const AppointmentDetailComponent = ({
  appointmentDetail,
  getAppointmentDetail,
  isLoading,
}) => {
  const { id } = useParams();
  const [isShowRejectAppointment, setIsShowRejectAppointment] = useState(false);
  const [isShowAcceptAppointment, setIsShowAcceptAppointment] = useState(false);
  const [isShowLogAppointment, setIsShowLogAppointment] = useState(false);
  useEffect(() => {
    getAppointmentDetail(id);
  }, []);
  const { t } = useTranslation();
  return (
    <>
      {' '}
      <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-fluid d-flex align-items-stretch"
        >
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <PageTitle pageTitle={pageTitle} />
          </div>
          <div className="d-flex align-items-center ">
            <button
              className="btn btn-light-primary w-150px fw-bold"
              onClick={() => {
                setIsShowLogAppointment(true);
              }}
            >
              <i className="ki-duotone ki-time fs-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              {t('history')}
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div
            id="kt_app_content_container"
            className="app-container container-fluid"
          >
            <div className="table-responsive">
              <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
                <div className="card card-flush py-6 flex-row-fluid">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>{t('informationAppointment')}</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="table-responsive">
                      <table className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                        <tbody className="fw-semibold text-gray-600">
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('idAppointment')}
                              </div>
                            </td>
                            <td className="fw-bold text-end">{id}</td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('status')}
                              </div>
                            </td>
                            <td
                              className={`fw-bold text-end ${
                                statusColorMap[appointmentDetail?.status] ||
                                `text-danger`
                              }`}
                            >
                              {map(statusMap, (value, key) => {
                                if (value === appointmentDetail?.status) {
                                  return key;
                                }
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('startTime')}
                              </div>
                            </td>
                            <td className="fw-bold text-end">
                              {appointmentDetail?.start_time}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('endTime')}
                              </div>
                            </td>
                            <td className="fw-bold text-end">
                              {appointmentDetail?.end_time}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('address')}
                              </div>
                            </td>
                            <td className="fw-bold text-end"></td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('reason')}
                              </div>
                            </td>
                            <td className="fw-bold text-end">
                              {appointmentDetail?.reason}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="card card-flush py-6 flex-row-fluid">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>{t('appointmentInformation')}</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="table-responsive">
                      <table className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                        <tbody className="fw-semibold text-gray-600">
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('appointmentPerson')}
                              </div>
                            </td>
                            <td className="fw-bold text-end">
                              <div className="d-flex align-items-center justify-content-end">
                                <a
                                  href="#"
                                  className="text-gray-600 text-hover-primary"
                                >
                                  {appointmentDetail?.name}
                                </a>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('subsidiary')}
                              </div>
                            </td>
                            <td className="fw-bold text-end"></td>
                          </tr>
                          <tr>
                            <td className="text-muted">
                              <div className="d-flex align-items-center">
                                {t('jobTitle')}
                              </div>
                            </td>
                            <td className="fw-bold text-end"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {appointmentDetail &&
              (appointmentDetail?.status === 'rejected' ||
                appointmentDetail?.status === 'processing' ||
                appointmentDetail?.status === 'completed') ? null : (
                <div className="d-flex justify-content-end pt-7">
                  {appointmentDetail?.status === 'pending' ? (
                    <>
                      <button
                        type="reset"
                        className="btn btn-sm btn-light fw-bold btn-active-light-primary me-2"
                        data-kt-search-element="preferences-dismiss"
                        onClick={() => {
                          setIsShowRejectAppointment(true);
                        }}
                      >
                        {t('refuse')}
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm fw-bold btn-primary"
                        onClick={() => {
                          setIsShowAcceptAppointment(true);
                        }}
                      >
                        {t('confirm')}
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-sm fw-bold btn-primary"
                      onClick={() => {
                        setIsShowRejectAppointment(true);
                      }}
                    >
                      {t('rejectAppointment')}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <AppointmentRejectComponent
          show={isShowRejectAppointment}
          onClose={() => setIsShowRejectAppointment(prev => !prev)}
        />
        <AppointmentAcceptComponent
          show={isShowAcceptAppointment}
          onClose={() => setIsShowAcceptAppointment(prev => !prev)}
        />
      </div>
      <DefaultLoading isShow={isLoading} />
      <Log
        show={isShowLogAppointment}
        onClose={() => setIsShowLogAppointment(prev => !prev)}
        logKey={logTitleType.APPOINTMENT}
        logId={id}
        logTitle={logAppointment}
      />
    </>
  );
};

const mapStateToProps = ({ manageAppointment, manageLog }) => ({
  logs: manageLog.logs,
  appointmentDetail: manageAppointment.appointmentDetail,
  isLoading: manageAppointment.isLoading,
  isError: manageAppointment.isError,
  message: manageAppointment.message,
});

const mapDispatchToProps = dispatch => ({
  getAppointmentDetail: id =>
    dispatch({
      type: `${manageAppointmentActions.getAppointmentDetailPending.type}_saga`,
      payload: { id },
    }),
  getAppointmentLog: payload =>
    dispatch({
      type: `${manageLogActions.getLogPending.type}_saga`,
      payload,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentDetailComponent);
