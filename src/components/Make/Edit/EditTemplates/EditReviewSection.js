import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import produce from 'immer';
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'

const layoutOptions = [
    { label: '1', value: 1},
    { label: '2', value: 2},
    { label: '3', value: 3},
    { label: '4', value: 4},
]

const featureOptions = [
    { label: '아이콘', value: 'icon' },
    { label: '이미지', value: 'image'},
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 500 },
]
const imageSizeOptions = [
    { label: 'Small', value: 50 },
    { label: 'Medium', value: 100 },
    { label: 'Large', value: 150 },
]
const alignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]

const imageSmallSizeOptions = [
    { label: 'Small', value: 55 },
    { label: 'Medium', value: 70 },
    { label: 'Large', value: 90 },
]

const ratingSizeOptions = [
    { label: 'Small', value: 15 },
    { label: 'Medium', value: 20 },
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
            title:'이미지',
            use:content.reviewImage.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].reviewImage.use = !content.reviewImage.use;
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
            use:content.reviewText.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].reviewText.use = !content.reviewText.use;
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
                        <OpenCloseCustom title="레이아웃">
                            <RadioCustom text="단 개수" options={layoutOptions} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].layout = e;
                                }))} />
                            <RadioCustom text="정렬" options={alignOptions} value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].align = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이미지">
                            <RadioCustom text="특징" value={content.reviewImage.type} options={featureOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviewImage.type = e;
                            }))} />
                            {
                                content.reviewImage.type === 'icon' && 
                                <ColorCustom text="색상" value={content.reviewImage.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].reviewImage.backgroundColor = e;
                                }))} />
                            }
                            <RadioCustom text="프레임" button value={content.reviewImage.borderRaidus} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviewImage.borderRaidus = e;
                            }))} />
                            {
                                content.reviewImage.type === 'image' ? 
                                <RadioCustom text="크기" value={content.reviewImage.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].reviewImage.size = e;
                                }))} /> : 
                                <RadioCustom text="크기" value={content.reviewImage.size} options={imageSmallSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].reviewImage.size = e;
                                }))} />
                            }
                        </OpenCloseCustom>
                        <OpenCloseCustom title="별점">
                            <ColorCustom text="색상" value={content.rating.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].rating.color = e;
                            }))} />
                            <RadioCustom text="크기" value={content.rating.size} options={ratingSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].rating.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이름 / 닉네임">
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
