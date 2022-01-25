import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import './ReviewSection.css'
import Rating from '@mui/material/Rating';

import { MyContext } from '../../../pages/Make/MakePageV2'

function ReviewSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnReviewCards = content.reviews.map((item, index) => {
        return(
            <div key={index} className="review__card">
                <div>
                    <div>
                    </div>
                    <div>
                        {item.title}
                    </div>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Rating
                        readOnly
                        value={item.rating} 
                        precision={0.1}
                    />
                </div>
                <div style={{marginTop:'10px'}}>
                    {item.desc}
                </div>
                <div style={{marginTop:'10px', color:'rgba(0,0,0,0.6)'}}>
                    {item.writer}
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="template">
                <div>
                    {content.title}
                </div>
                <div className="reviews__container"> 
                    {returnReviewCards}
                </div>
            </div>
        </>
    )
}
export default ReviewSection
