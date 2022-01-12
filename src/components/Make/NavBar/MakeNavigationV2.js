import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import NaviTemplate1 from './NavTemplates/NaviTemplate1'
import NaviTemplate2 from './NavTemplates/NaviTemplate2'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import { motion } from 'framer-motion'
import './MakeNavigation.css'

function MakeNavigationV2({full, navi, setNavi, history, setIsWidget}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [isHover, setIsHover] = useState('none');

    const returnNaviTemplate = () => {
        switch(navi.sectionTemplateNumber){
            case 1:
                return (
                    <NaviTemplate1 navi={navi} setNavi={setNavi}/>
                )

            case 2:
                return (
                    <NaviTemplate2 navi={navi} setNavi={setNavi}/>
                )

            default:
                return (
                    <>
                        <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                            {navi.title}
                        </span>
                    </>
                )
        }
    }

    return (
        <>
        {/* <div className="make-navigation" onClick={() => {action.setSecNum(50); action.setAddingSectionAt(1000); setIsWidget(true)}} style={{width:`${full ? '100%' : '100%'}`, backgroundColor:`${navi.backgroundColor}`}}>
            {returnNaviTemplate()}
        </div> */}
        <div className="make-navigation" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
            <div className="make-nav-container" style={{width:"100%", borderBottom:`${navi.bottomBorder ? '1px solid rgba(150,150,150,0.2)' : '1px solid rgba(150,150,150,0)'}`, backgroundColor:`${navi.backgroundColor}`}} >
                {returnNaviTemplate()}
            </div>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(200,200,200,0.7)' : 'rgba(0,0,0,0)'}`}}>
                <div className="section-selection-container" style={{display:`${isHover}`, left:`${state.isWidget ? '18vw' : '5vw'}`}}>
                    <span className="section-hover-selections" onClick={() => {}}><Delete size="30" /></span>
                    <span className="section-hover-selections" onClick={() => {action.setIsWidget(true); action.setSecNum(50); action.setAddingSectionAt(1000)}}><Options size="30" /></span>
                </div>
            </div>
        </div>
        </>
    )

}

export default MakeNavigationV2
