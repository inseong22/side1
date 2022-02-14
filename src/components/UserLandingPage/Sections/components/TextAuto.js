import React, {useContext} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'

function TextAuto({small, value, color, align, setting}) {
    const {state, action} = useContext(UserContext)
    
    return (
        <>
        {
            small ?
            <div 
                className="text-no-input feature-desc" 
                style={{
                    fontFamily:`${state.setting.smallFont}`, 
                    color:`${color}`, 
                    textAlign:`${align}`,
                }}>
                    {value}
                </div>
            :
            <div 
                className="text-no-input feature-title" 
                style={{
                    fontFamily:`${state.setting.font}`, 
                    color:`${color}`, 
                    textAlign:`${align}`,
                }}>
                    {value}
                </div>
        }
        </>
    )
}

export default TextAuto
