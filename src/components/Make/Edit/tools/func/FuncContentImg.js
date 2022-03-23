import React, {useRef, useState} from 'react'
import ourA from '../../../../../tools/img/005.png'
import ImageModal from '../../../../../tools/ImageModal'

function FuncContentImg({text, value, func, removeFunc, subtext}) {
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const photoInput = useRef();
    const inputClick = () => {
        photoInput.current.click();
    };

    return (
        <div className="edit-element">
        {/* <ImageModal open={imageModalOpen} setOpen={setImageModalOpen} /> */}
        {/* <div onClick={() => setImageModalOpen(true)}>
            이미지를 찾아보실래요?
        </div> */}
        <div className="top-img-div">
        <div className="put-img-div" 
            onClick={inputClick}
            onChange={e => func(e)}
            id='attach'
            style={{backgroundImage: `url(${value === '' && (text === '목업' || text === '로고' || text === '목업1' || text === '목업2')  ? '' : value!='' ? value : ourA}`}}
            >
            {/* <div 
                className="img-remove"
                onClick={ e => removeFunc(e) }
            >X</div> */}
            <input
                type="file" 
                accept="image/*" 
                id="file" 
                onChange={ e => func(e) }
                ref={photoInput}
                style={{display: 'none', cursor: 'pointer', objectFit:'cover'}}
            /> 
            {/* <div className="img-command">
            5MB 이하, <br />가로 1200px를 권장합니다!
            </div> */}
        </div>
        <div className="upload-div">
            <div className="upload-img-click"
            onClick={inputClick}
            onChange={e => func(e)}
            id='attach'
            >
                {
                    value ? `${text} 수정` : `${text} 업로드`
                }
            </div>
        <div className="small-command">
        {subtext}
        </div>
        </div>
        </div>
        </div>
    )
}

export default FuncContentImg
