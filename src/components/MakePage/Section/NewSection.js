import React, {useState,useContext} from 'react'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'
import Template3 from '../Templates/Template3'
import Template4 from '../Templates/Template4'
import './NewSection.css'
import { MyContext } from '../MakePageV2'

function NewSection({content, index, setSecNum}) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');
    const {state, action} = useContext(MyContext)

    const returnTemplate = () => {
        switch(content.sectionTemplateNumber){
            case 1:
                return (
                    <Template1 content={content} />
                )
            case 2:
                return (
                    <div>
                        안녕하세요 새로운 섹션2
                    </div>
                )
            case 3:
                return (
                    <div>
                        안녕하세요 새로운 섹션3
                    </div>
                )
            default:
                return (
                    <div>
                        기본 값~
                    </div>
                )
        }
    }

    return(
    <>
        <div onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} className="make-hover-section" onClick={() => {setSecNum(parseInt(content.sectionTemplateNumber)); action.setAddingSectionAt(1000)}}>
            {returnTemplate()}
            {state.addingSectionAt}
        </div>
        <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => action.setAddingSectionAt(index)}>
            {parseInt(state.addingSectionAt) === parseInt(index) ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
        </span>
        {index === state.addingSectionAt && 
        <div>
            템플릿 1 템플릿 2
        </div>
        }
    </>
    )
}

export default NewSection
