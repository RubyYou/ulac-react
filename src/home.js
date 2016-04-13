import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';

class Home extends React.Component {

 constructor(prop){
    super();
    this.state = { loadComplete : false };
    this.data = { "carouselImg" : "" };

    this.getContent = this.getContent.bind(this);
    this.loadComplete = this.loadComplete.bind(this);
 }

 componentDidMount(){
    slideShow();
    this.getContent();
 }

 getContent(){
  let self = this;

  Request
    .get('/ulac-react2/build/data/home.json')
    .accept('application/json')
    .end(function(err, response){
      self.loadComplete(response.body);
    });
 }

loadComplete(res){
  this.data.carouselImg = res.carousel;
  this.setState({loadComplete:true});   
 }

 render() {
  let lang = this.props.lang;
  let carousel = [];

  if(this.state.loadComplete == true ){

    for (var i in this.data.carouselImg){
      let className = "";
      
      if(i == 0 ){
        className = "show";
      }

      carousel.push(<a href="javascript:void(0)" key={"carousel" + i}>
                      <picture>
                        <source media="(min-width: 992px)" srcSet={this.data.carouselImg[i][3]} />
                        <source media="(min-width: 768px)" srcSet={this.data.carouselImg[i][2]} />
                        <source media="(min-width: 480px)" srcSet={this.data.carouselImg[i][1]} />
                        <source media="(min-width: 320px)" srcSet={this.data.carouselImg[i][0]} />
                        <img className={className} srcSet={this.data.carouselImg[i][3]} />
                      </picture>
                    </a>);
    }

    let linkPrefix = "/ulac-react2/build/"+ lang+ "/";

      return (<div className="home">
              <div className="slideshow">
                 { carousel }
                   <span className="prev">&laquo;</span>
                   <span className="next">&raquo;</span>
                 </div>
                 <div className="grid grid-pad menuThumb">
                  <div className="col-1-3" >
                    <a href={linkPrefix + "/lock"}>
                       <img src="/ulac-react2/build/images/block-1.jpg" />
                       <h3>BICYCLE LOCK</h3>
                    </a>
                  </div>
                  <div className="col-1-3" >
                    <a href={linkPrefix + "/lite"}>
                       <img src="/ulac-react2/build/images/block-2.jpg" />
                       <h3>BICYCLE LIGHT</h3>
                    </a>
                  </div>
                  <div className="col-1-3" >
                    <a href={linkPrefix + "/innovation"}>
                       <img src="/ulac-react2/build/images/block-3.jpg" />
                       <h3>INNOVATION</h3>
                    </a>
                  </div>      
                 </div>
                <div className="video-section">
                <iframe width="640" height="360" src="//www.youtube.com/embed/43wOlX-7Ynw" frameBorder="0" allowFullScreen></iframe>
                <p>Since its founding in Taiwan in 1985, ULAC has promoted consumer safety and security through the manufacture of secure and fashionable bicycle locks and lights.</p>
              </div>
             </div>)
    
    } else {
      return (<div>
                <Preloader />
              </div>)
    }
  }
}

export default Home;