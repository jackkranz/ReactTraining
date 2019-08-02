/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CompanyDetail } from '../../models/CompanyDetail';
import CompanyDisplay from '../../components/CompanyDisplay';
import EditCompany from '../../components/EditCompany';
import CompanyService from '../../services/CompanyService';

interface CompanyParams {
  id?: string;
}

interface State {
  company: CompanyDetail | null;
  loading: boolean;
  editing: boolean;
}

class Company extends Component<RouteComponentProps<CompanyParams>, State> {
  constructor(props: any) {
    super(props);
    this.state = { company: null, loading: false, editing: false };
  }
  render(): React.ReactNode {
    const { company, editing } = this.state;
    return (
      <div>
        {company && <CompanyDisplay company={company} />}
        {company && editing && <EditCompany onSubmit={this.handleSubmit} company={company} />}
        <div>
          <button type="button" onClick={this.handleEditPress}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
          {!editing && (
            <button type="button" onClick={this.handleGoBack}>
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  handleEditPress = (): void => {
    this.setState(prevState => {
      return {
        editing: !prevState.editing,
      };
    });
  };

  handleGoBack = (): void => {
    this.props.history.goBack();
  };

  handleSubmit = (company: CompanyDetail): void => {
    CompanyService.updateCompany(company).then(company => {
      if (company) {
        this.setState({ company, editing: false });
      }
    });
  };

  componentDidMount = (): void => {
    const { id } = this.props.match.params;
    this.setState({ loading: true });
    CompanyService.fetchCompany(id).then(company => {
      this.setState({ company, loading: false });
    });
  };
}

export default Company;
