import React, {useContext, useState} from 'react'
import './CtaSection.css'
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'
import TitleDesc from './components/TitleDesc'
import ImageCarousel from '../Edit/tools/func/FuncImageCarousel'
import AutosizeInput from 'react-input-autosize';
import ImageOrSlide from './components/ImageOrSlide'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'

function CtaSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : 'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }
    
    return (
        <>
            <div style={{ width:'100%', height:'100%'}}>
                <AnimationDiv content={content} returnLayout={returnLayout}>
                    <div className="text__container">
                        <TitleDesc content={content} />
                    </div>
                    <ReturnButton content={content} />
                </AnimationDiv>
            </div>
        </>
    )
}

export default CtaSection
