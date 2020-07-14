import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

import ConsumerData from "../consumer/consumer";
import ProviderData from "../provider/provider";
import Dashboard from "../dashboard/dashboard";
import ServiceAdd from "../services/services";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

import DashBoardImage from "../assets/images/dashboard.png";
import ConsumerImage from "../assets/images/consumer.png";
import ProviderImage from "../assets/images/provider.png";
import ServicesImage from "../assets/images/services.png";
import CategoryImage from "../assets/images/category.png";
import Logo from "../assets/images/logoCopy.jpg";

const RouterAdmin = () => {
  const renderToolTip = (props) => {
    console.log(props);
    return (
      <Tooltip id="button-tooltip" {...props}>
        {props.name}
      </Tooltip>
    );
  };
  return (
    <Router>
      <div className="row m-0">
        <div className="left-menu p-0 bg-primary text-white">
          <div className="row m-0 px-0 py-4 px-sm-0 navBarDesktop box-shadow-style-small">
            <div className="col-12 col-sm-12 px-0 pt-0 pb-3 border-bottom border-white">
              <NavLink to="/admin" className="text-decoration-none text-center">
                <div className="logo mx-auto">
                  <img src={Logo} alt="Hire Coach" />
                </div>
                <p className="m-0 text-white logo-title font-weight-bold">
                  Hire Coach
                </p>
              </NavLink>
            </div>
            <div className="col-12 col-sm-12 px-0 text-right mt-5">
              <div className="pl-0 pr-2 py-1 p-sm-2 d-inline-block navLink d-sm-block text-sm-left  text-white">
                <NavLink
                  to="/dashbaord"
                  exact
                  className="text-decoration-none"
                  activeClassName="activeClass"
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-dashboard`}>Dashboard</Tooltip>
                    }
                  >
                    <div className="menuIcon mx-auto bg-pink">
                      <img src={DashBoardImage} alt="Dashboard" />
                    </div>
                  </OverlayTrigger>
                </NavLink>
              </div>
              <div className="pl-0 pr-2 py-1 p-sm-2 d-inline-block navLink d-sm-block text-sm-left  text-white">
                <NavLink
                  to="/consumer"
                  exact
                  className="text-decoration-none"
                  activeClassName="activeClass"
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-dashboard`}>Consumer</Tooltip>
                    }
                  >
                    <div className="menuIcon mx-auto bg-green">
                      <img src={ConsumerImage} alt="Consumer" />
                    </div>
                  </OverlayTrigger>
                </NavLink>
              </div>
              <div className="pl-0 pr-2 py-1 p-sm-2 d-inline-block navLink d-sm-block text-sm-left">
                <NavLink
                  to="/provider"
                  exact
                  className="text-decoration-none"
                  activeClassName="activeClass"
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-dashboard`}>Provider</Tooltip>
                    }
                  >
                    <div className="menuIcon mx-auto bg-purple">
                      <img src={ProviderImage} alt="Provider" />
                    </div>
                  </OverlayTrigger>
                </NavLink>
              </div>
              <div className="pl-0 pr-2 py-1 p-sm-2 d-inline-block navLink d-sm-block text-sm-left">
                <NavLink
                  to="/services"
                  exact
                  className="text-decoration-none"
                  activeClassName="activeClass"
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-dashboard`}>Services</Tooltip>
                    }
                  >
                    <div className="menuIcon mx-auto bg-orange">
                      <img src={ServicesImage} alt="Services" />
                    </div>
                  </OverlayTrigger>
                </NavLink>
              </div>
              <div className="pl-0 pr-2 py-1 p-sm-2 d-inline-block navLink d-sm-block text-sm-left">
                <NavLink
                  to="/categories"
                  exact
                  className="text-decoration-none"
                  activeClassName="activeClass"
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-dashboard`}>Categories</Tooltip>
                    }
                  >
                    <div className="menuIcon mx-auto bg-light">
                      <img src={CategoryImage} alt="Categories" />
                    </div>
                  </OverlayTrigger>
                </NavLink>
              </div>

              {/* <div className="py-1 px-2 d-inline navLink">
              <NavLink to="/patientTrace" className="text-decoration-none" activeClassName="text-primary">Tracepatient</NavLink>
            </div> */}
            </div>
          </div>
        </div>
        <div className="margin-left-100 w-100">
          <div className="col-12">
            <Switch>
              <Route path="/dashbaord" exact component={Dashboard}></Route>
              <Route path="/consumer" exact component={ConsumerData}></Route>
              <Route path="/provider" exact component={ProviderData}></Route>
              <Route path="/services" exact component={ServiceAdd}></Route>

              <Route
                render={() => <Redirect to={{ pathname: "/dashbaord" }} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default RouterAdmin;
