import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import Icon from '../tools/Icon'
import './FeaturesSection.css'

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

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnFeatureCards}
                    </div>
                )

            case 2:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        2입니다.
                    </div>
                )

            case 3:
                return(
                    <div className="template" style={{flexDirection:'column'}}>
                        33입니다.
                    </div>
                )

            default:
                return(
                    <div className="template" style={{flexDirection:'column-reverse'}}>
                    </div>
                )
        }
    }

    return (
        <>
            {returnSectionTemplate()}
        </>
    )
}

export default FeaturesSection
