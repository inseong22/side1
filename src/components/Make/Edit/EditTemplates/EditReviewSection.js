import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import produce from 'immer';
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import LayoutRFG from './tools/LayoutRFG'
import SingleColorCustom from '../tools/Custom/SingleColorCustom'
import {EditImageIcon} from './EditFeaturesSection'
import TextSizeCustom from '../tools/func/TextSizeCustom'

const ratingSizeOptions = [
    { label: 'Small', value: 20 },
    { label: 'Medium', value: 25 },
    { label: 'Large', value: 30 },
]

function EditReviewSection({content, category}) {
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
            title:'요소',
            use:content.element.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].element.use = !content.element.use;
            }))
        },
        {
            title:'리뷰 제목',
            use:content.elementTitle.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].elementTitle.use = !content.elementTitle.use;
            }))
        },
        {
            title:'별점',
            use:content.rating.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].rating.use = !content.rating.use;
            }))
        },
        {
            title:'리뷰 내용',
            use:content.elementText.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].elementText.use = !content.elementText.use;
            }))
        },
        {
            title:'이름/닉네임',
            use:content.writer.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].writer.use = !content.writer.use;
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
                        <LayoutRFG content={content} />
                        <EditImageIcon content={content} />
                        <OpenCloseCustom title="별점" use={content.rating.use}>
                            <ColorCustom text="색상" value={content.rating.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].rating.color = e;
                            }))} />
                            <RadioCustom text="크기" value={content.rating.size} options={ratingSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].rating.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="리뷰 내용" use={content.elementText.use}>
                            <ColorCustom text="색상" value={content.elementText.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elementText.color = e;
                            }))} />
                            <TextSizeCustom text="크기" desc value={content.elementText.size} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elementText.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이름 / 닉네임" use={content.writer.use}>
                            <ColorCustom text="색상" value={content.writer.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].writer.color = e;
                            }))} />
                        </OpenCloseCustom>
                        {/* <div>
                            {returnRepeatComponents}
                            <div>
                                <span className="add-feature-button" onClick={() => addComponent()}>
                                    Add Feature
                                </span>
                            </div>
                        </div> */}
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

export default EditReviewSection
