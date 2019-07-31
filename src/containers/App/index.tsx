import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Companies from '../Companies';
import NotFound from '../../components/NotFound';
import Company from '../Company';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">React Training</header>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Companies} exact />
          <Route path="/company/:id" component={Company} exact />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
