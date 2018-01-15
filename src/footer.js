import React from 'react';
import ReactDOM from "react-dom";
import Request from 'superagent';
import { prefixUrl } from './config';

class Footer extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
  	this.data = {
  		"sectionA":"",
  		"sectionB":"",
  		"sectionC":"",
      "sectionD":"",
      "sectionE":""
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
 			self.loadComplete(JSON.parse(response.text).footer);
  	});
 }

 loadComplete(res){
 	this.data.sectionA = res.sectionA[this.props.lang];
 	this.data.sectionB = res.sectionB[this.props.lang];
 	this.data.sectionC = res.sectionC[this.props.lang];
  this.data.sectionD = res.sectionD[this.props.lang];
  this.data.sectionE = res.sectionE[this.props.lang];
 	this.setState({loadComplete:true});
 }


 render() {
 	let lang = this.props.lang;
  let footerContent = [];
  let year = new Date().getFullYear();

  if(lang == "CN" || lang == "KR"){
        footerContent.push(
          <div key={'footer'}>
            <div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionA }}></div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionB }}></div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionD }}></div>
              <div className="clear"></div>
            </div>
            <div className="row">
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionE }}></div>
            </div>
          </div>);
   }else{
        footerContent.push(
          <div key={'footer'}>
            <div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionA }}></div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionB }}></div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionC }}></div>
              <div className="clear"></div>
            </div>
            <div className="row">
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionD }}></div>
              <div className="col-1-3" dangerouslySetInnerHTML={{__html: this.data.sectionE }}></div>
            </div>
          </div>);
   }
  
    return <footer>
              <div className="grid grid-pad">
                  {footerContent}
                  <div className="clear"></div>
                  <hr/>
                  <div className="copy-area">
                    <div className="logo-wrap">
                      <img src={`${prefixUrl}images/logo-new.png`} />
                    </div>
                    <div className="copy">
                      <p>ULAC is the worldwide leader of bicycle lock design and engineering.
                      We are the first manufacturer who produced complete silicon overmoulding ulock.</p>
                    </div>
                    <div className="social">
                      <a href="https://vimeo.com/ulaclock" target="_blank">
                        <i className="fa fa-vimeo" />
                      </a>
                      <a href="https://www.facebook.com/ULAC-732085670258072/timeline/" target="_blank">
                        <i className="fa fa-facebook-square" />
                      </a>
                      <a href="https://twitter.com/ULAClock" target="_blank">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="https://www.instagram.com/ulaclock/" target="_blank">
                        <i className="fa fa-instagram" />
                      </a>
                        <div className="clear"></div>
                        <p className="trade-mark">ULAC IS A REGISTERED TRADEMARK. ALL RIGHTS RESERVED {year} </p>
                    </div>
                  </div>
              </div>
              <div className="colors">
                <div style={{ backgroundColor: "#fdf5e0" }}></div>
                <div style={{ backgroundColor: "#fceec9" }} ></div>
                <div style={{ backgroundColor: "#fbe8ae" }}></div>
                <div style={{ backgroundColor: "#f9e296" }}></div>
                <div style={{ backgroundColor: "#f9dc7e" }}></div>
                <div style={{ backgroundColor: "#f7d663" }}></div>
                <div style={{ backgroundColor: "#f5cf3c" }}></div>
              </div>   
        	</footer>;
  }
}

export default Footer;