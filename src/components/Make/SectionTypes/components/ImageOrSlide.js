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
    const photoInput = useRef();
    const inputClick = () => {
        photoInput.current.click();
    };

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

    // 화면에서 이미지 업로드
    const upload_img = (e) => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            if(oneFile.size > 3000000){
                alert("파일의 크기가 3MB를 초과합니다.")
                return;
            }
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].image.attachment = result;            
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }

    // 화면에서 목업 업로드
    const upload_mockup = (e) => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            if(oneFile.size > 3000000){
                alert("파일의 크기가 3MB를 초과합니다.")
                return;
            }
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mockup.attachment = result;           
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
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
                    <div id="attach" onChange = {e => upload_img(e)} onClick={() => {
                        inputClick();
                        action.setCategory(0);
                        action.setFocus('contents');
                    }} className="centera" style={{width:`${imageWidth()}%`}}>
                         <input
                            ref={photoInput}
                            style={{
                                display: 'none', 
                                cursor: 'pointer', 
                                objectFit:'cover',
                            }}
                            type="file"
                            accept="image/*"
                            id="file"
                            onChange = {e => upload_img(e)} />
                        <img 
                            src={`${content.image.attachment === '' ? ourA : content.image.attachment}`} 
                            className="image border-hover" 
                            style={{
                                borderRadius:`${content.image.border}px`,
                                width:`100%`, 
                                boxShadow: `${content.image.shadowValue}`
                            }} />
                    </div>
                )
            // 목업 - 모바일
            if(content.mockup.type === 'mobile' && content.contents.type === 'mockup' )
                return( 
                <div className="mock-container" id="attach" onChange = {e => upload_mockup(e)} onClick={inputClick}>
                    <input
                        ref={photoInput}
                        style={{display: 'none', cursor: 'pointer', objectFit:'cover'}}
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange = {e => upload_mockup(e)}
                    />
                   <img className="mobile-ex  border-hover" src={Phone} alt="목업틀" style={{ width:`${imageWidth()}%` }} />
                    { content.mockup.attachment === '' ?
                    <></>:
                    <img className="upload-mobile  border-hover" src={content.mockup.attachment} style={{ 
                        width:`${imageWidth()-2}%`, 
                        left:`${imageLeft()+1}%`}} />
                    }         
               </div>)
            // 목업 - 데스크탑
            if(content.mockup.type === 'desktop' && content.contents.type === 'mockup' )
                return(
                    <div className="mock-container" id="attach" onChange = {e => upload_mockup(e)} onClick={inputClick}>
                        <input
                        ref={photoInput}
                        style={{display: 'none', cursor: 'pointer', objectFit:'cover'}}
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange = {e => upload_mockup(e)}
                    />
                        <img className="mobile-ex border-hover" src={Desktop} alt="목업틀" style={{width: `${imageWidth()}%`}} />
                        { content.mockup.attachment === '' ? 
                        <></> :
                        <img  className="upload-desk border-hover" src={`${content.mockup.attachment}`} style={{ 
                            width:`${imageWidth(true)}%`, 
                            left:`${imageLeft(true)}%`}} />
                        }
                    </div>
                )
            // 목업 - 모바일 2개
        if(content.mockup.type === 'mobile2' && content.contents.type === 'mockup')
            return( 
                <>
                <div className="mock-container" id="attach" onChange = {e => upload_mockup(e)} onClick={inputClick}>
                    <input
                        ref={photoInput}
                        style={{display: 'none', cursor: 'pointer', objectFit:'cover'}}
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange = {e => upload_mockup(e)}
                    />
                <img className="mobile-ex  border-hover" src={Phone} alt="목업틀" style={{ width:`${imageWidth()}%` }} />
                    { content.mockup.attachment === '' ?
                    <></>:
                    <img className="upload-mobile  border-hover" src={content.mockup.attachment} style={{ 
                        width:`${imageWidth()}%`, 
                        left:`${imageLeft()}%`}} />
                    }         
            </div>
            <div className="mock-container" id="attach" onChange = {e => upload_mockup(e)} onClick={inputClick}>
                    <input
                        ref={photoInput}
                        style={{display: 'none', cursor: 'pointer', objectFit:'cover'}}
                        type="file"
                        accept="image/*"
                        id="file"
                        onChange = {e => upload_mockup(e)}
                    />
                <img className="mobile-ex  border-hover" src={Phone} alt="목업틀" style={{ width:`${imageWidth()}%` }} />
                    { content.mockup.attachment2 === '' ?
                    <></>:
                    <img className="upload-mobile  border-hover" src={content.mockup.attachment2} style={{ 
                        width:`${imageWidth()}%`, 
                        left:`${imageLeft()}%`}} />
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

    return(
        <div className="centera" style={{marginTop:`${!state.isPhone && content.layout === 3 ? '20px' : state.isPhone && content.mobile.layout === 3 ? '10px' : '0px'}`}}
            onClick={() => {action.setFocus('contents'); action.setCategory(0)}}
        >
            {returnContent()}
        </div>
    )
}

export default ImageOrSlide