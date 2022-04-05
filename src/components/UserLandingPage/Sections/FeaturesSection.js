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
            <FeatureCard align={isMobile ? content.mobile.align : content.elementText.align} section="feature" content={content} index={index}>
                {
                    content.element.use && 
                    <Element content={content} item={item} index={index} key={index}/>
                }
                {
                    content.elementText.use && 
                    <div style={{width:'100%', marginTop:`${content.element.use ? '10px' : '0px'}`}}>
                    {
                        content.elementText.titleUse && 
                            <div className="df-margin-big feature-title" style={{width:'100%'}}>
                                <div dangerouslySetInnerHTML={{__html:item.title}}
                                    style={{
                                        color:`${content.elementText.titleColor}`,
                                        textAlign:`${isMobile ? content.mobile.align : content.elementText.align}`,
                                        fontSize:`${content.elementText.titleSize/20}em`,
                                        fontFamily:`${setting.font}`
                                    }}
                                />
                            </div>
                    }
                    {
                        content.elementText.descUse && 
                            <div className="df-margin-small feature-desc" style={{width:'100%', marginTop:'5px'}}>
                                <div dangerouslySetInnerHTML={{__html:item.desc}}
                                    style={{
                                        color:`${content.elementText.descColor}`,
                                        textAlign:`${isMobile ? content.mobile.align : content.elementText.align}`,
                                        fontSize:`${content.elementText.descSize/20}em`, 
                                        fontFamily:`${setting.smallFont}`,
                                        width:'100%'
                                    }}>
                                </div>
                            </div>
                    }
                    </div>
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
