import React, {Component} from 'react';

class AnimatedPath extends Component{

  componentDidMount(){
    window.addEventListener('scroll', this.animateLine)
  }

  animateLine = () => {
    if (window.scrollY > window.innerHeight*0.68 && window.scrollY < window.innerHeight*1.2) {
      this.ref.classList.add("animate-line");
      this.ref.addEventListener(transitionEvent, this.animationEnd);
    }
  }

  animationEnd = () => {
    window.removeEventListener('scroll', this.animateLine);
  }

  render(){
    return(
      <path id='birdpath' d={this.props.d} ref={(ref)=> this.ref = ref}/>
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

export default AnimatedPath;

// Adapted from https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
