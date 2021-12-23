import React, {useState, useEffect, useContext} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import update from 'react-addons-update';
import { MyContext } from '../../MakePageV2'
import './NewSectionMake.css'

function NewSectionMake(props) {
    const [nowtext, setNowtext] = useState("하위")
    const {state, action} = useContext(MyContext)

    const changeText = (event, editor, data) => {
        setNowtext(data);
        props.setContents(update(props.contents, 
                {
                    [props.secNum]:{
                        titles : {$set:{
                            title : data,
                        }}
                    }
                }
            ))
    }

    const addSectionByTemplate = tnum => {
        props.setContents([
            ...props.contents.slice(0, state.addingSectionAt+1),
            {
                sectionTemplateNumber:tnum,
                titles:{
                    title:`${tnum} 번 템플릿 입니다.`
                }
            },
            ...props.contents.slice(state.addingSectionAt+1, props.contents.length),
        ])
        action.setAddingSectionAt(1000)
    }

    if(state.addingSectionAt === 1000){
        return (
            <div>
                이이이에제
                이건 {props.content.titles.title}입니다.
                <br/>
                <CKEditor
                    editor={ ClassicEditor }
                    data={props.content.titles.title}
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
                <pre dangerouslySetInnerHTML={{__html: props.content.titles.title}} style={{fontSize:'2em', color:'red', font:'Pretendard-Regular', width:'100%', textAlign:'left'}}>
                </pre>
            </div>
        )
    }else{
        return(
            <div>
                <div>
                    추가할 템플릿을 골라주세요.
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="template-selection" onClick={() => addSectionByTemplate(1)}>템플릿 1 사진과 텍스트</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(2)}>템플릿 2 텍스트와 사진</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(3)}>템플릿 3 동영상</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(4)}>템플릿 4 리뷰</span>
                </div>
            </div>
        )
    }
}

export default NewSectionMake
