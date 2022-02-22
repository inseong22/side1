import React, {useContext, useEffect, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {isMobile} from 'react-device-detect'

function FeaturesSection({content, setting}) {

    const returnFeatureCards = content.elements.map((item, index) => {
        if (index < content.numOfElements){
        return(
            <div key={index} className="feature__card" style={{
                alignItems: `${isMobile ? content.mobile.align : content.align}`,
                boxShadow : '', 
                margin : `${ isMobile ? '5px 5px' : '0px 15px' }`,
                height : `${isMobile ? '' : '100%'}`,
                width : `${isMobile ? content.mobile.layout === 1 ? '100%' : '46%' : '300px'}`
                }}>
                {
                    content.element.use && 
                    <Element content={content} item={item} index={index} key={index}/>
                }
                {
                    content.elementText.use && 
                    <>
                    {
                        content.elementText.titleUse && 
                            <div className="df-margin-big feature-title" style={{width:'100%'}}>
                                <TextAuto className="text-input" 
                                    value={item.title} 
                                    color = {content.elementText.color} 
                                    align = {isMobile ? content.mobile.align : content.align}
                                    size={content.elementText.titleSize/20} 
                                />
                            </div>
                    }
                    {
                        content.elementText.descUse && 
                            <div className="df-margin feature-desc">
                                <TextareaAutosize 
                                    className="text-input"  
                                    value={item.desc} 
                                    color = {content.elementText.color} 
                                    // align = {isMobile ? content.mobile.align : content.align}
                                    style={{
                                        fontFamily:`${setting.smallFont}`, 
                                        color:`${content.desc.color}`, 
                                        fontSize:`${content.elementText.descSize/20}em`, 
                                        // boxSizing:`border-box`, 
                                        textAlign:`${isMobile ? content.mobile.align : content.desc.align}`,
                                        resize:'none'
                                    }}
                                    spellCheck="false"
                                />
                            </div>
                    }
                    </>
                }
            </div>
        )}
        else{
        }
    })

    return (
        <>
            <motion.div className="template"
                data-aos-easing="ease-in-back"
                data-aos-delay="200"
                data-aos-offset="0" data-aos={content.animation.type} aos-duration="4000" >
                <TitleDesc setting={setting} content={content} />

                <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : ''}`}}>
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
