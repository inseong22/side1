import React, {useState, useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {base} from '../SectionTypes/baseTypes'
import { detailSectionTemplateList } from './EditTemplates/InnerTemplates'

function AddingSection() {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [nowType, setNowType] = useState('DetailSection');

    const choseType = n => {
        setNowType(n)
    }

    const addSectionByTemplate = tnum => {
        // 아래는 state.contents에 섹션 하나를 추가하는 것.
        let body = JSON.parse(JSON.stringify(base.filter((item, index) => item.sectionTypeName === nowType)[0]))
        body.templateNumber = tnum;

        action.setContents([
            ...state.contents.slice(0, state.addingSectionAt+1),
            body,
            ...state.contents.slice(state.addingSectionAt+1, state.contents.length),
        ])
        action.setSecNum(state.addingSectionAt+1)
        action.setAddingSectionAt(1000)
    }

    const returnTepmplateSelections = () => {
        switch(nowType){
            case 'DetailSection':
                return(
                    <>
                    {detailSectionTemplateList.map((item, index) => {
                        return(
                            <span className="type-selection" onClick={() => addSectionByTemplate(item.templateNumber)}>{item.templateNumber}</span>
                        )
                    })}
                    </>
                )

            case 'HorizontalSection':
                return(
                    <>
                        <span className="type-selection" onClick={() => addSectionByTemplate(1)}>추가</span>
                    </>
                )


        }
    }

    return (
        <div style={{width:'100%'}}>
            <div>
                추가할 템플릿을 골라주세요.
                <button onClick={() => {action.setContents(state.contents)}}>버튼</button>
            </div>
            <div className="add-section__container">
                <div className="type-selection__container">
                    {base.map((item,index) => {
                        let backColor = 'rgba(0,0,0,0)'
                        if(nowType === item.sectionTypeName){
                            backColor = 'rgba(250,250,0,0.5)'
                        }
                        return(
                            <span className="type-selection" style={{backgroundColor: `${backColor}`}} onClick={() => choseType(item.sectionTypeName)}>{item.sectionTypeName}</span>
                        )
                    })}
                </div>
                <div className="template-selection__container">
                    { returnTepmplateSelections() }
                </div>
            </div>
        </div>
    )
}

export default AddingSection
