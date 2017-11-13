import React from 'react';
import AnimatedPath from './AnimatedPath';
import AnimatedImg from './AnimatedImg';

const Intro = () => (
  <section id='intro'>
      <h1> Airbnb Experiences: An Emoji Story </h1>
      <p> <strong>Oct. 20, 2017:</strong> Airbnb asked Twitter to describe their dream trips in three emojis.<br/>
        This is the story of those emojis.
      </p>
  </section>
)

const Tweet = () => (
    <section id='tweet'>

        <div className='story'>
          <h1> Where our story begins: a simple tweet </h1>
          <p> Airbnb asked twitter: <br/> <i>'Descibe your dream trip in 3 emojis' </i> </p> <br/>
          <p> I saw this and took it as a mini survey.
            So I thought it would be fun to analyze the responses and see
            if I could learn anything about what people say they are looking for in
            their dream trips.
          </p>
          <div className='birdimg'>
            <div className='birdpath'>
            <svg className='decorate bird-line' viewBox='0 0 100 100'>
              <AnimatedPath d='M 50 250 Q 150 350 250 300 Q 400 200 300 200 Q 250 300 600 200'/>
              {/* <path id='birdpath' d='M 50 250 q 100 100 200 250 q 150 -100 50 -100 q -150 350 -150 -150 -100 100'/> */}
            </svg>
          </div>
            <AnimatedImg/>
          </div>
        </div>
        <div className='visual'>
          <video id='tweetpic' controls autoplay>
              <source src="./airtweet.mp4" type="video/mp4"/>
          </video>
        </div>
    </section>
)

export {Intro, Tweet}
