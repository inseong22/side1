import React, {useContext, useEffect, useState, useRef} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function TitleDesc({content, setting}) {

    return (
        <div className="title-desc__container">
            {
                content.title.use &&
                <div style={{width:'100%'}}>
                    <TextareaAutosize 
                        className="text-no-input" 
                        style={{
                            fontFamily:`${setting.font}`, 
                            color:`${content.title.color}`, 
                            fontSize:`${content.title.size/20}em`, 
                            textAlign:`${content.title.align}`,
                        }}
                        value = {content.title.text}
                        />
                </div>
            }
            {
                content.desc.use &&
                <div style={{width:'100%', marginTop:'10px'}}>
                    <TextareaAutosize 
                        className="text-no-input" 
                        style={{
                            fontFamily:`${setting.smallFont}`, 
                            color:`${content.desc.color}`, 
                            fontSize:`${content.desc.size/20}em`, 
                            // boxSizing:`border-box`, 
                            textAlign:`${content.desc.align}`,
                        }}
                        value = {content.desc.text}
                        />
                </div>
            }
        </div>
    )
}

export default TitleDesc
