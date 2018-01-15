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
 		.get('/data/contact.json')
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
 					<section className="contact">
				      	<div className="form">
					        <form action="../gdform.php" method="post" role="form">					     
					        <input type="hidden" name="subject" value="Contact Us"/>
					        <input type="hidden" name="redirect" value="/contact"/>
					        <input type="hidden" name="email" value={this.data.emailAddress} />
					       
					        <div className="form-group">
							    <label htmlFor="name" className="label">{this.data.nameLabel}</label>
							      <input type="text" name="name" className="input-field" id="name" placeholder={this.data.nameLabel} />
							  </div>
							  <div className="form-group">
							    <label htmlFor="company" className="label">{this.data.companyLabel}</label>
							      <input type="test" name="company" className="input-field" id="company" placeholder={this.data.companyLabel} />
							  </div>
							  <div className="form-group">
							    <label htmlFor="Email" className="label">{this.data.emailLabel}</label>
							      <input type="email" name="email" className="input-field" id="email" placeholder={this.data.emailLabel} />
							  </div>
							  <div className="form-group">
							    <label htmlFor="phone" className="label">{this.data.phoneLabel}</label>
							      <input type="number" name="phone" className="input-field" id="phone" placeholder={this.data.phoneLabel} />
							  </div>
							  <div className="form-group">
							       <label htmlFor="inquiry" className="label">{this.data.inquiryLabel}</label>
							          <textarea type="text" name="inquiry" className="input-field" rows="6"
							          placeholder="Please fill in details"></textarea>
							  </div>
							  <div className="form-group text-center">
							  
							      <button name="reset" type="reset" className="btn btn-ulac">{this.data.resetLabel}</button>
							      <button name="submit" type="submit" value="submit" className="btn btn-ulac" >{this.data.submitLabel}</button>
							  </div>
				        </form>
				        </div>
				      </section>				      
				      <section className="map text-center">
						    <h3 dangerouslySetInnerHTML={{__html: this.data.mapTitle }}></h3> 
					        <img className="width100" src="/images/ULAC_map.jpg" />
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