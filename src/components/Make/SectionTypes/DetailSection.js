import React, { useContext, useEffect, useState, useRef } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import './DetailSection.css'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

function DetailSection({content,  contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const imgRef = useRef(null)
    const [buttonShow, setButtonShow] = useState(false);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [align, setAlign] = useState('center');

    // 템플릿 1 텍스트의 경우
    const changeText = ( data ) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, titles: {...item.titles, title : data}} : item)
        action.setContents(newContents);
    }

    const buttonReturn = () => {
        if(content.button.link.includes("play.google.com/store")){
            return(
                <img src={playstorebutton} />
            )
        }else if(content.button.link.includes("apps.apple.com/")){
            return(
                <img src={appstorebutton} />
            )
        }else{
            return(
                <button onClick={(e) => {
                    console.log(e)
                    setLeft(e.target.offsetLeft);
                    setTop(e.target.offsetHeight);
                    setButtonShow(!buttonShow);
                }}>{ content.button.title }</button>
            )
        }
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

    const returnSectionTemplate = () => {
        switch(content.templateNumber){
            case 1:
                return(
                    <div className="template">
                        <div className="text__container">
                            <Editor 
                                data={content.titles.title}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    changeText(data);
                                }}
                                />
                            <div className="button__container" style={{justifyContent: `${align}`}}>
                                <div style={{display: buttonShow ? 'block' : 'none', left:`${left}px`, top:`-${top + 10}px`}} className="balloon">
                                    <span onClick={() => setAlign('start')}>
                                        왼
                                    </span>
                                    <span onClick={() => setAlign('center')}>
                                        중
                                    </span>
                                    <span onClick={() => setAlign('end')}>
                                        오
                                    </span>
                                </div>
                                <div>                            
                                    {buttonReturn()}
                                </div>
                            </div>
                        </div>
                        <div className="image__container">
                            {content.image.attachment === '' ?  
                                <img ref={imgRef} src={playstorebutton} className="image" />
                                : 
                                <img ref={imgRef} src={`${content.image.attachment}`} className="image" />
                            }
                            { imgRef.current && 
                            <input className="image-input" type="file" accept="image/*" id="file"
                                onChange={ e => onChangeImage(e) } style={{width:`${imgRef.current.clientWidth-10}px`, height:`${imgRef.current.clientHeight-10}px`, left:`calc(50% - ${imgRef.current.clientWidth/2}px)`, top:`calc(50% - ${imgRef.current.clientHeight/2}px)`}} /> }
                        </div>
                    </div>
                )

            case 2:
                return(
                    <div className="template">
                        <div className="image__container">
                            {content.image.attachment === '' ?  
                                <img ref={imgRef} src={playstorebutton} className="image" />
                                : 
                                <img ref={imgRef} src={`${content.image.attachment}`} className="image" />
                            }
                            { imgRef.current && 
                            <input className="image-input" type="file" accept="image/*" id="file"
                                onChange={ e => onChangeImage(e) } style={{width:`${imgRef.current.clientWidth-10}px`, height:`${imgRef.current.clientHeight-10}px`, left:`calc(50% - ${imgRef.current.clientWidth/2}px)`, top:`calc(50% - ${imgRef.current.clientHeight/2}px)`}} /> }
                        </div>
                        <div className="text__container">
                            <Editor 
                                data={content.titles.title}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    changeText(data);
                                }}
                                />
                            {buttonReturn()}
                        </div>
                    </div>
                )
            
            case 3:
                return(
                    <div className="template">
                        <Editor 
                            data={content.titles.title}
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                changeText(data);
                            }}
                            />
                        <div className="title-container">
                            <div dangerouslySetInnerHTML={{__html: content.titles.title}} style={{displat:'flex', backgroundColor:'red', width:'100%', alignItems: 'left', justifyContent:'start'}}>
                            </div>
                        </div>
                        {buttonReturn()}
                    </div>
                )

            default:
                return(
                    <div className="template">
                        <div className="title-container">
                            <div dangerouslySetInnerHTML={{__html: content.titles.title}} style={{displat:'flex', backgroundColor:'red', width:'100%', alignItems: 'left', justifyContent:'start'}}>
                            </div>
                        </div>
                        <Editor 
                            data={content.titles.title}
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                changeText(data);
                            }}
                            />
                        {buttonReturn()}
                    </div>
                )
        }
    }

    return (
        <>
            {returnSectionTemplate()}
        </>
    )
}

export default DetailSection