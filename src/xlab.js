import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class Xlab extends React.Component {
 
 constructor(prop){
  	super();
  	this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);
  	this.loadComplete = this.loadComplete.bind(this);
  	this.data = {
  		"designSliderImgs":"",
  		"exploreSliderImgs":"",
  		"innovationSliderImgs":"",
  		"testSliderImgs":"",
		"designText":"", 
		"exploreText":"",
		"innovationText":"",
		"testText":""
  	};
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
 	let path = "/ulac-react2/build";

 	Request
 		.get('/data/aboutXlab.json')
 		.accept('application/json')
 		.end(function(err, response){
 			self.loadComplete(response.body);
  		});
 }

 loadComplete(res){
 	this.data.designText = res.paragraphs[this.props.lang].design;
 	this.data.exploreText = res.paragraphs[this.props.lang].explore;
 	this.data.innovationText = res.paragraphs[this.props.lang].innovation;
 	this.data.testText = res.paragraphs[this.props.lang].test;
 	this.data.designSliderImgs = res.carouselImg.design;
 	this.data.exploreSliderImgs = res.carouselImg.explore;
 	this.data.innovationSliderImgs = res.carouselImg.innovation;
 	this.data.testSliderImgs = res.carouselImg.test;
 	this.setState({loadComplete:true}); 	
 }

 render() {
 	let designCarousel = [],
 	 	exploreCarousel = [],
 	 	innovationCarousel = [],
 	 	testCarousel = [];
 	let self = this;

 	if(this.state.loadComplete == true ){
 		for (var key in self.data.designSliderImgs){
 			designCarousel.push(<img key={"designImg" + key} src={self.data.designSliderImgs[key]} />);
 		}

 		for (var key in self.data.exploreSliderImgs){
 			exploreCarousel.push(<img key={"exploreImg" + key} src={self.data.exploreSliderImgs[key]} />);
 		}

 		for (var key in self.data.innovationSliderImgs){
 			innovationCarousel.push(<img key={"innovation" + key} src={self.data.innovationSliderImgs[key]} />);
 		}

 		for (var key in self.data.testSliderImgs){
 			testCarousel.push(<img key={"test" + key} src={self.data.testSliderImgs[key]} />);
 		}

 		return (<div className="xlab">
 					<div className="grid grid-pad">
	 					<div className="col-6-12">
							<div className="slideshow" >
								{designCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
    					<div className="col-6-12" dangerouslySetInnerHTML={{__html: self.data.designText }}></div>
    				</div>
    				<div className="grid grid-pad">
	    				<div className="col-6-12">
		    				<div className="slideshow">
								{exploreCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
    					<div className="col-6-12" dangerouslySetInnerHTML={{__html: self.data.exploreText }}></div>
    				</div>

    				<div className="grid grid-pad">
	    				<div className="col-6-12">
		    				<div className="slideshow">
								{innovationCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
    					<div className="col-6-12" dangerouslySetInnerHTML={{__html: self.data.innovationText }}></div>
    				</div>

    				<div className="grid grid-pad">
	    				<div className="col-6-12">
		    				<div className="slideshow">
								{testCarousel}
								<span className="prev">&laquo;</span>
								<span className="next">&raquo;</span>
							</div>
						</div>
    					<div className="col-6-12" dangerouslySetInnerHTML={{__html: self.data.testText }}></div>
    				</div>
	    		</div>)

 	} else {
 		return (<div>
 					<Preloader />
 			   </div>)
 	}
  }
}

export default Xlab;