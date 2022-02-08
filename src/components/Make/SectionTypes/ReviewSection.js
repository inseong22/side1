import React, {useContext, useState} from 'react'
import './ReviewSection.css'
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextareaAutosize from '@mui/material/TextareaAutosize';

import ExImg from '../../../tools/img/good3d.png'

function ReviewSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnReviewCards = content.reviews.map((item, index) => {
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', backgroundColor:'red', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.reviews.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <img src={ExImg} alt="이미지"
                    style={{width: `${content.reviewImage.size}px`, borderRadius: `${content.reviewImage.border}`}}
                />
                <div className="df-margin">
                    <TextareaAutosize 
                        className="text-input"  
                        style={{
                            width:'100%',
                            resize:'none',
                            textAlign:`${content.align}`,
                        }}
                        value={item.title} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].reviews[index].title = e.currentTarget.value;
                        }))} 
                        />
                </div>
                {
                    content.rating.use && 
                    <div className="df-margin">
                        <Rating
                            value={item.rating} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].rating = e.currentTarget.value;
                            }))}  
                            precision={0.2}
                        />
                    </div>
                }
                {
                    content.reviewText.use && 
                    <div className="df-margin">
                        <TextareaAutosize 
                            className="text-input" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                            }}
                            value={item.desc} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].desc = e.currentTarget.value;
                            }))}  
                            />
                    </div>
                }
                {
                    content.writer.use && 
                    <div className="df-margin" style={{color:'rgba(0,0,0,0.6)'}}>
                        <TextareaAutosize 
                            className="text-input" 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                            }}
                            value={item.writer} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviews[index].writer = e.currentTarget.value;
                            }))}  
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <motion.div className="template"
                data-aos={content.animation.type} aos-duration="2000">
                
                <TitleDesc content={content} />

                <div className="features__container"> 
                    {returnReviewCards}
                </div>

            </motion.div>
        </>
    )
}
export default ReviewSection
