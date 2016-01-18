import React from 'react';
import Utility from './lib/utility';

class ProductDetail extends React.Component {
  constructor(prop){
    super();
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
      icons.push(<img src={iconsArr[i]} />);
    }

    // process carouselImg
    let carouselImgArr = (content.carouselImg).split(",");
    for (let i = 0; i < carouselImgArr.length ; i ++){
      carouselImgArr[i] = ("/ulac-react2/build/").concat(carouselImgArr[i]);
      carouselImg.push(<img src={carouselImgArr[i]} />);
    }

    let security = "/ulac-react2/build/images/security/level" + content.security + ".png";
    let manual = "/ulac-react2/build/" + content.manual;

    if ( content !== undefined){
        return <div className="wrapper">
              <h2>{content.lock_id}</h2>
              <h1>{content[title]}</h1>
              <p>{content[description]}</p>
              <p>{content.spec}</p>
              {icons}
              {carouselImg}
              <img src={manual} />
              <img src={security} />
              <iframe width="420" height="300" src={content.videoLink} frameBorder="0" allowFullScreen></iframe>
           </div>;

    }else{

      return <p>Sorry I can not find your product</p>;

    }

  }

}

export default ProductDetail;