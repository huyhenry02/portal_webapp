import { IFileInfo } from './commons';

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
  media?: IPersonalMediaUpdate;
};

export type IPersonalMediaUpdate = {
  new?: {
    identificationFront?: string;
    identificationBack?: string;
    face_image?: string;
    fingerprint?: string;
  };
  delete?: {
    identificationFront?: string[];
    identificationBack?: string[];
    face_image?: string[];
    fingerprint?: string[];
  };
};

export type IWorkingProcessUpdate = {
  id?: string;
  processWorkingFromDate: string | null;
  processWorkingToDate: string | null;
  position: string;
  fromDepartment?: string;
  toDepartment?: string;
  files?: IFileInfo[];
  media?: IWorkingProcessMediaUpdate;
  isDeleted?: boolean;
};

export type IWorkingProcessMediaUpdate = {
  new?: {
    files?: string;
  };
  delete?: {
    files?: string[];
  };
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

export type IInfoContractUpdate = {
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
  media?: IContractMediaUpdate;
};

export type IContractMediaUpdate = {
  new?: {
    contractFiles?: string;
  };
  delete?: {
    contractFiles?: string[];
  };
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

export type IInfoInsuranceUpdate = {
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
  media?: IInsuranceMediaUpdate;
};

export type IInsuranceMediaUpdate = {
  new?: {
    contractHealthRecords?: string;
  };
  delete?: {
    contractHealthRecords?: string[];
  };
};

export type IInfoHealthUpdate = {
  id?: string;
  bloodPressure?: string;
  heartbeat?: string;
  height?: string;
  weight?: string;
  bloodGroup?: string;
  note?: string;
  healthRecords?: IFileInfo[];
  media?: IHealthMediaUpdate;
};

export type IHealthMediaUpdate = {
  new?: {
    healthRecords?: string;
  };
  delete?: {
    healthRecords?: string[];
  };
};
