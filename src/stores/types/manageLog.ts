import { translate } from '../../translates/translate';

export type ILog = {
  id: string;
  event: string;
  old_data: {
    [key in IKey]?: key extends 'contract_working_histories'
      ? IContractWorkingHistories
      : key extends 'position'
        ? ILogMasterData
        : string;
  };
  new_data: {
    [key in IKey]?: key extends 'contract_working_histories'
      ? IContractWorkingHistories
      : key extends 'position'
        ? ILogMasterData
        : string;
  };
  employee: EmployeeField;
  employee_id: string;
  created_at: string;
};
export type ILogMasterData = {
  id: string;
  name: string;
  code: string;
  status: string;
};
export type IContractWorkingHistories = {
  [key: string]: {
    id?: string;
    reason?: string;
    worked_from_date?: string;
    worked_to_date?: string;
    from_department?: string;
    to_department?: string;
    job_transfer_proofs?: string;
  };
};
export type EmployeeField = [
  { key: 'name'; title: 'Người thực hiện' },
  { key: 'position'; title: 'Chức danh' },
];
export const employeeField: EmployeeField = [
  { key: 'name', title: 'Người thực hiện' },
  { key: 'position', title: 'Chức danh' },
];
export type LogTitle = {
  title: string;
  fields: {
    new_data: {
      [key in IKey]?: key extends 'contract_working_histories'
        ? IContractWorkingHistories
        : key extends 'position'
          ? ILogMasterData
          : unknown;
    };
    employee: EmployeeField;
  };
};

export enum logTitleType {
  ASSET = 'asset',
  CURRICULUM_VITAE = 'curriculum_vitae',
  HEALTH = 'health',
  CONTRACT = 'contract',
  APPOINTMENT = 'appointment',
}

export const logAsset: LogTitle = {
  title: translate('deviceEditHistory'),
  fields: {
    new_data: {
      name: 'Tên thiết bị',
      code: 'Mã thiết bị',
      management_code: 'Mã quản lý',
      management_unit: 'Đơn vị quản lý',
      insurance_contract: 'Hợp đồng bảo hiểm',
      status: 'Trạng thái',
      original_price: 'Giá trị ban đầu',
      residual_price: 'Giá trị còn lại',
      asset_images: 'Hình ảnh thiết bị',
    },
    employee: employeeField,
  },
};

export const logAppointment: LogTitle = {
  title: translate('historyAppointment'),
  fields: {
    new_data: {
      name: 'Tên',
      phone: 'Số điện thoại',
      identification: 'Số CMND',
      reason: 'Lý do',
      reject_reason: 'Lý do từ chối',
      email: 'Email',
      status: 'Trạng thái',
      start_time: 'Thời gian bắt đầu',
      end_time: 'Thời gian kết thúc',
      create_at: 'Ngày tạo',
    },
    employee: employeeField,
  },
};
export const logContract: LogTitle = {
  title: 'Lịch sử hợp đồng',
  fields: {
    new_data: {
      contract_working_histories: {
        id: {
          id: 'Mã',
          reason: 'Lý do',
          worked_from_date: 'Ngày bắt đầu',
          worked_to_date: 'Ngày kết thúc',
          from_department: 'Phòng ban cũ',
          to_department: 'Phòng ban mới',
          job_transfer_proofs: 'Chứng từ',
        },
      },
      position: {
        id: 'id',
        name: 'Tên quyền',
        code: 'Mã',
        status: 'Trạng thái',
      },
      note: 'Ghi chú',
      apply_from_date: 'ngày bắt đầu',
    },
    employee: employeeField,
  },
};

export type LogTitleCurriculumVitae = {
  title: string;
  fields: {
    new_data: { key: string; title: string }[];
    employee: EmployeeField;
  };
};

