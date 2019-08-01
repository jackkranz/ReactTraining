export interface CompanyDetail {
  id: number;
  name: string;
  estimatedRevenue: number;
  initialContactDate: Date;
  employees: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
}
