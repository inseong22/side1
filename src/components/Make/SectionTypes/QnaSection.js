import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import QnaOpenClose from './components/QnaOpenClose'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function QnaSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnQnaCards = content.qnas.map((item, index) => {
        return(
            <QnaOpenClose key={index} title={item.question} open={content.qna.shape === 'open'} color={content.qna.question} type={content.layout}>
                <div className="edit-element">
                    <span className="qna__word">A. <></></span>
                    
                    <TextareaAutosize 
                        className="text-input qna__answer" 
                        value={item.answer} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].qnas[index].answer = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            color:`${content.qna.answer}`, 
                            resize:'none'
                        }}
                        spellcheck="false"
                    />
                </div>
            </QnaOpenClose>
        )
    })

    return (
        <motion.div className="template"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc content={content} />

            <div className="features__container" style={{flexDirection: 'column', marginTop:'20px'}}>
                {returnQnaCards}
            </div>

        </motion.div>
    )
}

export default QnaSection
