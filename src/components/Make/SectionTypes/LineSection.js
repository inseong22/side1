import React, {useContext, useState, useRef} from 'react'
import { motion } from 'framer-motion';
import { MyContext } from '../../../pages/Make/MakePageV2'
import AnimationDiv from './components/AnimationDiv'
import './LineSection.css'
import aa from '../../../tools/img/surfeelogo.png'

function LineSection({content, setting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection:`${'column'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }   

    const Lines = [
        <hr className="hr_style1" style={{borderTop:`1px solid ${content.line.color}`}}/>,
        <hr className="hr_style2" style={{borderTop:`1px solid ${content.line.color}`}}/>,
        <span className="hr_style3"/>,
        <hr className="hr_style4" style={{borderTop:`1px solid ${content.line.color}`}}/>,
        <hr className="hr_style5" style={{borderTop:`1px solid ${content.line.color}`}}/>,
    ]

    return (
        <motion.div 
            data-aos-easing="ease-in-back"
            data-aos-delay="200"
            data-aos-offset="0" data-aos={content.animation} aos-duration="4000"
            style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout} setting={setting}>
                {
                    content.line.use && 
                    <div style={{width:'100%'}} onClick={() => {action.setFocus('line'); action.setCategory(0)}}>
                        {Lines[content.line.type]}
                    </div>
                }
                </AnimationDiv>
        </motion.div>
    )
}

export default LineSection
