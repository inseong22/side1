import React, {useContext, useEffect, useState, useRef} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import './TitleDesc.css'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function TitleDesc({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="title-desc__container" onClick={() => action.setCategory(1)}>
            {
                content.title.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-input" 
                        value={content.title.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.text = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.font}`, 
                            color:`${content.title.color}`, 
                            fontSize:`${content.title.size}px`, 
                            textAlign:`${content.title.align}`,
                            resize:'none'
                        }}
                    />
                </div>
            }
            {
                content.desc.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-input" 
                        value={content.desc.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].desc.text = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            color:`${content.desc.color}`, 
                            fontSize:`${content.desc.size}px`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${content.desc.align}`,
                            resize:'none'
                        }}
                    />
                </div>
            }
        </div>
    )
}

export default TitleDesc
