import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import './CtaSection.css'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'

import { MyContext } from '../../../pages/Make/MakePageV2'

function CtaSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnCtaSection = () => {
        return(
            <div className="center-column">
                <div className="center-row mt30">
                    <div style={{marginRight:'1%'}}>
                        <input className="input" />
                    </div>
                    <button className="action-button" style={{backgroundColor:`${content.button.backgroundColor}`}}>
                        {content.button.title}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}
            data-aos={content.animation.type} aos-duration="2000">
                <TitleDesc content={content} />
                {returnCtaSection()}
            </motion.div>
        </>
    )
}

export default CtaSection
