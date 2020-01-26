import React, { Fragment, useEffect } from "react";
import NavBar from "./components/layout/NavBar";
import Landing from "./components/layout/Landing";
import setAuthToken from "./utills/setAuthTokeen";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
