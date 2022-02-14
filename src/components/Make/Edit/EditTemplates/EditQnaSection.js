import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import produce from 'immer'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'

const layoutOptions = [
    {label: '카드', value: 'card'},
    {label: '표', value: 'table'},
]
const shapeOptions = [
    {label: '접혀있기', value: 'close'},
    {label: '펼쳐있기', value: 'open'},
]
function EditQnaSection({content, category}) {
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
            title:'QnA',
            use:content.qna.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].qna.use = !content.qna.use;
            }))
        },
    ]

    const changeLayoutOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].layout = e;
            console.log(content.layout)
        }))
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <OpenCloseCustom title="레이아웃">
                            <RadioCustom options={layoutOptions} value={content.layout} func={e => changeLayoutOption(e)} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="QnA">
                            <RadioCustom text="기본 모양" options={shapeOptions} value={content.qna.shape} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].qna.shape = e;
                                console.log(content.qna.shape)
                            }))} />
                            <ColorCustom text="질문" value={content.qna.question} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].qna.question = e;
                            }))} />
                            <ColorCustom text="답변" value={content.qna.answer} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].qna.answer = e;
                            }))} />
                        </OpenCloseCustom>

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

export default EditQnaSection
