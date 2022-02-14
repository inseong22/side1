import React, {useState,useContext} from 'react'
import DetailSection from './DetailSection'
import HeroSection from './HeroSection'
import ReviewSection from './ReviewSection'
import FeaturesSection from './FeaturesSection'
import CtaSection from './CtaSection'
import QnaSection from './QnaSection'
import GallerySection from './GallerySection'
import TextSection from './TextSection'
import MockupSection from './MockupSection'
import VideoSection from './VideoSection'

function UserSection({content, setting, CustomCta, CustomGhost}) {

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
                style={{backgroundImage:`${ content.backgroundType === 'image' ? `url(${content.backgroundImage.attachment})` : ''}`, backgroundSize:'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} >
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
                    <div className="section__box" style={{padding:`0px calc(11vw)`}}>
                        <div style={{backgroundColor:`${content.box.backgroundColor}`, borderRadius:`${content.box.borderRadius}px`, width:'100%', height:'100%'}}>
                        </div>
                    </div>
                }
                <div className="section__container-inner"
                    style={{padding:`${content.padding.top}vh calc(14vw + 30px) ${content.padding.bottom}vh calc(14vw + 30px)`}} >
                    {/* 실제 섹션이 보여지는건 여기밖에 없음,, */}
                    {returnType()}
                </div>
            </div>
        </div>
    )
}

export default UserSection
