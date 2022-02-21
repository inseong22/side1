import React from 'react'
import DetailSection from './Sections/DetailSection'
import HeroSection from './Sections/HeroSection'
import ReviewSection from './Sections/ReviewSection'
import FeaturesSection from './Sections/FeaturesSection'
import CtaSection from './Sections/CtaSection'
import QnaSection from './Sections/QnaSection'
import GallerySection from './Sections/GallerySection'
import TextSection from './Sections/TextSection'
import MockupSection from './Sections/MockupSection'
import VideoSection from './Sections/VideoSection'
import { isMobile } from 'react-device-detect'

function UserSection({content, setting}) {

    const returnType = () => {
        switch(content.sectionTypeName){
            case 'DetailSection':
                return (
                    <DetailSection content={content} setting={setting}/>
                )

            case 'HeroSection':
                return (
                    <HeroSection content={content} setting={setting}/>
                )

            case 'ReviewSection':
                return (
                    <ReviewSection content={content} setting={setting}/>
                )

            case 'FeaturesSection':
                return (
                    <FeaturesSection content={content} setting={setting}/>
                )

            case 'CtaSection':
                return (
                    <CtaSection content={content} type="cta" setting={setting}/>
                )

            case 'ApplySection' :
                return(
                    <CtaSection content={content} type="apply" setting={setting}/>
                )

            case 'AppDownloadSection' :
                return(
                    <CtaSection content={content} type="appDownload" setting={setting}/>
                )

            case 'QnaSection' :
                return(
                    <QnaSection content={content} setting={setting}/>
                )

            case 'GallerySection' :
                return(
                    <GallerySection content={content} setting={setting}/>
                )

            case 'TextSection' :
                return(
                    <TextSection content={content} setting={setting}/>
                )

            case 'MockupSection' :
                return(
                    <MockupSection content={content} setting={setting}/>
                )

            case 'VideoSection' :
                return(
                    <VideoSection content={content} setting={setting}/>
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
        <div className="new-section">
        <div className="section__container" 
            style={{backgroundImage:`${ content.backgroundType === 'image' ? `url(${content.backgroundImage.attachment})` : ''}`, backgroundSize:'cover', backgroundRepeat: 'no-repeat'}} >
            {
                content.backgroundType === 'color' ?
                <div style={{backgroundColor:`${content.backgroundColor}`, width:'100%', height:'100%', zIndex:2, position:'absolute'}}>
                </div>
                :
                (content.backgroundImage.overlay && content.backgroundType === 'image') &&
                <div style={{backgroundColor:`${content.backgroundColor}`, width:'100%', height:'100%', zIndex:2, position:'absolute'}}>
                </div>
            }
            {
                content.box.use && 
                <div className="section__box" style={{padding:`0px 11vw`}}>
                    <div style={{backgroundColor:`${content.box.backgroundColor}`, borderRadius:`${content.box.borderRadius}px`, width:'100%', height:'100%'}}>
                    </div>
                </div>
            }
            <div className="section__container-inner"
                style={{padding:`${
                    isMobile ? content.padding.top/2.5 : content.padding.top}vh 
                    ${isMobile? '15px' : 'calc(14vw + 30px)'}
                    ${isMobile ? content.padding.top/2.5 : content.padding.bottom}vh 
                    ${isMobile ? '15px' : 'calc(14vw + 30px)'}`}} >
                {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                {returnType()}
            </div>
        </div>
        </div>
    )
}

export default UserSection
