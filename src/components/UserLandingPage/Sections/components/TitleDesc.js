import React, {useContext} from 'react'
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'
import { isMobile } from 'react-device-detect'
import TextareaAutosize from 'react-textarea-autosize';

function TitleDesc({content}) {
    const {state, action} = useContext(UserContext)

    return (
        <div className="title-desc__container">
            {
                content.title.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-no-input" 
                        value={content.title.text} 
                        style={{
                            fontFamily:`${state.setting.font}`, 
                            color:`${content.title.color}`, 
                            fontSize:`${content.title.size/20}em`, 
                            textAlign:`${isMobile ? content.mobile.align : content.title.align}`,
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
                        className="text-no-input" 
                        value={content.desc.text} 
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            color:`${content.desc.color}`, 
                            fontSize:`${content.desc.size/20}em`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${isMobile ? content.mobile.align : content.desc.align}`,
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
