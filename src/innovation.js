import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class Innovation extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.data = {
  		"introText":"",
  		"classicText":"",
  		"modernText":"",
  		"futureText":"",
		"classicVideos":"", 
		"modernVideos":"",
		"futureVideos":""
  	};

  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
 }

 componentDidMount(){
 	this.getContent();
 }

 componentDidUpdate(){
  	if(this.state.loadComplete){
  		slideShow();
  	}
 }

 getContent(){
 	let self = this;
 	console.log((this.props.lang).toLowerCase());

 	Request
 		.get('/ulac-react2/build/data/innovation.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(response.body);
  		});
 }

 loadComplete(res){
 	this.data.introText = res.paragraphs.intro;
 	this.data.classicText = res.paragraphs[this.props.lang].classic;
 	this.data.modernText = res.paragraphs[this.props.lang].modern;
 	this.data.futureText = res.paragraphs[this.props.lang].future;
 	this.data.classicVideos = res.videos.classic;
 	this.data.modernVideos = res.videos.modern;
 	this.data.futureVideos = res.videos.future;

 	this.setState({loadComplete:true});

 }

 render() {
 	let classicCarousel = [],
 	 	modernCarousel = [],
 	 	futureCarousel = [];
 	let self = this;

 	if(this.state.loadComplete == true ){

 		for (var key in self.data.classicVideos){
 			classicCarousel.push(
 				<iframe width="640" height="360" key={"classicVideo"+key} 
 						src={self.data.classicVideos[key]} frameBorder="0" allowFullScreen>
			    </iframe>);
 		}

 		for (var key in self.data.modernVideos){
 			modernCarousel.push(
 				<iframe width="640" height="360" key={"modernVideo"+key} 
 						src={self.data.modernVideos[key]} frameBorder="0" allowFullScreen>
			    </iframe>);
 		}

 		for (var key in self.data.futureVideos){
 			futureCarousel.push(
 				<iframe width="640" height="360" key={"futureVideo"+key} 
 						src={self.data.futureVideos[key]} frameBorder="0" allowFullScreen>
			    </iframe>);
 		}


 		return (<div>
 					<div className="grid grid-pad">
 						<div className="col-7-12" dangerouslySetInnerHTML={{__html: self.data.introText }}></div>
 						<img className="col-5-12" src="/ulac-react2/build/images/innovation_xlab.png" />
 					</div>

 					<div className="grid grid-pad">
 						<div className="col-7-12">
							<div className="slideshow">
								{classicCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
	    				<div className="col-5-12" dangerouslySetInnerHTML={{__html: self.data.classicText }}></div>
    				</div>

    				<div className="grid grid-pad">
    					<div className="col-7-12">
		    				<div className="slideshow">
								{modernCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
	    				<div className="col-5-12" dangerouslySetInnerHTML={{__html: self.data.modernText }}></div>
    				</div>

    				<div className="grid grid-pad">
    					<div className="col-7-12">
		    				<div className="slideshow">
								{futureCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
	    				<div className="col-5-12" dangerouslySetInnerHTML={{__html: self.data.futureText }}></div>
    				</div>
	    		</div>)

 	} else {
 		return (<div>
 					<Preloader />
 			   </div>)
 	}
  }
}

export default Innovation;