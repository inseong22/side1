import React, {useContext, useEffect, useState, useRef} from 'react'
import Editor from '../tools/Editor'
import Icon from '../tools/Icon'
import './FeaturesSection.css'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function FeaturesSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const heightRef = useRef(null)

    const returnFeatureCards = content.features.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.features.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <div>
                    {item.icon && <Icon name="Adobe" />}
                    {item.attachment && <img src={item.attachment} style={{width:'50px'}} /> }
                </div>
                {
                    content.featureText.titleUse && 
                    <div style={{fontSize:'1.4em', fontWeight: 'bold', width:'100%'}}>
                        <TextareaAutosize 
                            className="text-input" 
                            value={item.title} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].features[index].title = e.currentTarget.value;
                            }))} 
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                            }}
                            />
                    </div>
                }
                {
                    content.featureText.descUse && 
                    <div className="df-margin">
                        <TextareaAutosize 
                            className="text-input" 
                            value={item.desc} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].features[index].desc = e.currentTarget.value;
                            }))}  
                            style={{
                                width:'100%',
                                resize:'none',
                                textAlign:`${content.align}`,
                            }}
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <motion.div className="template"
                data-aos={content.animation.type} aos-duration="2000" >
                <TitleDesc content={content} />

                <div className="features__container" ref={heightRef} >
                    {returnFeatureCards}
                </div>

            </motion.div>
        </>
    )
}

export default FeaturesSection
