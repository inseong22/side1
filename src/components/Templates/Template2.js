import React from 'react'

function Template2({content}) {
    /*
    * 이미지
    */
    return (
        <div>
            <img src={content.attachment} style={{width:`${content.width}%`}} />
        </div>
    )
}

export default Template2
