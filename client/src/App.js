import React, { Fragment, useEffect} from "react";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import "./App.css";
import setAuthToken from './utills/setAuthTokeen';
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-form/CreateProfile'
import AddExperience from './components/profile-form/AddExperience'
import AddEducation from './components/profile-form/AddEducation'
import EditProfile from './components/profile-form/EditProfile'
import PrivateRoute from './components/routing/PrivateRoute'
// Redux
import { Provider } from "react-redux";
import store from "./store";
import {loadUser} from './actions/auth'


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar />
        <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;
