import React, {useContext} from 'react'
import {MyContext} from '../../../../pages/Make/MakePageV2'

function EditTopBar({category, setCategory}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="make__top-bar">
            <span onClick={() => setCategory(0)} style={{cursor:'pointer', backgroundColor:`${category === 0 ? 'rgba(220,0,0,1)' : 'rgba(0,220,0,1)'}`}}>
                템플릿
            </span>
            <span onClick={() => setCategory(1)} style={{cursor:'pointer', backgroundColor:`${category === 1 ? 'rgba(220,0,0,1)' : 'rgba(0,220,0,1)'}`}}>
                디자인
            </span>
            <span onClick={() => action.setIsWidget(false)}>
                Done
            </span>
        </div>
    )
}

export default EditTopBar
