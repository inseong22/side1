import React, {useContext, useEffect, useState, useRef} from 'react'
import './FeaturesSection.css'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function FeaturesSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnFeatureCards = content.elements.map((item, index) => {
        if (index < content.numOfElements){
        return(
            <div key={index} className="feature__card" style={{
                alignItems: `${state.isPhone ? content.mobile.align : content.align}`,
                boxShadow : '', 
                margin : `${ state.isPhone ? '5px 5px' : '0px 15px' }`,
                height : `${state.isPhone ? '' : '100%'}`,
                width : `${state.isPhone ? content.mobile.layout === 1 ? '100%' : '46%' : '300px'}`
                }}>
                <Element content={content} item={item} index={index} key={index}/>
                {
                    content.elementText.titleUse && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                        <TextAuto className="text-input" 
                            value={item.title} 
                            color = {content.elementText.color} 
                            align = {state.isPhone ? content.mobile.align : content.elementText.align}
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elements[index].title = e.currentTarget.value;
                            }))}  
                        />
                    </div>
                }
                {
                    content.elementText.descUse && 
                    <div className="df-margin">
                        <TextAuto small className="text-input"  
                            value={item.desc} 
                            color = {content.elementText.color} 
                            align = {state.isPhone ? content.mobile.align : content.elementText.align}
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elements[index].desc = e.currentTarget.value;
                            }))}  
                        />
                    </div>
                }
            </div>
        )}
        else{
        }
    })

    return (
        <>
            <motion.div className="template" data-aos={setting.animation} aos-duration="2000" >
                <TitleDesc content={content} />

                <div className="features__container" style={{flexWrap : `${state.isPhone ? 'wrap' : ''}`}}>
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
