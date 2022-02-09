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

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 20 },
]
const imageSizeOptions = [
    { label: 'Small', value: 33 },
    { label: 'Medium', value: 50 },
    { label: 'Large', value: 100 },
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

    const returnRepeatComponents = content.reviews.map((item, index) => {
            return(
                <div className="edit-repeat-component">
                    <div className="edit-element__one" style={{flexDirection:'column'}}>
                        <div className="center-row">
                            <div>
                                뭐 아무거나
                            </div>
                            <div className="content-delete" onClick={() => deleteComponent(index)}>
                                x
                            </div>
                        </div>
                        <div>
                            {item.title}
                        </div>
                        <div>
                            {item.desc}
                        </div>
                        <div>
                            {item.writer}
                        </div>
                    </div>
                </div>
            )
        })

    const deleteComponent = (index) => {
            action.setContents(produce(state.contents, draft => {
                draft[state.secNum].reviews.splice(index, 1);
            }
        ))
    }

    const addComponent = () => {
            action.setContents(produce(state.contents, draft => {
                draft[state.secNum].reviews.push(
                    {
                        title:'2의 타이틀',
                        desc:'2의 부가설명',
                        rating:5,
                        writer:'백인성',
                    }
                )
            }
        ))
    }

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
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이미지">
                            <RadioCustom text="프레임" button value={content.reviewImage.border} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].reviewImage.border = e;
                                }))} />
                            <RadioCustom text="크기" value={content.reviewImage.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].reviewImage.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="별점">
                            <ColorCustom text="색상" value={content.rating.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].rating.color = e;
                            }))} />
                            <RadioCustom text="크기" value={content.rating.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
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
