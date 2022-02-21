import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import ImageOrSlide from './components/ImageOrSlide'
import TextAuto from './components/TextAuto'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AnimationDiv from './components/AnimationDiv'

function VideoSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }
    
    return (
        <motion.div data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" data-aos={setting.animation} aos-duration="2000" style={{ width:'100%', height:'100%'}}>
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
                    <TextAuto small  className="text-input" 
                        value={content.explanation.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].explanation.text = e.currentTarget.value;
                        }))}
                        color={content.explanation.color}
                        align={content.explanation.align}
                    />
                </div>
                }
            </AnimationDiv>
        </motion.div>
    )
}

export default VideoSection
