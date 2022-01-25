import React, {useContext, useState} from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'

function PriceSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
            <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                111입니다.
            </div>
        </>
    )
}

export default PriceSection
