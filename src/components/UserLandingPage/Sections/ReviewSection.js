import React, {useContext} from 'react'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Element from './components/Element'
import FeatureCard from './components/FeatureCard'
import isMobile from 'react-device-detect'

function ReviewSection({content, setting}) {

    const returnReviewCards = content.elements.map((item, index) => {
        if(index < content.numOfElements){
            if(content.reviewText) {
            return(
                <FeatureCard section="feature" content={content} index={index}>
                    <Element content={content} item={item} index={index} key={index}/>
                    {
                        content.elementTitle.use && 
                        <div className="df-margin-big feature-title" style={{width:'100%'}}>            
                            <TextareaAutosize 
                                placeholder="리뷰/추천사의 핵심을 적어보세요."
                                className="text-no-input"  
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.align}`,
                                    fontFamily:`${setting.smallFont}`,
                                    color:`${content.elementTitle.color}`,
                                    fontSize:`${content.elementTitle.size/20}em`,
                                    WebkitTextFillColor: `${content.elementTitle.color}`,
                                    WebkitOpacity: 1,
                                }}
                                value={item.title} 
                                spellCheck="false"
                                disabled
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
                                precision={0.5}
                                style={{ fontSize: `${content.rating.size}px`, color:`${content.rating.color}` }}
                                // size={content.rating.size}
                                // color={content.rating.color}
                                readOnly
                                />
                            </div>
                        </div>
                    }
                    {
                        content.elementText.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextareaAutosize
                                className="text-no-input" 
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.align}`,
                                    fontFamily:`${setting.smallFont}`,
                                    color:`${content.elementText.color}`,
                                    fontSize:`${content.elementText.size/20}em`,
                                    WebkitTextFillColor: `${content.elementText.color}`,
                                    WebkitOpacity: 1,
                                }}
                                value={item.desc} 
                                disabled
                                spellCheck="false"
                                />
                        </div>
                    }
                    {
                        content.writer.use && 
                        <div className="df-margin-big feature-writer" style={{width:'100%'}}>
                            <TextareaAutosize 
                                className="text-no-input" 
                                placeholder="회사이름, 직함이름"
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${isMobile ? content.mobile.align : content.align}`,
                                    color:`${content.writer.color}`,
                                    fontFamily:`${setting.smallFont}`,
                                    WebkitTextFillColor: `${content.writer.color}`,
                                    WebkitOpacity: 1,
                                    fontSize:`${content.writer.size/17}em`,
                                }}
                                value={item.writer} 
                                disabled
                                />
                        </div>
                    }
                </FeatureCard>
            )
        }
    else {
        return(<>
        </>)
    }
        }
    })

    return (
        <>
            <motion.div className="template"data-aos-easing="ease-in-back"
                data-aos-delay="200"
                data-aos-offset="0" data-aos={content.animation} aos-duration="4000">
                
                <TitleDesc content={content} titlePlaceholder="서비스 및 제품에 대한 리뷰 혹은 추천사를 적어보세요." descPlaceholder="여기를 클릭하여 서비스 및 제품에 대한 리뷰 혹은 추천사를 적어보세요." />

                <div className="features__container" style={{flexWrap : `${isMobile ? 'wrap' : ''}`}}> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
