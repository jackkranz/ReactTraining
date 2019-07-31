import { CompanyInfo } from '../Models/CompanyInfo';
import CompanyDetail from '../Models/CompanyDetail';

class CompanyService {
  static baseUrl = 'http://localhost:5000/api/';

  static fetchCompanies = (): Promise<CompanyInfo[]> => {
    return fetch(`${CompanyService.baseUrl}companies`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        const companies = json as CompanyInfo[];
        return companies;
      });
  };

  static fetchCompany = (id: string): Promise<CompanyDetail> => {
    return fetch(`${CompanyService.baseUrl}companies/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then(json => {
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
    }).then(response => {
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
    }).then(response => {
      const { ok } = response;
      if (!ok) {
        return false;
      }
      return true;
    });
  };

  static fetchRoles = (): Promise<string[]> => {
    return fetch(`${CompanyService.baseUrl}roles`)
      .then(response => {
        const { ok } = response;
        if (!ok) {
          return null;
        }
        return response.json();
      })
      .then(json => {
        const roles = json as string[];
        return roles;
      });
  };
}

export default CompanyService;
