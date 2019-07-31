import { CompanyInfo } from '../Models/CompanyInfo';
import CompanyDetail from '../Models/CompanyDetail';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

class CompanyService {
  static baseUrl = 'http://localhost:5000/api/';

  static fetchCompanies = (): Promise<CompanyInfo[]> => {
    // eslint-disable-next-line no-console
    return fetch(`${CompanyService.baseUrl}companies`)
      .then((response: any) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((json: any) => {
        const companies = json as CompanyInfo[];
        return companies;
      });
  };

  static fetchCompany = (id: string): Promise<CompanyDetail> => {
    return fetch(`${CompanyService.baseUrl}companies/${id}`)
      .then((response: any) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((json: any) => {
        const companies = json as CompanyDetail;
        return companies;
      });
  };

  static updateCompany = (company: CompanyDetail): Promise<CompanyDetail | null> => {
    return fetch(`${CompanyService.baseUrl}companies/${company.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    }).then((response: any) => {
      const { ok } = response;
      if (!ok) {
        return null;
      }
      return company;
    });
  };

  static deleteEmployee = (id: number): void => {
    fetch(`${CompanyService.baseUrl}employees/${id}`, {
      method: 'DELETE',
    }).then((response: any) => {
      const { ok } = response;
      if (!ok) {
        return false;
      }
      return true;
    });
  };

  static fetchRoles = (): Promise<string[]> => {
    return fetch(`${CompanyService.baseUrl}roles`)
      .then((response: any) => {
        const { ok } = response;
        if (!ok) {
          return null;
        }
        return response.json();
      })
      .then((json: any) => {
        const roles = json as string[];
        return roles;
      });
  };
}

export default CompanyService;
