'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Product from './product';
import Home from './home';
import NotFound from './home';
import { Router, Route, Link } from 'react-router';

class App extends React.Component {

  constructor(prop){
  	super();
  	this.getPathname = this.getPathname.bind(this);
  	this.state = {route:this.getPathname()};
  }

  componentDidMount() {

    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.pathname.substring(11)
      })
    });
  }

  getPathname(){
  	return window.location.pathname.substring(11)
  }

  render() {

    let Child = {};
    
    console.log("this.state.route:" + this.state.route);

    switch (this.state.route) {
      case '/': Child = Home; break;
      case '/product': Child = Product; break;
      case '/notfound': Child = NotFound; break;
      default: Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
        	<li><Link to="/home">home</Link></li>
        	<li><Link to="/product">Product</Link></li>
        	<li><Link to="/notfound">notfound listen some changes</Link></li>
        </ul>
        <Child/>
      </div>
    )
  }
}

export default App;
 
ReactDOM.render(
  <App />,
  document.getElementById('content')
);