import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class Product extends React.Component {

  constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
 }

 componentDidMount(){
 	this.getContent();
 }

 getContent(cat){
 	let self = this;
 	console.log('cat:' + cat);

 	Request
 		.get('/ulac-react2/build/template/category.php?cat='+ cat )
 		.accept('application/json')
 		.end(function(err, res){
 			self.loadComplete(res.body);
  		});
 }

 loadComplete(content){
 	let summary = this.props.lang+'_summary';
 	console.log("test:" + content[0][1].summary);
 	this.setState({loadComplete:true});
 }

 render() {
 	let lang = this.props.lang;
	let category = [];
 	if(this.state.loadComplete == true ){
 		category.push(<div>abcd</div>);
 	}else{
 		category.push(<Preloader />);
 	}

    return <div>
    		<h2>A list of category name</h2>
    		<a href="#ulac" onClick={this.getContent.bind(this,'ulac')}> ULAC</a>
    		<a href="#combo" onClick={this.getContent.bind(this,'combo')}>Combo</a>
    		<a href="#chain" onClick={this.getContent.bind(this,'chain')}>Chain</a>
    		<a href="#cable" onClick={this.getContent.bind(this,'cable')}>cable</a>
    		<a href="#ulock" onClick={this.getContent.bind(this,'ulock')}>ulock</a>
    		<a href="#special" onClick={this.getContent.bind(this,'special')}>special</a>
    		<a href="#key" onClick={this.getContent.bind(this,'key')}>key</a>
    		{category}
    	   </div>;
  }
}

export default Product;