import { IFileInfo } from './commons';
import {
  IHistoryResolveInsurance,
  // IHistoryResolveInsurance,
  IInfoContract,
  IInfoHealth,
  IInfoInsurance,
  ISalaryAndAllowance,
  IWorkingHistory,
  IWorkingProcess,
} from './createProfile';

export type IWorkingHistoryResponse = {
  company: string;
  deleted_at: string;
  end_date: string;
  id: string;
  position: string;
  start_date: string;
}[];

export type IEmployeeDetailResponse = {
  id: string;
  employee_id: string;
  code: string;
  name: string;
  nationality: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
  country: string;
  marital: boolean;
  ethnic: string;
  region: string;
  identification: string;
  place_of_issue: string;
  date_of_issue: string;
  files: IFileInfo[];
  tax_code: string;
  onboard_date: string;
  leader_id: string;
  subsidiary_id: string;
  position_id: string;
  address: string;
  bank_account_number: string;
  bank_account_name: string;
  bank_name: string;
  bank_branch: string;
  deleted_at: string;
  identification_front: IFileResponse;
  identification_back: IFileResponse;
  face_image: IFileResponse;
  fingerprint: IFileResponse;
  working_histories: IWorkingHistoryResponse;
};

export type IEmployeeDetail = {
  id?: string;
  username: string;
  employeeCode: string;
  fullName: string;
  birthday: string;
  company: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  homeTown: string;
  createdAt: string;
  nationality: string;
  gender: string;
  isMarried: boolean;
  ethnic: string;
  identification: string;
  dateOfIssue: string;
  placeOfIssue: string;
  taxCode: string;
  identificationFront: IFileInfo[];
  identificationBack: IFileInfo[];
  faceImage: IFileInfo[];
  fingerprint: IFileInfo[];
  onboardDate: string;
  directManager: string;
  subsidiary: string;
  address: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankName: string;
  bankBranch: string;
  workingHistories: IWorkingHistory[];
};

export type IEmployees = {
  id: string;
  code?: string;
  email?: string;
  name: string;
  position?: string;
  status?: string;
  created_at?: string;
  account_created_at?: string;
};

export type IProfile = {
  id: string;
  fullName: string;
  email: string;
  name: string;
  position: string;
  status: string;
  createdProfileAt: string;
  createdAt: string;
};

export type IRoles = {
  id: string;
  name: string;
  description?: string;
  status?: string;
};

export type IPermissionResponse = {
  id: string;
  name: string;
  description: string;
  in_role: boolean;
};

export type IPermission = {
  id: string;
  name: string;
  enable: boolean;
};

export type IListPermissionsResponse = {
  description: string;
  name: string;
  permissions: IPermissionResponse[];
}[];

export type IListPermissions = {
  description: string;
  name: string;
  permissions: IPermission[];
}[];

export type IContractAllowances = {
  id: string;
  benefit: string;
  allowance: {
    id: string;
    name: string;
    code: string;
    status: string;
  };
};

export type IContractWorkingHistories = {
  id: string;
  worked_from_date: string;
  worked_to_date: string;
  reason: string;
  from_department: string;
  to_department: string;
  job_transfer_proofs: IFileResponse;
};

export type IContractInsuranceProcessedHistories = {
  id: string;
  completed_date: string;
  insurance_policy_code: string;
  insurance_policy_id: string;
  insurance_policy_name: string;
  received_date: string;
  refund_amount: string;
  refunded_date: string;
};

export type IFileResponse = {
  [key: string]: {
    name: string;
    file_name: string;
    uuid: string;
    preview_url: string;
    original_url: string;
    order: number;
    custom_properties?: unknown;
    extension: string;
    size: number;
  };
};

export type IContractDetailResponse = {
  id: string;
  code: string;
  contract_type_id: string;
  department_id?: string;
  position_id: string;
  function: string;
  rank: string;
  skill_coefficient: string;
  workplace: string;
  employment_type_id: string;
  effective_date: string;
  signed_date: string;
  signer: string;
  digital_signature: string;
  apply_from_date: string;
  note: string;
  payment_type: string;
  salary: string;
  insurance_book_number: string;
  insurance_book_status: string;
  insurers: string;
  insurance_card_number: string;
  insurance_city_code: string;
  medical_examination_place: string;
  card_received_date: string;
  card_returned_date: string;
  contract_files: IFileResponse;
  contract_health_records: IFileResponse;
  contract_allowances: IContractAllowances[];
  contract_working_histories: IContractWorkingHistories[];
  contract_insurance_processed_histories: IContractInsuranceProcessedHistories[];
};

export type IContractDetail = {
  infoContract?: IInfoContract;
  infoSalary?: ISalaryAndAllowance;
  infoInsurance?: IInfoInsurance;
  infoWorkingProcess?: IWorkingProcess[];
  infoInsuranceProcessedHistories?: IHistoryResolveInsurance[];
};

export type IHealthDetailResponse = {
  blood_group: string;
  blood_pressure: string;
  health_records?: IFileResponse;
  heartbeat: string;
  height: string;
  id: string;
  note: string;
  weight: string;
};

export type IHealthDetail = IInfoHealth;
