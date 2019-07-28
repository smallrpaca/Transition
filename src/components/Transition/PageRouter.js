import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Home from "../../pages/home";
import About from "../../pages/about";
import Contact from "../../pages/contact";
import "./PageRouter.css";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/contact", name: "Contact", Component: Contact }
];

const PageRouter = () => {
  return (
    <Router>
      <>
        <div>
          <div className="mx-auto">
            {routes.map(route => (
              <Link key={route.path} to={route.path}>
                {route.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="container">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </>
    </Router>
  );
};

export default PageRouter;
