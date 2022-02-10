import React, {useRef} from 'react'

function FuncContentVideo({text, value, func}) {
    const videoInput = useRef();
    const inputClick = () => {
        videoInput.current.click();
    }

    return (
        <div className="edit-element">
        <div className="top-img-div">
        <div className="put-video-div"
        onClick={inputClick}
        onChange={e=> func(e)}
        style={{cursor: 'pointer'}}
        >
           <input
                type="file"
                multiple
                accept="video/*"
                onChange={e=>func(e)}
                ref={videoInput}
                style={{display: 'none', cursor: 'pointer'}}
           /> 
        </div>
        <div className="upload-div">
            <div className="upload-click"
            onClick={inputClick}
            onChange={e => func(e)}
            id='attach'
            >
                {text} 업로드
            </div>
        <div className="small-command">
        .mp4 파일만 지원
        </div>
        </div>
        </div>
        </div>
    )
}

export default FuncContentVideo
