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
import EditTitleDesc from './tools/EditTitleDesc'
import OnOffCustom from '../tools/Custom/OnOffCustom'

const ratingSizeOptions = [
    { label: '작게', value: 15 },
    { label: '보통', value: 19 },
    { label: '크게', value: 23 },
]
const alignOptions = [
    { label: '왼쪽', value: 'start'},
    { label: '중앙', value: 'center'}
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
            title:'아이콘/이미지',
            use:content.element.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].element.use = !content.element.use;
            }))
        },
        {
            title:'리뷰 내용',
            use:content.reviewText,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].reviewText = !content.reviewText;
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
                        <EditTitleDesc content={content} />
                        <EditImageIcon content={content} />
                        <OpenCloseCustom title="리뷰 내용" use={content.reviewText}>
                            <div className="box-gray__container">
                                <ColorCustom text="색상" value={content.elementText.color} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementText.color = e;
                                    draft[state.secNum].elementTitle.color = e;
                                }))} />
                                <RadioCustom text="정렬" options={alignOptions} value={content.elementText.align} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementText.align = e;
                                    draft[state.secNum].align = e;
                                }))} />
                            </div>
                            <div className="box-gray__container">
                                <OnOffCustom text="제목" value={content.elementTitle.use} func={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementTitle.use = !content.elementTitle.use;
                                }))} />
                                <TextSizeCustom text="제목 크기" elementTitle value={content.elementTitle.size} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementTitle.size = e;
                                }))} />
                            </div>
                            <div className="box-gray__container">
                                <OnOffCustom text="별점" value={content.rating.use} func={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].rating.use = !content.rating.use;
                                }))} />
                                <ColorCustom text="색상" value={content.rating.color} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].rating.color = e;
                                }))} />
                                <RadioCustom text="크기" value={content.rating.size} options={ratingSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].rating.size = e;
                                }))} />
                            </div>
                            <div className="box-gray__container">
                                <OnOffCustom text="내용" value={content.elementText.use} func={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementText.use = !content.elementText.use;
                                }))} />
                                <TextSizeCustom text="내용 크기" elementDesc value={content.elementText.size} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].elementText.size = e;
                                }))} />
                            </div>
                            <>
                                <OnOffCustom text="이름 / 정보" value={content.writer.use} func={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].writer.use = !content.writer.use;
                                }))} />
                                <ColorCustom text="색상" value={content.writer.color} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].writer.color = e;
                                }))} />
                            </>
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
