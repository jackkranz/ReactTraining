/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CompanyDetail } from '../../models/CompanyDetail';
import CompanyDisplay from '../../components/CompanyDisplay';
import EditCompany from '../../components/EditCompany';
import CompanyService from '../../services/CompanyService';
import CompanyContext from './CompanyContext';

interface CompanyParams {
  id?: string;
}

interface State {
  company: CompanyDetail | null;
  roles: string[];
  loading: boolean;
  editing: boolean;
}

class Company extends Component<RouteComponentProps<CompanyParams>, State> {
  constructor(props: any) {
    super(props);
    this.state = { company: null, loading: false, editing: false, roles: [] };
  }
  render(): React.ReactNode {
    const { company, editing, roles } = this.state;
    return (
      <CompanyContext.Provider value={{ roles }}>
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
      </CompanyContext.Provider>
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
    CompanyService.fetchRoles().then(roles => {
      this.setState({ roles });
    });
  };
}

export default Company;
