import React from 'react'
import PreloaderImg from './actualsun.gif'
import './Preloader.min.css'

const Preloader = () => (
  <div className="Preload" style={{height: '100vh'}}>
    <img src={PreloaderImg} style={{width: '5%'}} alt="presentation" />
  </div>
)

export default Preloader
