export type IUnit = {
  id: string;
  name: string;
  child_units?: IUnit[];
};

export type IPosition = {
  id: string;
  name: string;
  code: string;
};

export type ILevel = {
  id: string;
  name: string;
  code: string;
};

export type IUnitDetail = {
  id: string;
  name: string;
  unit_code: string;
  establishment_date: Date;
  status: string;
  unit_level: ILevel;
  created_at: Date;
  tax_code: string;
  address: string;
  registration_number: string;
  date_of_issue: Date;
  place_of_issue: string;
  representative: string;
  position: string;
  is_company: boolean;
  mandates?: string;
  parent_id?: string;
  child_units?: IUnitDetail[];
};

export enum LevelCode {
  COMPANY = 'company',
  DEPARTMENT = 'department',
  TEAM = 'team',
}

export enum TreeAction {
  ADD = 'ADD',
  MOVE = 'MOVE',
  REMOVE = 'REMOVE',
}
