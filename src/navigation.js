import React from 'react';
import ReactDOM from "react-dom";
import Request from 'superagent';

class Navigation extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);

  	this.data = {
  		"lock":"",
  		"accessories":"",
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
 	//console.log((this.props.lang).toLowerCase());

 	Request
 		.get('/ulac-react2/build/data/navigation.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(JSON.parse(response.text).nav);
  	});
 }

 toggleSubMenu(){
    let menu = this.refs.subMenu;
    
    if( menu.className !== "open"){
      menu.className = "open";
    }else{
      menu.className = "";
    }
 }

 toggleMobileMenu(){
    let mobileToggle = this.refs.mobileToggle;
    
    if(mobileToggle.className !== "open"){
       mobileToggle.className = "open";
    }else{
       mobileToggle.className = "";
    }
 }

 loadComplete(res){
 	this.data.lock = res.lock[this.props.lang];
 	this.data.accessories = res.accessories[this.props.lang];
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
  let langList = [];
  let langArry = ['EN','KR','CN','JP'];
  let currentLangIndex = langArry.indexOf(lang);
  
  if (currentLangIndex > -1) {
     langArry.splice(currentLangIndex, 1);
  }

  for(let i = 0; i < langArry.length ; i ++){
    let link = "/ulac-react2/build/" + langArry[i];
    langList.push(<li key={'link' + i}><a href={link}>{ langArry[i] }</a></li>);
  }

  let representative = [];
  if(lang == "CN"){
    representative.push(<li><a href="representative">{ this.data.representative }</a></li>);
  }

  let prefixUrl = '/ulac-react2/build/'; // take out after when live

    return <nav>
            <ul className="lang-nav">
              <li><a href="https://twitter.com/ULAClock" target="_blank">
                    <i className="fa fa-facebook-square"></i>
                  </a>
              </li>
              <li><a href="https://www.facebook.com/ULAC-732085670258072/timeline/" target="_blank">
                    <i className="fa fa-twitter"></i>
                  </a>
              </li>
              {langList}
            </ul>
            <span id="mobileToggle" ref="mobileToggle" 
                  onClick={this.toggleMobileMenu}>
                  <i className="fa fa-bars fa-2x"></i>
            </span>
	          <ul className="nav-link">
	            <li><a href={`${prefixUrl}${lang}/lock`}>{ this.data.lock }</a></li>
	            <li><a href={`${prefixUrl}${lang}/accessories`}>{ this.data.accessories }</a></li>
	            <li><a id="toggle-submenu" href="javascript:void(0)" ref="subMenu"
                      onClick={this.toggleSubMenu}>{ this.data.xlab }</a>
	            	<ul className="sub-menu" >
	            		<li><a href={`${prefixUrl}${lang}/xlab`}>{ this.data.xlab }</a></li>
	            		<li><a href={`${prefixUrl}${lang}/innovation`}>{ this.data.innovation }</a></li>
	            		<li><a href={`${prefixUrl}${lang}/security`}>{ this.data.security }</a></li>
	            		<li><a href={`${prefixUrl}${lang}/faq`}>{ this.data.faq }</a></li>
	            		{ representative }
	            	</ul>
	            </li>	            
	            <li><a href={`${prefixUrl}${lang}/about`}>{ this.data.about }</a></li>
	            <li><a href={`${prefixUrl}${lang}/contact`}>{ this.data.contact }</a></li>
	          </ul>
        	</nav>;
  }
}

export default Navigation;