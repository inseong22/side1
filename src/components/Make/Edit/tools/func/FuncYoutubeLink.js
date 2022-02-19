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
                draft[state.secNum].video.link = submitLink+'?autoplay=1'+'&mute=1'
                draft[state.secNum].image.slide = false
                draft[state.secNum].video.use = false
                draft[state.secNum].image.slide = false
                draft[state.secNum].image.use = false 
            }))
        }
    }

    return (
        <>
        <form className="center-row">
            <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                    <input className="apply-input" type='text' placeholder="유튜브 링크를 입력해 주세요."
                     onChange={e => setText(e.currentTarget.value)} 
                     value={text}
                     onKeyPress={e => onYoutube(e)}
                    >
                    </input>
                    <input type="button" value="입력" className="content__button" style={{zIndex:4, marginLeft:'-65px'}} onClick={(e) => {
                        onYoutube(e)
                    }}/>
                </div>
        </form>
        <div className="mid-command"/>
        </>
    )
}

export default FuncYoutubeLink
