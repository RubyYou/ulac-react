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
 		.get('/ulac-react2/build/template/faq.php?lang=' + (this.props.lang).toLowerCase())
 		.type('Content-Type', 'text/html; charset=utf8')
 		.end(function(err, res){
 			self.setState({content:res.text});
  		});
 }

 render() {
    return <div className="faq" >
    			<div dangerouslySetInnerHTML={{__html: this.state.content }}></div>
				<div className="grid grid-pad">
                  <div className="col-1-2">
                  	<iframe width="100%" height="260" src="https://www.youtube.com/embed/ryY-qMFLcfo" frameborder="0"></iframe>
                  </div>
                  <div className="col-1-2">
					<img src="/images/keepItSafe.jpg" alt="keep_it_safe" />
                  </div>
                </div>
    	   </div>;
  }
}

export default Faq;