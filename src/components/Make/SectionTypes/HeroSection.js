import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom' 
import produce from 'immer';
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'
import TitleDesc from './components/TitleDesc'
import ImageCarousel from '../Edit/tools/func/FuncImageCarousel'
import AutosizeInput from 'react-input-autosize';
import ImageOrSlide from './components/ImageOrSlide'
import ReturnButton from './components/ReturnButton'
import AnimationDiv from './components/AnimationDiv'

import './DetailSection.css'
import './Default.css'
import './HeroSection.css'

import Phone from '../../../tools/img/mockup/mobile.png'
import Desktop from '../../../tools/img/mockup/desktop.png'
import ourA from '../../../tools/img/005.png'


function HeroSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [imageShow, setImageShow] = useState(null);

    const CustomCtaButton = () => {return (<div className="cta-button-made" style={{
        borderRadius:`${state.setting.cta.borderRadius}px`,
        backgroundColor:`${state.setting.cta.backgroundColor}`,
        color:`${state.setting.cta.color}`,
        boxShadow:`${state.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
        border:`${state.setting.cta.border ? `1px solid ${state.setting.cta.borderColor}` : 'none'}`
    }}>
        <AutosizeInput className="text-input-flex ti" value={content.button.ctaText} onChange={(e) => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.ctaText = e.currentTarget.value;
        }))} inputStyle={{fontFamily:`${state.setting.smallFont}`, borderRadius:`${state.setting.cta.borderRadius}px`, backgroundColor:`${state.setting.cta.backgroundColor}`,}}/>
    </div>)}

    const CustomGhostButton = () => {return (<div className="cta-button-made" style={{
        marginLeft:`${ content.button.ctaUse ? '5px' : '0px'}`,
        borderRadius:`${state.setting.ghost.borderRadius}px`,
        backgroundColor:`${state.setting.ghost.backgroundColor}`,
        color:`${state.setting.ghost.color}`,
        boxShadow:`${state.setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
        border:`${state.setting.ghost.border ? `1px solid ${state.setting.ghost.borderColor}` : 'none'}`
    }} onClick={() => {}}>
        <AutosizeInput className="text-input-flex ti" value={content.button.ghostText } onChange={(e) => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.ghostText = e.target.value;
        }))} inputStyle={{fontFamily:`${state.setting.smallFont}`, borderRadius:`${state.setting.ghost.borderRadius}px`,  backgroundColor:`${state.setting.ghost.backgroundColor}`}}/>
    </div>)}

    const ImageOrSlide = () => {
        if (content.contents.use) {
            // 동영상 - 유튜브 링크
            if(content.video.youtube) 
                return(
                    <div id="video-area" style={{ width:`${content.image.size}%` }}>
                        <iframe id="video-content" src={`${content.video.link}`} frameborder="0" allow='autoplay' allowfullscreen/>
                    </div>
                )
            // 동영상 - 비디오 업로드
            if(content.video.use)
                return(
                    <video 
                    className="video"
                    src={`${content.video.file}`} 
                    type="video/mp4" 
                    autoPlay
                    muted
                    loop
                    style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}%`}}
                    >
                    </video>
                )
            // 슬라이드
            if(content.image.slide)
                return(
                    <div className="slide-box">
                        <ImageCarousel content={content}/>
                    </div>
                )
            // 이미지
            if(content.image.oneImg)
                return (
                    <img 
                        ref={imgRef} 
                        src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                        className="image" 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{borderRadius:`${content.image.border}px`, width:`${content.image.size}%`, boxShadow: `${content.image.shadowValue}`}}
                        />
                )
            // 목업 - 모바일
            if(content.mobile.use)
                return(
                    <div className="mobile-container">
                        <img className="mobile-ex" src={Phone} alt="목업틀"
                            style={{width: `${content.mobile.size}px`}}
                        />
                        {content.mobile.file === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-mobile" 
                            ref={imgRef} 
                            src={`${content.mobile.file}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{ width:`${content.mobile.size}px`}}
                            />
                        }
                    </div>
                )
            // 목업 - 태블릿
            if(content.tablet.use)
                return(
                    <div className="mobile-container">
                       tablet
                    </div>
                )
            // 목업 - 데스크탑
            if(content.desktop.use)
                return(
                    <div className="desk-container">
                        <img className="mobile-ex" src={Desktop} alt="목업틀"
                            style={{width: `${content.desktop.size}px`}}
                        />
                        {content.desktop.file === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-desk" 
                            ref={imgRef} 
                            src={`${content.desktop.file}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            // style={{ width:`${content.desktop.size}px`}}
                            />
                        }
                    </div>
                )
            // 목업 - 모바일 2개
            if(content.mobile2.use)
            return(
                <>
                <div className="desk-container">
                        <img className="mobile-ex" src={Phone} alt="목업틀"
                            style={{width: `${content.mobile2.size}px`}}
                        />
                        {content.mobile2.file1 === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-mobile" 
                            ref={imgRef} 
                            src={`${content.mobile2.file1}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{ width:`${content.mobile2.size}px`}}
                            />
                        }
                </div>
                <div className="desk-container">
                        <img className="mobile-ex" src={Phone} alt="목업틀"
                            style={{width: `${content.mobile2.size}px`}}
                        />
                        {content.mobile2.file2 === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-mobile" 
                            ref={imgRef} 
                            src={`${content.mobile2.file2}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{ width:`${content.mobile2.size}px`}}
                            />
                        }
                </div>
                </>
            )
            // 목업 - desk + mobile
            if(content.deskMobile.use)
            return(
                <>
                <div className="mobile-container">
                        <img className="mobile-ex" src={Phone} alt="목업틀"
                            style={{width: `${content.deskMobile.size1}px`}}
                        />
                        {content.deskMobile.file1 === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-mobile" 
                            ref={imgRef} 
                            src={`${content.deskMobile.file1}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{ width:`${content.deskMobile.size1}px`}}
                            />
                        }
                </div>
                <div className="desk-container">
                        <img className="mobile-ex" src={Desktop} alt="목업틀"
                            style={{width: `${content.deskMobile.size2}px`}}
                        />
                        {content.deskMobile.file2 === '' ?  
                            <></>
                            : 
                            <img 
                            className="upload-desk" 
                            ref={imgRef} 
                            src={`${content.deskMobile.file2}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            />
                        }
                </div>
                </>
            )
        }
    }

    const returnCtaInputs = () => {
        return(
            <>
                <input className="input-placeholder" />
                {CustomCtaButton()}
            </>
        )
    }

    const returnGhostInputs = () => {
        return(
            <>
                <input className="input-placeholder" />
                {CustomGhostButton()}
            </>
        )
    }

    const returnButton = () => {
        // ctaOption === 'link' => 버튼 클릭 시 링크 이동
        // ctaOption === 'apply' => 신청

        {/* <CustomCtaButton className="action-button" onClick={() => {window.open(`${content.button.ctaLink}`)}}> */}
        return(
            <div style={{width:'100%'}}>
                <div className="button__container" style={{justifyContent:`${content.button.align}`}}>
                    {
                        content.button.ctaUse && 
                            ( content.button.ctaOption === 'link' ? CustomCtaButton() : returnCtaInputs() )
                    }
                    {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                    {
                        content.button.ghostUse && 
                            ( content.button.ghostOption === 'link' ? CustomGhostButton() : returnGhostInputs() )
                    }
                </div>
                <div className="button__container" style={{justifyContent:`${content.button.align}`}}>
                    {
                        content.appButton.google.length > 0 && 
                            <img src={playstorebutton} className="store-button" />
                    }
                    {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                    {
                        content.appButton.apple.length > 0 && 
                            <img src={appstorebutton} className="store-button" />
                    }
                </div>
            </div>
        )
    }

    const returnLayout = {
        flexDirection:`${content.layout === 1 ? 'row' : content.layout === 2 ? 'row-reverse' : content.layout === 3 ? 'column' : 'column-reverse'}`,
        // paddingLeft:`${content.layout === 1 ? '30px' : content.layout === 2 ? '0px' : '30px'}`,
        // paddingRight:`${content.layout === 1 ? '0px' : content.layout === 2 ? '30px' : '30px'}`,
    }

    return (
        <div style={{ width:'100%', height:'100%'}}>
            <AnimationDiv content={content} returnLayout={returnLayout}>
                <div className="text__container" style={{marginTop:`${content.layout === 4 ? '30px' : '0px'}`}}>
                    <TitleDesc content={content} />
                    <ReturnButton content={content} />
                </div>
                <div className="image__container">
                    <ImageOrSlide content={content} />
                </div>
            </AnimationDiv>
        </div>
    )
}

export default HeroSection
