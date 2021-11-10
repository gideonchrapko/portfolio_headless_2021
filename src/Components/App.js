import React, { useEffect, useState } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
// import { useSpring, animated } from 'react-spring'

import LandingPage from './LandingPage'
import SinglePost from './SinglePost'
import NotFound from './NotFound'
// import NavBar from './Components/Navigation/NavBar';
import NavHead from './Navigation/NavHead';
import NavBar from './Navigation/NavBar';

function App() {
const [menuVisible, setMenuVisible] = useState(false)

useEffect(() => {
  setMenuVisible(true)
  // return () => {
  //   setMenuVisible(false)
  // }
})

  return (
      <Router>
        <NavHead/>
        <div style={{
                transform: menuVisible ? "translateY(0px)" : "translateY(100px)",
                transition: "transform 1s ease-in-out" 
              }} 
          className="fixed-bottom blend">
          <NavBar/>
        </div>
        <Route
          render={({ location }) => (
          <AnimatePresence initial={false} exitBeforeEnter >
            <Switch location={location} key={location.pathname}>
              {/* <Route path="/" exact component={LandingPage} />
              <Route path="/project/:slugRoute" component={SinglePost} /> */}
              <Route path="/" exact render={() => <LandingPage />} />
              <Route path="/project/:slugRoute" exact render={() => <SinglePost />} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
            )}
        />
    </Router>
    )
  }

export default App;