import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './TitleDesc/TitleDesc'

function VideoSection({content}) {
    return (
        <motion.div className="template"
            data-aos={content.animation.type} aos-duration="2000">
                
            <TitleDesc content={content} />

        </motion.div>
    )
}

export default VideoSection
