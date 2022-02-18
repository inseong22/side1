import React, {useRef} from 'react'
import './FuncContentVideo.css'

function FuncContentVideo({text, value, func}) {
    const videoInput = useRef();
    const inputClick = () => {
        videoInput.current.click();
    }

    return (
        <div className="edit-element">
        <div className="upload-video-div">
        <input
            type="file" 
            accept="video/*" 
            multiple
            onChange={ e => func(e) }
            ref={videoInput}
            style={{display: 'none', cursor: 'pointer'}}
        /> 
            <div className="upload-click uphover"
                onChange={e => func(e)}
                onClick={inputClick}
                id='attach' >
                {text} 업로드
            </div>
            <div className="small-command">
            .mp4 파일만 지원
            </div>
        </div>
        </div>
    )
}

export default FuncContentVideo
