import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/Home'
import singlePost from './Components/singlePost'
import NotFound from './Components/NotFound'

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/project/:slugRoute" component={singlePost} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default App