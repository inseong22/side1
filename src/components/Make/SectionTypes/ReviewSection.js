import React, {useContext, useState} from 'react'
import './ReviewSection.css'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2';
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Element from './components/Element'

function ReviewSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnReviewCards = content.elements.map((item, index) => {
        if(index < content.numOfReviews){
            return(
                <div key={index} className="feature__card" style={{alignItems: `${content.align}`, boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                    <Element content={content} item={item} index={index} key={index}/>
    
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                        <TextareaAutosize 
                            className="text-input"  
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                                fontFamily:`${state.setting.smallFont}`,
                                color:`${content.reviewText.color}`,
                            }}
                            value={item.title} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elements[index].title = e.currentTarget.value;
                            }))} 
                            />
                    </div>
                    {
                        content.rating.use && 
                        <div className="df-margin">
                            <div style={{width:'100%', textAlign:`${content.align}`}}>
                            <Rating
                                value={item.rating} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].rating = e.currentTarget.value;
                                }))}  
                                precision={0.1}
                                style={{ fontSize: `${content.rating.size}px`, color:`${content.rating.color}` }}
                                // size={content.rating.size}
                                // color={content.rating.color}
                            />
                            </div>
                        </div>
                    }
                    {
                        content.reviewText.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextareaAutosize 
                                className="text-input" 
                                style={{
                                    width:'100%',
                                    resize:'none',
                                    textAlign:`${content.align}`,
                                    fontFamily:`${state.setting.smallFont}`,
                                    color:`${content.reviewText.color}`,
                                }}
                                value={item.desc} 
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].desc = e.currentTarget.value;
                                }))}  
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
                                    textAlign:`${content.align}`,
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
                </div>
            )
        }
    })

    return (
        <>
            <motion.div className="template" data-aos={setting.animation} aos-duration="4000">
                
                <TitleDesc content={content} />

                <div className="features__container"> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
