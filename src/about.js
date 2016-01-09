import React from 'react';
import Request from 'superagent';

class About extends React.Component {
  
 constructor(prop){
  	super();
  	this.state = {content:""};
  	this.getContent = this.getContent.bind(this);
 }

 componentDidMount(){
 	this.getContent();
 }

 getContent(){
 	let self = this;

 	Request
 		.get('/ulac-react2/build/template/about.php?lang=' + (this.props.lang).toLowerCase())
 		.type('Content-Type', 'text/html; charset=utf8')
 		.end(function(err, res){
 			// get lang-about

 			self.setState({content:res.text});

  		});
 }

 render() {
 	let lang = this.props.lang;

    return <div>
    		<p>About ULAC</p>
    		<div className="content" dangerouslySetInnerHTML={{__html: this.state.content }}></div>
    	   </div>;
  }
}

export default About;