import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'

function PriceSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}
            data-aos={content.animation.type} aos-duration="2000">
                111입니다.
            </motion.div>
        </>
    )
}

export default PriceSection
