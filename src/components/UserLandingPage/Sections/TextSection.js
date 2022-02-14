import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'

function TextSection({content, setting}) {
    return (
        <motion.div className="centera"
            data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc setting={setting} content={content} />

        </motion.div>
    )
}

export default TextSection
