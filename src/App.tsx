import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Companies = React.lazy(() => import('./containers/Companies'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Company = React.lazy(() => import('./containers/Company'));

const App = (): JSX.Element => {
  const title = 'React Training';
  return (
    <div className="App">
      <header aria-label="tttt" className="App-header">
        {title}
      </header>
      <BrowserRouter>
        <Suspense fallback={<h2> Suspense... </h2>}>
          <Switch>
            <Route path="/" component={Companies} exact />
            <Route path="/company/:id" component={Company} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;

// npm i react-router-dom @types/react-router-dom //
