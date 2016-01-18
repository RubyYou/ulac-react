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


    for (let i = 0; i < size; i++){
    	content[i].thumbImg = ("/ulac-react2/build/").concat(content[i].thumbImg);

    	items.push(<div className="item" key={i} 
    					productId={content[i].lock_id}> 					
    					<img src={content[i].thumbImg} />
    					<p>{content[i][summary]}</p>
    				</div>);
    }

  	return <div className="wrapper">
  				{items}
  			</div>;
  }

}

export default ProductCategories;