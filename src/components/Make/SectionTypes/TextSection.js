import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'

function TextSection({content}) {
    return (
        <motion.div className="centera"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc content={content} />

        </motion.div>
    )
}

export default TextSection
