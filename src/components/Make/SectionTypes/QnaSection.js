import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import QnaOpenClose from './components/QnaOpenClose'
import TextAuto from './components/TextAuto'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function QnaSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnQnaCards = content.qnas.map((item, index) => {
        return(
            <QnaOpenClose key={index} title={item.question} open={content.qna.shape === 'open'} color={content.qna.question} content={content} type={content.layout} index={index}>
                <div className="edit-element">
                    <div style={{display:'flex', alignItems: 'start', height:'100%'}}>
                        <span className="qna__word">A. <></></span>
                    </div>
                    <TextAuto 
                        small
                        style={{fontFamily:`${state.setting.smallFont}`}}
                        value={item.answer} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].qnas[index].answer = e.currentTarget.value;
                        }))}
                        color={content.qna.answer} align="start" />
                </div>
            </QnaOpenClose>
        )
    })

    return (
        <motion.div className="template"
            data-aos={setting.animation} aos-duration="4000">

            <TitleDesc content={content} />
            {content.qna.use && 
                <div className="features__container" style={{flexDirection: 'column', marginTop:'20px'}}>
                    {returnQnaCards}
                </div>
            }

        </motion.div>
    )
}

export default QnaSection
