import React, {useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import NaviTemplate1 from '../NavTemplates/NaviTemplate1'
import NaviTemplate2 from '../NavTemplates/NaviTemplate2'
import './MakeNavigation.css'

function MakeNavigationV2(props) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnNaviTemplate = () => {
        switch(props.navi.sectionTemplateNumber){
            case 1:
                return (
                    <NaviTemplate1 navi={props.navi}/>
                )

            case 2:
                return (
                    <NaviTemplate2 navi={props.navi}/>
                )

            default:
                return (
                    <>
                        <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                            {props.navi.title}
                        </span>
                    </>
                )
        }
    }

    return (
        <>
        <div className="make-navigation" onClick={() => {action.setSecNum(50); action.setAddingSectionAt(1000); props.setIsWidget(true)}} style={{width:`${props.full ? '100%' : '100%'}`, backgroundColor:`${props.navi.backgroundColor}`}}>
            {returnNaviTemplate()}
        </div>
        </>
    )

}

export default MakeNavigationV2