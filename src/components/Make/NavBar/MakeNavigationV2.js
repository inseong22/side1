import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import NaviTemplate from './NaviTemplate'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import { motion } from 'framer-motion'
import './MakeNavigation.css'

function MakeNavigationV2({full, navi, setNavi, history}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [isHover, setIsHover] = useState('none');

    return (
        <>
        <div className="make-navigation" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
            <div className="make-nav-container" style={{borderBottom:`${navi.bottomBorder ? '1px solid rgba(150,150,150,0.3)' : '1px solid rgba(150,150,150,0)'}`, backgroundColor:`${navi.backgroundColor}`, height:`${navi.height}px`}} onClick={() => action.setSecNum(50)}>
                <NaviTemplate navi={navi} setNavi={setNavi}/>
            </div>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(200,200,200,0.7)' : 'rgba(0,0,0,0)'}`}}>
            </div>
        </div>
        </>
    )

}

export default MakeNavigationV2
