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
        flexDirection:`${
            state.isPhone ? 
                content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 2 ? 'row' : content.layout === 3 ? 'row-reverse' : 'column'
        }`
    }
    
    return (
        <>
            <motion.div style={{display:'flex', width:'100%', height:'100%', ...returnLayout}} data-aos={content.animation} data-aos-easing="ease-in-back"
            data-aos-delay="200" data-aos-offset="0" aos-duration="4000" >
                <div className="text__container">
                    <TitleDesc content={content} titlePlaceholder="잠재 유저의 행동을 유도할 말을 적어보세요." descPlaceholder="여기를 클릭하여 잠재 유저의 행동을 유도할 수 있는 문구를 적어보세요." />
                </div>
                <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', height:'100%'}}>
                    <ReturnButton content={content} />
                    {content.caution.use && 
                        <div 
                            className="df-margin-big feature-desc" 
                            style={{width:'100%'}}
                            onClick={() => {action.setFocus('caution'); action.setCategory(0)}}>
                            <TextAuto 
                                className="text-input" 
                                small 
                                size = {content.caution.size/20}
                                value={content.caution.text} 
                                color = {content.caution.color} 
                                align = {state.isPhone ? content.mobile.align : content.caution.align}
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].caution.text = e.currentTarget.value;
                                }))}  
                                placeholder="유의사항이나 부가 설명을 적어보세요."
                            />
                        </div>
                    }
                </div>
            </motion.div>
        </>
    )
}

export default CtaSection
