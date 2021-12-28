import React, { useContext, useEffect, useState } from 'react'
import Editor from './Editor'

import { MyContext } from '../MakePage/MakePageV2'
import update from 'react-addons-update';
import './Template.css'
  
function Template1({content,  contents, setContents}) {
    /*
     * only 텍스트
     */
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const {value, setValue} = useState("<p>기본 텍스트</p>")

    // 템플릿 1 텍스트의 경우
    const changeText = ( data ) => {
        let newContents = contents
        newContents[state.secNum].titles.title = data;

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
            <div dangerouslySetInnerHTML={{__html:value}}>
            </div>
            왜 아무것도 안보이지?
            {value}
        </div>
    )
}

export default Template1
