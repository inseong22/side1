import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import produce from 'immer';

function TextAuto({small, value, onChange, color, align}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    
    return (
        <>
        {
            small ?
            <TextareaAutosize 
                className="text-input feature-desc" 
                value={value} 
                onChange={e => onChange(e)}
                style={{
                    fontFamily:`${state.setting.smallFont}`, 
                    color:`${color}`, 
                    textAlign:`${align}`,
                    resize:'none'
                }}
                spellcheck="false"
            />
            :
            <TextareaAutosize 
                className="text-input feature-title" 
                value={value} 
                onChange={e => onChange(e)}
                style={{
                    fontFamily:`${state.setting.font}`, 
                    color:`${color}`, 
                    textAlign:`${align}`,
                    resize:'none'
                }}
                spellcheck="false"
            />
        }
        </>
    )
}

export default TextAuto
