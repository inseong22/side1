import React from 'react'
import TitleDesc from './components/TitleDesc'

import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'
import { isMobile } from 'react-device-detect'
import { motion } from 'framer-motion';

function DetailSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${
            isMobile ? 
                content.mobile.layout === 1 ? 'row' : content.mobile.layout === 2 ? 'row-reverse' : content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'
        }`,
    }
    
    return (
        <motion.div data-aos={setting.animation} aos-duration="2000" style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${ !isMobile && content.layout === 4 ? '20px' : isMobile && content.mobile.layout === 4 ? '10px' : '0px'}` }}>
                    <TitleDesc content={content} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            </AnimationDiv>
        </motion.div>
    )
}

export default DetailSection