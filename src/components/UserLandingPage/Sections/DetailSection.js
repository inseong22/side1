import React, { useContext, useEffect, useState, useRef } from 'react'
import TitleDesc from './components/TitleDesc'
import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'
import { motion } from 'framer-motion';
import {isMobile} from 'react-device-detect'

function DetailSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${
            isMobile ? 
                content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'
        }`,
    }
    
    return (
        <motion.div 
        data-aos-easing="ease-in-back"
        data-aos-delay="200"
        data-aos-offset="0" data-aos={content.animation} aos-duration="4000"
        style={{ width:'100%', height:'100%'}}>
            <AnimationDiv setting={setting} content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${ !isMobile && content.layout === 4 ? '20px' : isMobile && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
                    <TitleDesc content={content} titlePlaceholder="핵심 특징 한 줄을 적어보세요." descPlaceholder="여기를 클릭하여 상품의 핵심 특징에 대한 설명을 적어보세요." />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            </AnimationDiv>
        </motion.div>
    )
}

export default DetailSection