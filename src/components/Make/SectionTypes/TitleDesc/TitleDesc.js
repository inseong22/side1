import React, {useContext, useState} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import {produce} from 'immer'

function TitleDesc({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div>
            {
                content.title.use &&
                <div style={{color:`${content.title.color}`, fontSize:`${content.title.size}px`}}>
                    <input className="text-input" value={content.title.text} onChange={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].title.text = e.currentTarget.value;
                    }))}
                    style={{fontFamily:`${state.setting.font}`, color:`${content.title.color}`, fontSize:`${content.title.size}px`, width:'100%', boxSizing:`border-box`, textAlign:`${content.title.align}`}}
                    />
                </div>
            }
            {
                content.desc.use &&
                <div style={{color:`${content.desc.color}`, fontSize:`${content.desc.size}px`}}>
                    <input className="text-input" value={content.desc.text} onChange={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].desc.text = e.currentTarget.value;
                    }))}
                    style={{color:`${content.desc.color}`, fontSize:`${content.desc.size}px`, width:'100%', boxSizing:`border-box`, textAlign:`${content.desc.align}`}}
                    />
                </div>
            }
        </div>
    )
}

export default TitleDesc
