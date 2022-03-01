import React from 'react'
import { motion } from 'framer-motion';

import TitleDesc from './components/TitleDesc'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'
import TextAuto from './components/TextAuto'
import isMobile from 'react-device-detect'

function CtaSection({content, setting}) {

    const returnLayout = {
        flexDirection:`${
            isMobile ? 
                content.mobile.layout === 3 ? 'column' : 'column-reverse'
            :
                content.layout === 2 ? 'row' : content.layout === 3 ? 'row-reverse' : 'column'
        }`
    }
    
    return (
        <>
            <motion.div style={{display:'flex', width:'100%', height:'100%', ...returnLayout}} data-aos={setting.animation} data-aos-easing="ease-in-back"
            data-aos-delay="200" data-aos-offset="0" aos-duration="4000" >
                <div className="text__container">
                    <TitleDesc content={content} titlePlaceholder="잠재 유저의 행동을 유도할 말을 적어보세요." descPlaceholder="여기를 클릭하여 잠재 유저의 행동을 유도할 수 있는 문구를 적어보세요." />
                </div>
                <div style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', height:'100%'}}>
                    <ReturnButton content={content} />
                    {content.caution.use && 
                        <div className="df-margin-big feature-desc" style={{width:'100%'}}>
                            <TextAuto 
                                disabled
                                className="text-input" 
                                small 
                                size = {content.caution.size/20}
                                value={content.caution.text} 
                                color = {content.caution.color} 
                                align = {isMobile ? content.mobile.align : content.caution.align}
                                placeholder="유의사항이나 부가 설명을 적어보세요."
                            />
                        </div>
                    }
                </div>
            </motion.div>
        </>
    )
}

export default CtaSection
