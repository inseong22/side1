import React, {useRef} from 'react'

function FuncContentImg({text, value, func, removeFunc, subtext}) {
    const photoInput = useRef();
    const inputClick = () => {
        photoInput.current.click();
    };

    return (
        <div className="edit-element">
        <div className="top-img-div">
        <div className="put-img-div" 
            onClick={inputClick}
            onChange={e => func(e)}
            id='attach'
            style={{backgroundImage: `url(${value}`}}
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
                style={{display: 'none', cursor: 'pointer'}}
            /> 
            {/* <div className="img-command">
            5MB 이하, <br />가로 1200px를 권장합니다!
            </div> */}
        </div>
        <div className="upload-div">
            <div className="upload-click"
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
