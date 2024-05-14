import React, { useEffect, useState } from 'react';
import { manageLogActions } from '../../../stores/slices/manageLog.slice';
import { connect } from 'react-redux';
import { get, map } from 'lodash';
import {
  ILog,
  LogTitle,
  LogTitleCurriculumVitae,
} from '../../../stores/types/manageLog';
import './Log.css';
import { EVENT_TYPE } from '../../../constants/constant';
import { useTranslation } from 'react-i18next';

type ILocComponent = {
  show?: boolean;
  onClose?: () => void;
  getLog: (payload: { id: string | undefined; key: string }) => void;
  logKey: string;
  logId: string | undefined;
  logs: ILog[];
  logTitle?: LogTitle | LogTitleCurriculumVitae;
};
const Log: React.FC<ILocComponent> = ({
  show = false,
  onClose,
  logs,
  getLog,
  logId,
  logKey,
  logTitle,
}) => {
  const [isShow, setIsShow] = useState(false);
  const handleCloseLog = () => {
    setIsShow(false);
    onClose && onClose();
  };
  useEffect(() => {
    setIsShow(show);
    if (show) {
      getLog({ id: logId, key: logKey });
    }
  }, [show]);
  const { t } = useTranslation();
  return (
    <>
      <div
        className={
          isShow
            ? 'bg-body drawer drawer-on drawer-end bg-body-custom manage-log'
            : 'bg-body drawer drawer-end bg-body-custom manage-log'
        }
        style={{ display: isShow ? 'block' : 'none' }}
      >
        <div className="card w-100 border-0 rounded-0">
          <div
            className="card-header pe-5"
            id="kt_drawer_chat_messenger_header"
          >
            <div className="card-title">
              <div className="d-flex justify-content-center flex-column me-3">
                {logTitle && logTitle.title ? (
                  <a
                    href="#"
                    className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                  >
                    {logTitle.title}
                  </a>
                ) : (
                  <a
                    href="#"
                    className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                  >
                    {t('history')}
                  </a>
                )}
              </div>
            </div>
            <div className="card-toolbar">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                id="kt_drawer_chat_close"
              >
                <i
                  className="ki-outline ki-cross-square fs-2"
                  onClick={handleCloseLog}
                ></i>
              </div>
            </div>
          </div>
          <div className="card-body" id="kt_drawer_chat_messenger_body">
            <div className="tab-content">
              <div
                id="kt_activity_today"
                className="card-body p-0 tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="kt_activity_today_tab"
              >
                <div className="timeline">
                  {map(logs, (log, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-line w-40px"></div>
                      <div className="timeline-icon symbol symbol-circle symbol-40px me-4">
                        <div className="symbol-label bg-light">
                          <i className="ki-outline ki-pencil fs-2 text-gray-500"></i>
                        </div>
                      </div>
                      <div className="timeline-content mb-10 mt-n1">
                        <div className="pe-3 mb-5">
                          <div className="fs-5 fw-semibold mb-2">
                            {EVENT_TYPE[log?.event] ?? 'Event not available'}
                          </div>
                          <div className="d-flex align-items-center mt-1 fs-6">
                            <div className="text-muted me-2 fs-7">
                              {EVENT_TYPE[log?.event]
                                ? ` Thời gian: ${log?.created_at}`
                                : 'Event details not available'}
                            </div>
                          </div>
                          <div className="">
                            <div className=" ">
                              {logTitle?.fields?.employee
                                ? logTitle.fields.employee.map(item => {
                                    if (
                                      get(log, `employee.${item.key}`) !==
                                      undefined
                                    ) {
                                      return (
                                        <div key={item.key}>
                                          <div className=" d-flex">
                                            <div className="">
                                              {item.title}:
                                            </div>
                                            <div className="">
                                              {log?.employee?.[item.key] ||
                                                'Không có'}
                                            </div>
                                          </div>
                                          {/* <div className="separator separator-dashed my-3"></div> */}
                                        </div>
                                      );
                                    }
                                  })
                                : 'User not available'}
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex align-items-center border border-dashed border-gray-400 rounded">
                            <div className="card-body p-4">
                              {(() => {
                                switch (log?.event) {
                                  case 'update':
                                    return (
                                      <>
                                        {Array.isArray(
                                          logTitle?.fields.new_data,
                                        ) ? (
                                          logTitle?.fields.new_data.map(
                                            (data, key) => (
                                              <div key={key}>
                                                <div className="">
                                                  {(() => {
                                                    switch (data.key) {
                                                      case 'position':
                                                        return <div>demo</div>;
                                                      default:
                                                        console.log(
                                                          log.new_data[
                                                            data.key
                                                          ],
                                                        );
                                                        if (
                                                          typeof log.new_data[
                                                            data.key
                                                          ] === 'object'
                                                        ) {
                                                          const new_working =
                                                            log.new_data[
                                                              data.key
                                                            ];

                                                          const old_working =
                                                            log.old_data[
                                                              data.key
                                                            ];

                                                          let new_dt;
                                                          let old_dt;

                                                          Object.entries(
                                                            new_working,
                                                          ).map(
                                                            ([, value]) =>
                                                              (new_dt = value),
                                                          );

                                                          Object.entries(
                                                            old_working || {},
                                                          ).map(
                                                            ([, value]) =>
                                                              (old_dt = value),
                                                          );

                                                          return (
                                                            <>
                                                              <div>
                                                                {Object.entries(
                                                                  new_dt,
                                                                ).map(
                                                                  ([key]) => (
                                                                    <div
                                                                      key={key}
                                                                    >
                                                                      <div>
                                                                        {(() => {
                                                                          switch (
                                                                            key
                                                                          ) {
                                                                            case 'demo':
                                                                              return (
                                                                                <div></div>
                                                                              );
                                                                            default:
                                                                              console.log(
                                                                                'old data: ',
                                                                                old_dt,
                                                                              );

                                                                              console.log(
                                                                                'new data: ',
                                                                                new_dt,
                                                                              );

                                                                              return (
                                                                                <>
                                                                                  <div>
                                                                                    {`${key} :`}
                                                                                  </div>
                                                                                  <div className=" fw-semibold w-100">
                                                                                    <div className="d-flex justify-content-between ">
                                                                                      <div
                                                                                        className=""
                                                                                        style={{
                                                                                          wordWrap:
                                                                                            'break-word',
                                                                                        }}
                                                                                      >
                                                                                        {old_dt &&
                                                                                        old_dt[
                                                                                          key
                                                                                        ]
                                                                                          ? old_dt[
                                                                                              key
                                                                                            ]
                                                                                          : ''}
                                                                                      </div>
                                                                                      <div>
                                                                                        <i
                                                                                          className="fas fa-arrow-right-long fs-2"
                                                                                          style={{
                                                                                            color:
                                                                                              'black',
                                                                                          }}
                                                                                        ></i>
                                                                                      </div>
                                                                                      <div>
                                                                                        {new_dt &&
                                                                                        new_dt[
                                                                                          key
                                                                                        ]
                                                                                          ? new_dt[
                                                                                              key
                                                                                            ]
                                                                                          : ''}
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </>
                                                                              );
                                                                          }
                                                                        })()}
                                                                      </div>
                                                                    </div>
                                                                  ),
                                                                )}
                                                              </div>
                                                            </>
                                                          );
                                                        } else {
                                                          return (
                                                            <>
                                                              <div className=" fw-semibold w-100">
                                                                {log?.new_data[
                                                                  data.key
                                                                ] ? (
                                                                  <>
                                                                    <div>{`${data.key} :`}</div>
                                                                    <div className="d-flex justify-content-between">
                                                                      <div
                                                                        className=""
                                                                        style={{
                                                                          wordWrap:
                                                                            'break-word',
                                                                        }}
                                                                      >
                                                                        {get(
                                                                          log?.old_data,
                                                                          data.key,
                                                                          '',
                                                                        )}
                                                                      </div>
                                                                      <div>
                                                                        <i
                                                                          className="fas fa-arrow-right-long fs-2"
                                                                          style={{
                                                                            color:
                                                                              'black',
                                                                          }}
                                                                        ></i>
                                                                      </div>
                                                                      <div>
                                                                        {get(
                                                                          log?.new_data,
                                                                          data.key,
                                                                          '',
                                                                        )}
                                                                      </div>
                                                                    </div>
                                                                  </>
                                                                ) : (
                                                                  <div></div>
                                                                )}
                                                              </div>
                                                            </>
                                                          );
                                                        }
                                                    }
                                                  })()}
                                                </div>
                                              </div>
                                            ),
                                          )
                                        ) : (
                                          <>
                                            {Object.entries(
                                              logTitle?.fields.new_data || {},
                                            ).map(([key]) => (
                                              <div key={key}>
                                                <div className="d-flex flex-stack">
                                                  {(() => {
                                                    switch (key) {
                                                      case 'position':
                                                        return (
                                                          <>
                                                            <div className="text-gray-700 fw-bold fs-6 me-2">
                                                              {key}
                                                            </div>
                                                            <div className="d-flex fw-semibold align-items-center">
                                                              {get(
                                                                log?.new_data,
                                                                `${key}.name`,
                                                                '',
                                                              )}
                                                            </div>
                                                          </>
                                                        );
                                                      case 'contract_working_histories':
                                                        return (
                                                          <>
                                                            <div className="text-gray-700 fw-bold fs-6 me-2">
                                                              {key}
                                                            </div>
                                                            <div className="d-flex fw-semibold align-items-center">
                                                              mimi
                                                            </div>
                                                          </>
                                                        );
                                                      default:
                                                        console.log(
                                                          log?.new_data[key],
                                                        );
                                                        if (
                                                          typeof log?.new_data[
                                                            key
                                                          ] === 'object'
                                                        ) {
                                                          return (
                                                            <>
                                                              <div>{key}</div>
                                                            </>
                                                          );
                                                        } else {
                                                          return (
                                                            <>
                                                              <div className="text-gray-700 fw-bold fs-6 me-2"></div>
                                                              <div className=" fw-semibold w-100">
                                                                {log?.new_data[
                                                                  key
                                                                ] ? (
                                                                  <>
                                                                    <div>{`${key} :`}</div>
                                                                    <div className="d-flex justify-content-between">
                                                                      <div
                                                                        className=""
                                                                        style={{
                                                                          wordWrap:
                                                                            'break-word',
                                                                        }}
                                                                      >
                                                                        {get(
                                                                          log?.old_data,
                                                                          key,
                                                                          '',
                                                                        )}
                                                                      </div>
                                                                      <div>
                                                                        <i
                                                                          className="fas fa-arrow-right-long fs-2"
                                                                          style={{
                                                                            color:
                                                                              'black',
                                                                          }}
                                                                        ></i>
                                                                      </div>
                                                                      <div>
                                                                        {get(
                                                                          log?.new_data,
                                                                          key,
                                                                          '',
                                                                        )}
                                                                      </div>
                                                                    </div>
                                                                  </>
                                                                ) : (
                                                                  <div></div>
                                                                )}
                                                              </div>
                                                            </>
                                                          );
                                                        }
                                                    }
                                                  })()}
                                                </div>
                                                {log?.new_data[key] ? (
                                                  <div className="separator separator-dashed my-3"></div>
                                                ) : (
                                                  ''
                                                )}
                                              </div>
                                            ))}
                                          </>
                                        )}
                                      </>
                                    );
                                  case 'delete':
                                    return (
                                      <div>
                                        <div className="d-flex flex-column flex-center">
                                          <div className="d-flex fw-bold align-items-center fs-md-5">
                                            Đã xóa dữ liệu
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  case 'create':
                                    return (
                                      <div>
                                        <div className="d-flex flex-column flex-center">
                                          <div className="d-flex fw-bold align-items-center fs-md-5">
                                            Đã tạo dữ liệu
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  default:
                                    return <></>;
                                }
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShow && <div className="drawer-overlay"></div>}
    </>
  );
};

const mapStateToProps = ({ manageLog }) => ({
  logs: manageLog.logs,
  isLoading: manageLog.isLoading,
  isError: manageLog.isError,
  message: manageLog.message,
});

const mapDispatchToProps = dispatch => ({
  getLog: payload =>
    dispatch({
      type: `${manageLogActions.getLogPending.type}_saga`,
      payload,
    }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Log);
