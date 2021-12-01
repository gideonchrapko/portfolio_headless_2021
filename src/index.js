import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const customHistory = createBrowserHistory({
	// basename: config.urlBasename || ''
  })


ReactDOM.render(
  <React.StrictMode>
      <Router history={customHistory}>
				<Route component={({history}) => {
					window.appHistory = history
					return (
					<App />
					)
				}}/>
			</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
