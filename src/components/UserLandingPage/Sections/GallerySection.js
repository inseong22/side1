import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import {Upload} from '@styled-icons/bootstrap';
import Element from './components/Element'

function GallerySection({content, setting}) {
    const heightRef = useRef(null)

    const returnElementsCards = content.elements.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
        <div key={index} className="feature__card" style={{alignItems: 'center', boxShadow:`${content.card.shadow ? '2px 2px 4px rgba(0,0,0,0.4)' : ''}`, margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`, backgroundColor: `${content.card.color}`, padding:'8px 5px'}}>
                <div style={{width:`${content.element.size}px`, position:'relative', cursor:'pointer'}}>
                    { item.attachment ? 
                        <img src={item.attachment} style={{width:`${content.element.size}px`, borderRadius:`${content.element.borderRadius}px`}}/> 
                        :
                        <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}}>
                            <Upload size="25" />
                        </div>
                    }
                </div> 
                {
                    content.text.use && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                            <TextAuto small className="text-input" value={item.text} color = {content.text.color} align = {content.text.align}
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <motion.div className="template"data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc setting={setting} content={content}/>

            <div className="features__container" ref={heightRef} >
                {returnElementsCards}
            </div>

        </motion.div>
    )
}

export default GallerySection
