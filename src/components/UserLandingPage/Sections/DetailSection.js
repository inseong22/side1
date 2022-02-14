import React, { useContext, useEffect, useState, useRef } from 'react'

import TitleDesc from './components/TitleDesc'

import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'

function DetailSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'}`,
    }
    
    return (
        <div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${content.layout === 4 ? '30px' : '0px'}`}}>
                    <TitleDesc content={content} setting={setting}/>
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} setting={setting}/>
                </div>
            </AnimationDiv>
        </div>
    )
}

export default DetailSection