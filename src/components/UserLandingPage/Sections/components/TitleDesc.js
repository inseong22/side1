import React, {useContext, useEffect, useState, useRef} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function TitleDesc({content, setting}) {

    return (
        <div className="title-desc__container">
            {
                content.title.use &&
                <div style={{width:'100%'}}>
                    <div 
                        className="text-no-input" 
                        style={{
                            fontFamily:`${setting.font}`, 
                            color:`${content.title.color}`, 
                            fontSize:`${content.title.size}px`, 
                            textAlign:`${content.title.align}`,
                        }}>
                            {content.title.text}
                    </div>
                </div>
            }
            {
                content.desc.use &&
                <div style={{width:'100%', marginTop:'10px'}}>
                    <div 
                        className="text-no-input" 
                        value={content.desc.text}
                        style={{
                            fontFamily:`${setting.smallFont}`, 
                            color:`${content.desc.color}`, 
                            fontSize:`${content.desc.size}px`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${content.desc.align}`,
                        }}>
                            {content.desc.text}
                    </div>
                </div>
            }
        </div>
    )
}

export default TitleDesc
