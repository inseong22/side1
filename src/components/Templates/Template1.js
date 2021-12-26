import React from 'react'

function Template1({content}) {
    /*
    * only 텍스트
    */
    return (
        <div className="make-main-page-section">
            <pre dangerouslySetInnerHTML={{__html: content.titles.title}}>
            </pre>
        </div>
    )
}

export default Template1
