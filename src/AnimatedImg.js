import React, {Component} from 'react';

class AnimatedImg extends Component{

    componentDidMount(){
      window.addEventListener('scroll', this.animateLine)
    }

    animateLine = () => {
      if (window.scrollY > window.innerHeight*0.75 && window.scrollY < window.innerHeight*1.25) {
        this.ref.classList.add("animate-appear");
        this.ref.addEventListener(transitionEvent, this.animationEnd);
      }
    }

    animationEnd = () => {
      window.removeEventListener('scroll', this.animateLine);
    }

    render(){
      return(
        <img id='bird' src='./twitter.png' alt='twitterbird' ref={(ref) => this.ref = ref}/>
      )
    }
}

const transitionEvent = () => {
  let t, el = document.createElement("fakeelement");

  const transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

export default AnimatedImg;
// probably could refactor to higher order component
