import React from 'react';
import Request from 'superagent';

class Representative extends React.Component {
 
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
 		.get('/ulac-react2/build/template/representative-cn.html')
 		.type('Content-Type', 'text/html; charset=utf8')
 		.end(function(err, res){
 			self.setState({content:res.text});

  		});
 }

 render() {
    return <div>
    		<div className="representative" dangerouslySetInnerHTML={{__html: this.state.content }}></div>
    		</div>;
  }
}

export default Representative;