import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';

import TitleDesc from './components/TitleDesc'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'
import TextAuto from './components/TextAuto'

function CtaSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : 'column'}`,
    }
    
    return (
        <>
            <div style={{ width:'100%', height:'100%'}}>
                <AnimationDiv content={content} returnLayout={returnLayout}>
                    <div className="text__container">
                        <TitleDesc setting={setting} content={content} />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <ReturnButton content={content} setting={setting} />
                    {content.caution.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextAuto 
                                className="text-input" 
                                small 
                                value={content.caution.text} 
                                color = {content.caution.color} 
                                align = {content.caution.align} 
                            />
                        </div>
                    }
                    </div>
                </AnimationDiv>
            </div>
        </>
    )
}

export default CtaSection
