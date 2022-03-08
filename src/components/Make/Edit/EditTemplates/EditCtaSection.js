import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import EditDesign from './tools/EditDesign'
import produce from 'immer'
import EditTitleDesc from './tools/EditTitleDesc'
import AddAppButton from './tools/AddAppButton'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import EditNotice from './tools/EditNotice'
import TextSizeCustom from '../tools/func/TextSizeCustom'

import AddCtaButton from './tools/AddCtaButton'
import AddGhostButton from './tools/AddGhostButton'
import Layout from './tools/Layout'

const alignOptions = [
    {label:'왼쪽', value: 'start'},
    {label:'중앙', value: 'center'}
]

const elementss = ['title', 'desc', 'button', 'appButton', 'caution']
const elementDoc = {
    title:'제목',
    desc:'본문',
    button:'버튼',
    appButton:'앱 다운로드 버튼',
    caution:'안내사항',
}

function EditCtaSection({content, category, type}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const elementsAll = elementss.map(doc => {
        return({
            title:elementDoc[doc],
            use:content[doc].use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum][doc].use = !content[doc].use;
            }))
        })
    })

    const elements = elementsAll.filter(doc => (type !== 'apply' && doc.title !== '버튼') || (type !== 'appDownload' && doc.title !== '앱 다운로드'))
    
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
                        <EditTitleDesc content={content} />
                        {
                            !(type === 'appDownload') &&
                            <OpenCloseCustom title="버튼" use={content.button.use}>
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
