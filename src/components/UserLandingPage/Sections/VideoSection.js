import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import ImageOrSlide from './components/ImageOrSlide'
import TextAuto from './components/TextAuto'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AnimationDiv from './components/AnimationDiv'

function VideoSection({content, setting}) {
    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }
    
    return (
        <motion.div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout} setting={setting}>
                <div className="text__container">
                    <TitleDesc content={content} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
                {
                content.explanation.use &&
                <div style={{width:'100%'}}>
                    <TextAuto small  className="text-input" 
                        value={content.explanation.text} 
                        color={content.explanation.color}
                        align={content.explanation.align}
                    />
                </div>
                }
            </AnimationDiv>
        </motion.div>
    )
}

export default VideoSection
