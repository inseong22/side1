import React, {useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import FTemplate1 from './FooterTemplates/FTemplate1'
import FTemplate2 from './FooterTemplates/FTemplate2'
import './MakeFooter.css'

function MakeFooterV2({foot, setFoot, setIsWidget}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnFooterTemplate = () => {
        switch(foot.sectionTemplateNumber){
            case 1:
                return(
                    <FTemplate1 foot={foot} setFoot={setFoot} />
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
        <footer className="make-footer__container" style={{fontSize:'0.7em'}} onClick={() => {
            action.setAddingSectionAt(1000);
            action.setSecNum(51);
        }}>
            {returnFooterTemplate()}
        </footer>
    )
}

export default MakeFooterV2
