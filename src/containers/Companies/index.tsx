import React, { Component, ReactNode } from 'react';
import 'whatwg-fetch';
import CompanyDTO from '../../models/CompanyDTO';
import CompanyList from '../../components/CompanyList';

interface State {
  companies: CompanyDTO[];
  loading: boolean;
}

class Companies extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { companies: [], loading: false };
  }

  render(): ReactNode {
    const { companies, loading } = this.state;

    return (
      <div>
        {loading && <h1>Loading...</h1>}
        {companies.length === 0 && !loading ? <h2>There is nothing here</h2> : <CompanyList companies={companies} />}
      </div>
    );
  }

  fetchCompanies = (): void => {
    fetch('http://localhost:5000/api/companies')
      .then(response => (response.ok ? response.json() : null))
      .then(json => {
        const companies = json as CompanyDTO[];
        this.setState({ companies, loading: false });
      });
  };

  componentDidMount = (): void => {
    this.setState({ loading: true });
    this.fetchCompanies();
  };
}

export default Companies;
