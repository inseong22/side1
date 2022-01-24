import React, {useState,useContext} from 'react'
import DetailSection from './SectionTypes/DetailSection'
import HeroSection from './SectionTypes/HeroSection'
import MapSection from './SectionTypes/MapSection'
import PriceSection from './SectionTypes/PriceSection'
import ReviewSection from './SectionTypes/ReviewSection'
import FeaturesSection from './SectionTypes/FeaturesSection'
import CtaSection from './SectionTypes/CtaSection'

import HorizontalSection from './SectionTypes/HorizontalSection'
import {animations} from './tools/animations'
import './NewSection.css'
import { MyContext } from '../../pages/Make/MakePageV2'
import { motion } from 'framer-motion'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'
import {ArrowUpShort,ArrowDownShort} from '@styled-icons/bootstrap'

function NewSection({content, index, contents, setContents}) {
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
                    <HeroSection content={content}  contents={contents} setContents={setContents}/>
                )

            case 'ReviewSection':
                return (
                    <ReviewSection content={content}/>
                )

            case 'FeaturesSection':
                return (
                    <FeaturesSection content={content}/>
                )

            case 'PriceSection':
                return (
                    <PriceSection content={content}/>
                )

            case 'HorizontalSection':
                return (
                    <HorizontalSection content={content}/>
                )

            case 'CtaSection':
                return (
                    <CtaSection content={content}/>
                )

            default:
                return (
                    <div>
                        기본
                    </div>
                )
        }
    }

    const setThisSection = () => {
        action.setSecNum(index);
    }

    return(
        <div className="new-section" onMouseEnter={() => setIsHover('flex')} onMouseLeave={() => setIsHover('none')}>
            <div className="for-section-hover" style={{backgroundColor: `${isHover === 'flex' ? 'rgba(200,200,200,0.7)' : 'rgba(0,0,0,0)'}`}}>

            </div>
            <div className="section__container" style={{backgroundImage:`url(${content.backgroundImage.attachment})`}} onClick={() => setThisSection()}>
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                <div style={{backgroundColor:`${content.backgroundColor}`, opacity:`${content.backgroundOpacity}`, width:'100%', height:'100%', zIndex:2, position:'absolute'}}>
                </div>
                <div style={{fontSize:'0.6em', width:'100%', zIndex:3}}>
                    {returnType()}
                </div>
            </div>
        </div>
    )
}

{/* 
    <div className="section-selection-container" style={{display:`${isHover}`}}>
{ state.contents.length > 0 && 
    <span className="section-option" onClick={() => deleteThisSection()}>
        <Delete size="20" />
    </span> }
<span className="section-option" onClick={() => { action.setSecNum(index); action.setAddingSectionAt(1000); }}>
    <Options size="20" />
</span>
{ index !== 0 && 
    <span className="section-option" onClick={() => moveUp()}>
        <ArrowUpShort size="20" />
    </span> }
{ index !== state.contents.length-1 && 
    <span className="section-option" onClick={() => moveDown()}>
        <ArrowDownShort size="20" />
    </span> }
</div> 
*/}

export default NewSection
