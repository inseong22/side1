import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import produce from 'immer';
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import Layout from './tools/Layout'
import Contents from './tools/Contents'
import AddGhostButton from './tools/AddGhostButton'
import EditTitleDesc from './tools/EditTitleDesc'
import AddCtaButton from './tools/AddCtaButton'
import AddAppButton from './tools/AddAppButton'

function EditHeroSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const elements = [
        {
            title: '제목',
            use:content.title.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.use = !content.title.use;
            }))
        },
        {
            title: '본문',
            use:content.desc.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].desc.use = !content.desc.use;
            }))
        },
        {
            title: '콘텐츠',
            use:content.contents.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].contents.use = !content.contents.use;
            }))
        },
        {
            title: '버튼',
            use:content.button.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].button.use = !content.button.use;
            }))
        },
        {
            title: '앱 다운로드 버튼',
            use:content.appButton.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].appButton.use = !content.appButton.use;
            }))
        },
    ]
    
    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <ElementsTable elements={elements} />
                    <Layout content={content} version='main'/>
                    <EditTitleDesc content={content} />
                    <Contents content={content} />
                    <OpenCloseCustom title="버튼" use={content.button.use}>
                        <AddCtaButton content={content} num={1} />
                        <AddGhostButton content={content} num={1} />
                    </OpenCloseCustom>
                    <AddAppButton content={content} />
                    </>
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

export default EditHeroSection
