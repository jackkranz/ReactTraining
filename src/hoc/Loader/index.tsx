import React from 'react';

interface LoadingProps {
  loading: boolean;
}

const Loader = (WrappedComponent: any): any => {
  const wrap = (inputProps: any & LoadingProps): JSX.Element => {
    const { loading, ...props } = inputProps;
    return loading ? <h1>HOC Loader</h1> : <WrappedComponent {...props} />;
  };
  return wrap;
};

export default Loader;
