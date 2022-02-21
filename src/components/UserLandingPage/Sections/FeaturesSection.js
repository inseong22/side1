import React from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { isMobile } from 'react-device-detect'

function FeaturesSection({content, setting}) {

    const returnFeatureCards = content.elements.map((item, index) => {
        if (index < content.numOfElements){
        return(
            <div key={index} className="feature__card" style={{
                alignItems: `${isMobile ? content.mobile.align : content.align}`,
                boxShadow : '', 
                margin : `${ isMobile ? '5px 5px' : '0px 15px' }`,
                height : `${isMobile ? '' : '100%'}`,
                width : `${isMobile ? content.mobile.layout === 1 ? '100%' : '46%' : '100%'}`
                }}>
                {
                    content.element.use && 
                    <Element content={content} item={item} index={index} key={index}/>
                }
                {
                    content.elementText.use && 
                    <>
                    <div className="df-margin-big" style={{width:'100%'}}>
                        <TextareaAutosize className="text-no-input" 
                            value={item.title} 
                            style={{
                                fontFamily:`${setting.smallFont}`, 
                                color : `${content.elementText.color}`,
                                textAlign : `${isMobile ? content.mobile.align : content.align}`,
                                fontSize:`${content.elementText.titleSize/20}em`,
                                resize:'none'
                            }}
                        />
                    </div>
                    <div className="df-margin">
                        <TextareaAutosize 
                            className="text-no-input"  
                            value={item.desc} 
                            color = {content.elementText.color} 
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
                data-aos-delay="100"
                data-aos-offset="0" data-aos={content.animation.type} aos-duration="2000" >
                <TitleDesc setting={setting} content={content} />

                <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : 'no-wrap'}`, fontSize:`${isMobile ? '22px' : '28px'}`}}>
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
