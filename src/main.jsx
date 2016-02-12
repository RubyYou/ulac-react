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
import Footer from './footer';
//import Dispatcher from './dispatcher';
//import AppStore from 'stores/AppStore';
import { Router, Route, Link } from 'react-router';

class App extends React.Component {

  constructor(prop){
  	super();
    this.langArr = ['EN','CN','KR','JP'];
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
    let lastPathName = (pathArray[pathArray.length-1]).toUpperCase();
    let lang = (pathArray[pathArray.length-2]).toUpperCase();;

    // if lastPathName not equal to any of the language Array content
    for(let i =0; i < (this.langArr).length ; i ++ ){      
      if(lastPathName == this.langArr[i]){
        lang = lastPathName;
      }
    }

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

    let Page = {};
    let route = (this.state.route).toLowerCase();

    switch (route) {
      case '':
      case 'en':
      case 'kr':
      case 'cn':
      case 'jp':
          Page = <Home lang={this.state.lang}/>; 
          break;
      case 'about': 
          Page = <About lang={this.state.lang} />; 
          break;
      case 'innovation':
          Page = <Innovation lang={this.state.lang} />; 
          break;
      case 'xlab':
          Page = <Xlab lang={this.state.lang} />; 
          break;
      case 'security': 
          Page = <Security lang={this.state.lang}/>; 
          break;
      case 'lock': 
      case 'lite': 
          Page = <Product lang={this.state.lang} route={route}/>; 
          break;
      case 'faq': 
          Page = <Faq lang={this.state.lang}/>; 
          break;
      case 'representative':
          Page = <Representative />; 
          break;
      case 'contact':
          Page = <Contact lang={this.state.lang}/>; 
          break;
      default: 
          Page = <NotFound />;
    }

    return (
      <div>
        <div className="wrapper">
        <a href="./" className="logo">
          <img src="/ulac-react2/build/images/logo-g.png" />
        </a>
        <Navigation lang={this.state.lang} />
        <div className="clear"></div>
        { Page }
        </div>
        <Footer lang={this.state.lang} />
      </div>
    )
  }
}

export default App;
 
ReactDOM.render(
  <App />,
  document.getElementById('app')
);