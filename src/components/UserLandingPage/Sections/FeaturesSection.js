import React, {useContext, useEffect, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FeatureCard from './components/FeatureCard'
import {isMobile} from 'react-device-detect'

function FeaturesSection({content, setting}) {

    const returnFeatureCards = content.elements.map((item, index) => {
        if (index < content.numOfElements){
        return(
            <FeatureCard section="feature" content={content} index={index}>
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
                                <TextAuto className="text-no-input" 
                                    value={item.title} 
                                    color = {content.elementText.titleColor} 
                                    align = {isMobile ? content.mobile.align : content.elementText.align}
                                    size={content.elementText.titleSize/20} 
                                    placeholder="특징"
                                    disabled
                                />
                            </div>
                    }
                    {
                        content.elementText.descUse && 
                            <div className="df-margin-small feature-desc">
                                <TextareaAutosize 
                                    className="text-no-input"  
                                    value={item.desc} 
                                    color = {content.elementText.descColor} 
                                    // align = {isMobile ? content.mobile.align : content.align}
                                    style={{
                                        fontFamily:`${setting.smallFont}`, 
                                        color:`${content.elementText.descColor}`, 
                                        fontSize:`${content.elementText.descSize/20}em`, 
                                        // boxSizing:`border-box`, 
                                        textAlign:`${isMobile ? content.mobile.align : content.elementText.align}`,
                                        resize:'none',
                                        WebkitTextFillColor: `${content.desc.color}`,
                                        WebkitOpacity: 1,
                                    }}
                                    placeholder="여기를 클릭하여 서비스 및 제품의 특징을 적어보세요."
                                    disabled
                                    spellCheck="false"
                                />
                            </div>
                    }
                    </>
                }
            </FeatureCard>
        )}
        else{
        }
    })

    return (
        <>
            <motion.div className="template" data-aos={content.animation} data-aos-easing="ease-in-back"
                data-aos-delay="200"
                data-aos-offset="0" aos-duration="4000" >
                    <TitleDesc content={content} titlePlaceholder="특징들의 제목을 적어보세요." descPlaceholder="여기를 클릭하여 서비스 및 제품의 특징을 간단히 적어보세요." />

                <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : ''}`}}>
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
