import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import { detailSectionTemplateList } from './InnerTemplates'
import TemplateChoose from '../tools/TemplateChoose'
import './EditeTemplates.css'
import './EditContent.css'

function EditDetailSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const onChangeButtonLink = (e) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, button:{...item.button, link:e.currentTarget.value}} : item )
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
                        <TemplateChoose content={content} title="디테일" list={detailSectionTemplateList} />
                    </>
                )

            default:
                <></>
        }
    }

    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditDetailSection
