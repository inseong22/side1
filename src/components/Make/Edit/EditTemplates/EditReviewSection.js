import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import produce from 'immer';
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'

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
            use:content.image.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].image.use = !content.image.use;
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
                        <div>
                            {returnRepeatComponents}
                            <div>
                                <span className="add-feature-button" onClick={() => addComponent()}>
                                    Add Feature
                                </span>
                            </div>
                        </div>
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
