import React, {useState,useContext} from 'react'
import DetailSection from './SectionTypes/DetailSection'
import HeroSection from './SectionTypes/HeroSection'
import ReviewSection from './SectionTypes/ReviewSection'
import FeaturesSection from './SectionTypes/FeaturesSection'
import CtaSection from './SectionTypes/CtaSection'
import ApplySection from './SectionTypes/ApplySection'
import AppDownloadSection from './SectionTypes/AppDownloadSection'
import QnaSection from './SectionTypes/QnaSection'
import GallerySection from './SectionTypes/GallerySection'
import TextSection from './SectionTypes/TextSection'
import MockupSection from './SectionTypes/MockupSection'
import VideoSection from './SectionTypes/VideoSection'

import {animations} from './tools/animations'
import './NewSection.css'
import { MyContext } from '../../pages/Make/MakePageV2'
import { motion } from 'framer-motion'
import {Delete, Options} from '@styled-icons/fluentui-system-filled'

function NewSection({content, index, contents, setContents}) {
    const [isHover, setIsHover] = useState('none');
    const {state, action} = useContext(MyContext)

    const setThisSection = () => {
        action.setSecNum(index);
        action.setCategory(0);
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

            case 'CtaSection':
                return (
                    <CtaSection content={content}/>
                )

            case 'ApplySection' :
                return(
                    <ApplySection content={content} />
                )

            case 'AppDownloadSection' :
                return(
                    <AppDownloadSection content={content} />
                )

            case 'QnaSection' :
                return(
                    <QnaSection content={content} />
                )

            case 'GallerySection' :
                return(
                    <GallerySection content={content} />
                )

            case 'TextSection' :
                return(
                    <TextSection content={content} />
                )

            case 'MockupSection' :
                return(
                    <MockupSection content={content} />
                )

            case 'VideoSection' :
                return(
                    <VideoSection content={content} />
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

            </div>
            <div className="section__container" 
                // style={{backgroundImage:`url(${content.backgroundImage.attachment})`}} 
                onClick={() => setThisSection()}>
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                <div style={{backgroundColor:`${content.backgroundColor}`, opacity:`${content.backgroundOpacity}`, width:'100%', height:'100%', zIndex:2, position:'absolute'}}>
                </div>
                <div className="section__container-inner">
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
