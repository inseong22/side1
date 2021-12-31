import React, {useState, useContext} from 'react'
import EditTopBar from '../tools/EditTopBar'
import { MyContext } from '../../../../pages/Make/MakePageV2'

function MakeTemplate2({content, contents, setContents}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [category, setCategory] = useState(0);

    return(
        <>
        <EditTopBar category={category} setCategory={setCategory} />
        <div>
            섹션 {state.secNum}번이고 템플릿은 2번 - 이미지 입니다.
            <img src={content.attachment} style={{width:`${content.width}%`}} />
        </div>
        </>
    )
}

export default MakeTemplate2
