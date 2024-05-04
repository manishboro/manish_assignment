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
}

export interface JDList {
  jdList: JD[];
  totalCount: number;
}
