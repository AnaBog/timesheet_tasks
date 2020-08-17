import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './scss/styles.scss';

import Tasks from './components/TimesheetTasks/TimesheetTasks';

function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route path={["/", "/:date"]} exact render={ props => <Tasks {...props} />}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
