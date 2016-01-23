import React from 'react';
import Request from 'superagent';

class Navigation extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
  	this.data = {
  		"lock":"",
  		"lite":"",
  		"xlab":"",
  		"innovation":"",
  		"security":"",
  		"faq":"",
  		"representative":"",
  		"about":"",
  		"contact":""
  	};
 }

 componentDidMount(){
 	this.getContent();
 }

 getContent(){
 	let self = this;
 	console.log((this.props.lang).toLowerCase());

 	Request
 		.get('/ulac-react2/build/data/navigation.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(JSON.parse(response.text).nav);
  		});
 }

 loadComplete(res){
 	this.data.lock = res.lock[this.props.lang];
 	this.data.lite = res.lite[this.props.lang];
 	this.data.xlab = res.xlab[this.props.lang];
 	this.data.innovation = res.innovation[this.props.lang];
 	this.data.security = res.security[this.props.lang];
 	this.data.faq = res.faq[this.props.lang];
 	this.data.representative = res.representative[this.props.lang];
 	this.data.about = res.about[this.props.lang];
 	this.data.contact = res.contact[this.props.lang];
 	
 	this.setState({loadComplete:true});
 }


 render() {
 	let lang = this.props.lang;

    return <nav>
	          <ul className="nav-link">
	            <li><a href="lite">{this.data.lock}</a></li>
	            <li><a href="lock">{this.data.lite}</a></li>
	            <li><a href="javascript:void(0)" className="nav">{this.data.xlab}</a>
	            	<ul>
	            		<li><a href="xlab">{this.data.xlab}</a></li>
	            		<li><a href="innovation">{this.data.innovation}</a></li>
	            		<li><a href="security">{this.data.security}</a></li>
	            		<li><a href="faq">{this.data.faq}</a></li>
	            		<li><a href="representative">{this.data.representative}</a></li>
	            	</ul>
	            </li>	            
	            <li><a href="about">{this.data.about}</a></li>
	            <li><a href="contact">{this.data.contact}</a></li>
	          </ul>
        	</nav>;
  }
}

export default Navigation;