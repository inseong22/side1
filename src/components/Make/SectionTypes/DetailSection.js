import React, { useContext, useEffect, useState, useRef } from 'react'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'
import TitleDesc from './components/TitleDesc'

import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'
import { motion } from 'framer-motion';

function DetailSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection:`${
            state.isPhone ? 
                content.mobile.layout === 1 ? 'row' : content.mobile.layout === 2 ? 'row-reverse' : content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'
        }`,
    }
    
    return (
        <motion.div data-aos={setting.animation} aos-duration="2000" data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${ !state.isPhone && content.layout === 4 ? '20px' : state.isPhone && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
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