import React from 'react';
import Request from 'superagent';
import Preloader from './preloader';
import Navigation from './navigation';
import { prefixUrl } from './config';

class Home extends React.Component {

    constructor(prop) {
        super();
        this.state = {
            loadComplete: false,
            videoLink: this.randomVideo()
        };
        this.data = {"carousel": "", "slideCount": 0, "countSpeed": 6000};

        this.getContent = this.getContent.bind(this);
        this.loadComplete = this.loadComplete.bind(this);
        this._animateSlides = this._animateSlides.bind(this);
        this._startSlides = this._startSlides.bind(this);
    }

    componentDidMount() {
        this.getContent();
        window.addEventListener("resize", this.resize.bind(this), false);
    }

    getContent() {
        let self = this;

        Request
            .get(prefixUrl + 'data/home.json')
            .accept('application/json')
            .end(function (err, response) {
                self.loadComplete(response.body);
            });
    }

    loadComplete(res) {
        this.data.carousel = res.carousel;
        this.setState({loadComplete: true});
        this.resize();
        this._startSlides();
    }

    resize(){
        this._hero = document.getElementsByClassName('hero-unit')[0];
        this._slides = Array.from(this._hero.getElementsByTagName("li"));
        let scaleNode;

        if(window.innerWidth <= 480){
            scaleNode = 0;
        }else if(window.innerWidth > 480 && window.innerWidth <= 768){
            scaleNode = 1;
        }else if(window.innerWidth > 768 && window.innerWidth <= 992){
            scaleNode = 2;
        }else{
            scaleNode = 3;
        }

        if(this._hero.dataset.scale){
            if(this._hero.dataset.scale !== scaleNode){
                this._swapImage(scaleNode);
            }else{
                return ;
            }
        }else{
            this._swapImage(scaleNode);
        }
    }

    _swapImage(sourceNode){
        this._hero.setAttribute('data-scale', sourceNode);

        this._slides.forEach((slide, index) => {
            slide.style.backgroundImage = 'url('+this.data.carousel[index].images[sourceNode]+')';
        });
    }

    _startSlides(){
        this.data.slideCount = Math.floor(Math.random() * this._slides.length);
        this._animateSlides();
    }

    _animateSlides(){
        if(this.data.slideCount >= this._slides.length){
            this.data.slideCount = 0;
        }

        this._slides.forEach((slide, index)=>{
            if(slide.classList.contains('show')){
                slide.classList.remove('show');
            }

            if(index === this.data.slideCount ){
                slide.classList.add('show');
            }
        });

        setTimeout(() => { this._animateSlides() }, this.data.countSpeed);

        this.data.slideCount++;
    }

    randomVideo() {
        let videoArr = [
            "https://player.vimeo.com/video/269784893",
            "https://player.vimeo.com/video/269783787",
            "https://player.vimeo.com/video/269782898",
            "https://player.vimeo.com/video/269780929",
            "https://player.vimeo.com/video/269779945",
            "https://player.vimeo.com/video/269777754",
            "https://player.vimeo.com/video/269776678",
            "https://player.vimeo.com/video/269775673",
            "https://player.vimeo.com/video/269775195"
        ];

        return videoArr[Math.floor(Math.random() * videoArr.length)];
    }

    _scrollTo(toElementClass, duration) {
        this._to = document.getElementsByClassName(toElementClass)[0].offsetTop -30;

        if (duration <= 0) return;
        let difference = this._to - document.body.scrollTop;
        let perTick = difference / duration * 10;

        setTimeout(()=> {
            document.body.scrollTop = document.body.scrollTop + perTick;
            if (document.body.scrollTop == this._to) return;
            this._scrollTo("menuThumb", duration - 10);
        }, 10);
    }

    render() {
        let lang = this.props.lang;
        let carousel = [];

        if (this.state.loadComplete == true) {

            for (var i in this.data.carousel) {
                let className = "";

                if (i == 0) {
                    className = "show";
                }

                let imageSrc = this.data.carousel[i].images[3];
                let title, link;

                if(this.data.carousel[i]["headerText"].length > 0){
                    title = <h1>{this.data.carousel[i]["headerText"]}</h1>;
                }

                if(this.data.carousel[i].buttonText){
                    let url = this.data.carousel[i].buttonLinks;
                    let urlChanged = url.replace("{lang}", lang);
                    link = <a href={urlChanged}>{this.data.carousel[i].buttonText} </a>;
                }

                carousel.push(<li className={className} key={"carousel" + i} >
                                 { title }
                                 { link }
                              </li>);
            }

            let linkPrefix = "/" + lang;

            return (
                <div>
                <div className="hero-unit">
                    { carousel }
                    <i className="fa fa-chevron-down" onClick={this._scrollTo.bind(this, "home", 600)} />
                </div>
                <div id="home" className="home">
                    <div className="menuThumb">
                        <h3>PRODUCT</h3>
                        <div className="grid grid-pad">
                            <div className="col-1-3">
                                <a href={linkPrefix + "/lock#all"}>
                                    <img src="/images/block-1.jpg"/>
                                    <h3>BIKE LOCK</h3>
                                </a>
                            </div>
                            <div className="col-1-3">
                                <a href={linkPrefix + "/lock#accessories"}>
                                    <img src="/images/block-2.jpg"/>
                                    <h3>ACCESSORIES</h3>
                                </a>
                            </div>
                            <div className="col-1-3">
                                <a href={linkPrefix + "/lock#accessories"}>
                                    <img src="/images/block-3.jpg"/>
                                    <h3>MOBILE HOLDER</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="video-section">
                        <h3>FUN + PLAY</h3>
                        <iframe src={this.state.videoLink} width="100%" height="640" frameBorder="0"
                                webkitAllowFullScreen mozallowFullScreen allowFullScreen></iframe>
                    </div>
                    <div className="instegram-section">
                        <h3 className="text-center"> <i className="fa fa-instagram" /> UALC LOCK</h3>
                        <iframe src="http://lightwidget.com/widgets/39de111c2702562d837646f0984154a0.html"
                                scrolling="no" allowtransparency="true" class="lightwidget-widget"
                                style={{width: '100%', border: 0, overflow: 'hidden' }}></iframe>
                    </div>
                </div>
            </div>)

        } else {
            return (<div>
                <Preloader />
            </div>)
        }
    }
}

export default Home;