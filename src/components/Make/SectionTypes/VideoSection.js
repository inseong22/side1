import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'

import TitleDesc from './components/TitleDesc'
import ImageOrSlide from './components/ImageOrSlide'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AnimationDiv from './components/AnimationDiv'

function VideoSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }
    
    return (
        <div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container">
                    <TitleDesc content={content} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
                {
                content.explanation.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-input" 
                        value={content.explanation.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].explanation.text = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            color:`${content.explanation.color}`, 
                            textAlign:`${content.explanation.align}`,
                            resize:'none'
                        }}
                        spellcheck="false"
                    />
                </div>
                }
            </AnimationDiv>
        </div>
    )
}

export default VideoSection
