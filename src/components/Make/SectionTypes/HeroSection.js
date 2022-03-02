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
import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

import './DetailSection.css'
import './Default.css'
import './HeroSection.css'

function HeroSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection:`${
            state.isPhone ? 
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
                <div className="text__container" style={{marginTop:`${ !state.isPhone && content.layout === 4 ? '20px'  : state.isPhone && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
                    <TitleDesc content={content} titlePlaceholder="서비스 한 줄 소개를 적어보세요." descPlaceholder="여기를 클릭하여 서비스 및 상품에 대한 핵심 설명을 적어보세요." />
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
