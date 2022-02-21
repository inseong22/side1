import React, {useContext, useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'

function TextSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <motion.div style={{ width:'100%', height:'100%'}}
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" data-aos={setting.animation} aos-duration="2000">
            <div className="text__container" 
            style={{
                marginTop:`${ !state.isPhone && content.layout === 2 ? `15vh`  : state.isPhone && content.mobile.layout === 2 ? '8px' : '2px'}`,
                marginBottom:`${ !state.isPhone && content.layout === 2 ? `1vh`  : state.isPhone && content.mobile.layout === 2 ? '0px' : '2px'}`,
             }}>
                <TitleDesc content={content} />
            </div>
        </motion.div>
    )
}

export default TextSection
