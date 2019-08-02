import React from 'react';

const CompanyContext = React.createContext<{ roles: string[] }>({ roles: [] });

export default CompanyContext;
