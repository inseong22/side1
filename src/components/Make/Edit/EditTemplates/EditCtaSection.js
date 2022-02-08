import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import EditDesign from './tools/EditDesign'
import produce from 'immer'
import ApplyInputCustom from '../tools/Custom/ApplyInputCustom'
import AddAppButton from './tools/AddAppButton'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import {CustomSwitch} from '../tools/Custom/OnOffCustom'
import InputCustom from '../tools/Custom/InputCustom'
import AddGhostButton from './tools/AddGhostButton'
import Layout from './tools/Layout'

const alignOptions = [
    {label:'왼쪽', value: '0'},
    {label:'중앙', value: '0 auto'}
]
const buttonOptions = [
    {label: '링크 연결', value: 'link'},
    {label: '신청', value: 'apply'},
]

function EditCtaSection({content, category}) {
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
    ]
    const changeAlignOption = () => {
        action.setContents(produce(state.contents, draft => {
            if (draft[state.secNum].button.align == '0')
                draft[state.secNum].button.align = '0 auto'
            else
                draft[state.secNum].button.align = '0'
        }))
    }
    // 버튼 관련
    const ctaOpen = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.ctaUse = !content.button.ctaUse}))     
    }

    const changeCtaOption = () => {
        action.setContents(produce(state.contents, draft => {
            if (draft[state.secNum].button.ctaOption == 'link')
                draft[state.secNum].button.ctaOption = 'apply'
            else
                draft[state.secNum].button.ctaOption = 'link'
        }))
    }


    const returnCtaOptions = () => {
        switch(content.button.ctaOption){
            case 'link':
                return(
                    <InputCustom placeholder="연결하고 싶은 URL을 선택해주세요" value={content.button.ctaLink} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.ctaLink = e
                    }))} />
                )
            case 'apply':
                return(
                    <>
                    {
                        content.ctaApplyInputs.length > 1 ?  
                        <ApplyInputCustom disabled /> 
                        :
                        <ApplyInputCustom func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].ctaApplyInputs.push(e)
                        }))} /> 
                    }
                    
                    { content.ctaApplyInputs.length > 0 && 
                    <>
                        { content.ctaApplyInputs.map((item, index) => {
                                return(
                                    <div key={index}>
                                        <ApplyInputCustom made value={item} func={e => action.setContents(produce(state.contents, draft => {
                                            if(index === 0 ){
                                                draft[state.secNum].ctaApplyInputs.shift()
                                            }else{
                                                draft[state.secNum].ctaApplyInputs.splice(index, index)
                                            }
                                        }))} />
                    </div>
                                )
                            })
                        } 
                    </> }
                    </>
                )
            default:
                return(
                    <> </>
                )
        }
    }


    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <Layout content={content} version="cta"/>
                        <OpenCloseCustom title="버튼">
                        <RadioCustom options={alignOptions} value={content.button.align} func={e => changeAlignOption(e)} />
                        <CustomSwitch text="CTA 버튼" value={content.button.ctaUse} onChange={e => ctaOpen(e)}/>
                        { content.button.ctaUse && (
                            <>
                                <RadioCustom options={buttonOptions} value={content.button.ctaOption} func={e => changeCtaOption(e)}/>
                                {returnCtaOptions()}
                            </>
                        )}
                        <AddGhostButton content={content}/>
                        </OpenCloseCustom>
                        <AddAppButton content={content} />
                        
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
