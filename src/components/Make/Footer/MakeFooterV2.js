import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import FTemplate from './FTemplate'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import './MakeFooter.css'

function MakeFooterV2({full, history, foot, setFoot}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [isHover, setIsHover] = useState('none');

    return (
        <div className="make-footer" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} style={{width:`${full ? '100%' : '100%'}`}}>
            <footer className="make-footer__container" 
            style={{backgroundColor:`${foot.backgroundColor}`, 
            padding:`${
                state.isPhone ? foot.paddingTop/2.5 : foot.paddingTop}vh 
                ${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`} 
                ${state.isPhone ? foot.paddingTop/2.5 : foot.paddingBottom}vh 
                ${full ? 'calc(14vw + 30px)' : `${state.isPhone ? '15px' : '30px'}`} `
            // paddingTop: `${foot.paddingTop}px`, 
            // paddingBottom: `${foot.paddingBottom}px`
        }} 
            onClick={() => action.setSecNum(51)}>
                    <FTemplate foot={foot} history={history} setFoot={setFoot} />
            </footer>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? '#6C63FF' : 'rgba(0,0,0,0)'}`}}>
            </div>
        </div>
    )
}

export default MakeFooterV2
