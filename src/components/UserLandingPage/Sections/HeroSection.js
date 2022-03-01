import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import AutosizeInput from 'react-input-autosize';
import ImageOrSlide from './components/ImageOrSlide'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'
import { isMobile } from 'react-device-detect'


function HeroSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${
            isMobile ? 
            content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
            content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'
        }`,
    }

    return (
        <motion.div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv setting={setting} content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${ !isMobile && content.layout === 4 ? '20px'  : isMobile && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
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
