import React, {useState} from 'react'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'
import Template3 from '../Templates/Template3'
import Template4 from '../Templates/Template4'
import './NewSection.css'

function NewSection({content, index, setSecNum}) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');

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
        <div onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} className="make-hover-section" onClick={() => {setSecNum(parseInt(content.sectionTemplateNumber))}}>
            {returnTemplate()}
            <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => setAdding(!adding)}>
                {adding ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
            </span>
        </div>
        {adding && 
            <div className="select-section-template-container">
                추가할 템플릿을 좌측에서 골라주세요.
            </div>
        }
    </>
    )
}

export default NewSection
