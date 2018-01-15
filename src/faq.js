import React from 'react';
import Request from 'superagent';

class Faq extends React.Component {
 
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
 		.get('/template/faq.php?lang=' + (this.props.lang).toLowerCase())
 		.type('Content-Type', 'text/html; charset=utf8')
 		.end(function(err, res){
 			self.setState({content:res.text});
  		});
 }

 render() {
    return <div className="faq" >
            <div className="grid grid-pad">
                  <iframe width="100%" height="380" src="https://www.youtube.com/embed/IXNASUSivqg" frameborder="0"></iframe>
            </div>
      			<div dangerouslySetInnerHTML={{__html: this.state.content }}></div>
      	   </div>;
  }
}

export default Faq;