import { IFileInfo } from './commons';

export type IWorkingHistoryUpdate = {
  workStart?: string | Date | null;
  workEnd?: string | Date | null;
  workPosition?: string;
  workCompany?: string;
};

export type IFileInfoUpdate = {
  id?: string;
  preview?: string;
  path: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  originalURL?: string;
};

export type IInfoPersonalUpdate = {
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

export type IWorkingProcessUpdate = {
  processWorkingFromDate?: string | null;
  processWorkingToDate?: string | null;
  position?: string;
  fromDepartment?: string;
  toDepartment?: string;
  files?: IFileInfo[];
};

export type IHistoryResolveInsuranceUpdate = {
  type?: string;
  receiptDate?: string | null;
  completeDate?: string | null;
  paymentDate?: string | null;
  amount?: number;
};

export type IInfoContractUpdate = {
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

export type ISalaryAndAllowanceUpdate = {
  applyFromDate?: string | Date | null;
  note?: string;
  paymentType?: string;
  salary?: string;
  allowances?: { typeId?: string; allowance?: number }[];
};

export type IInfoInsuranceUpdate = {
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

export type IInfoHealthUpdate = {
  bloodPressure?: string;
  heartbeat?: string;
  height?: string;
  weight?: string;
  bloodGroup?: string;
  note?: string;
  healthRecords?: IFileInfo[];
};
