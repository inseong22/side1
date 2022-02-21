import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import TitleDesc from './components/TitleDesc'
import ImageOrSlide from './components/ImageOrSlide'
import AnimationDiv from './components/AnimationDiv'

function MockupSection({content, setting}) {
    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }   
    return (
        <motion.div className="template"
            data-aos-easing="ease-in-back"
            data-aos-delay="100"
            data-aos-offset="0" data-aos={content.animation.type} aos-duration="2000">
            <div className="text__container">
                <TitleDesc setting={setting} content={content} />
            </div>
            {
                content.mockup.use && 
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            }
        </motion.div>
    )
}

export default MockupSection
