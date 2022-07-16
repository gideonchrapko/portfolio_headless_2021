import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import { Container } from 'react-bootstrap'
import { AnimatePresence } from "framer-motion";

import LandingPage from './LandingPage'
import SinglePost from './singlePost'
import NotFound from './NotFound'

function App() {
  return (
    <>
      <Router>
        <Route
          render={({ location }) => (
          <AnimatePresence initial={false} exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path="/" exact render={() => <LandingPage />} />
              <Route path="/project/:slugRoute" exact render={() => <SinglePost />} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
            )}
        />
      </Router>
    </>
    )
  }

export default App;