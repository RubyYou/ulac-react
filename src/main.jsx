'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Product from './product';
import Home from './home';
import About from './about';
import NotFound from './nofound';
import Xlab from './xlab';
import Innovation from './innovation';
import Faq from './faq';
import Security from './security';
import Representative from './representative';
import Contact from './contact';
import Navigation from './navigation';
//import Dispatcher from './dispatcher';
//import AppStore from 'stores/AppStore';
import { Router, Route, Link } from 'react-router';

class App extends React.Component {

  constructor(prop){
  	super();
  	this.getPathname = this.getPathname.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
  	this.state = {route:this.getPathname(), lang: this.getLanguage() };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route:this.getPathname(), 
        lang:this.getLanguage()
      })
    });
  }

  componentWillMount() {
      //this.appStoreEvent = AppStore.registerView(() => { this.updateState(); });
      //this.updateState();
  }

  componentWillUnmount() {
      //AppStore.deregisterView(this.appStoreEvent);
  }
  
  getLanguage(){
    let pathArray = window.location.pathname.split("/");
    let lang = (pathArray[pathArray.length-2]).toUpperCase();

    switch(lang){
      case "CN":
        lang = "CN";
        break;
      case "KR":
        lang = "KR";
        break;
      case "JP":
        lang = "JP";
        break;
      default:
        lang = "EN";
    }

    return lang;
  }

  getPathname(){
    let pathArray = window.location.pathname.split("/");
    return pathArray[pathArray.length-1];
  }

  render() {

    let Child = {};

    switch (this.state.route) {
      case '':
          Child = <Home lang={this.state.lang}/>; 
          break;
      case 'about': 
          Child = <About lang={this.state.lang} />; 
          break;
      case 'innovation':
          Child = <Innovation lang={this.state.lang} />; 
          break;
      case 'xlab':
          Child = <Xlab lang={this.state.lang} />; 
          break;
      case 'security': 
          Child = <Security lang={this.state.lang}/>; 
          break;
      case 'lock': 
      case 'lite': 
          Child = <Product lang={this.state.lang}/>; 
          break;
      case 'faq': 
          Child = <Faq lang={this.state.lang}/>; 
          break;
      case 'representative':
          Child = <Representative />; 
          break;
      case 'contact':
          Child = <Contact lang={this.state.lang}/>; 
          break;
      default: 
          Child = <NotFound />;
    }

    return (
      <div>
        <a href="./"><img src="/ulac-react2/build/images/logo-g.png" /></a>
        <Navigation lang={this.state.lang} />
        <div className="clear"></div>
        {Child}

      </div>
    )
  }
}

export default App;
 
ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);