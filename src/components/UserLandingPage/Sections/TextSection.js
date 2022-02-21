import React, {useContext, useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'

function TextSection({content, setting}) {


    return (
        <motion.div className="centera"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0" data-aos={content.animation.type} aos-duration="2000">

            <TitleDesc setting={setting} content={content} />

        </motion.div>
    )
}

export default TextSection