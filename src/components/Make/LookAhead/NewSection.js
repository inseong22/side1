import React, {useState,useContext} from 'react'
import DetailSection from '../SectionTypes/DetailSection'
import Template2 from '../SectionTypes/Template2'
import Template3 from '../SectionTypes/Template3'
import VideoTemplate from '../SectionTypes/VideoTemplate'
import HorizontalSection from '../SectionTypes/HorizontalSection'
import {animations} from '../tools/animations'
import './NewSection.css'
import { MyContext } from '../../../pages/Make/MakePageV2'
import { motion } from 'framer-motion'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import {ArrowUpShort,ArrowDownShort} from '@styled-icons/bootstrap'

function NewSection({content, index, contents, setContents, setIsWidget}) {
    const [adding, setAdding] = useState(false);
    const [isHover, setIsHover] = useState('none');
    const {state, action} = useContext(MyContext)

    const deleteThisSection = () => {
        const ask = window.confirm("정말로 삭제하시겠습니까?")
        if(ask){
            console.log(index, content)
            setContents([
                ...contents.slice(0,index),
                ...contents.slice(index + 1,contents.length)
            ])
        }
    }

    const pasteThisSection = () => {
        setContents([
            ...contents.slice(0,index),
            content,
            ...contents.slice(index, contents.length)
        ])
    }

    const moveUp = () => {
        let newContents = JSON.parse(JSON.stringify(contents));
        const item = newContents.splice(index, index);
        newContents.splice(index-1, 0, item[0]);

        setContents(newContents)
    }

    const moveDown = () => {
        let newContents = JSON.parse(JSON.stringify(contents));
        let item;
        if(index === 0){
            item = newContents.splice(index, index+1);
        }else{
            item = newContents.splice(index, index);
        }
        newContents.splice(index+1, 0, item[0]);

        setContents(newContents)
    }

    const returnType = () => {
        switch(content.sectionTypeName){
            case 'DetailSection':
                return (
                    <DetailSection content={content}  contents={contents} setContents={setContents}/>
                )

            case 'HeroSection':
                return (
                    <Template2 content={content}  contents={contents} setContents={setContents}/>
                )

            case 'ReviewSection':
                return (
                    <Template3 content={content}  contents={contents} setContents={setContents}/>
                )

            case 'FeaturesSection':
                return (
                    <VideoTemplate content={content}  contents={contents} setContents={setContents}/>
                )

            case 'MapSection':
                return (
                    <HorizontalSection content={content}  contents={contents} setContents={setContents}/>
                )

            case 'HorizontalSection':
                return (
                    <HorizontalSection content={content}  contents={contents} setContents={setContents}/>
                )

            default:
                return (
                    <div>
                        기본
                    </div>
                )
        }
    }

    return(
    <div className="new-section" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
        <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(200,200,200,0.7)' : 'rgba(0,0,0,0)'}`}}>
            <div className="section-selection-container" style={{display:`${isHover}`, left:`${state.isWidget ? '18vw' : '5vw'}`}}>
                {/* <span className="section-hover-selections" onClick={() => pasteThisSection()}>복사하기</span> */}
                { state.contents.length > 0 && <span className="section-hover-selections" onClick={() => deleteThisSection()}><Delete size="30" /></span> }
                <span className="section-hover-selections" onClick={() => {action.setIsWidget(true); action.setSecNum(index); action.setAddingSectionAt(1000)}}><Options size="30" /></span>
                { index !== 0 && <span className="section-hover-selections" onClick={() => moveUp()}><ArrowUpShort size="30" /></span> }
                { index !== state.contents.length-1 && <span className="section-hover-selections" onClick={() => moveDown()}><ArrowDownShort size="30" /></span>}
            </div>
        </div>
        <div className="section__container">
            <div className="make-hover-section">
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                <motion.div animation={{scale:3}} style={{fontSize:'0.6em'}}>
                    {returnType()}
                </motion.div>
            </div>
        </div>
        <span className="make-section-button" style={{display:`${isHover}`}} onClick={() => {
                if(state.addingSectionAt === index){
                    action.setAddingSectionAt(1000);
                }else{
                    action.setAddingSectionAt(index)
                    setIsWidget(true);
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
