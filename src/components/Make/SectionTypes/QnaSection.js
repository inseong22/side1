import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import OpenCloseCustom from '../../../components/Make/Edit/tools/Custom/OpenCloseCustom'

function QnaSection({content}) {

    const returnQnaCards = content.qnas.map((item, index) => {
        return(
            <OpenCloseCustom key={index} title={item.question}>
                <div>
                    {item.answer}
                </div>
            </OpenCloseCustom>
        )
    })

    return (
        <motion.div className="template"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc content={content} />

            <div className="features__container" style={{flexDirection: 'column'}}>
                {returnQnaCards}
            </div>

        </motion.div>
    )
}

export default QnaSection
