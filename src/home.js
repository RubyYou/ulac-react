import React from 'react';
import ReactDOMServer from 'react-dom/server';

class Home extends React.Component {
 componentDidMount(){
    slideShow();
 }


 render() {
  let lang = this.props.lang;
 	let carousel = [];

 	for (let i = 0; i<3; i++){
 		let className = "";
 		
 		if(i == 0){
 			className = "show";
 		}
		 		
 		carousel.push(<a href="lock.php#AX1">
    				        <picture>
    				          <source media="(min-width: 992px)" srcSet="/ulac-react2/build/images/featured/K8_1200x600.jpg" />
    				          <source media="(min-width: 768px)" srcSet="/ulac-react2/build/images/featured/K8_992x450.jpg" />
    				          <source media="(min-width: 480px)" srcSet="/ulac-react2/build/images/featured/K8_768x450.jpg" />
    				          <source media="(min-width: 320px)" srcSet="/ulac-react2/build/images/featured/K8_480x235.jpg" />
    				          <img className={className} srcSet="/ulac-react2/build/images/featured/K8_480x235.jpg" />
    				        </picture>
    				      </a>);
 	}

  let linkPrefix = "/ulac-react2/build/"+ lang+ "/";

    return <div className="home">
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
      	   </div>;
  }
}

export default Home;