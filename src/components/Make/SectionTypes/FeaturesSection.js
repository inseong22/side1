import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import Icon from '../tools/Icon'
import './FeaturesSection.css'
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'

function FeaturesSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnFeatureCards = content.features.map((item, index) => {
        return(
            <div key={index} className="feature__card">
                <div>
                    {item.icon && <Icon name="Adobe" />}
                    {item.attachment && <img src={item.attachment} style={{width:'50px'}} /> }
                </div>
                <div className="center-row" style={{fontSize:'1.4em', fontWeight: 'bold', backgroundColor:'red', justifyContent:`${content.align}`}}>
                    {item.title}
                </div>
                <div style={{marginTop:'20px', justifyContent:`${content.align}`}}>
                    {item.desc}
                </div>
            </div>
        )
    })

    return (
        <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}
            data-aos={content.animation.type} aos-duration="2000" >
                {returnFeatureCards}
            </motion.div>
        </>
    )
}

export default FeaturesSection
