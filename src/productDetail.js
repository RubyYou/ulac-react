import React from 'react';
import Utility from './lib/utility';


class ProductDetail extends React.Component {
  constructor(prop){
    super();
  }

  componentDidMount(){
    slideShow();
  }

  render(){
    let icons = [];
    let carouselImg =[];
    let content = this.props.content[0];
    let title = (this.props.lang+'_title').toLowerCase();
    let description = (this.props.lang+'_description').toLowerCase();

    // process icons
    let iconsArr = (content.icons).split(",");
    
    for (let i = 0; i < iconsArr.length ; i ++){
      // [RU ]adding prefix, will take out later
      iconsArr[i] = ("/ulac-react2/build/images/icons/").concat(iconsArr[i]);
      icons.push(<img key={"icon" + i}src={iconsArr[i]} />);
    }

    // process carouselImg
    let carouselImgArr = (content.carouselImg).split(",");

    for (let i = 0; i < carouselImgArr.length ; i ++){
      carouselImgArr[i] = ("/ulac-react2/build/").concat(carouselImgArr[i]);
      if( i == 0 ){
        carouselImg.push(<img key={"carousel" + i} className="show" src={carouselImgArr[i]} />);
      }else{
        carouselImg.push(<img key={"carousel" + i} src={carouselImgArr[i]} />);
      }

    }

    let security = "/ulac-react2/build/images/security/level" + content.security + ".png";
    let manual = "/ulac-react2/build/" + content.manual;

    if ( content !== undefined){
        return <div className="product-wrap">
                  <div className="slideshow">
                    {carouselImg}
                    <span className="prev">&laquo;</span>
                    <span className="next">&raquo;</span>
                  </div>
                  <div className="product-content">
                    <h3 className="title">{content[title]}</h3>
                    <p>{content[description]}</p>
                    <h3>Product Code: {content.lock_id}</h3>
                    <h3>Spec: {content.spec}</h3>
                    <h3>Weight: {content.weight}</h3> 
                    <img className="security" src={security} />
                    <div className="icons">{icons}</div>
                  </div>

                  <div className="clear"></div>

                  <img className="manual" src={manual} />
                  <iframe width="500" height="400" 
                          src={content.videoLink} 
                          frameBorder="0" 
                          allowFullScreen>
                  </iframe>
               </div>;

    }else{

      return <p>Sorry I can not find your product</p>;

    }

  }

}

export default ProductDetail;