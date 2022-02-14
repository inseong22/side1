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
    const heightRef = useRef(null)

    const returnFeatureCards = content.elements.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <Element content={content} item={item} index={index} key={index}/>
                {
                    content.featureText.titleUse && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                            <TextAuto className="text-input" value={item.title} color = {content.featureText.color} align = {content.featureText.align}
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].title = e.currentTarget.value;
                                }))}  
                            />
                    </div>
                }
                {
                    content.featureText.descUse && 
                    <div className="df-margin">
                        <TextAuto small className="text-input"  value={item.desc} color = {content.featureText.color} align = {content.featureText.align}
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elements[index].desc = e.currentTarget.value;
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
                data-aos={setting.animation} aos-duration="4000" >
                <TitleDesc content={content} />

                <div className="features__container" ref={heightRef} >
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
