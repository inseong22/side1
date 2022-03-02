import React, {useContext} from 'react'
import './ReviewSection.css'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2';
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Element from './components/Element'
import FeatureCard from './components/FeatureCard'

function ReviewSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
                                className="text-input"  
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${state.isPhone ? content.mobile.align : content.align}`,
                                    fontFamily:`${state.setting.smallFont}`,
                                    color:`${content.elementTitle.color}`,
                                    fontSize:`${content.elementTitle.size/20}em`,
                                }}
                                value={item.title} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].title = e.currentTarget.value;
                                }))} 
                                spellCheck="false"
                            />
                        </div>
                    }
                    {
                        content.rating.use && 
                        <div className="df-margin">
                            <div style={{
                                width:'100%', 
                                textAlign:`${state.isPhone ? content.mobile.align : content.align}`
                            }}>
                            <Rating
                                value={item.rating} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].rating = e.currentTarget.value;
                                }))}  
                                precision={0.5}
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
                                    textAlign:`${state.isPhone ? content.mobile.align : content.align}`,
                                    fontFamily:`${state.setting.smallFont}`,
                                    color:`${content.elementText.color}`,
                                    fontSize:`${content.elementText.size/20}em`,
                                }}
                                value={item.desc} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].desc = e.currentTarget.value;
                                }))}  
                                spellCheck="false"
                                />
                        </div>
                    }
                    {
                        content.writer.use && 
                        <div className="df-margin-big feature-writer" style={{width:'100%'}}>
                            <TextareaAutosize 
                                className="text-input" 
                                placeholder="회사이름, 직함이름"
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${state.isPhone ? content.mobile.align : content.align}`,
                                    color:`${content.writer.color}`,
                                    fontFamily:`${state.setting.smallFont}`,
                                }}
                                value={item.writer} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].writer = e.currentTarget.value;
                                }))}  
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

                <div className="features__container" style={{flexWrap : `${state.isPhone ? 'wrap' : ''}`}}> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
