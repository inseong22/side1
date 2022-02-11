import React from 'react';
import ImageCarousel from '../../Edit/tools/func/FuncImageCarousel'

import Phone from '../../../../tools/img/phone.png'
import ourA from '../../../../tools/img/005.png'

function ImageOrSlide({content}){
    if(content.contents.use){
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
                src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                className="image" 
                style={{borderRadius:`${content.image.border}px`, width:`${content.image.size}%`, boxShadow: `${content.image.shadowValue}`}}
                />
        )
    // 목업
    if(content.mockup.use)
        return(
            <div className="mobile-container">
                {/* <img className="mobile-ex" src={Phone} alt="목업틀"
                    style={{width: `${content.image.size}%`}}
                />
                {content.mockup.file === '' ?  
                    <></>
                    : 
                    <img 
                        className="upload-mobile" 
                        src={`${content.mockup.file}`} 
                        style={{ width:`${content.image.size}px`}}
                    />
                } */}
            </div>
        )
    }else{
        return(<></>)
    }
}

export default ImageOrSlide