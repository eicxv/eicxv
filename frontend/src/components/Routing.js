import React, { Fragment, useState, useEffect } from "react";

// react router
import { Switch, Route, useLocation } from "react-router-dom";

// custom components
import Home from "./Home";
import Journal from "./Journal";
import Post from "./Post";
import About from "./About";
import NotFound from "./NotFound";

function App() {
  const location = useLocation();
  let [aboutOpen, setAboutOpen] = useState(false);
  useEffect(() => {
    setAboutOpen(location.pathname.toLowerCase() == "/about");
  }, [location]);

  // if navigating to /about from outside
  if (
    location.pathname.toLowerCase() == "/about" &&
    location.state === undefined
  ) {
    location.state = { background: { pathname: "/" } };
  }

  return (
    <Fragment>
      <Switch
        location={(location.state && location.state.background) || location}
      >
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/journal">
          <Journal />
        </Route>
        <Route path="/journal/:postId">
          <Post />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <About open={aboutOpen} />
    </Fragment>
  );
}

export default App;
