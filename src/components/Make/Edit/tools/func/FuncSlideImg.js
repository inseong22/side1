import React, {useRef} from 'react'

function FuncSlideImg({text, value, func, removeFunc}) {
    const photoInput = useRef();
    const inputClick = () => {
        photoInput.current.click();
    };

    return (
        <div className="top-img-div">
        <div className="put-slider-img" 
        onClick={inputClick}
        onChange={e => func(e)}
        id='attach'
        style={{backgroundImage: `url(${value}`}}
        >
            <div 
                className="img-remove"
                onClick={ e => removeFunc(e) }
            >+</div>
            <input
                type="file" 
                accept="image/*" 
                id="file" 
                onChange={ e => func(e) }
                ref={photoInput}
                style={{display: 'none', cursor: 'pointer'}}
            /> 
            <div className="embed-command">
                파일 선택
            </div>
        </div>
        </div>

    )
}

export default FuncSlideImg
