import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditAnimation from '../EditAnimation'
import EditTopBar from '../tools/EditTopBar'
import './MakeTemplate1.css'

function MakeTemplate1({content, contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [category, setCategory] = useState(0);

    const onChangeButtonLink = (e) => {
        let newContents = state.contents.map((item, index) => index === state.secNum ? {...item, button:{...item.button, link:e.currentTarget.value}} : item )
        action.setContents(newContents);
    }

    const returnTable = () => {
        switch(category){
            case 0:
                return(
                    <div className="section-make__inner-container">
                        섹션 {state.secNum}번이고 템플릿은 1번 - 텍스트 입니다.
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
                        </pre>
                        <EditAnimation content={content}/>
                        <div>
                            <div>버튼링크</div>
                            <input type="text" value={content.button.link} onChange={(e) => onChangeButtonLink(e)}/>
                        </div>
                    </div>
                )

            case 1:
                return(
                    <></>
                )

            default:
                return(
                    <div className="section-make__inner-container">
                        섹션 {state.secNum}번이고 템플릿은 1번 - 텍스트 입니다.
                        <br/>
                        <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
                        </pre>
                        <EditAnimation content={content}/>
                        <div>
                            <div>버튼링크</div>
                            <input type="text" value={content.button.link} onChange={(e) => onChangeButtonLink(e)}/>
                        </div>
                    </div>
                )
        }
    }

    return(
        <>
            <EditTopBar category={category} setCategory={setCategory} />
            {returnTable()}
        </>
    )
}

export default MakeTemplate1
