import React, {useRef} from 'react';
import ImageCarousel from './FuncImageCarousel'

import Phone from '../../../../tools/img/phone.png'
import ourA from '../../../../tools/img/005.png'

function ImageOrSlide({content}){
    const imgRef=useRef(null)
    if(content.contents.use){
    // 동영상 - 유튜브 링크
    if(content.video.type==='youtube' && content.contents.type === 'video' && content.video.link.includes('www.youtube.com')) {
        return(
            <div style={{margin: '0 auto'}}>
            <div ref={imgRef} className="video-area" style={{ width:`${content.image.size}%` }}>
                <iframe src={`${content.video.link}`} frameborder="0" allow='autoplay' allowfullscreen/>
            </div>
            </div>
        )}
    else{
        return(
            <> 유튜브 링크를 넣어주세요.
            </>
        )
        }
    }
    // 동영상 - 비디오 업로드
    if(content.video.type==='base' && content.contents.type === 'video')
        return(
            <video 
            className="video"
            src={`${content.video.file}`} 
            type="video/mp4" 
            autoPlay
            muted
            loop
            style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}%`, height:'auto'}}
            >
            </video>
        )
    // 슬라이드
    if(content.image.slide  && content.contents.type === 'slide')
        return(
            <div className="slide-box">
                <ImageCarousel content={content}/>
            </div>
        )
    // 이미지
    if(content.image.oneImg  && content.contents.type === 'image')
        return (
            <img 
                src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                className="image" 
                style={{borderRadius:`${content.image.border}px`, width:`${content.image.size}%`, boxShadow: `${content.image.shadowValue}`}}
                />
        )
    // 목업
    if(content.mockup.use  && content.contents.type === 'mockup')
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
    }


export default ImageOrSlide