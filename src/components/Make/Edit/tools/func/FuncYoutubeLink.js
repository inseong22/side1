import React, {useRef, useContext, useState} from 'react'
import produce from 'immer';
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import '../Custom/InputCustom.css'

function FuncYoutubeLink({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [text, setText] = useState('')

    const onChangeLink = e => {
        e.preventDefault()
        setText(e.target.value)
        console.log(text)
        // action.setContents(produce(state.contents, draft => {
        //     draft[state.secNum].video.link = e.target.value
        // }))
    }
    const onYoutube = e => {
        e.preventDefault()
        if (text.includes('www.youtube.com')) {
            const submitLink = text.replace('watch?v=', 'embed/');
            action.setContents(produce(state.contents, draft => {
                draft[state.secNum].video.youtube = true
                draft[state.secNum].video.link = submitLink+'?autoplay=1'+'&mute=1'
                draft[state.secNum].image.slide = false
                draft[state.secNum].video.use = false
                draft[state.secNum].image.slide = false
                draft[state.secNum].image.oneImg = false 
            }))
        }
    }

    return (
        <>
        <form className="center-row">
           <input
                className="edit-input"
                type="text"
                onChange={e=>onChangeLink(e)}
                style={{width: '100%'}}
                placeholder="유튜브 링크를 입력해 주세요."
                onKeyPress={e => onYoutube(e)}
           /> 
           {/* <div 
           type="submit" 
           style={{width: '30px', cursor: 'pointer' , border: 'solid 1px'}}
           onClick = {e => onYoutube(e)}
           >
           확인
        </div> */}
        </form>
        <div className="mid-command">입력 후 엔터를 누르세요.</div>
        </>
    )
}

export default FuncYoutubeLink
