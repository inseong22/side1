import React, {useContext, useState} from 'react'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Element from './components/Element'

function ReviewSection({content, setting}) {

    const returnReviewCards = content.elements.map((item, index) => {
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <Element content={content} item={item} index={index} key={index}/>

                <div className="df-margin-big feature-title" style={{width:'100%'}}>
                    <div 
                        className="text-input-flex"  
                        style={{
                            width:'100%',
                            resize:'none',
                            textAlign:`${content.align}`,
                            fontFamily:`${setting.smallFont}`,
                            color:`${content.elementText.color}`,
                        }}>
                        {item.title} 
                    </div>
                </div>
                {
                    content.rating.use && 
                    <div className="df-margin">
                        <div style={{width:'100%', textAlign:`${content.align}`}}>
                        <Rating
                            value={item.rating} 
                            precision={0.1}
                            style={{ fontSize: `${content.rating.size}px`, color:`${content.rating.color}` }}
                            disabled
                        />
                        </div>
                    </div>
                }
                {
                    content.elementText.use && 
                    <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                        <div 
                            className="text-input-flex" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                fontFamily:`${setting.smallFont}`,
                                color:`${content.elementText.color}`,
                            }}>
                            {item.desc} 
                        </div>
                    </div>
                }
                {
                    content.writer.use && 
                    <div className="df-margin-big feature-writer" style={{width:'100%'}}>
                        <div 
                            className="text-input-flex" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                color:`${content.writer.color}`,
                            }}>
                            {item.writer} 
                        </div>
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <motion.div className="template" data-aos={content.animation.type} aos-duration="2000">
                
                <TitleDesc setting={setting} content={content} />

                <div className="features__container"> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