export const logCurriculumVitae: LogTitleCurriculumVitae = {
  title: 'Lịch sử nhân viên',
  fields: {
    new_data: [
      { key: 'id', title: 'ID' },
      { key: 'employee_id', title: 'Mã nhân viên' },
      { key: 'code', title: 'Mã nhân viên' },
      { key: 'name', title: 'Tên nhân viên' },
      { key: 'nationality', title: 'Quốc tịch' },
      { key: 'email', title: 'Email' },
      { key: 'phone_number', title: 'Số điện thoại' },
      { key: 'dob', title: 'Ngày sinh' },
      { key: 'gender', title: 'Giới tính' },
      { key: 'country', title: 'Quốc gia' },
      { key: 'marital', title: 'Tình trạng hôn nhân' },
      { key: 'ethnic', title: 'Dân tộc' },
      { key: 'region', title: 'Khu vực' },
      { key: 'identification', title: 'Số CMND' },
      { key: 'place_of_issue', title: 'Nơi cấp' },
      { key: 'date_of_issue', title: 'Ngày cấp' },
      { key: 'files', title: 'Tệp tin đính kèm' },
      { key: 'tax_code', title: 'Mã số thuế' },
      { key: 'onboard_date', title: 'Ngày vào làm' },
      { key: 'leader_id', title: 'ID người quản lý' },
      { key: 'subsidiary_id', title: 'ID chi nhánh' },
      { key: 'position_id', title: 'ID chức vụ' },
      { key: 'address', title: 'Địa chỉ' },
      { key: 'bank_account_number', title: 'Số tài khoản ngân hàng' },
      { key: 'bank_account_name', title: 'Chủ tài khoản ngân hàng' },
      { key: 'bank_name', title: 'Ngân hàng' },
      { key: 'bank_branch', title: 'Chi nhánh ngân hàng' },
      { key: 'deleted_at', title: 'Ngày xóa' },
      { key: 'identification_front', title: 'Ảnh mặt trước CMND' },
      { key: 'identification_back', title: 'Ảnh mặt sau CMND' },
      { key: 'face_image', title: 'Ảnh khuôn mặt' },
      { key: 'fingerprint', title: 'Ảnh vân tay' },
      { key: 'working_histories', title: 'Lịch sử làm việc' },
    ],
    employee: employeeField,
  },
};

export const logHealth: LogTitleCurriculumVitae = {
  title: 'Lịch sử sức khỏe',
  fields: {
    new_data: [
      { key: 'blood_group', title: 'Nhóm máu' },
      { key: 'blood_pressure', title: 'Huyết áp' },
      { key: 'health_records', title: 'Hồ sơ sức khỏe' },
      { key: 'heartbeat', title: 'Nhịp tim' },
      { key: 'height', title: 'Chiều cao' },
      { key: 'note', title: 'Ghi chú' },
      { key: 'weight', title: 'Cân nặng' },
    ],
    employee: employeeField,
  },
};

export type IKey =
  | 'contract_working_histories'
  | 'name'
  | 'note'
  | 'code'
  | 'management_code'
  | 'management_unit'
  | 'insurance_contract'
  | 'status'
  | 'original_price'
  | 'residual_price'
  | 'asset_images'
  | 'employee_id'
  | 'nationality'
  | 'email'
  | 'apply_from_date'
  | 'phone_number'
  | 'dob'
  | 'gender'
  | 'country'
  | 'marital'
  | 'ethnic'
  | 'region'
  | 'identification'
  | 'place_of_issue'
  | 'date_of_issue'
  | 'files'
  | 'tax_code'
  | 'onboard_date'
  | 'leader_id'
  | 'subsidiary_id'
  | 'position'
  | 'address'
  | 'bank_account_number'
  | 'bank_account_name'
  | 'bank_name'
  | 'bank_branch'
  | 'deleted_at'
  | 'identification_front'
  | 'identification_back'
  | 'face_image'
  | 'fingerprint'
  | 'working_histories'
  | 'phone'
  | 'reason'
  | 'reject_reason'
  | 'start_time'
  | 'end_time'
  | 'worked_from_date'
  | 'worked_to_date'
  | 'from_department'
  | 'to_department'
  | 'create_at'
  | 'id';
