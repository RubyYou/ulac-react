import React from 'react';
import Utility from './lib/utility';


class ProductDetail extends React.Component {
  constructor(prop){
    super();
  }

  componentDidMount(){
    slideShow();
  }

  toggleModal(e) {

    let modal = document.getElementById("modal");
    if(e.target !== document.getElementById('manual')) {
        modal.style.visibility = (modal.style.visibility == "visible") ? "hidden" : "visible";      
    } else {
        console.log("click not on modal");  
    }
  }

  render(){
    let icons = [];
    let carouselImg =[];
    let dynamicSectionA = [];
    let dynamicSectionB = [];
    let content = this.props.content[0];

    let title = (this.props.lang+'_title').toLowerCase();
    let description = (this.props.lang+'_description').toLowerCase();
    let details = (this.props.lang+'_details').toLowerCase();

    
    // process icons
    let iconsArr = (content.icons).split(",");
    
    for (let i = 0; i < iconsArr.length ; i ++){
      // [RU ]adding prefix, will take out later
      //iconsArr[i] = ("/ulac-react2/build/images/icons/").concat(iconsArr[i]); //local
      iconsArr[i] = ("/images/icons/").concat(iconsArr[i]);
      icons.push(<img key={"icon" + i}src={iconsArr[i]} />);
    }

    // process carouselImg
    let carouselImgArr = (content.carouselImg).split(",");

    for (let i = 0; i < carouselImgArr.length ; i ++){
      //carouselImgArr[i] = ("/ulac-react2/build/").concat(carouselImgArr[i]); //local
      carouselImgArr[i] = ("/").concat(carouselImgArr[i]);

      if( i == 0 ){
        carouselImg.push(<img key={"carousel" + i} className="show" src={carouselImgArr[i]} />);
      }else{
        carouselImg.push(<img key={"carousel" + i} src={carouselImgArr[i]} />);
      }
    }
    
    //let security = "/ulac-react2/build/images/security/level" + content.security + ".png"; // local
    //let manual = "/ulac-react2/build/" + content.manual; // local

    let security = "/images/security/level" + content.security + ".png";
    let manual = "/" + content.manual;

    // process dynamic area
    switch(this.props.route){
      case 'accessories':
        dynamicSectionA.push(<div>
                                <p>{content[details]}</p>
                                <button onClick={this.toggleModal}>
                                  <img src="/ulac-react2/build/images/manual-button.png" />
                                </button>
                            </div>);

        dynamicSectionB.push(<div key={'lock-bottom'}>
                              <iframe width="100%" height="300" 
                                    src={content.videoLink} 
                                    frameBorder="0" 
                                    allowFullScreen>
                              </iframe>
                            </div>);
        break;

      case 'lock':
        dynamicSectionA.push(<div key={'lock-content'}>
                                <p><b>Spec: {content.spec}</b></p>
                                <p><b>Weight: {content.weight}</b></p><br/>
                                <img className="level" src={security} />
                                <button onClick={this.toggleModal}>
                                  <img src="/ulac-react2/build/images/manual-button.png" />
                                </button>
                              </div>);

        dynamicSectionB.push(<div key={'lock-bottom'}>
                                <iframe width="100%" height="300" 
                                      src={content.videoLink} 
                                      frameBorder="0" 
                                      allowFullScreen>
                                </iframe>
                              </div>);
        break;
    }

    if ( content !== undefined ){
        let contentId = (this.props.route == "lock") ? this.props.route+"_id" : "product_id";
        return <div className="product-wrap">
                  <div className="slideshow">
                    {carouselImg}
                    <span className="prev">&laquo;</span>
                    <span className="next">&raquo;</span>
                  </div>
                  <div className="product-content">
                    <h3 className="title">{content[title]}</h3>
                    <p className="main-content">{content[description]}</p>
                    <p><b>Product Code: {content[contentId]}</b></p>
                    { dynamicSectionA }
                    <div className="icons">{icons}</div>
                  </div>

                  <div className="clear"></div>
                  { dynamicSectionB } 

                  <div id="modal" onClick={this.toggleModal.bind(this)}>
                    <div>
                        <img id="manual" src={manual} />
                    </div>
                 </div>

               </div>;

    }else{
      return <p>Sorry I can not find your product</p>;

    }

  }

}

export default ProductDetail;