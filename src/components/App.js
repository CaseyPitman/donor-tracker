//App parent component

import React from "react";

//Routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";

//Components
import Header from "./Header";
import Home from "./Home";
import {
  DonorList,
  CreateDonor,
  DonorDetails,
  EditDonor,
  DeleteDonor,
} from "./Donors/index";

import Loader from "react-promise-loader";
import { usePromiseTracker } from "react-promise-tracker";
//Styles
import "../css/app.css";

const App = props => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <div className='app-viewport'>
          <Switch>
            <Route path='/' exact component={Home} />
            <ProtectedRoute path='/donor-list' component={DonorList} />
            <ProtectedRoute path='/create-donor' component={CreateDonor} />
            <ProtectedRoute
              path='/donor-details/:id'
              component={DonorDetails}
            />
            <ProtectedRoute path='/edit-donor/:id' component={EditDonor} />
            <ProtectedRoute path='/delete-donor/:id' component={DeleteDonor} />
          </Switch>
        </div>
        <Loader promiseTracker={usePromiseTracker} />
      </div>
    </Router>
  );
};

export default App;