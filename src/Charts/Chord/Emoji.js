import React, {Component} from 'react';
const EMOJI_WIDTH = 10;
const EMOJI_LARGE = 40;

const CURRENT_OPACITY = 1;
const FADE_OPACITY = 0.15;
const DEFAULT_OPACITY = 1;

class Emoji extends Component{
  constructor(props){
    super(props);
    this.emoji_width = EMOJI_WIDTH;
    this.d = props.d;
    this.svg_dim = props.svg_dim;
    this.x = props.x;
    this.y = props.y;

    this.emojiHover = this.emojiHover.bind(this);
    this.emojiOut = this.emojiOut.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.emoji_width = (newProps.current) ? EMOJI_LARGE : EMOJI_WIDTH;
    if (newProps.hover) {
        this.opacity = (newProps.current) ? CURRENT_OPACITY : FADE_OPACITY;
    } else this.opacity = DEFAULT_OPACITY;
  }

  emojiHover(){
    let emoji_selected = this.d.data.emojis;
    this.props.emojiHoverCallback(emoji_selected);
  }

  emojiOut(){
    this.props.emojiOutCallback();
  }

  render(){
    let d = this.d;
    let emoji_width = this.emoji_width;

    let props = {
      key: d.data.emojis+'img',
      id: d.data.emojis,
      node: d.data.emojis,
      className: 'emojis',
      transform: 'translate(' + (this.svg_dim.width/2-emoji_width/2)+ ',' + (this.svg_dim.height/2-emoji_width/2) + ')',
      x: this.x,
      y: this.y,
      opacity: this.opacity,
      width: emoji_width,
      height: emoji_width,
      href: './emojione/'+ d.data.unicode +  '.svg' //might need to make emojilib a constant later but ehh..
    }

    return(
      <image {...props} onMouseEnter={this.emojiHover} onMouseOut={this.emojiOut}/>
    )
  }
}

export default Emoji;
