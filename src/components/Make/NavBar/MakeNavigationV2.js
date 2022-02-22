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

    return (
        <>
        <div className="make-navigation" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
            <div className="make-nav-container" 
                style={{
                    paddingRight: `${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '12px' : '30px'}`}`,
                    paddingLeft: `${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '12px' : '30px'}`}`,
                    borderBottom:`${navi.bottomBorder.use ? `1px solid ${navi.bottomBorder.color}` : ''}`, 
                    backgroundColor:`${navi.backgroundColor}`, 
                    height:`${navi.height}px`,
                    // display: `${navi.logo.align === 'center' && navi.button.use && !state.isPhone ? 'block' : 'flex'}`
                }} 
                    
                onClick={() => action.setSecNum(50)}>
                <NaviConatainer navi={navi} setNavi={setNavi} />
            </div>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)'}`}}>
            </div>
        </div>
        </>
    )

}

export default MakeNavigationV2
