import React from 'react'

function Template1({content}) {
    /*
    * 이미지 왼쪽
    * 텍스트 오른쪽
    */
    return (
        <div>
            <pre>
                {content.titles.title}
            </pre>
        </div>
    )
}

export default Template1
