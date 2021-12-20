import React, {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function NewSectionMake(props) {

    const changeText = (event, editor, data) => {
        console.log(props.content.slice(0,props.content.sectionNumber), "하하체크용")
        props.setContent([
            ...props.content.slice(0,props.item.sectionNumber),
            {
                ...props.item,
                titles:{
                    title:`${data}`,
                    ...props.content[props.item.sectionNumber-1]
                }
            },
            ...props.content.slice(props.item.sectionNumber, props.content.length - 1),
        ])
    }

    return (
        <div>
            이이이에제
            이건 {props.secNum}입니다.
            <br/>
            <input type="text" value={props.item.titles.title}/>
            <CKEditor
                editor={ ClassicEditor }
                data={props.item.titles.title}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    changeText(event, editor, data);
                } }
                onBlur={ ( event, editor ) => {
                } }
                onFocus={ ( event, editor ) => {
                } }
            />
            <br/>
            {props.item.descs.desc}
        </div>
    )
}

export default NewSectionMake
