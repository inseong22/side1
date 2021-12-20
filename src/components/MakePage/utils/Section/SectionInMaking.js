import React, {useState} from 'react'
import './Section.css'
import { isMobile } from 'react-device-detect';
import Section from './Section';

function SectionInMaking(props) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');
 
    const addSection = () => {
        props.setSecNums([...props.secNums, props.secNums.length]);
        props.setSecNum(props.secNums.length);
    }

    return (
        <>
        <div onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} className="make-hover-section" onClick={() => props.setSecNum(props.sectionNumber)}>
            <Section state={props} />
            <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => setAdding(!adding)}>
                {adding ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
            </span>
        </div>
        {adding && 
            <div className="select-section-template-container">
                템플릿 1 , 템플릿 2
            </div>
        }
        </>
    )
}

export default SectionInMaking
