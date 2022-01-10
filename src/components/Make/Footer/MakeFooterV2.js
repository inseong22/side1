import React, {useContext, useState} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import FTemplate1 from './FooterTemplates/FTemplate1'
import FTemplate2 from './FooterTemplates/FTemplate2'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import './MakeFooter.css'

function MakeFooterV2({full, history, foot, setFoot, setIsWidget}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [isHover, setIsHover] = useState('none');

    const returnFooterTemplate = () => {
        switch(foot.sectionTemplateNumber){
            case 1:
                return(
                    <FTemplate1 foot={foot} history={history} setFoot={setFoot} />
                )

            case 2:
                return(
                    <FTemplate2 foot={foot} setFoot={setFoot} />
                )

            default:
                <div>
                    푸터
                </div>

        }
    }

    return (
        <div className="make-footer" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} style={{width:`${full ? '100%' : '100%'}`}}>
            <footer className="make-footer__container" style={{backgroundColor:`${foot.backgroundColor}`}}>
                {returnFooterTemplate()}
            </footer>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(200,200,200,0.7)' : 'rgba(0,0,0,0)'}`}}>
                <div className="section-selection-container" style={{display:`${isHover}`, left:`${state.isWidget ? '18vw' : '5vw'}`}}>
                    <span className="section-hover-selections" onClick={() => {}}><Delete size="30" /></span>
                    <span className="section-hover-selections" onClick={() => {action.setIsWidget(true); action.setSecNum(51); action.setAddingSectionAt(1000)}}><Options size="30" /></span>
                </div>
            </div>
        </div>
    )
}

export default MakeFooterV2
