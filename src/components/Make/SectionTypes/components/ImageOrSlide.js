import React, {useRef, useState, useContext} from 'react';
import FuncImageCarousel from '../../Edit/tools/func/FuncImageCarousel'
import produce from 'immer';
import { MyContext } from '../../../../pages/Make/MakePageV2'
import Phone from '../../../../tools/img/mockup/mobile.png'
import Desktop from '../../../../tools/img/mockup/desktop.png'
import ourA from '../../../../tools/img/005.png'

function ImageOrSlide({content}){
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef=useRef(null)
    const [imageShow, setImageShow] = useState(null);

    if (content.contents.use) {
        // 동영상 - 유튜브 링크
        if(content.video.type === 'youtube' && content.contents.type === 'video' ) 
            return(
            <div ref={imgRef} className="video-area" style={{ width:`${content.image.size}%`, height:`${imgRef.current && imgRef.current.scrollWidth * 0.56}px` }}>
                <iframe className="video-content" src={`${content.video.link}`} frameborder="0" allow='autoplay' allowfullscreen/>
            </div>
            )
        // 동영상 - 비디오 업로드
        if(content.video.type === 'base' && content.contents.type === 'video' )
            return(
                <div className="image__container">
                <video 
                className="video"
                src={`${content.video.attachment}`} 
                type="video/mp4" 
                autoPlay
                muted
                loop
                style={{width:`${content.image.size}%`}}
                >
                </video>
                </div>
            )
        // 슬라이드
        if( content.contents.type === 'slide' )
            return(
                <div className="centera">
                    <FuncImageCarousel content={content}/>
                </div>
            )
        // 이미지
        if( content.contents.type === 'image' )
            return (
                <div className="image__container">
                <img 
                    ref={imgRef} 
                    src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                    className="image" 
                    onClick={(e) => setImageShow(e.currentTarget)} 
                    style={{
                        borderRadius:`${content.image.border}px`,
                        width:`${state.isPhone ? content.image.size/2.7 + 60 : content.image.size}%`, 
                        boxShadow: `${content.image.shadowValue}`
                    }}
                    />
                </div>
            )
        // 목업 - 모바일
        if(content.mockup.type === 'mobile' && content.contents.type === 'mockup' )
            return(
                <div className="image__container">
                <div className="mobile-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.image.size}%`}}
                    />
                    {content.mobile.attachment === '' ?  
                        <></>
                        : 
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.mobile.attachment}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.image.size}%`}}
                        />
                    }
                </div>
                </div>
            )
        // 목업 - 데스크탑
        if(content.mockup.type === 'desktop' && content.contents.type === 'mockup' )
            return(
                <div className="image__container">
                <div className="desk-container">
                    <img className="mobile-ex" src={Desktop} alt="목업틀"
                        style={{width: `${content.image.size}px`}}
                    />
                    {!content.mockup.attachment === '' &&
                        <img 
                        className="upload-desk" 
                        ref={imgRef} 
                        src={`${content.image.attachment}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        // style={{ width:`${content.desktop.size}px`}}
                        />
                    }
                </div>
                </div>
            )
        // 목업 - 모바일 2개
        if(content.mockup.type === 'mobile2' && content.contents.type === 'mockup' )
        return(
            <div className="image__container">
            <div className="desk-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.image.size}px`}}
                    />
                    {!content.mockup.attachment === '' &&
                        <img 
                            className="upload-mobile" 
                            ref={imgRef} 
                            src={`${content.mockup.attachment1}`} 
                            onClick={(e) => setImageShow(e.currentTarget)} 
                            style={{ width:`${content.image.size}px`}}
                        />
                    }
            </div>
            <div className="desk-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀"
                        style={{width: `${content.image.size}px`}}
                    />
                    {!content.mockup.attachment2 === '' &&
                        <img 
                        className="upload-mobile" 
                        ref={imgRef} 
                        src={`${content.mockup.attachment2}`} 
                        onClick={(e) => setImageShow(e.currentTarget)} 
                        style={{ width:`${content.image.size}px`}}
                        />
                    }
            </div>
            </div>
        )
    }
    else{
        return(<>
        </>)
    }
}

export default ImageOrSlide