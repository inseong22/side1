import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditAnimation from '../EditAnimation'
import './MakeTemplate1.css'

function MakeTemplate1({content, contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return(
        <div className="section-make__inner-container">
            섹션 {state.secNum}번이고 템플릿은 1번 - 텍스트 입니다.
            <br/>
            <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
            </pre>
            <EditAnimation content={content}/>
        </div>
    )
}

export default MakeTemplate1
