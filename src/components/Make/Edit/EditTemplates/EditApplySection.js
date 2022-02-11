import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import produce from 'immer'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import ApplyInputCustom from '../tools/Custom/ApplyInputCustom'
import EditNotice from './tools/EditNotice'

import AddCtaButton from './tools/AddCtaButton'
import AddGhostButton from './tools/AddGhostButton'
import Layout from './tools/Layout'

function EditApplySection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
            title:'신청 버튼',
            use:content.applyButton.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].applyButton.use = !content.applyButton.use;
            }))
        },
        {
            title:'유의 사항 안내',
            use:content.caution.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].caution.use = !content.caution.use;
            }))
        },
    ]

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <Layout content={content} version='apply' />
                        <OpenCloseCustom title="신청 버튼">
                            <AddCtaButton content={content} num={5}/>
                            <AddGhostButton content={content} num={5}/>
                        </OpenCloseCustom>
                        <EditNotice content={content}/>
                    </div>
                )
            case 1:
                return(
                    <div>
                        <EditDesign content={content} />
                    </div>
                )
        }
    }

    return (
        <>
            {returnTable()}
        </>
    )
}

export default EditApplySection
