import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class Contact extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.data = {
  		"emailAddress":"",
  		"nameLabel":"",
  		"companyLabel":"",
  		"emailLabel":"",
  		"phoneLabel":"",
  		"inquiryLabel":"",
  		"resetLabel":"",
  		"submitLabel":"",
  		"mapTitle":""
  	};

  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
 }

 componentDidMount(){
 	this.getContent();
 }

 getContent(){
 	let self = this;
 	console.log((this.props.lang).toLowerCase());

 	Request
 		.get('/ulac-react2/build/data/contact.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(response.body);
  		});
 }

 loadComplete(res){
 	this.data.emailAddress = res.emailAddress;
 	this.data.nameLabel = res.labels.name[this.props.lang];
 	this.data.companyLabel = res.labels.company[this.props.lang];
 	this.data.emailLabel = res.labels.email[this.props.lang];
 	this.data.phoneLabel = res.labels.phone[this.props.lang];
 	this.data.inquiryLabel = res.labels.inquiry[this.props.lang];
 	this.data.resetLabel = res.labels.reset[this.props.lang];
 	this.data.submitLabel = res.labels.submit[this.props.lang];
 	this.data.mapTitle = res.labels.mapTitle[this.props.lang];
 	
 	this.setState({loadComplete:true});

 }

 render() {
 	let self = this;

 	if(this.state.loadComplete == true ){

 		return (<div>
 					<section id="contact">
				      	<div className="col-md-6 col-md-offset-3">
					        
					        <form action="../gdform.php" method="post" role="form">
					     
					        <input type="hidden" name="subject" value="Contact Us"/>
					        <input type="hidden" name="redirect" value="contact.php"/>
					        <input type="hidden" name="email" value={this.data.emailAddress} />
					       
					        <div className="form-group">
							    <label htmlFor="name" className="col-sm-2 control-label">{this.data.nameLabel}</label>
							    <div className="col-sm-10">
							      <input type="text" name="name" className="form-control" id="name" placeholder={this.data.nameLabel} />
							    </div>
							  </div>
							  <div className="form-group">
							    <label htmlFor="company" className="col-sm-2 control-label">{this.data.companyLabel}</label>
							    <div className="col-sm-10">
							      <input type="test" name="company" className="form-control" id="company" placeholder={this.data.companyLabel} />
							    </div>
							  </div>
							  <div className="form-group">
							    <label htmlFor="Email" className="col-sm-2 control-label">{this.data.emailLabel}</label>
							    <div className="col-sm-10">
							      <input type="email" name="email" className="form-control" id="email" placeholder={this.data.emailLabel} />
							    </div>
							  </div>
							  <div className="form-group">
							    <label htmlFor="phone" className="col-sm-2 control-label">{this.data.phoneLabel}</label>
							    <div className="col-sm-10">
							      <input type="number" name="phone" className="form-control" id="phone" placeholder={this.data.phoneLabel} />
							    </div>
							  </div>
							  <div className="form-group">
							       <label htmlFor="inquiry" className="col-sm-2 control-label">{this.data.inquiryLabel}</label>
							    <div className="col-sm-10">
							          <textarea type="text" name="inquiry" className="form-control" rows="6"
							          placeholder="Please fill in details"></textarea>
							    </div>
							  </div>
							  <div className="form-group">
							    <div className="col-sm-offset-2 col-sm-10">
							      <button name="reset" type="reset" className="btn btn-ulac">{this.data.resetLabel}</button>
							      <button name="submit" type="submit" value="submit" className="btn btn-ulac" >{this.data.submitLabel}</button>
							    </div>
							  </div>
				        </form>
				        </div>
				      </section>				      
				      <section id="map" className="row text-center">
						    <h3 dangerouslySetInnerHTML={{__html: this.data.nameLabel }}></h3> 
					        <img className="img-responsive" src="/ulac-react2/build/images/ULAC_map.jpg" />
				      </section>
	    		</div>)

 	} else {
 		return (<div>
 					<Preloader />
 			   </div>)
 	}
  }
}

export default Contact;