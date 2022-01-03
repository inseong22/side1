import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditAnimation from '../EditAnimation'
import EditTopBar from '../tools/EditTopBar'
import { detailSectionTemplateList } from './InnerTemplates'
import './EditeTemplates.css'
import './MakeTemplate1.css'

function EditDetailSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const onChangeButtonLink = (e) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, button:{...item.button, link:e.currentTarget.value}} : item )
        action.setContents(newContents);
    }

    const changeTemplate = (num) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, templateNumber:num } : item)
        action.setContents(newContents);
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div className="section-make__inner-container">
                        {state.secNum}번째 섹션이고 타입은 1번 - 텍스트 입니다.
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
                        </pre>
                        <EditAnimation content={content}/>
                        <div>
                            <div>버튼링크</div>
                            <input type="text" value={content.button.link} onChange={(e) => onChangeButtonLink(e)}/>
                        </div>
                    </div>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <div>디테일 섹션의 다양한 템플릿들이 보여져야한다.</div>
                        <div>
                            {
                                detailSectionTemplateList.map((item, index) => {
                                    return(
                                        <div className="templates-radio" onClick={() => changeTemplate(item.templateNumber)}>
                                            이 템플릿은 {item.templateNumber}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )

            default:
                return(
                    <div className="section-make__inner-container">
                        섹션 {state.secNum}번이고 템플릿은 1번 - 텍스트 입니다.
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
                        </pre>
                        <EditAnimation content={content}/>
                        <div>
                            <div>버튼링크</div>
                            <input type="text" value={content.button.link} onChange={(e) => onChangeButtonLink(e)}/>
                        </div>
                    </div>
                )
        }
    }

    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditDetailSection
