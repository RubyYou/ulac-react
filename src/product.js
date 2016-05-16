import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import Utility from './lib/utility';
import ProductDetail from './productDetail';
import ProductCategories from './productCategories';


class Product extends React.Component {

  constructor(prop){
  	super();
  	this.state = {loadComplete:false, hashName:(window.location.hash).substring(1)};
  	this.getCategory = this.getCategory.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getContentType = this.getContentType.bind(this);
    this.onHashUpdate = this.onHashUpdate.bind(this);
  	this._data={
      "content":"",
      "contentType":""
    };
 }

 componentDidMount(){
    let self = this;
    this.onHashUpdate();

    window.addEventListener('hashchange', () => {
      self.setState({hashName:(window.location.hash).substring(1)});
      this.onHashUpdate();
    });
 }

 onHashUpdate(){
    this._data.contentType = this.getContentType();

    if(this._data.contentType == "product"){
      this.getProduct(this.state.hashName);
    }else{
      this.getCategory(this.state.hashName);
    }
 }

 getContentType(){
    //this.state.hashName = (window.location.hash).substring(1); 
    let contentType = "product";

    let catList = ["all", "ulac", "combo", "chain", "ulock", "special", "key", "ulock", "cable", "front", "safety"];
    
    console.log("this.state.hashName:" + this.state.hashName);

    if(this.state.hashName == ""){
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
    let self = this;
   	
    Request
   		.get('/ulac-react2/build/template/' + this.props.route + '.php?cat='+ cat )
   		.type('Content-Type', 'text/html; charset=utf8')
   		.end(function(err, res){
   			self._data.content = JSON.parse(res.text)
        self.setState({loadComplete:true}); 
    	});
 }

 getProduct(productId){
    let self = this;

    Request
      .get('/ulac-react2/build/template/'+ this.props.route + '.php?'+ this.props.route +'='+ productId )
      .type('Content-Type', 'text/html; charset=utf8')
      .end(function(err, res){
        self._data.content = JSON.parse(res.text)
        self.setState({loadComplete:true}); 
    });
 }

 render() {
    let content = [];
    let categoryNav = [];
   	if(this.state.loadComplete == true){

      if(this._data.contentType == 'all' || this._data.contentType == 'cat'){
          content.push(<ProductCategories 
                          content = {this._data.content}
                          lang = {this.props.lang}
                          route = {this.props.route}
                        />);

      }else{
          content.push(<ProductDetail 
                      content = {this._data.content}
                      lang = {this.props.lang}
                      route = {this.props.route}
                    />);
      }
    
    }else{

        content.push(<Preloader />);
    }

    if(this.props.route == 'lock'){
        categoryNav.push(<div className="cat_list">
              <a href="#ulac" onClick={this.getCategory.bind(this,'ulac')}>ULAC</a>
              <a href="#all" onClick={this.getCategory.bind(this,'all')}>ALL</a>
              <a href="#combo" onClick={this.getCategory.bind(this,'combo')}>Combo</a>
              <a href="#chain" onClick={this.getCategory.bind(this,'chain')}>Chain</a>
              <a href="#cable" onClick={this.getCategory.bind(this,'cable')}>cable</a>
              <a href="#ulock" onClick={this.getCategory.bind(this,'ulock')}>ulock</a>
              <a href="#special" onClick={this.getCategory.bind(this,'special')}>speciality</a>
              <a href="#key" onClick={this.getCategory.bind(this,'key')}>key</a>
              </div>);

    } else {

        categoryNav.push(<div className ="cat_list">
              <a href="#all" onClick={this.getCategory.bind(this,'all')}>ALL</a>
              <a href="#front" onClick={this.getCategory.bind(this,'front')}>front</a>
              <a href="#safety" onClick={this.getCategory.bind(this,'safety')}>safety</a>
              </div>);
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