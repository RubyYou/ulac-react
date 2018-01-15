import React from 'react';
import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import Utility from './lib/utility';
import ProductDetail from './productDetail';
import ProductCategories from './productCategories';
import { prefixUrl } from './config';

class Product extends React.Component {

  constructor(prop){
  	super();
    this.state = {
      loadComplete:false, 
      hashName:(window.location.hash).substring(1)
    };
  	this.getCategory = this.getCategory.bind (this);
    this.getProduct = this.getProduct.bind (this);
    this.getContentType = this.getContentType.bind (this);
    this.onHashUpdate = this.onHashUpdate.bind (this);
    this.getNavigation = this.getNavigation.bind (this);
    this.setNavigationStyle = this.setNavigationStyle.bind (this);

  	this._data={
      "content":"",
      "contentType":"",
      "navigation": null
    };
 }

 componentDidMount(){
    let self = this;
    this.onHashUpdate ();

    window.addEventListener('hashchange', () => {
      self.setState({hashName:(window.location.hash).substring(1)});
      this.onHashUpdate();
    });
 }

 onHashUpdate(){
    this._data.contentType = this.getContentType ();

    if (this._data.contentType == "product") {
      this.getProduct(this.state.hashName);
    
    } else if (this.props.route == 'lock' && this._data.contentType == "cat") {
      this.getCategory (this.state.hashName);

    } else {
      this.getCategory(this.state.hashName);
    }
 }

 getContentType(){    
    let contentType = "product";
    let catList = ["all", "ulac", "combo", "chain", "ulock", "special", "key", "ulock", "cable", "alarm", "folding", "accessories"];
    
    if (this.state.hashName == "") {
      contentType = 'all';
    }

    // check if hashName Match any category
    for(let i = 0 ; i < catList.length ; i ++){
        if(this.state.hashName == catList[i]){
          contentType = "cat";
        }
    }

    return contentType;
 }

 getCategory(cat){
    window.scrollTo (0,0);
    let self = this;
    Request
   		.get('/template/' + this.props.route + '.php?cat='+ cat )
   		.type('Content-Type', 'text/html; charset=utf8')
   		.end(function(err, res){
        self._data.content = JSON.parse(res.text);
        self.getNavigation.call (self);  
      });
 }

 getProduct(productId){
    let self = this;
    window.scrollTo (0,0);
    Request
      .get('/template/'+ this.props.route + '.php?'+  this.props.route+'='+ productId )
      .type('Content-Type', 'text/html; charset=utf8')
      .end(function(err, res){
        self._data.content = JSON.parse(res.text)
        self.getNavigation.call (self);  
    });
 }

 setNavigationStyle(){
  var navList = document.getElementById("lock_cat").childNodes;

  if (this.state.hashName.length > 0) {
    for (let i=0; i<navList.length; i++){
      var href = navList[i].href.split("#")[1];
      if( href == this.state.hashName){
        navList[i].className = "yellow";
      } else{
        navList[i].className = "";
      }
    }
  } else {
    navList[0].className = "yellow";
  }
 }

 getNavigation(){
  let self = this;

  Request
    .get(prefixUrl+'data/navigation.json')
    .accept('application/json')
    .end(function(err, response){
      self._data.navigation = JSON.parse(response.text).categories;
      self.setState({loadComplete:true});
      setTimeout(self.setNavigationStyle, 100);
   });
}

 render() {
    let content = [];
    let categoryNav = [];
    let lang = this.props.lang;

     if (this.state.loadComplete == true)
     {

      if (this._data.contentType == 'all' || this._data.contentType == 'cat')
      {
          content.push(<ProductCategories 
                          content = {this._data.content}
                          lang = {lang}
                          route = {this.props.route}
                        />);
      } else {
          content.push(<ProductDetail 
                        content = {this._data.content}
                        lang = {lang}
                        route = {this.props.route}
                      />);
      }

      categoryNav.push(
        <div id="lock_cat" className="cat_list" key="lock_cat">
            <a href="#all" onClick={this.getCategory.bind(this,'all')} >{this._data.navigation.all[lang]}</a>
            <a href="#accessories" onClick={this.getCategory.bind(this,'accessories')} >{this._data.navigation.accessories[lang]}</a>
            <a href="#combo" onClick={this.getCategory.bind(this,'combo')} >{this._data.navigation.combo[lang]}</a>
            <a href="#chain" onClick={this.getCategory.bind(this,'chain')} >{this._data.navigation.chain[lang]}</a>
            <a href="#cable" onClick={this.getCategory.bind(this,'cable')} >{this._data.navigation.cable[lang]}</a>
            <a href="#ulock" onClick={this.getCategory.bind(this,'ulock')} >{this._data.navigation.ulock[lang]}</a>
            <a href="#special" onClick={this.getCategory.bind(this,'special')} >{this._data.navigation.specialty[lang]}</a>
            <a href="#key" onClick={this.getCategory.bind(this,'key')} >{this._data.navigation.key[lang]}</a>
            <a href="#alarm" onClick={this.getCategory.bind(this,'alarm')} >{this._data.navigation.alarm[lang]}</a>
            <a href="#folding" onClick={this.getCategory.bind(this,'folding')} >{this._data.navigation.folding[lang]}</a>
        </div>);
      
    
    } else {

        content.push(<Preloader />);
    }

    return (
        <div> 
          	{ categoryNav }
    		    { content }
    	  </div>
    )
  }
}

export default Product;