import React, {useContext, useState} from 'react'
import './CtaSection.css'
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'
import TitleDesc from './components/TitleDesc'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'
import TextAuto from './components/TextAuto'
import produce from 'immer'

function CtaSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : 'column'}`,
    }
    
    return (
        <>
            <motion.div data-aos={setting.animation} aos-duration="2000" tyle={{ width:'100%', height:'100%'}}>
                <AnimationDiv content={content} returnLayout={returnLayout}>
                    <div className="text__container">
                        <TitleDesc content={content} />
                    </div>
                    <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                    <ReturnButton content={content} />
                    {content.caution.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextAuto className="text-input" small value={content.caution.text} color = {content.caution.color} align = {content.caution.align}
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].caution.text = e.currentTarget.value;
                                }))}  
                            />
                        </div>
                    }
                    </div>
                </AnimationDiv>
            </motion.div>
        </>
    )
}

export default CtaSection
