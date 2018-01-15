import React from 'react';
import Utility from './lib/utility';

class ProductCategories extends React.Component {
  constructor(prop){
  	super();
  	this.getObjectSize = this.getObjectSize.bind(this);
  }

  getObjectSize (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  }

  render(){
  	let items = [];
  	let content = this.props.content;
  	let summary = (this.props.lang+'_summary').toLowerCase();
    let title = (this.props.lang+'_title').toLowerCase();
    let description = (this.props.lang+'_description').toLowerCase();
    let size = this.getObjectSize(content);
    let contentId = (this.props.route == "lock") ? this.props.route + "_id" : "product_id";


    for (let i = 0; i < size; i++){
      //content[i].thumbImg = ("/ulac-react2/build/").concat(content[i].thumbImg); // local
      if (content[i].show == true) {
        content[i].thumbImg = ("/").concat(content[i].thumbImg);
        items.push(<a href={"#"+content[i][contentId]} 
                      className="item" key={i}>
                      <img src={content[i].thumbImg} />
                      <hr/>
                      <p><b>{content[i][summary]}</b></p>
                    </a>);
      }
    }

  	return <div className="product-wrapper">
  				{items}
           <div className="clear"></div>
  			</div>;
  }

}

export default ProductCategories;