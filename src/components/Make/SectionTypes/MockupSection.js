import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import Phone from '../../../tools/img/mockup/mobile.png'
import Desktop from '../../../tools/img/mockup/desktop.png'
import ourA from '../../../tools/img/005.png'
import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'

function MockupSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }   
    return (
        <motion.div data-aos={setting.animation} aos-duration="2000" style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container">
                    <TitleDesc content={content} />
                </div>
                {
                    content.mockup.use && 
                    <div className="image__container">
                        <ImageOrSlide content={content} />
                    </div>
                }
                </AnimationDiv>
        </motion.div>
    )
}

export default MockupSection
