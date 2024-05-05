export interface JD {
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  maxExp: number | null;
  maxJdSalary: number | null;
  minExp: number | null;
  minJdSalary: number | null;
  salaryCurrencyCode: string | null;
  companyName: string | null;
  logoUrl?: string;
  workplace?: string;
  techStack?: string;
}

export interface JDList {
  jdList: JD[];
  totalCount: number;
}

export interface FilterDataItemType {
  id: string | number;
  displayText: string;
  value: string | number;
}

export type FilterKeyType = 'jobRole' | 'minExp' | 'workplace' | 'techStack' | 'minJdSalary' | 'location' | 'companyName';

export interface SelectedFilterType {
  key: FilterKeyType;
  type: 'filter' | 'search';
  multiple?: boolean;
  value: any;
}
