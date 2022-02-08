import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'
import TitleDesc from './TitleDesc/TitleDesc'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

import Popover from '@mui/material/Popover';
import {ImageAdd} from '@styled-icons/boxicons-regular';

import { motion } from 'framer-motion';

function DetailSection({content}) {
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
            <div className="image__container">
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
                    <img ref={imgRef} src={playstorebutton} className="image" onClick={(e) =>{ setImageShow(e.currentTarget)}} />
                    : 
                    <img ref={imgRef} src={`${content.image.attachment}`} className="image" onClick={(e) => setImageShow(e.currentTarget)} />
                }
            </div>
        )
    }

    const returnButton = () => {
        return(
            <>
                <div className="button__container">
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
                </div>
            </>
        )
    }

    const returnTextAndButton = () => {
        return(
            <div className="text__container">
                <TitleDesc content={content} />
                {returnButton()}
            </div>
        )
    }

    return (
        <>
            <motion.div className="template" style={{flexDirection: `${state.isPhone ? 'column' : 'row'}`}} 
            data-aos={content.animation.type} aos-duration="2000" >
                {returnTextAndButton()}
                {returnImage()}
            </motion.div>
        </>
    )
}

export default DetailSection