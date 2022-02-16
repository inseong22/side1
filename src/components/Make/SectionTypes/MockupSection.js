import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import Phone from '../../../tools/img/mockup/mobile.png'
import Desktop from '../../../tools/img/mockup/desktop.png'
import ourA from '../../../tools/img/005.png'

function MockupSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
        
    return (
        <motion.div className="template"
            data-aos={setting.animation} aos-duration="2000">

            <TitleDesc content={content} />
            <div className="image__container" style={{marginTop: '30px'}}>
            </div>
        </motion.div>
    )
}

export default MockupSection
