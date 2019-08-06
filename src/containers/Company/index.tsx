/* eslint-disable react/prefer-stateless-function */
import React, { Component, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CompanyDetail } from '../../models/CompanyDetail';
import CompanyDisplay from '../../components/CompanyDisplay';
import EditCompany from '../../components/EditCompany';
import CompanyService from '../../services/CompanyService';
import CompanyContext from './CompanyContext';
import ErrorBoundary from '../../components/ErrorBoundary';

interface CompanyParams {
  id?: string;
}

const Company = (props: RouteComponentProps<CompanyParams>): JSX.Element => {
  const [company, setCompany] = useState();
  const [roles, setRoles] = useState();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;
    setLoading(true);
    CompanyService.fetchCompany(id).then(company => {
      setCompany(company);
      setLoading(false);
    });
    CompanyService.fetchRoles().then(roles => {
      setRoles(roles);
    });
  }, []);

  useEffect(() => {
    console.log('loading has changed');
    return () => console.log('dismount');
  }, [loading]);

  const handleEditPress = (): void => {
    console.log(editing);
    setEditing(!editing);
  };

  const handleGoBack = (): void => {
    props.history.goBack();
  };

  const handleSubmit = (company: CompanyDetail): void => {
    CompanyService.updateCompany(company).then(company => {
      if (company) {
        setCompany(company);
        setEditing(false);
      }
    });
  };

  return (
    <ErrorBoundary>
      <CompanyContext.Provider value={{ roles }}>
        {company && <CompanyDisplay company={company} />}
        {company && editing && <EditCompany onSubmit={handleSubmit} company={company} />}
        <div>
          <button className="edit-button" type="button" onClick={handleEditPress}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
          {!editing && (
            <button type="button" onClick={handleGoBack}>
              Back
            </button>
          )}
        </div>
      </CompanyContext.Provider>
    </ErrorBoundary>
  );
};

// interface State {
//   company: CompanyDetail | null;
//   roles: string[];
//   loading: boolean;
//   editing: boolean;
// }

// class CompanyOld extends Component<RouteComponentProps<CompanyParams>, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = { company: null, loading: false, editing: false, roles: [] };
//   }
//   render(): React.ReactNode {
//     const { company, editing, roles } = this.state;
//     return (
//       <CompanyContext.Provider value={{ roles }}>
//         {company && <CompanyDisplay company={company} />}
//         {company && editing && <EditCompany onSubmit={this.handleSubmit} company={company} />}
//         <div>
//           <button type="button" onClick={this.handleEditPress}>
//             {editing ? 'Cancel' : 'Edit'}
//           </button>
//           {!editing && (
//             <button type="button" onClick={this.handleGoBack}>
//               Back
//             </button>
//           )}
//         </div>
//       </CompanyContext.Provider>
//     );
//   }

//   handleEditPress = (): void => {
//     this.setState(prevState => {
//       return {
//         editing: !prevState.editing,
//       };
//     });
//   };

//   handleGoBack = (): void => {
//     this.props.history.goBack();
//   };

//   handleSubmit = (company: CompanyDetail): void => {
//     CompanyService.updateCompany(company).then(company => {
//       if (company) {
//         this.setState({ company, editing: false });
//       }
//     });
//   };

//   componentDidMount = (): void => {
//     const { id } = this.props.match.params;
//     this.setState({ loading: true });
//     CompanyService.fetchCompany(id).then(company => {
//       this.setState({ company, loading: false });
//     });
//     CompanyService.fetchRoles().then(roles => {
//       this.setState({ roles });
//     });
//   };
// }

export default Company;
