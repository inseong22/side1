import React, { useContext } from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'

function TemplateChoose({title, list, content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const changeTemplate = (num) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, templateNumber:num } : item)
        action.setContents(newContents);
    }

    return (
        <>
            <div>{title} 섹션의 다양한 템플릿들이 보여져야한다.</div>
            <div>
                {
                    list.map((item, index) => {
                        let chosenColor = 'rgba(200,200,100,0.5)';
                        if(item.templateNumber === content.templateNumber){
                            chosenColor = 'rgba(100,0,100,0.5)';
                        }
                        return(
                            <div className="templates-radio" style={{backgroundColor: `${chosenColor}`}} onClick={() => changeTemplate(item.templateNumber)}>
                                이 템플릿은 {item.templateNumber}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default TemplateChoose
