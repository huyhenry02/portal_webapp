import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { IAppointment } from '../../../stores/types/manageAppointment';
import '../../../pages/ManageAppointment/Appointment.css';
import { translate } from '../../../translates/translate';
const labels = [
  { id: 1, name: translate('stt'), className: 'min-w-50px text-left' },
  { id: 2, name: translate('appointee'), className: 'min-w-125px text-center' },
  { id: 3, name: translate('email'), className: 'min-w-60px text-center' },
  { id: 4, name: translate('status'), className: 'min-w-125px text-center' },
  { id: 5, name: translate('startTime'), className: 'min-w-125px text-center' },
  { id: 6, name: translate('endTime'), className: 'min-w-125px text-center' },
  { id: 7, name: translate('createdAt'), className: 'min-w-125px text-right' },
  { id: 8, name: translate('action'), className: 'min-w-125px text-right' },
];
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

type IAppointmentTableComponent = {
  data: IAppointment[];
  page: number | string;
};

const AppointmentTableComponent: React.FC<IAppointmentTableComponent> = ({
  data,
  page,
}) => {
  const handleIndex = index => {
    let currentPage = Number(page);
    if (currentPage < 2) currentPage = 1;
    return (currentPage - 1) * 10 + (index + 1);
  };
  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div className="table-responsive">
            <table className="table align-middle table-row-bordered table-row-solid gy-4 gs-9">
              <thead className="border-gray-200 fs-5 fw-semibold bg-gray-200">
                <tr>
                  {map(labels, label => (
                    <th
                      className={label.className ?? 'text-center'}
                      key={label.id}
                    >
                      {label.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="fs-6 fw-semibold text-gray-600">
                {map(data, (appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{handleIndex(index)}</td>
                    <td className="text-center">{appointment.name}</td>
                    <td className="text-center">{appointment.email}</td>
                    <td
                      className={`text-center ${
                        statusColorMap[appointment.status] || `text-danger`
                      }`}
                    >
                      {map(statusMap, (value, key) => {
                        if (value === appointment?.status) {
                          return key;
                        }
                      })}
                    </td>
                    <td className="text-center">{appointment.start_time}</td>
                    <td className="text-center">{appointment.end_time}</td>
                    <td>{appointment.create_at}</td>
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: `/appointment/detail/${appointment.id}`,
                        }}
                        className="btn btn-sm btn-icon btn-active-color-primary w-30px h-30px"
                      >
                        <i className="fas fa-user-edit fs-2"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTableComponent;
