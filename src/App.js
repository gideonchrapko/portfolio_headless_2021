import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/Home'
import singlePost from './Components/singlePost'

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/project/:slug" component={singlePost} />
          </Switch>
        </BrowserRouter>
    </div>
  )
}

export default App