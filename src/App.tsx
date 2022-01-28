import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
//import { Route } from 'react-router';
import ComponentA from "./ComponentA";
import ComponentB from "./ComponentB";
import Home from "./Home";
import HooksUI from "./HooksUI";
import HotelsUI from "./HotelsUI";
import Login from "./Login";
import MaterialUI from "./MaterialUI";
import Profile from "./Profile";
import ReduxBasics from "./ReduxBasics";
import SignUp from "./SignUp";
import SliceUI from "./SliceUI";
import { userContext } from "./UserProvider";

function App() {
  const context = useContext(userContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/a" component={ComponentA} />
        <Route exact path="/b" component={ComponentB} />
        <Route exact path="/hooks" component={HooksUI} />
        <Route exact path="/ReduxBasics" component={ReduxBasics} />
        {!context?.uid && <Route exact path="/Login" component={Login} />}
        {!context?.uid && <Route exact path="/SignUp" component={SignUp} />}
        <Route exact path="/MaterialUI" component={MaterialUI} />
        <Route exact path="/SliceUI" component={SliceUI} />
        <Route exact path="/HotelsUI" component={HotelsUI} />
        <Route exact path="/Home" component={Home} />

        {context?.uid && <Route exact path="/Profile" component={Profile} />}
        <Route exact path="/" render={() => <Redirect to="/HotelsUI" />} />
      </Switch>
    </Router>
  );
}

export default App;
