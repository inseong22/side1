import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'
import './HeroSection.css'

import Popover from '@mui/material/Popover';
import {ImageAdd} from '@styled-icons/boxicons-regular';

function HeroSection({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [imageShow, setImageShow] = useState(null);
    const [align, setAlign] = useState('center');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // 템플릿 1 텍스트의 경우
    const changeText = ( data ) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, titles: {...item.titles, title : data}} : item)
        action.setContents(newContents);
    }
    
    // 템플릿 1 텍스트의 경우
    const changeDesc = ( data ) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, desc : data } : item)
        action.setContents(newContents);
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

    const returnImage = () => {
        return(
            <div className="image__container centera">
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
            {/* <Popover
                id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}>
                <div className="pop-balloon" style={{width:'100px'}}>
                    <span className="balloon-item" onClick={() => setAlign('left')}>
                        왼
                    </span>
                    <span className="balloon-item" onClick={() => setAlign('center')}>
                        중
                    </span>
                    <span className="balloon-item" onClick={() => setAlign('right')}>
                        오
                    </span>
                </div>
            </Popover> 
             onClick={e => setAnchorEl(e.currentTarget)}
             */}
            
            <div className="button__container" style={{border:`${ anchorEl !== null ? '1px dashed rgba(0,0,0,0.4)' : '' }`}}>
                {
                    content.button.first && 
                    <div>                 
                        {content.button.link.includes("play.google.com/store") ? <img src={playstorebutton} />
                        : 
                        content.button.link.includes("apps.apple.com/") ? <img src={appstorebutton} />
                        : 
                        <button className="action-button" style={{backgroundColor:`${content.button.backgroundColor}`}}>
                            {/* <Editor 
                                style={{width:'100px'}}
                                data={content.button.title}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    changeButtonText(data);
                                }}
                            /> */}
                            버튼aaa
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
                <Editor 
                    data={content.title}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        changeText(data);
                    }}
                />
                <Editor 
                    data={content.desc}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        changeDesc(data);
                    }}
                />
                {returnButton()}
            </div>
        )
    }

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnTextAndButton()}
                        {returnImage()}
                    </div>
                )

            case 2:
                return(
                    <div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}}>
                        {returnImage()}
                        {returnTextAndButton()}
                    </div>
                )
            
            case 3:
                return(
                    <div className="template" style={{flexDirection:'column'}}>
                        {returnTextAndButton()}
                        {returnImage()}
                    </div>
                )

            default:
                return(
                    <div className="template">
                    </div>
                )
        }
    }

    return (
        <div style={{padding:`${content.paddingTop}% 0% ${content.paddingBottom}% 0%`}}>
            {returnSectionTemplate()}
        </div>
    )
}


export default HeroSection
