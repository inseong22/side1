import React, {useContext, useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import TitleDesc from './components/TitleDesc'
import isMobile from 'react-device-detect'

function TextSection({content, setting}) {

    return (
        <motion.div style={{ width:'100%', height:'100%'}}
        data-aos-easing="ease-in-back"
        data-aos-delay="200"
        data-aos-offset="0" data-aos={setting.animation} aos-duration="4000">
            <div className="text__container">
            <TitleDesc content={content} titlePlaceholder="제목을 적어보세요." descPlaceholder="여기를 클릭하여 내용을 적어보세요." />
            </div>
        </motion.div>
    )
}

export default TextSection
