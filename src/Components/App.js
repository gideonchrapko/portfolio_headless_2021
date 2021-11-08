import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

import LandingPage from './LandingPage'
import SinglePost from './SinglePost'
import NotFound from './NotFound'
// import NavBar from './Components/Navigation/NavBar';
import NavHead from './Navigation/NavHead';
import NavBar from './Navigation/NavBar'
import Hello from './Hello'

const App = () => {
const [rightMenuVisible, setrightMenuVisible] = useState(false)

useEffect(() => {
  setrightMenuVisible(true)
  return () => {
    setrightMenuVisible(false)
  }
})

const navAnimation = useSpring({
  opacity: rightMenuVisible ? 1 : 0,
  transform: rightMenuVisible ? `translateY(0px)` : `translateY(100px)`,
  config: {
      mass: 1,
      tension: 50,
      friction: 12,
    }
}); 

  return (
    <>
      <NavHead/>
      <animated.div style={navAnimation} className="fixed-bottom blend">
        <NavBar/>
      </animated.div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/project/:slugRoute" component={SinglePost} />
        <Route path="/hello" component={Hello} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App;