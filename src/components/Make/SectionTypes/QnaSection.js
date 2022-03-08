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
            <QnaOpenClose setting={state.setting} key={index} title={item.question} open={content.qna.shape === 'open'} color={content.qna.question} content={content} type={content.layout} index={index}>
                <div className="edit-element" style={{alignItems:'start'}}>
                    <div style={{display:'flex', alignItems: 'start', height:'100%'}}>
                        <span className="qna__word" style={{fontFamily:`${state.setting.smallFont}`, color: `${content.qna.answer}`}}>A. <></></span>
                    </div>
                    <div style={{marginTop:'4px', width:`${state.isPhone ? '85.6%' : '91.6%'}`}}>
                        <TextAuto
                            small
                            size={0.9}
                            placeholder="여기를 클릭하여 자주 묻는 질문의 답변을 적어보세요."
                            value={item.answer} 
                            onChange={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].qnas[index].answer = e.currentTarget.value;
                            }))}
                            color={content.qna.answer} align="start" />
                    </div>
                </div>
            </QnaOpenClose>
        )
    })

    return (
        <motion.div className="template"
        data-aos-easing="ease-in-back"
        data-aos-delay="200"
        data-aos-offset="0" data-aos={content.animation} aos-duration="4000">

            {/* 큐앤에이 카드의 그림자때문에 텍스트와 정렬이 맞지 않아서 */}
            <div style={{width : `${state.isPhone ? '100%' : '95%'}` }}>  
                <TitleDesc content={content} titlePlaceholder="자주 묻는 질문을 적어보세요." descPlaceholder="여기를 클릭하여 자주 묻는 질문과 그 답변을 적어보세요." />
            </div>

            <div className="features__container" style={{flexDirection: 'column', marginTop:'20px'}}>
                {returnQnaCards}
            </div>

        </motion.div>
    )
}

export default QnaSection
