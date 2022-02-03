import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'
import produce from 'immer';

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'
import './HeroSection.css'

import Popover from '@mui/material/Popover';
import {ImageAdd} from '@styled-icons/boxicons-regular';
import ImageCarousel from '../Edit/tools/ImageCarousel'

import { motion } from 'framer-motion';

function HeroSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [imageShow, setImageShow] = useState(null);
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
        if(content.image.slide)
        return(
            <div className="slide-box">
            <ImageCarousel content={content}/>
            </div>
        )
        else 
        return (
            <div >
            <Popover
                id={Boolean(imageShow) ? 'simple-popover' : undefined} // 수정
                open={Boolean(imageShow)} // 수정
                anchorEl={imageShow} // 수정
                onClose={() => setImageShow(null)} // 수정
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}>
                <div className="pop-balloon" style={{width:'100px'}}>
                    <span className="balloon-item">
                        <ImageAdd color="black" width={30} />
                        { imgRef.current && 
                            <input className="image-input" type="file" accept="image/*" id="file"
                                onChange={ e => onChangeImage(e) } style={{width:'20px', height:'20px'}}/> }
                    </span>
                    <span className="balloon-item" onClick={() => {}}>
                        동영상
                    </span>
                </div>
            </Popover>
            {content.image.attachment === '' ?  
                <img ref={imgRef} src={playstorebutton} className="image" onClick={(e) =>{ setImageShow(e.currentTarget)}} style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}px`}} />
                : 
                <img ref={imgRef} src={`${content.image.attachment}`} className="image" onClick={(e) => setImageShow(e.currentTarget)} style={{borderRadius:`${content.image.border}%`, width:`${content.image.size}px`}}/>
            }
            </div>
    )
    }

    const returnButton = () => {
        return(
            <>            
            <div className="button__container" style={{border:`${ anchorEl !== null ? '1px dashed rgba(0,0,0,0.4)' : '' }`}}>
                {
                    content.button.first && 
                    <div>                 
                        {content.button.link.includes("play.google.com/store") ? <img src={playstorebutton} />
                        : 
                        content.button.link.includes("apps.apple.com/") ? <img src={appstorebutton} />
                        : 
                        <button className="action-button" style={{backgroundColor:`${content.button.backgroundColor}`}}>
                            버튼
                        </button>
                        }
                    </div>
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
