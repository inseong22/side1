import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'
import './CtaSection.css'

import { MyContext } from '../../../pages/Make/MakePageV2'

function CtaSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnCtaSection = () => {
        return(
            <div className="center-column">
                <div style={{fontWeight:'500', fontSize:'1.5em'}}>
                    {content.title}
                </div>
                <div className="mt30">
                    {content.desc}
                </div>
                <div className="center-row mt30">
                    <div style={{marginRight:'1%'}}>
                        <input className="input" />
                    </div>
                    <button className="action-button" style={{backgroundColor:`${content.button.backgroundColor}`}}>
                        {content.button.title}
                    </button>
                </div>
            </div>
        )
    }

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnCtaSection()}
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

export default CtaSection
