import React, { Component } from 'react';
//import './Companies.css';
import { CompanyInfo } from '../../Models/CompanyInfo';
import CompanyService from '../../services/CompanyService';
import CompanyList from '../../components/CompanyList';

interface State {
  companies: CompanyInfo[];
  loading: boolean;
}
class Companies extends Component<{}, State> {
  state = { companies: [], loading: false };

  render(): React.ReactNode {
    const { companies, loading } = this.state;
    return <CompanyList loading={loading} companies={companies} />;
  }

  componentWillMount = (): void => {
    this.setState({ loading: true });
    CompanyService.fetchCompanies().then(companies => this.setState({ companies, loading: false }));
  };
}

export default Companies;
