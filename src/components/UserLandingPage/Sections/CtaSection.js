import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'
import TextAuto from './components/TextAuto'
import { isMobile } from 'react-device-detect'

function CtaSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${
            isMobile ? 
                content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : 'column'
        }`
    }
    
    return (
        <>
            <motion.div style={{display:'flex', width:'100%', height:'100%', ...returnLayout}} data-aos={content.animation.type} aos-duration="2000" >
                <div className="text__container">
                    <TitleDesc content={content} />
                </div>
                <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', height:'100%'}}>
                    <ReturnButton content={content} />
                    {content.caution.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextAuto className="text-input" small value={content.caution.text} color = {content.caution.color} align = {isMobile ? content.mobile.align : content.caution.align}/>
                        </div>
                    }
                </div>
            </motion.div>
        </>
    )
}

export default CtaSection
