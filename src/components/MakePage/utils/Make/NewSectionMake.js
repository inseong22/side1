import React, {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import update from 'react-addons-update';

function NewSectionMake(props) {
    const [nowtext, setNowtext] = useState("하위")

    const changeText = (event, editor, data) => {
        setNowtext(data);
        props.setContent(update(props.content, 
                {
                    [props.secNum-1]:{
                        titles : {$set:{
                            title : data,
                        }}
                    }
                }
            ))
        console.log(props.item.titles.title);
    }
    return (
        <div>
            이이이에제
            이건 {props.item.titles.title}입니다.
            <br/>
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
            <pre dangerouslySetInnerHTML={{__html: props.item.titles.title}} style={{fontSize:'2em', color:'red', font:'Pretendard-Regular', width:'100%', textAlign:'left'}}>
            </pre>
        </div>
    )
}

export default NewSectionMake
