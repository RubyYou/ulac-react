import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import { prefixUrl } from './config';

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
    //window.addEventListener("resize", this.resize.bind(this), false);
  }

  componentDidUpdate(){
    // if(this.state.loadComplete){
    //   slideShow('li');
    // }
  }

  getContent(){
  	let self = this;

  // request content
  	Request
  		.get(prefixUrl + 'template/about.php?lang=' + (this.props.lang).toLowerCase())
  		.type('Content-Type', 'text/html; charset=utf8')
  		.end(function(err, res){
  			self.data.content = res.text;

      // request image
      Request
        .get( prefixUrl + 'data/aboutXlab.json')
        .accept('application/json')
        .end(function(error, response){
            let json = JSON.parse(response.text);
            self.data.carousel = json.aboutCarousel;            
            self.setState({loadComplete:true});
            //self.resize();
      });
    });
  }

  // resize(){
  //       this._slideShow = document.getElementsByClassName('slideshow')[0];
  //       this._slides = Array.from(this._slideShow.getElementsByTagName("li"));
  //       let scaleNode;

  //       if(window.innerWidth <= 480){
  //           scaleNode = 0;
  //       }else if(window.innerWidth > 480 && window.innerWidth <= 640){
  //           scaleNode = 1;
  //       }else if(window.innerWidth > 641){
  //           scaleNode = 2;
  //       }

  //       if(this._slideShow.dataset.scale){
  //           if(this._slideShow.dataset.scale !== scaleNode){
  //               this._swapImage(scaleNode);
  //           }else{
  //               return ;
  //           }
  //       }else{
  //           this._swapImage(scaleNode);
  //       }
  //   }

  // _swapImage(sourceNode){
  //     this._slideShow.setAttribute('data-scale', sourceNode);
      
  //     this._slides.forEach((slide, index) => {
  //         slide.style.backgroundImage = 'url('+this.data.carousel[index][sourceNode]+')';
  //     });
  // }

  render() {
   	let lang = this.props.lang;
    //let carousel = [];

    if(this.state.loadComplete == true ){

      // for (var key in this.data.carousel){
      //   carousel.push(<li key={"carousel" + key} ></li>);
      // }
      // <ul className="slideshow" >
      //     { carousel }
      //     <span className="prev">&laquo;</span>
      //     <span className="next">&raquo;</span>
      // </ul> 
      return (<div className="about">
                <div className="video-wrapper">
                  <iframe className="slideshow" src="https://player.vimeo.com/video/179161751" 
                    frameborder="0" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
                </div>
          			<div className="content"dangerouslySetInnerHTML={{__html: this.data.content }}></div>
        	   </div>)

    } else {
      return (<div>
                <Preloader />
               </div>)
    }
  }
}

export default About;