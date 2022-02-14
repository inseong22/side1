import React, {useContext, useState} from 'react'
import {Upload} from '@styled-icons/bootstrap';

function Element({content, item, index, gallery}) {

    return (
        <>
            <div className="centeras" style={{justifyContent: `${content.align}`}}>
                <div style={{width:`${content.element.size}px`, height:`${content.element.size}px`, position:'relative', cursor:'pointer'}}>
                {
                content.element.type === 'image' ? <>
                { item.attachment ? 
                    <img src={item.attachment} style={{width:`${content.element.size}px`, height:`${content.element.size}px`, borderRadius:`${content.element.borderRadius}px`}}/> 
                    :
                    <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}}>
                        <Upload size="25" />
                    </div>
                }</> : 
                <>
                <div className="feature-upload-button" style={{borderRadius:`${content.element.borderRadius}px`, backgroundColor:`${content.element.backgroundColor}`}}>
                    {item.icon ? 
                        <>{item.icon}</> 
                        :
                        <Upload size="25" />
                    }
                </div>
                </>
                }
            </div> 
        </div>
        </>
    )
}

export default Element
