import React, {useContext} from 'react'
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'
import TextareaAutosize from 'react-textarea-autosize';

function TextAuto({small, value, color, setting, align, size}) {
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
                        fontFamily:`${state.setting.smallFont}`
                    }}
                    spellCheck="false"
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
                        fontFamily:`${state.setting.font}`
                    }}
                    spellCheck="false"
                />
            }
            </>
        )
    }
    
    export default TextAuto
    