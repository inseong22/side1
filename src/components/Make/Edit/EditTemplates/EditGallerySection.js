import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import produce from 'immer';
import ElementsTable from './tools/ElementsTable'

import Layout from './tools/Layout'

function EditGallerySection({content, category}) {
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
            title:'이미지',
            use:content.image.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].image.use = !content.image.use;
            }))
        },
        {
            title:'카드',
            use:content.card.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].card.use = !content.card.use;
            }))
        },
        {
            title:'설명',
            use:content.text.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].text.use = !content.text.use;
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
                        <Layout content={content} version='gallery'/>
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

export default EditGallerySection
