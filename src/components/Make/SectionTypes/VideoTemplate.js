import React from 'react'

function Template4({content}) {
    /*
    * 그래프 템플릿
    */

    const uploadVideo = () => {
    }

    return (
        <div>
            비디오
            <div onClick={() => uploadVideo()}>여기를 클릭해서 비디오를 추가해 주세요.</div>
        </div>
    )
}

export default Template4
