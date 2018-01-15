import React from 'react';

class Popup extends React.Component {

	constructor(props){
  		super(props);

  		this.state = {
  			videoLink : this._randomVideo(),
  			show : this.props.show
  		};

  		this._resize = this._resize.bind(this);

  	}

	componentDidMount(){
		
		window.onresize = this._resize.bind(this);
		let self = this;

		setTimeout(function(){
			self._resize();
		}, 1000);
		
	}

	_randomVideo(){

		let videoArr = [
			"https://player.vimeo.com/video/179163828",
			"https://player.vimeo.com/video/179163593",
			"https://player.vimeo.com/video/179163260",
			"https://player.vimeo.com/video/179163130",
			"https://player.vimeo.com/video/179162841",
			"https://player.vimeo.com/video/179162719",
			"https://player.vimeo.com/video/179162628",
			"https://player.vimeo.com/video/179162197",
			"https://player.vimeo.com/video/179161751"
		];

		return videoArr[Math.floor(Math.random()*videoArr.length)];
	}

	_closeModal(){
		let iframe = document.getElementById('video');
		$f(iframe).api("pause");
		this.setState({ show : false });
	}

	_resize(){

		var body = document.body,
    		html = document.documentElement;

		var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
		document.getElementById('video-modal').style.height = height + "px";
	}

	render() {
		let toggleClass = "";
		let mode = "?autopause=1";
		if(this.state.show){
			toggleClass = "show";
			mode = "?autoplay=1";
		}

		return (
			<div id="video-modal" className={toggleClass}>
				<div className="video-popup">
					<span onClick={this._closeModal.bind(this)} > x </span>
					<iframe id="video" src={ this.state.videoLink + mode } 
							width="100%" height="450" frameBorder="0" 
							webkitAllowFullScreen mozallowFullScreen allowFullScreen>
					</iframe>
				</div>
			</div>
		);
	}
}

export default Popup;