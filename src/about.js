import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class About extends React.Component {
  
  constructor(prop){
  	super();

    this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);    
    this.data = {
      "content":"", 
      "carousel":""
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

  // request content
  	Request
  		.get('/ulac-react2/build/template/about.php?lang=' + (this.props.lang).toLowerCase())
  		.type('Content-Type', 'text/html; charset=utf8')
  		.end(function(err, res){
  			self.data.content = res.text;

      // request image
      Request
        .get('/ulac-react2/build/data/aboutXlab.json')
        .accept('application/json')
        .end(function(error, response){
            let json = JSON.parse(response.text);
            self.data.carousel = json.aboutCarousel;            
            console.log(self.data.carousel);
            self.setState({loadComplete:true});
      });
  });

  }

 render() {
 	let lang = this.props.lang;
  let carousel = [];

  if(this.state.loadComplete == true ){

    for (var key in this.data.carousel){
      carousel.push(<img key={"carousel" + key} src={this.data.carousel[key]} />);
    }

    return (<div className="about">
              <div className="slideshow" >
                  { carousel }
                  <span className="prev">&laquo;</span>
                  <span className="next">&raquo;</span>
              </div> 
        			<div dangerouslySetInnerHTML={{__html: this.data.content }}></div>
      	   </div>)

  } else {
    return (<div>
              <Preloader />
             </div>)
  }
}
}

export default About;