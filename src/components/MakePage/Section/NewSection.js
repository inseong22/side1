import React, {useState,useContext} from 'react'
import Template1 from '../../Templates/Template1'
import Template2 from '../../Templates/Template2'
import Template3 from '../../Templates/Template3'
import VideoTemplate from '../../Templates/VideoTemplate'
import './NewSection.css'
import { MyContext } from '../MakePageV2'
import { motion } from 'framer-motion'

function NewSection({content, index, setSecNum, contents, setContents}) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');
    const {state, action} = useContext(MyContext)

    const deleteThisSection = () => {
        console.log(index, content)
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
                    <Template1 content={content}  contents={contents} setContents={setContents}/>
                )
            case 2:
                return (
                    <Template2 content={content}  contents={contents} setContents={setContents}/>
                )
            case 3:
                return (
                    <Template3 content={content}  contents={contents} setContents={setContents}/>
                )
            case 4:
                return (
                    <VideoTemplate content={content}  contents={contents} setContents={setContents}/>
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
    <div className="new-section" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')} style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
            <div className="make-hover-section" style={{border:`${isHover === 'flex' ? '1px solid red' : '1px solid rgba(0,0,0,0)' }`, width:'100%'}} onClick={() => {setSecNum(parseInt(index)); action.setAddingSectionAt(1000)}}>
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                <motion.div animate={{}}>
                    {returnTemplate()}
                </motion.div>
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
