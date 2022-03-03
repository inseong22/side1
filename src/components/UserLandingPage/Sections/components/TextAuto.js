import React, {useContext} from 'react'
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'
import TextareaAutosize from 'react-textarea-autosize';

function TextAuto({small, value, color, setting, align, size, disabled}) {
    const {state, action} = useContext(UserContext)
    
        return (
            <>
            {
                small ?
                <TextareaAutosize 
                    className="text-no-input feature-desc" 
                    value={value} 
                    style={{
                        color:`${color}`, 
                        textAlign:`${align}`,
                        resize:'none',
                        fontSize: `${size}em`,
                        fontFamily:`${state.setting.smallFont}`,
                        WebkitTextFillColor: `${color}`,
                    }}
                    spellCheck="false"
                    disabled={disabled}
                />
                : 
                <TextareaAutosize 
                    className="text-no-input feature-title" 
                    value={value} 
                    style={{ 
                        color:`${color}`, 
                        textAlign:`${align}`,
                        resize:'none',
                        fontSize: `${size}em`,
                        fontFamily:`${state.setting.font}`,
                        WebkitTextFillColor: `${color}`,
                    }}
                    spellCheck="false"
                    disabled={disabled}
                />
            }
            </>
        )
    }
    
    export default TextAuto
    