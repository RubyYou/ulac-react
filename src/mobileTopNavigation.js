import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import { prefixUrl } from './config';

class MobileTopNavigation extends React.Component {
  	constructor(prop){
  		super();
  	}

  	_toggleMobileMenu(){
  		document.body.classList.toggle('add-sideBar');
  	}

 	render() {

 		return (
 			<div className="mobileTopNavigation"> 
 				<span className ="mobile-toggle" ref="mobileToggle" 
 						onClick={this._toggleMobileMenu.bind(this)}>
            		<i className="fa fa-bars fa-2x"></i>
        		</span>
 				    <a href="./" className="logo">
            	<img src={`${prefixUrl}images/logo-new.png`} />
            </a>
        	</div>
        )
    }
}

export default MobileTopNavigation;