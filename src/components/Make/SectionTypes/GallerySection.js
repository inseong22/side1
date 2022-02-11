import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import TextAuto from './components/TextAuto'
import Element from './components/Element'

function GallerySection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const heightRef = useRef(null)

    const returnElementsCards = content.elements.map((item, index) => {
        // '1px 1px 3px rgba(0,0,0,0.2)'
        return(
            <div key={index} className="feature__card" style={{boxShadow:'', margin:`${ index === 0 ? '0px 15px 0px 0px' : index === content.elements.length - 1 ? '0px 0px 0px 15px' : '0px 15px' }`}}>
                <Element content={content} item={item} index={index} key={index} gallery/>
                {
                    content.text.use && 
                    <div className="df-margin-big feature-title" style={{width:'100%'}}>
                            <TextAuto className="text-input" value={item.text} color = {content.text.color} align = {content.text.align}
                                onChange={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elements[index].text = e.currentTarget.value;
                                }))}  
                            />
                    </div>
                }
            </div>
        )
    })

    return (
        <motion.div className="template"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc content={content} />

            <div className="features__container" ref={heightRef} >
                {returnElementsCards}
            </div>

        </motion.div>
    )
}

export default GallerySection
