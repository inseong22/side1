import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import { reviewSectionTemplateList } from './InnerTemplates'
import TemplateChoose from '../tools/TemplateChoose'
import produce from 'immer';
import EditDesign from './tools/EditDesign'

function EditReviewSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
                        <div className="edit-element">
                            <div className="edit-element__one">
                                리뷰 섹션 수정
                            </div>
                        </div>
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
