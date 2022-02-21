import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import {Upload} from '@styled-icons/bootstrap';
import { isMobile } from 'react-device-detect'

function GallerySection({content,setting}) {

    const returnElementsCards = content.elements.map((item, index) => {
       if(index < content.numOfElements){
           return(
               <>
               {content.card.use && 
               <div key={index} className="feature__card" 
                    style={{
                    alignItems: 'center',
                    margin : `${ isMobile ? '5px 5px' : '0px 15px' }`,
                    height : `${isMobile ? '' : '100%'}`,
                    width : `${isMobile ? content.mobile.layout === 1 ? '100%' : '46%' : '300px'}`,
                    boxShadow:`${content.card.shadow ? '2px 2px 4px rgba(0,0,0,0.4)' : ''}`, 
                    backgroundColor: `${content.card.color}`, 
                    borderRadius:`${content.card.borderRadius}px`}}>

                       {content.element.use && 
                       <div style={{width:'100%', position:'relative', cursor:'pointer'}}>
                           { item.attachment ? 
                            <img 
                                src={item.attachment} 
                                style={{
                                    width:'100%',
                                    objectFit:'cover',
                                    height:`${isMobile ? content.element.size/1.5 : content.element.size}px`, 
                                    borderRadius:`${content.card.borderRadius}px ${content.card.borderRadius}px 0px 0px`
                                }}/> 
                               :
                            <div className="feature-upload-button uphover" 
                                style={{ 
                                    height:`${content.element.size}px`, 
                                    backgroundColor:`${content.element.backgroundColor}`, 
                                    borderRadius:`${content.card.borderRadius}px ${content.card.borderRadius}px 0px 0px`
                                }}>
                                <Upload size="25" />
                            </div>
                           }
                       </div> 
                       }
                       {
                           content.text.use && 
                           <div className="df-margin-big feature-title" style={{width:'100%', height:'100%', alignItems:'start', display: 'flex', padding:'8px 5px'}}>
                                   <TextAuto small className="text-input" 
                                        value={item.text} 
                                        color = {content.text.color} 
                                        align = {isMobile ? content.mobile.align : content.align}
                                   />
                           </div>
                       }
                   </div>
               }
               </>
           )
       }
    })

    return (
        <motion.div className="template"data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc content={content} />

            <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : ''}`}}>
                {returnElementsCards}
            </div>

        </motion.div>
    )
}

export default GallerySection
