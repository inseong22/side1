import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import QnaOpenClose from './components/QnaOpenClose'
import TextAuto from './components/TextAuto'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function QnaSection({content, setting}) {

    const returnQnaCards = content.qnas.map((item, index) => {
        return(
            <QnaOpenClose key={index} title={item.question} open={content.qna.shape === 'open'} color={content.qna.question} content={content} type={content.layout} index={index}>
                <div className="edit-element">
                    <div style={{display:'flex', alignItems: 'start', height:'100%'}}>
                        <span className="qna__word">A. <></></span>
                    </div>
                    <TextAuto 
                        small
                        value={item.answer} 
                        color={content.qna.answer} align="start" />
                </div>
            </QnaOpenClose>
        )
    })

    return (
        <motion.div className="template"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc setting={setting} content={content} />

            <div className="features__container" style={{flexDirection: 'column', marginTop:'20px'}}>
                {returnQnaCards}
            </div>

        </motion.div>
    )
}

export default QnaSection
