import React, { useContext } from 'react'
import { Link } from 'react-router-dom' 
import produce from 'immer';
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'
import TitleDesc from './components/TitleDesc'
import AutosizeInput from 'react-input-autosize';
import ImageOrSlide from './components/ImageOrSlide'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'

import './DetailSection.css'
import './Default.css'
import './HeroSection.css'

function HeroSection({content, setting}) {
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
        <motion.div data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" data-aos={setting.animation} aos-duration="2000" style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${ !state.isPhone && content.layout === 4 ? '20px'  : state.isPhone && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
                    <TitleDesc content={content} />
                    <ReturnButton content={content} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            </AnimationDiv>
        </motion.div>
    )
}

export default HeroSection
