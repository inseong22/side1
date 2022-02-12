import React, {useContext, useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'

function TextSection({content, setting}) {

    return (
        <motion.div className="centera"
            data-aos={setting.animation} aos-duration="4000">

            <TitleDesc content={content} />

        </motion.div>
    )
}

export default TextSection
