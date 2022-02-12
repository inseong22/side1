import React, {useRef, useState, useContext} from 'react';
import ImageCarousel from '../../Edit/tools/func/FuncImageCarousel'
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
        if(content.video.youtube) 
            return(
                <div>
                    <iframe style={{ zIndex: 1, width:`${content.image.size}%`, height:`${content.image.size}%` }} id="video-content" src={`${content.video.link}`} frameborder="0" allow='autoplay' allowfullscreen/>
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
    else{
        return(<>
        </>)
    }
}

export default ImageOrSlide