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
    	let summaryArr = (content[i][summary]).split(",");

    	items.push(<a href={"#"+content[i].lock_id} 
    				  className="item" key={i}>
    					<img src={content[i].thumbImg} />
    					<hr/>
    					<ul>
    						<li>{summaryArr[0]}</li>
    						<li>{summaryArr[1]}</li>
    						<li>{summaryArr[2]}</li>
    					</ul>
    				</a>);
    }

  	return <div className="wrapper">
  				{items}
  			</div>;
  }

}

export default ProductCategories;