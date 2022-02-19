import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import EditDesign from './tools/EditDesign'
import produce from 'immer'
import ApplyInputCustom from '../tools/Custom/ApplyInputCustom'
import AddAppButton from './tools/AddAppButton'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import InputCustom from '../tools/Custom/InputCustom'
import EditNotice from './tools/EditNotice'

import AddCtaButton from './tools/AddCtaButton'
import AddGhostButton from './tools/AddGhostButton'
import Layout from './tools/Layout'

const alignOptions = [
    {label:'왼쪽', value: 'start'},
    {label:'중앙', value: 'center'}
]

function EditCtaSection({content, category, type}) {
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
            title:'버튼',
            use:content.button.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].button.use = !content.button.use;
            }))
        },
        {
            title:'앱 다운로드',
            use:content.appButton.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].appButton.use = !content.appButton.use;
            }))
        },
        {
            title:'안내사항',
            use:content.caution.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].caution.use = !content.caution.use;
            }))
        },
    ]
    
    const changeAlignOption = (e) => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.align = e
        }))
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <Layout content={content} version="cta"/>
                        {
                            !(type === 'appDownload') &&
                            <OpenCloseCustom title="버튼" use={content.button.use}>
                                <RadioCustom options={alignOptions} value={content.button.align} func={e => changeAlignOption(e)} />
                                <AddCtaButton content={content} num={5}/>
                                <AddGhostButton content={content} num={5}/>
                            </OpenCloseCustom>
                        }
                        {
                            !(type === 'apply') &&
                            <AddAppButton content={content} />
                        }
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

export default EditCtaSection
