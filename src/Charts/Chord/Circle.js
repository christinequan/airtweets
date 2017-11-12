import React from 'react';

const Circle = (props) => {

  let d = props.d;
  let svg_dim = props.svg_dim;
  let color = props.color;
  // let [x,y] = project(d.x, d.y);

  let attrs = {
    key: d.data.emojis,
    className: 'circleback',
    opacity: 0.5,
    r: Math.sqrt(d.data.n/(Math.PI))*3, // so that it corresponds with area of circle but just r is more pronounced, multiplyingwill help amplify a bit?
    cx: props.x,
    cy: props.y,
    fill: color(d.data.group),
    transform: 'translate(' + svg_dim.width/2 +','+ svg_dim.height/2 + ')'
  }

  return(<circle {...attrs}></circle>)

}

export default Circle;
