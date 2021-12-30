import React, { useContext, useEffect, useState } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import update from 'react-addons-update';
import './Template.css'

import appstorebutton from '../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../tools/img/playstorebutton.png'

function Template1({content,  contents, setContents}) {
    /*
     * only 텍스트
     */
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    // 템플릿 1 텍스트의 경우
    const changeText = ( data ) => {
        let newContents = contents.map((item, index) => index === state.secNum ? {...item, titles: {...item.titles, title : data}} : item)
        setContents(newContents);
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
                <button>{ content.button.title }</button>
            )
        }
    }

    return (
        <div className="template">
            {/* <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
            </pre> */}
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

export default Template1