import React from 'react';
import ReactDOM from "react-dom";
import Request from 'superagent';
import { prefixUrl } from './config';

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

 	Request
 		.get(prefixUrl+'data/navigation.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(JSON.parse(response.text).nav);
  	});
 }

 toggleSubMenu(refsName){
    let menu = this.refs[refsName];
    
    if(!menu.classList.contains("open")){
      menu.classList.add("open");
    }else{
      menu.classList.remove("open");
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
  this.data.media = res.media[this.props.lang];
 	this.data.contact = res.contact[this.props.lang];

 	this.setState({loadComplete:true});
 }


 render() {
 	let lang = this.props.lang;
  let langList = [];
  let langArry = ['EN','JP','CN','KR'];
  let currentLangIndex = langArry.indexOf(lang);
  
  if (currentLangIndex > -1) {
     langArry.splice(currentLangIndex, 1);
  }

  for(let i = 0; i < langArry.length ; i ++){
    let link = prefixUrl+langArry[i];

    langList.push(<li key={'link' + i}><a href={link}>{langArry[i]}</a></li>);
  }

  let representative = [];
  if(lang == "CN"){
    representative.push(<li><a href="representative">{ this.data.representative }</a></li>);
  }

  return (<nav>
            <div className="nav-container">
            <a href="./" className="logo">
                <img src={`${prefixUrl}images/logo-new.png`} />
            </a>
            <ul className="lang-nav">
              <li className="email">
                <a href="mailto:inquiry@ulaclock.com">
                  inquiry@ulaclock.com
                </a>
                <span>|</span>
              </li>
              <li><a href="https://vimeo.com/ulaclock" target="_blank">
                    <i className="fa fa-vimeo" />
                  </a>
              </li>
              <li><a href="https://www.facebook.com/ULAC-732085670258072/timeline/" target="_blank">
                    <i className="fa fa-facebook-square" />
                  </a>
              </li>
              <li><a href="https://twitter.com/ULAClock" target="_blank">
                    <i className="fa fa-twitter" />
                  </a>
              </li>
              <li><a href="https://www.instagram.com/ulaclock/" target="_blank">
                    <i className="fa fa-instagram" />
                  </a>
              </li>
              <li><a className="toggle-submenu" href="javascript:void(0)" ref="language"
                    onClick={this.toggleSubMenu.bind(this, "language")}>{ this.props.lang } 
                    <span style={{fontSize: "12px"}}> &#9660;</span></a>
                  <ul className="sub-menu" > {langList} </ul>
              </li>
            </ul>
	          <ul className="nav-link">
	            <li><a href={`${prefixUrl}${lang}/lock`}>{ this.data.lock }</a></li>
	            <li><a className="toggle-submenu" href="javascript:void(0)" ref="xlab"
                      onClick={this.toggleSubMenu.bind(this, "xlab")}>{ this.data.xlab } &#x25BC;</a>
	            	<ul className="sub-menu" >
	            		<li><a href={`${prefixUrl}${lang}/xlab`}>{ this.data.xlab }</a></li>
	            		<li><a href={`${prefixUrl}${lang}/innovation`}>{ this.data.innovation }</a></li>
	            		<li><a href={`${prefixUrl}${lang}/security`}>{ this.data.security }</a></li>
	            		{ representative }
	            	</ul>
	            </li>	            
	            <li><a href={`${prefixUrl}${lang}/about`}>{ this.data.about }</a></li>
              <li><a href={`${prefixUrl}${lang}/media`}>{ this.data.media }</a></li>
	            <li>
                <a className="toggle-submenu" href="javascript:void(0)" ref="contact"
                      onClick={this.toggleSubMenu.bind(this, "contact")}>{ this.data.contact } &#x25BC;</a>
                <ul className="sub-menu" >
                  <li><a href={`${prefixUrl}${lang}/contact`}>{ this.data.contact }</a></li>
                  <li><a href={`${prefixUrl}${lang}/faq`}>{ this.data.faq }</a></li>
                </ul>
              </li>
	          </ul>
            <div className="clear"></div>
            </div>
        </nav>);
  }
}

export default Navigation;