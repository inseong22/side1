import React, {useContext} from 'react'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Element from './components/Element'
import { isMobile } from 'react-device-detect'

function ReviewSection({content, setting}) {

    const returnReviewCards = content.elements.map((item, index) => {
        if(index < content.numOfElements){
            return(
                <div key={index} className="feature__card" 
                    style={{
                        alignItems: `${isMobile ? content.mobile.align : content.align}`,
                        boxShadow : '', 
                        margin : `${ isMobile ? '5px 5px' : '0px 15px' }`,
                        height : `${isMobile ? '' : '100%'}`,
                        width : `${isMobile ? content.mobile.layout === 1 ? '100%' : '46%' : '300px'}`
                    }}>
                    <Element content={content} item={item} index={index} key={index}/>
                    {
                        content.elementTitle.use && 
                        <div className="df-margin-big feature-title" style={{width:'100%'}}>            
                            <TextareaAutosize 
                                className="text-input"  
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.elementText.align}`,
                                    fontFamily:`${setting.smallFont}`,
                                    color:`${content.elementTitle.color}`,
                                    fontSize:`${content.elementTitle.size/20}em`,
                                }}
                                value={item.title} 
                                spellCheck="false"
                            />
                        </div>
                    }
                    {
                        content.rating.use && 
                        <div className="df-margin">
                            <div style={{
                                width:'100%', 
                                textAlign:`${isMobile ? content.mobile.align : content.align}`
                            }}>
                            <Rating
                                value={item.rating} 
                                precision={0.1}
                                style={{ fontSize: `${content.rating.size}px`, color:`${content.rating.color}` }}
                                // size={content.rating.size}
                                // color={content.rating.color}
                            />
                            </div>
                        </div>
                    }
                    {
                        content.elementText.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextareaAutosize
                                className="text-input" 
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.align}`,
                                    fontFamily:`${setting.smallFont}`,
                                    color:`${content.elementText.color}`,
                                    fontSize:`${content.elementText.size/20}em`,
                                }}
                                value={item.desc} 
                                spellCheck="false"
                                />
                        </div>
                    }
                    {
                        content.writer.use && 
                        <div className="df-margin-big feature-writer" style={{width:'100%'}}>
                            <TextareaAutosize 
                                className="text-input" 
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.align}`,
                                    color:`${content.writer.color}`,
                                    fontFamily:`${setting.smallFont}`,
                                }}
                                value={item.writer} 
                                />
                        </div>
                    }
                </div>
            )
        }
    })

    return (
        <>
            <motion.div className="template"data-aos-easing="ease-in-back"
     data-aos-delay="100"
     data-aos-offset="0" data-aos={content.animation.type} aos-duration="2000">
                
                <TitleDesc content={content} />

                <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : ''}`}}> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
