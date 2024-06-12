import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          {isLoggedIn && (
            <Route path="/employees">
              <EmployeeList />
            </Route>
          )}
          <Route path="/">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
