/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CompanyDetail } from '../../models/CompanyDetail';
import CompanyDisplay from '../../components/CompanyDisplay';
import EditCompany from '../../components/EditCompany';

interface CompanyParams {
  id?: string;
}

interface State {
  company: CompanyDetail | null;
  loading: boolean;
}

class Company extends Component<RouteComponentProps<CompanyParams>, State> {
  constructor(props: any) {
    super(props);
    this.state = { company: null, loading: false };
  }
  render(): React.ReactNode {
    const { company } = this.state;
    return (
      <div>
        {company && <CompanyDisplay company={company} />}
        {company && <EditCompany onSubmit={this.handleSubmit} company={company} />}
        <div>
          <button type="button" onClick={this.handleGoBack}>
            Back
          </button>
        </div>
      </div>
    );
  }

  handleGoBack = (): void => {
    this.props.history.goBack();
  };

  handleSubmit = (company: CompanyDetail): void => {
    console.log(company);
  };

  fetchCompany = (id?: string): void => {
    fetch(`http://localhost:5000/api/companies/${id}`)
      .then(response => (response.ok ? response.json() : null))
      .then(json => {
        const company = json as CompanyDetail;
        this.setState({ company, loading: false });
      });
  };

  componentDidMount = (): void => {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    this.fetchCompany(id);
  };
}

export default Company;
