import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import './EditeTemplates.css'
import ElementsTable from './tools/ElementsTable'
import EditTitleDesc from './tools/EditTitleDesc'
import produce from 'immer';
import './EditContent.css'

import Layout from './tools/Layout'
import Contents from './tools/Contents'

function EditDetailSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const onChangeButtonLink = (e) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, button:{...item.button, link:e.currentTarget.value}} : item )
        action.setContents(newContents);
    }

    const elements = [
        {
            title:'제목',
            use:content.title.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.use = !content.title.use;
            }))
        },
        {
            title:'본문',
            use:content.desc.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].desc.use = !content.desc.use;
            }))
        },
        {
            title:'콘텐츠',
            use:content.contents.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].contents.use = !content.contents.use;
            }))
        },
    ]

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div className="section-make__inner-container">
                        <ElementsTable elements={elements} />
                        <Layout content={content} version='detail' />
                        <EditTitleDesc content={content} />
                        <Contents content={content}/>
                    </div>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <EditDesign content={content} />
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
