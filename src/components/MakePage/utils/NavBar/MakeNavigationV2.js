import React, {useContext} from 'react'
import { MyContext } from '../../MakePageV2'
import './MakeNavigation.css'

function MakeNavigationV2(props) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    switch(props.navi.sectionTemplateNumber){
        case 1:
            return (
                <div className="make-navigation" onClick={() => {action.setSecNum(50); action.setAddingSectionAt(1000)}} style={{width:`${props.full ? '100%' : '100%'}`, backgroundColor:`${props.navi.backgroundColor}`}}>
                    <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                        {props.navi.title}
                    </span>
                    <span className="make-nav-on">
                        <button className="make-nav-button" onClick={() => console.log("내비 클릭")}>{props.navi.buttonTitle}</button>
                    </span>
                </div>
            )

        case 2:

        default:
            return (
                <div className="make-navigation" onClick={() => {action.setSecNum(50); action.setAddingSectionAt(1000)}} style={{width:`${props.full ? '100%' : '100%'}`, backgroundColor:`${props.navi.backgroundColor}`}}>
                    <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                        {props.navi.title}
                    </span>
                    <span className="make-nav-on">
                        <button className="make-nav-button" onClick={() => console.log("내비 클릭")}>{props.navi.buttonTitle}</button>
                    </span>
                </div>
            )
    }

}

export default MakeNavigationV2
