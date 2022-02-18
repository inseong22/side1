import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import NaviConatainer from './NaviConatainer'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import { motion } from 'framer-motion'
import produce from 'immer'
import './MakeNavigation.css'

function MakeNavigationV2({full, navi, setNavi, history}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [isHover, setIsHover] = useState('none');

    const CustomCtaButton = (props) => {
        return(
            <div style={{
                ...props.style,
                display: 'flex', justifyContent:'center', alignItems: 'center',
                padding:'10px 10.5px',
                borderRadius:`${state.setting.ghost.borderRadius}px`,
                backgroundColor:`${state.setting.ghost.backgroundColor}`,
                color:`${state.setting.ghost.color}`,
                boxShadow:`${state.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${state.setting.ghost.border ? `1px solid ${state.setting.ghost.borderColor}` : 'none'}`
            }} onClick={() => props.onClick}>
                {props.child}
            </div>
        )
    }

    const CustomGhostButton = (props) => {
        return(
            <div style={{
                ...props.style,
                display: 'flex', justifyContent:'center', alignItems: 'center',
                padding:'10px 10.5px',
                borderRadius:`${state.setting.ghost.borderRadius}px`,
                backgroundColor:`${state.setting.ghost.backgroundColor}`,
                color:`${state.setting.ghost.color}`,
                boxShadow:`${state.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${state.setting.ghost.border ? `1px solid ${state.setting.ghost.borderColor}` : 'none'}`
            }} onClick={() => props.onClick}>
                {props.child}
            </div>
        )
    }

    return (
        <>
        <div className="make-navigation" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
            <div className="make-nav-container" 
            style={{
                paddingRight: `${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`}`,
                paddingLeft: `${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`}`,
                // padding-right:`${state.isPhone ? navi.height/2.5 : navi.height}vh 
                // ${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`} 
                // ${state.isPhone ? navi.height/2.5 : navi.height}vh 
                // ${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`} `,
                borderBottom:`${navi.bottomBorder.use ? `1px solid ${navi.bottomBorder.color}` : ''}`, 
                backgroundColor:`${navi.backgroundColor}`, 
                height:`${navi.height}px`}} 
                onClick={() => action.setSecNum(50)}>
                <NaviConatainer navi={navi} setNavi={setNavi} CustomCtaButton={CustomCtaButton} CustomGhostButton={CustomGhostButton} />
            </div>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? '#6C63FF' : 'rgba(0,0,0,0)'}`}}>
            </div>
        </div>
        </>
    )

}

export default MakeNavigationV2
