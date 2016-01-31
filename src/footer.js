import React from 'react';
import ReactDOM from "react-dom";
import Request from 'superagent';

class Footer extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
  	this.data = {
  		"sectionA":"",
  		"sectionB":"",
  		"sectionC":""
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
 			self.loadComplete(JSON.parse(response.text).footer);
  	});
 }

 loadComplete(res){
 	this.data.sectionA = res.sectionA[this.props.lang];
 	this.data.sectionB = res.sectionB[this.props.lang];
 	this.data.sectionC = res.sectionC[this.props.lang];
 	
 	this.setState({loadComplete:true});
 }


 render() {
 	let lang = this.props.lang;
  let footerContent = [];

  if(lang == "CN" || lang == "KR"){
        footerContent.push(<div>
                <div className="col-1-2" dangerouslySetInnerHTML={{__html:this.data.sectionA }}></div>
                <div className="col-1-2" dangerouslySetInnerHTML={{__html:this.data.sectionB }}></div>
                          </div>);
   }else{
        footerContent.push(<div>
                <div className="col-1-3" dangerouslySetInnerHTML={{__html:this.data.sectionA }}></div>
                <div className="col-1-3" dangerouslySetInnerHTML={{__html:this.data.sectionB }}></div>
                <div className="col-1-3" dangerouslySetInnerHTML={{__html:this.data.sectionC }}></div>
                          </div>);
   }
  
    return <footer>
              <div className="grid grid-pad">
                  {footerContent}
              </div>
        	</footer>;
  }
}

export default Footer;