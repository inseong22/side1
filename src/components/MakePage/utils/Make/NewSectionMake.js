import React, {useState, useEffect, useContext} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import update from 'react-addons-update';
import { MyContext } from '../../MakePageV2'
import {base} from '../../../Templates/baseTemplates'
import './NewSectionMake.css'

function NewSectionMake(props) {
    const [nowtext, setNowtext] = useState("하위")
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.


    // 템플릿 2 이미지의 경우에는
    const onChangeImage = e => {
        let newContents = [...props.contents]
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            newContents[state.secNum].attachment = result;
        }
        reader.readAsDataURL(oneFile);
        props.setContents(newContents);
    }


    // 템플릿 3 특징들의 경우
    const onFeatureTitleChange = (e, index) => {
        let newContents = [...props.contents]

        // update
        newContents[state.secNum].features[index].title = e.currentTarget.value
        
        props.setContents(newContents);
    }

    const onFeaturesTitleChange = e => {
        let newContents = [...props.contents]

        // update
        newContents[state.secNum].title = e.currentTarget.value

        props.setContents(newContents);
    }

    const addFeature = () => {
        console.log("특징을 하나 추가합니다.");
        props.setContents(update(props.contents,
            {
                [state.secNum]:{$set:{
                    ...props.contents[state.secNum],
                    numOfFeatures : props.content.numOfFeatures + 1,
                    features:[
                        ...props.contents[state.secNum].features,
                        {
                            title:`${props.content.numOfFeatures + 1} 의 타이틀`,
                            desc:`${props.content.numOfFeatures + 1}의 부가설명`,
                        }
                    ]
                }}
            }
        ))
    }

    const removeFeature = () => {
        props.content.numOfFeatures = props.content.numOfFeatures - 1;
    }

    const addSectionByTemplate = tnum => {
        // 아래는 contents에 섹션 하나를 추가하는 것.
        const body = base[parseInt(tnum-1)]

        props.setContents([
            ...props.contents.slice(0, state.addingSectionAt+1),
            body,
            ...props.contents.slice(state.addingSectionAt+1, props.contents.length),
        ])
        action.setSecNum(state.addingSectionAt+1)
        action.setAddingSectionAt(1000)
    }

    // 템플릿 1 텍스트의 경우
    const changeText = (event, editor, data) => {
        props.setContents(update(props.contents, {
                    [state.secNum]:{
                        titles : {$set:{
                            title : data,
                        }}
                    }
                }))
    }

    const sectionMakeTable = () => {

        switch(props.content.sectionTemplateNumber){
            case 1:
                return(
                    <div className="section-make__inner-container">
                        섹션 {state.secNum}번이고 템플릿은 1번 - 텍스트 입니다.
                        {/* <CKEditor
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
                            /> */}
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: props.content.titles.title}} style={{fontSize:'2em', color:'red', font:'Pretendard-Regular', width:'100%', textAlign:'left'}}>
                        </pre>
                    </div>
                )

            // 이미지인 경우 편집화면
            case 2:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 2번 - 이미지 입니다.
                        <input type="file" accept="image/*" id="file" onChange={ e => onChangeImage(e) } />
                        <img src={props.content.attachment} style={{width:`${props.content.width}%`}} />
                    </div>
                )

            // 특징들인 경우 편집화면
            case 3:
                return(
                    <div className="section-make__inner-container">
                        <div>
                            섹션 {state.secNum}번이고 템플릿은 3번 - 특징들 입니다.
                        </div>
                        <div>
                            <span>
                                섹션의 메인 타이틀 입니다.
                            </span>
                            <input type="text" value={props.content.title} onChange={e => onFeaturesTitleChange(e)} />
                        </div>
                        {
                            props.contents[state.secNum].features.map((item, index) => {
                                return(
                                    <input type="text" value={item.title} onChange={e => onFeatureTitleChange(e, index)} />
                                )
                            })
                        }
                        <button onClick={() => addFeature()}>특징 하나 추가</button>
                        <button onClick={() => removeFeature()}>특징 하나 제거</button>
                    </div>
                )
            
            case 4:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 4번 - 특징들 입니다.
                        <img src={props.content.attachment} />
                    </div>
                )

            default:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 뭐지? 디폴트 값입니다.
                        {/* <CKEditor
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
                            /> */}
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: props.content.titles.title}} style={{fontSize:'2em', color:'red', font:'Pretendard-Regular', width:'100%', textAlign:'left'}}>
                        </pre>
                    </div>
                )

        }
    }

    // 섹션을 추가하는 중이 아니라 수정하는 중일 때!
    if(state.addingSectionAt === 1000){
        return (
            <>
                {sectionMakeTable()}
            </>
        )
    }else{
        return(
            <div>
                <div>
                    추가할 템플릿을 골라주세요.
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="template-selection" onClick={() => addSectionByTemplate(1)}>텍스트</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(2)}>사진</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(3)}>템플릿 3 동영상</span>
                    <span className="template-selection" onClick={() => addSectionByTemplate(4)}>템플릿 4 리뷰</span>
                </div>
            </div>
        )
    }
}

export default NewSectionMake
