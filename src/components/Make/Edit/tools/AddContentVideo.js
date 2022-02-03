import React, {useRef} from 'react'

function AddContentVideo({value, func}) {
    const videoInput = useRef();
    const inputClick = () => {
        videoInput.current.click();
    }

    return (
        <div className="put-video-div"
        onClick={inputClick}
        onChange={e=> func(e)}
        style={{cursor: 'pointer'}}
        > 동영상 업로드
           <input
                type="file"
                multiple
                accept="video/*"
                onChange={e=>func(e)}
                ref={videoInput}
                style={{display: 'none', cursor: 'pointer'}}
           /> 
        </div>
    )
}

export default AddContentVideo
