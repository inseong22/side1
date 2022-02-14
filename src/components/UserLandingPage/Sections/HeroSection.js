import React, { useContext, useState, useRef } from 'react'
import { motion } from 'framer-motion';

import TitleDesc from './components/TitleDesc'
import AutosizeInput from 'react-input-autosize';
import ImageOrSlide from './components/ImageOrSlide'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'

function HeroSection({content, setting}) {
    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'}`,
   }

    return (
        <div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${content.layout === 4 ? '30px' : '0px'}`}}>
                    <TitleDesc setting={setting} content={content} />
                    <ReturnButton content={content} setting={setting} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            </AnimationDiv>
        </div>
    )
}

export default HeroSection
