import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'

function CtaSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        111입니다.
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
