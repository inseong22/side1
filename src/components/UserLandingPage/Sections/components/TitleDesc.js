import React, {useContext} from 'react'
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'
import { isMobile } from 'react-device-detect'
import TextareaAutosize from 'react-textarea-autosize';

function TitleDesc({content, titlePlaceholder, descPlaceholder}) {
    const {state, action} = useContext(UserContext)

    return (
        <div className="title-desc__container">
            {
                content.title.use &&
                <div style={{width:'100%',
                color:`${content.title.color}`}}>
                    <div 
                        className="text-no-input" 
                        dangerouslySetInnerHTML={{__html:content.title.text}}
                        style={{
                            fontFamily:`${state.setting.font}`, 
                            fontSize:`${isMobile ? content.title.size/22 : content.title.size/19}em`, 
                            textAlign:`${isMobile ? content.mobile.align : content.title.align}`,
                            resize:'none',
                        }}

                    />
                </div>
            }
            {
                content.desc.use &&
                <div style={{
                    width:'100%', 
                    marginTop:'10px',
                    color:`${content.desc.color}`}}>
                    <div className="text-no-input" 
                        dangerouslySetInnerHTML={{__html:content.desc.text}} 
                        style={{
                            fontFamily:`${state.setting.smallFont}`, 
                            fontSize:`${isMobile ? content.desc.size/19 : content.desc.size/19}em`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${isMobile ? content.mobile.align : content.desc.align}`,
                            resize:'none',
                        }} />
                </div>
            }
        </div>
    )
}

export default TitleDesc
