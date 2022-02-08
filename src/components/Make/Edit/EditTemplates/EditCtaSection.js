import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import EditDesign from './tools/EditDesign'
import produce from 'immer'
import ApplyInputCustom from '../tools/Custom/ApplyInputCustom'

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
            use:content.appDownloadButton.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].appDownloadButton.use = !content.appDownloadButton.use;
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
                        {
                            content.inputs.length > 4 ?  
                            <ApplyInputCustom disabled /> 
                            :
                            <ApplyInputCustom func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].inputs.push(e)
                            }))} /> 
                        }
                        
                        { content.inputs.length > 0 && 
                        <>
                            { content.inputs.map((item, index) => {
                                    return(
                                        <div key={index}>
                                            <ApplyInputCustom made value={item} func={e => action.setContents(produce(state.contents, draft => {
                                                if(index === 0 ){
                                                    draft[state.secNum].inputs.shift()
                                                }else{
                                                    draft[state.secNum].inputs.splice(index, index)
                                                }
                                            }))} />
                                        </div>
                                    )
                                })
                            } 
                        </> }
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
