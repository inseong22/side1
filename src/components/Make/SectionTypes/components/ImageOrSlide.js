import React, {useRef, useState, useContext} from 'react';
import FuncImageCarousel from './FuncImageCarousel'
import produce from 'immer';
import { MyContext } from '../../../../pages/Make/MakePageV2'
import Phone from '../../../../tools/img/mockup/mobile.png'
import Desktop from '../../../../tools/img/mockup/desktop.png'
import ourA from '../../../../tools/img/005.png'
import './ImageOrSlide.css'

function ImageOrSlide({content}){
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef=useRef(null)
    const [imageShow, setImageShow] = useState(null);

    const imageWidth = (desktop) => {
        if(desktop){
            return state.isPhone ? (content.image.size/2.7 + 50)/1.22 : content.image.size/1.22
        }else{
            return state.isPhone ? content.image.size/2.7 + 50 : content.image.size
        }
    }

    const imageLeft = (desktop) => {
        if(desktop){
            return state.isPhone ? 50 - ((content.image.size/2.7 + 50)/1.22)/2 : 50 - (content.image.size/1.22)/2
        }else{
            return state.isPhone ? 50 - (content.image.size/2.7 + 50)/2 : 50 - content.image.size/2
        }
    }

    const returnContent = () => {
        if (content.contents.use) {
            // 동영상 - 유튜브 링크
            if(content.video.type === 'youtube' && content.contents.type === 'video' ) 
                return(
                    <iframe ref={imgRef} className="video-content" src={`${content.video.link}`} frameborder="0" allow='autoplay' allowfullscreen style={{ width:`${imageWidth()}%`, height:`${imgRef.current && imgRef.current.scrollWidth * 0.56}px` }}/>
                )
            // 동영상 - 비디오 업로드
            if(content.video.type === 'base' && content.contents.type === 'video' )
                return(
                    <video 
                    className="video"
                    src={`${content.video.attachment}`} 
                    type="video/mp4" 
                    autoPlay
                    muted
                    loop
                    style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}%`}}
                    >
                    </video>
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
                    // <div style={{width:'100%'}}>
                    <img 
                        src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                        className="image" 
                        style={{
                            borderRadius:`${content.image.border}px`,
                            width:`${imageWidth()}%`, 
                            boxShadow: `${content.image.shadowValue}`
                        }}
                        />
                    // </div>
                )
            // 목업 - 모바일
            if(content.mockup.type === 'mobile' && content.contents.type === 'mockup' )
                return( 
                <div className="mock-container">
                    <img className="mobile-ex" src={Phone} alt="목업틀" style={{ width:`${imageWidth()}%` }} />
                    { content.mockup.attachment === '' ?
                    <></>:
                    <img className="upload-mobile" src={content.mockup.attachment} style={{ 
                        width:`${imageWidth()}%`, 
                        left:`${imageLeft()}%`}} />
                    }
                </div>)
            // 목업 - 데스크탑
            if(content.mockup.type === 'desktop' && content.contents.type === 'mockup' )
                return(
                    <div className="mock-container">
                        <img className="mobile-ex" src={Desktop} alt="목업틀" style={{width: `${imageWidth()}%`}} />
                        { content.mockup.attachment === '' ? 
                        <></> :
                        <img  className="upload-desk" src={`${content.mockup.attachment}`} style={{ 
                            width:`${imageWidth(true)}%`, 
                            left:`${imageLeft(true)}%`}} />
                        }
                    </div>
                )
        }
        else{
            return(<>
            </>)
        }
    }

    return(
        <div className="centera" style={{marginTop:`${!state.isPhone && content.layout === 3 ? '20px' : state.isPhone && content.mobile.layout === 3 ? '10px' : '0px'}`}}>
            {returnContent()}
        </div>
    )
}

export default ImageOrSlide