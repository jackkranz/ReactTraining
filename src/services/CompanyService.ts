/* eslint-disable prettier/prettier */
import { CompanyDetail } from '../models/CompanyDetail';
import CompanyDTO from '../models/CompanyDTO';

class CompanyService {
  static baseUrl = 'http://localhost:5000/api/';

  static fetchCompany = (id?: string): Promise<CompanyDetail> => {
    return fetch(`${CompanyService.baseUrl}companies/${id}`)
      .then(response => (response.ok ? response.json() : null))
      .then(json => {
        const company = json as CompanyDetail;
        return company;
      });
  };

  static fetchCompanies = (): Promise<CompanyDTO[]> => {
    return fetch(`${CompanyService.baseUrl}companies`)
      .then(response => (response.ok ? response.json() : null))
      .then(json => {
        const companies = json as CompanyDTO[];
        return companies;
      });
  };

  static updateCompany = (company: CompanyDetail): Promise<CompanyDetail | null> => {
    return fetch(`${CompanyService.baseUrl}companies/${company.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company)
    }).then(response => {
      const { ok } = response;
      return ok? company: null;
    })
  }
}

export default CompanyService;
