import React, { useContext, useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import { MyContext } from '../MakePage/MakePageV2'
import update from 'react-addons-update';
import './Template.css'

function Template1({content,  contents, setContents}) {
    /*
    * only 텍스트
    */
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [value, setValue] = useState("<p>Welcome to CKEditor!</p>");  

    useEffect(() => {
    })

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
            <CKEditor
                className="editor"
                editor={InlineEditor}
                data={content.titles.title}
                config={{
                    language : "ko",
                    width:600,
                }}
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    changeText(data);
                }}
            />
        </div>
    )
}

export default Template1
