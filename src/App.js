import React from 'react';
import './App.css';
import Loginpage from './page/loginpage';
import Homepage from './page/homepage';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Loginpage} />
        <Route exact path="/homepage" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
