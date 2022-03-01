import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import produce from 'immer';

function TextAuto({small, value, onChange, color, align, size, placeholder}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    
    return (
        <>
        {
            small ?
            <TextareaAutosize 
                className="text-input feature-desc" 
                value={value} 
                onChange={e => onChange(e)}
                placeholder={placeholder}
                style={{
                    color:`${color}`, 
                    textAlign:`${align}`,
                    resize:'none',
                    fontSize: `${size}em`,
                    fontFamily:`${state.setting.smallFont}`
                }}
                spellCheck="false"
            />
            : 
            <TextareaAutosize 
                className="text-input feature-title" 
                value={value} 
                placeholder={placeholder}
                onChange={e => onChange(e)}
                style={{ 
                    color:`${color}`, 
                    textAlign:`${align}`,
                    resize:'none',
                    fontSize: `${size}em`,
                    fontFamily:`${state.setting.font}`
                }}
                spellCheck="false"
            />
        }
        </>
    )
}

export default TextAuto
