import React, {useContext, useEffect, useState, useRef} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import {produce} from 'immer'
import './TitleDesc.css'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function TitleDesc({content, titlePlaceholder, descPlaceholder}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <div className="title-desc__container">
            {
                content.title.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        placeholder={titlePlaceholder}
                        className="text-input" 
                        value={content.title.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.text = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.font}`, 
                            color:`${content.title.color}`, 
                            fontSize:`${content.title.size/20}em`, 
                            textAlign:`${state.isPhone ? content.mobile.align : content.title.align}`,
                            resize:'none'
                        }}
                        spellCheck="false"
                    />
                </div>
            }
            {
                content.desc.use &&
                <div style={{width:'100%', marginTop:'10px'}}>
                    <TextareaAutosize 
                        placeholder={descPlaceholder}
                        className="text-input" 
                        value={content.desc.text} 
                        onChange={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].desc.text = e.currentTarget.value;
                        }))}
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            color:`${content.desc.color}`, 
                            fontSize:`${content.desc.size/20}em`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${state.isPhone ? content.mobile.align : content.desc.align}`,
                            resize:'none'
                        }}
                        spellCheck="false"
                    />
                </div>
            }
        </div>
    )
}

export default TitleDesc
