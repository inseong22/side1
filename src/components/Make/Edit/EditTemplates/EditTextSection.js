import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import produce from 'immer';
import ElementsTable from './tools/ElementsTable'
import EditTitleDesc from './tools/EditTitleDesc'
import Layout from './tools/Layout'

function EditTextSection({content, category}) {
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
    ]

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <Layout content={content} version='text' />
                        <EditTitleDesc content={content} />
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

export default EditTextSection
