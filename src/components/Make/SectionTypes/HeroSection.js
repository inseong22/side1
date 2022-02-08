import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom' 
import produce from 'immer';
import { motion } from 'framer-motion';

import { MyContext } from '../../../pages/Make/MakePageV2'
import TitleDesc from './components/TitleDesc'
import ImageCarousel from '../Edit/tools/func/FuncImageCarousel'

import './DetailSection.css'
import './Default.css'
import './HeroSection.css'

import Phone from '../../../tools/img/phone.png'
import ourA from '../../../tools/img/005.png'


function HeroSection({content,  CustomCtaButton, CustomGhostButton}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [imageShow, setImageShow] = useState(null);
    const [videoShow, setVideoShow] = useState(null);
    const [align, setAlign] = useState('center');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    // 템플릿 2 이미지의 경우에는
    const onChangeImage = e => {
        let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            newContents[state.secNum].image.attachment = result;
        }
        reader.readAsDataURL(oneFile);
        action.setContents(newContents);
    }

    const ImageOrSlide = () => {
        if (content.contents.use) {
            // 동영상 - 유튜브 링크
            if(content.video.youtube) 
                return(
                    <iframe src={`${content.video.link}`} width='500px' height={`${content.image.size}px`} frameborder="0" allow='autoplay'/>
                )
            // 동영상 - 비디오 업로드
            if(content.video.use)
                return(
                    <div>
                        <video 
                        className="video"
                        src={`${content.video.file}`} 
                        type="video/mp4" 
                        autoPlay
                        muted
                        loop
                        style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}px`}}
                        >
                        </video>
                    </div>
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
            // 목업
            if(content.mockup.use)
            return(
                <div className="mobile-container">
                <img className="mobile-ex" src={Phone} alt="목업틀"
                    style={{width: `${content.mockup.size}px`}}
                />
                {content.mockup.file === '' ?  
                    <></>
                    : 
                    <img 
                    className="upload-mobile" 
                    ref={imgRef} 
                    src={`${content.mockup.file}`} 
                    onClick={(e) => setImageShow(e.currentTarget)} 
                    style={{ width:`${content.mockup.size}px`}}
                    />
                }
                </div>
            )
        }
       
    }

    const returnButton = () => {
        return(
            <>            
            <div className="button__container">
                {
                    content.button.ctaUse && 
                        <>         
                        {/* <CustomCtaButton className="action-button" onClick={() => {window.open(`${content.button.ctaLink}`)}}> */}
                        <CustomCtaButton className="action-button">
                            <input className="text-input" value={content.button.ctaText} onChange={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].button.ctaText = e.currentTarget.value;
                            }))}/>
                        </CustomCtaButton>
                        </>
                }
                {
                    content.button.ghostUse && 
                        <>         
                        // onClick={() => {window.open(`${content.button.ghostLink}`)}}
                        <CustomGhostButton className="action-button" style={{marginLeft:'10px'}}>
                            고스트버튼
                        </CustomGhostButton>
                        </>
                }
            </div>
            </>
        )
    }

    const animationDiv = () => {
        if(!content.animation.use)
        return(
        <>
            <div
                style={{display:'flex', flexDirection: 'row'}} 
                // style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}
                >
                <div className="text__container" style={{paddingLeft:'30px'}}>
                    <TitleDesc content={content} />
                    {returnButton()}
                </div>
                <div className="image__container">
                    {ImageOrSlide()}
                </div>
            </div>
        </>
        )
        else 
        return(
            <>
            <motion.div
                style={{display:'flex', flexDirection: 'row'}} 
                data-aos={content.animation.type} aos-duration="2000" >
                <div className="text__container" style={{paddingLeft:'30px'}}>
                    <TitleDesc content={content} />
                    {returnButton()}
                </div>
                <div className="image__container">
                    {ImageOrSlide()}
                </div>
            </motion.div>
            </>
        )
    }
    
    return (
        <div style={{ width:'100%', height:'100%'}}>
            {animationDiv()}
        </div>
    )
}

export default HeroSection
