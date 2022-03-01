import React from 'react'
import { motion } from 'framer-motion';
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
        <motion.div tyle={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout} setting={setting}>
                <div className="text__container">
                    <TitleDesc content={content} />
                </div>
                {
                    content.mockup.use && 
                    <div className="image__container" style={{marginTop:'12px'}}>
                        <ImageOrSlide content={content} />
                    </div>
                }
                </AnimationDiv>
        </motion.div>
    )
}

export default MockupSection
