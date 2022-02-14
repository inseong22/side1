import React, {useContext, useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'

function TextSection({content, setting}) {

    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    if (content.layout === 1)
        {
            action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.align='center'
                draft[state.secNum].desc.align='center'
                draft[state.secNum].padding.top= 15
                draft[state.secNum].padding.bottom= 15
            }))
        }
    else if(content.layout === 2)
    {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].title.align='left'
            draft[state.secNum].desc.align='left'
            draft[state.secNum].padding.top= 25
            draft[state.secNum].padding.bottom= 5
        }))
    }
    else
    {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].title.align='left'
            draft[state.secNum].desc.align='left'
            draft[state.secNum].padding.top= 15
            draft[state.secNum].padding.bottom= 15
        }))
    }

    return (
        <motion.div className="centera"
            data-aos={setting.animation} aos-duration="4000">
            <TitleDesc content={content} />

        </motion.div>
    )
}

export default TextSection
