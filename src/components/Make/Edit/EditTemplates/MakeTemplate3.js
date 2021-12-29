import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'

function MakeTemplate3({content, contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.


    // 템플릿 3 특징들의 경우
    const onFeatureTitleChange = (e, index) => {
        let newContents = [...contents]

        // update
        newContents[state.secNum].features[index].title = e.currentTarget.value
        
        setContents(newContents);
    }

    const onFeaturesTitleChange = e => {
        let newContents = contents

        // update
        newContents[state.secNum].title = e.currentTarget.value

        setContents(newContents);
    }

    const addFeature = () => {
        console.log("특징을 하나 추가합니다.");
        let newContents = contents

        newContents[state.secNum].features.push(
            {
                title:`${content.numOfFeatures + 1} 의 타이틀`,
                desc:`${content.numOfFeatures + 1}의 부가설명`,
            }
        )
        newContents[state.secNum].numOfFeatures = content.numOfFeatures + 1

        setContents(newContents);
    }

    const removeFeature = () => {
        content.numOfFeatures = content.numOfFeatures - 1;
    }

    return(
        <div className="section-make__inner-container">
            <div>
                섹션 {state.secNum}번이고 템플릿은 3번 - 특징들 입니다.
            </div>
            <div>
                <span>
                    섹션의 메인 타이틀 입니다.
                </span>
                <input type="text" value={content.title} onChange={e => onFeaturesTitleChange(e)} />
            </div>
            {
                contents[state.secNum].features.map((item, index) => {
                    return(
                        <input type="text" value={item.title} onChange={e => onFeatureTitleChange(e, index)} />
                    )
                })
            }
            <button onClick={() => addFeature()}>특징 하나 추가</button>
            <button onClick={() => removeFeature()}>특징 하나 제거</button>
        </div>
    )
}

export default MakeTemplate3
