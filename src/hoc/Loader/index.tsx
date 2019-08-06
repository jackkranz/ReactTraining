import React from 'react';

interface LoaderProps {
  loading: boolean;
}

const Loader = (WrappedComponent: any): any => {
  const wrap = (inputProps: any & LoaderProps): JSX.Element => {
    const { loading, ...props } = inputProps;
    return loading ? <h2>Hoc Loader</h2> : <WrappedComponent {...props} />;
  };
  return wrap;
};

export default Loader;
