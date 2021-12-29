import React, { useContext, useEffect, useState } from 'react'
import Editor from '../tools/Editor'

import { MyContext } from '../../../pages/Make/MakePageV2'
import update from 'react-addons-update';
import './Template.css'
  
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
        </div>
    )
}

export default Template1