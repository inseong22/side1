import React, {useState,useContext} from 'react'
import Template1 from '../../Templates/Template1'
import Template2 from '../../Templates/Template2'
import ReviewTemplate from '../../Templates/ReviewTemplate'
import VideoTemplate from '../../Templates/VideoTemplate'
import './NewSection.css'
import { MyContext } from '../MakePageV2'

function NewSection({content, index, setSecNum, contents, setContents}) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');
    const {state, action} = useContext(MyContext)

    const deleteThisSection = () => {
        setContents([
            ...contents.slice(0,index),
            ...contents.slice(index + 1,contents.length)
        ])
    }

    const pasteThisSection = () => {
        setContents([
            ...contents.slice(0,index),
            content,
            ...contents.slice(index, contents.length)
        ])
    }

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
                    <VideoTemplate content={content} />
                )
            case 4:
                return (
                    <ReviewTemplate content={content} />
                )
            default:
                return (
                    <div>
                        어어
                    </div>
                )
        }
    }

    return(
    <div onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <div className="make-hover-section" style={{border:`${isHover === 'flex' ? '3px solid red' : 'none' }`, width:'100%'}} onClick={() => {setSecNum(parseInt(index)); action.setAddingSectionAt(1000)}}>
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                {returnTemplate()}
            </div>
            <div className="section-selection-container" style={{display:`${isHover}`, flexDirection:'column'}}>
                <span className="section-hover-selections" onClick={() => pasteThisSection()}>복사하기</span>
                <span className="section-hover-selections" onClick={() => deleteThisSection()}>삭제하기</span>
            </div>
        </div>
        <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => {
            if(state.addingSectionAt === index){
                action.setAddingSectionAt(1000);
            }else{
                action.setAddingSectionAt(index)
            }
        }}>
            {parseInt(state.addingSectionAt) === parseInt(index) ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
        </span>
        {index === state.addingSectionAt && 
            <div className="section-adding-template">
                우측에서 추가할 템플릿을 선택해주세요.
            </div>
        }
    </div>
    )
}

export default NewSection
