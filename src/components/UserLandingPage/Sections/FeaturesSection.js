import React, {useContext, useEffect, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'

function FeaturesSection({content, setting}) {
    const heightRef = useRef(null)

    const returnFeatureCards = content.elements.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <Element content={content} item={item} index={index} key={index}/>
                {
                    content.elementText.titleUse && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                            <TextAuto className="text-input" value={item.title} color = {content.elementText.color} align = {content.elementText.align}
                            />
                    </div>
                }
                {
                    content.elementText.descUse && 
                    <div className="df-margin">
                        <TextAuto small className="text-input"  value={item.desc} color = {content.elementText.color} align = {content.elementText.align}
                        />
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <motion.div className="template"
                data-aos={content.animation.type} aos-duration="2000" >
                <TitleDesc setting={setting} content={content} />

                <div className="features__container" ref={heightRef} >
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
