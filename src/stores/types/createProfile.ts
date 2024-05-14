import { IFileInfo } from './commons';

export type IWorkingHistory = {
  workStart?: string | Date | null;
  workEnd?: string | Date | null;
  workPosition?: string;
  workCompany?: string;
  isDeleted?: boolean;
};

export type IInfoPersonal = {
  fullName?: string;
  nationality?: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string | Date | null;
  gender?: string;
  homeTown?: string;
  isMarried?: boolean;
  ethnic?: string;
  religions?: string;
  identification?: string;
  placeOfIssue?: string;
  dateOfIssue?: string | Date | null;
  identificationFront?: IFileInfo[];
  identificationBack?: IFileInfo[];
  faceImage?: IFileInfo[];
  fingerprint?: IFileInfo[];
  taxCode?: string;
  onboardDate?: string;
  directManager?: string;
  subsidiary?: string;
  // jobTitle?: string;
  position?: string;
  employeeCode?: string;
  address?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  bankName?: string;
  bankBranch?: string;
};

export type IMasterData = {
  id: string;
  name: string;
  code: string;
};

export type IDepartment = {
  id?: string;
  name?: string;
};

export type IWorkingProcess = {
  id?: string;
  processWorkingFromDate: string | null;
  processWorkingToDate: string | null;
  position: string;
  fromDepartment?: string;
  toDepartment?: string;
  files?: IFileInfo[];
  isDeleted?: boolean;
};

export type IHistoryResolveInsurance = {
  id?: string;
  type?: string;
  receiptDate: string | null;
  completeDate: string | null;
  paymentDate: string | null;
  amount: number;
  isDeleted?: boolean;
};

export type IInfoContract = {
  id?: string;
  contractCode?: string;
  contractType?: string;
  contractFiles?: IFileInfo[];
  department?: string;
  position?: string;
  role?: string;
  rank?: string;
  skillCoefficient?: string;
  workplace?: string;
  employmentType?: string;
  effectiveDate?: string | Date | null;
  signDate?: string | Date | null;
  signer?: string;
  digitalSignature?: string;
};

export type ISalaryAndAllowance = {
  id?: string;
  applyFromDate?: string | Date | null;
  note?: string;
  paymentType?: string;
  salary?: string;
  allowances: {
    id?: string;
    typeId: string;
    allowance: number;
    isDeleted?: boolean;
    isShowBtnAdd?: boolean;
    isShowBtnRemove?: boolean;
  }[];
};

export type IInfoInsurance = {
  id?: string;
  bookNumber?: string;
  bookStatus?: string;
  legalEntitySubmit?: string;
  numberCard?: string;
  provinceCodeReleased?: string;
  medicalRegister?: string;
  insuranceCardReceiptDate?: string | Date | null;
  insuranceCardReturnDate?: string | Date | null;
  contractHealthRecords?: IFileInfo[];
};

export type IInfoHealth = {
  id?: string;
  bloodPressure?: string;
  heartbeat?: string;
  height?: string;
  weight?: string;
  bloodGroup?: string;
  note?: string;
  healthRecords?: IFileInfo[];
};

export enum CollectionConstants {
  IDENTIFICATION_FRONT = 'identification_front',
  IDENTIFICATION_BACK = 'identification_back',
  FACE_IMAGE = 'face_image',
  FINGER_PRINT = 'fingerprint',
  HEALTH_RECORDS = 'health_records',
  CONTRACT_FILES = 'contract_files',
  CONTRACT_HEALTH_RECORDS = 'contract_health_records',
  JOB_TRANSFER_PROOFS = 'job_transfer_proofs',
  ASSET_IMAGES = 'asset_images',
  EXAMPLE = 'example',
}
