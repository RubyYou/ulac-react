import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import { prefixUrl } from './config';

class Media extends React.Component {
  
  constructor(prop){
  	super();

    this.state = {loadComplete:false};
  	this.getContent = this.getContent.bind(this);    
    this.media = [];
  }

  componentDidMount(){
  	this.getContent();
  }

 getContent(){
  let self = this;
 
  Request
    .get(prefixUrl + 'data/media.json')
    .accept('application/json')
    .end(function(err, response){
      self.media = response.body.media;
      self.setState({loadComplete:true});
    });
 }

  render() {
   	let lang = this.props.lang;
    let mediaList = [];

    if(this.state.loadComplete && this.media.length > 0){
      
      this.media.map((item, idx)=>{
          let subContent = [];

          if(item.subContent && item.subContent.length > 0){
             item.subContent.map((subItem, index)=>{
              subContent.push(<li><a href={subItem.link}> {subItem.title} &#x25BC; </a></li>);
             });
             mediaList.push(
              <li ref="subContent">
                <a onClick={this._openSubItem.bind(this)} href="javascript:void(0)">{item.title} &#x25BC; </a>
                <ul> {subContent} </ul>
              </li>
             )
          }else{
              mediaList.push(<li><a href={item.link}> {item.title} &#x25BC; </a></li>);
          }
      })

      return (<div className="media">
                <div className="header-image"> 
                </div>
                <ul className="list-content">
                  { mediaList }
                </ul>
        	   </div>)

    } else {
      return (<div>
                <Preloader />
               </div>)
    }
  }

  _openSubItem(e){
     this.refs.subContent.classList.toggle('open');
  }
}

export default Media;