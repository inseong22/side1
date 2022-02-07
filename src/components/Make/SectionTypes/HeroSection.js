import React, { useContext, useState, useRef } from 'react'
import Editor from '../tools/Editor'
import produce from 'immer';
import { Link } from 'react-router-dom' 

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'

import playstorebutton from '../../../tools/img/playstorebutton.png'
import './HeroSection.css'
import ImageCarousel from '../Edit/tools/func/FuncImageCarousel'

import { motion } from 'framer-motion';

function HeroSection({content,  CustomCtaButton, CustomGhostButton}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [imageShow, setImageShow] = useState(null);
    const [videoShow, setVideoShow] = useState(null);
    const [align, setAlign] = useState('center');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // 제목
    const changeText = ( data ) => {
        action.setContents(produce(state.contents, draft => {
        draft[state.secNum].title.text= data}))
    }
    
    // 본문
    const changeDesc = ( data ) => {
        action.setContents(produce(state.contents, draft => {
        draft[state.secNum].desc.text= data}))
    }

    // 템플릿 1 텍스트의 경우
    const changeButtonText = ( data ) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, button: {...item.button, title : data}} : item)
        action.setContents(newContents);
    }

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
        if (content.contentsUse) {
            if(content.video.youtube && !content.video.use && !content.image.slide && !content.image.oneImg && !content.mockup.use) 
                return(
                    <iframe src={`${content.video.link}`} width='500px' height={`${content.image.size}px`} frameborder="0" allow='autoplay'/>
                )
            if(!content.video.youtube && content.video.use && !content.image.slide && !content.image.oneImg && !content.mockup.use)
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
            if(!content.video.youtube && !content.video.use && content.image.slide && !content.image.oneImg && !content.mockup.use)
                return(
                    <div className="slide-box">
                        <ImageCarousel content={content}/>
                    </div>
                )
            if(!content.video.youtube && !content.video.use && !content.image.slide && content.image.oneImg && !content.mockup.use)
                return (
                    <div >
                        {content.image.attachment === '' ?  
                            <img ref={imgRef} src={playstorebutton} className="image" onClick={(e) =>{ setImageShow(e.currentTarget)}} style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}px`}} />
                            : 
                            <img 
                            ref={imgRef} 
                            src={`${content.image.attachment}`} 
                            className="image" 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}px`, boxShadow: `${content.image.shadowValue}`}}
                            />
                        }
                    </div>
                )
            if(!content.video.youtube && !content.video.use && !content.image.slide && !content.image.oneImg && content.mockup.use)
            return(
                <>
                목업
                </>
            )
        }
       
    }

    const returnButton = () => {
        return(
            <>            
            <div className="button__container" style={{border:`${ anchorEl !== null ? '1px dashed rgba(0,0,0,0.4)' : '' }`}}>
                {
                    content.button.ctaUse && 
                        <>         
                        <CustomCtaButton className="action-button" onClick={() => {window.open(`${content.button.ctaLink}`)}}>
                            버튼
                        </CustomCtaButton>
                        </>
                }
                {
                    content.button.ghostUse && 
                        <>         
                        <button className="action-button" style={{backgroundColor:`${content.button.backgroundColor}`, margin:`${content.button.align}`}}
                            onClick={() => {window.open(`${content.button.ghostLink}`)}}
                        >
                            고스트버튼
                        </button>
                        </>
                }
            </div>
            </>
        )
    }

    const returnTextAndButton = () => {
        return(
            <div className="text__container">
                <input 
                    className="text-input"
                    placeholder='제목을 입력하세요'
                    onChange={(e) => {
                        changeText(e.currentTarget.value);
                    }}
                    value={content.title.text}
                    style={{
                        textAlign: `${content.title.align}`,
                        fontSize: `${content.title.size}px`,
                        color: `${content.title.color}`
                    }}
                />
                <input 
                    className="text-input"
                    placeholder='본문을 입력하세요'
                    onChange={(e) => {
                        changeDesc(e.currentTarget.value);
                    }}
                    value={content.desc.text}
                    style={{
                        textAlign: `${content.desc.align}`,
                        fontSize: `${content.desc.size}px`,
                        color: `${content.desc.color}`
                    }}
                />
                {returnButton()}
            </div>
        )
    }

    const animationDiv = () => {
        if(!content.animation.use)
        return(
            <>
            <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                {returnTextAndButton()}
                {ImageOrSlide()}
            </div>
        </>
        )
        else 
        return(
            <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}} 
            data-aos={content.animation.type} aos-duration="2000" >
                {returnTextAndButton()}
                {ImageOrSlide()}
            </motion.div>
            </>
        )
    }
    
    return (
        <div style={{padding:`${content.paddingTop}% 0% ${content.paddingBottom}% 0%`}}>
            <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                {animationDiv()}
            </div>
        </div>
    )
}


export default HeroSection
