import React, {useState, useEffect, useContext} from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyContext } from '../../../pages/Make/MakePageV2'
import {base} from '../SectionTemplates/baseTemplates'
import MakeTemplate1 from './EditTemplates/MakeTemplate1'
import MakeTemplate2 from './EditTemplates/MakeTemplate2'
import MakeTemplate3 from './EditTemplates/MakeTemplate3'
import EditNaviSection from './EditTemplates/EditNaviSection'
import EditFooterSection from './EditTemplates/EditFooterSection'
import lodash from 'lodash'
import './NewSectionMake.css'

function NewSectionMake({content, contents, setContents, navi, foot, setNavi, setFoot}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const addSectionByTemplate = tnum => {
        // 아래는 contents에 섹션 하나를 추가하는 것.
        const body = lodash.cloneDeep(base[parseInt(tnum-1)])

        setContents([
            ...contents.slice(0, state.addingSectionAt+1),
            body,
            ...contents.slice(state.addingSectionAt+1, contents.length),
        ])
        action.setSecNum(state.addingSectionAt+1)
        action.setAddingSectionAt(1000)
    }

    const sectionMakeTable = () => {

        switch(content.sectionTemplateNumber){
            case 1:
                return (
                    <MakeTemplate1 content={content} contents={contents} setContents={setContents}/>
                )

            // 이미지인 경우 편집화면
            case 2:
                return (
                    <MakeTemplate2 content={content} contents={contents} setContents={setContents}/>
                )

            // 특징들인 경우 편집화면
            case 3:
                return(
                
                    <MakeTemplate3 content={content} contents={contents} setContents={setContents}/>
                )
            
            case 4:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 4번 - 특징들 입니다.
                        <img src={content.attachment} />
                    </div>
                )


            default:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 뭐지? 디폴트 값입니다.
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: content.titles.title}} style={{fontSize:'2em', color:'red', font:'Pretendard-Regular', width:'100%', textAlign:'left'}}>
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
                    <button onClick={() => {setContents(contents)}}>버튼</button>
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
