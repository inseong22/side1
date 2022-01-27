import React, {useRef} from 'react'

function AddContentImg({value, func, removeFunc}) {
    const photoInput = useRef();
    const inputClick = () => {
        photoInput.current.click();
      };
    
      

    return (
        <>
        <div className="put-img-div" onClick={inputClick}
        style={{backgroundImage: `url(${value}`}}
        >
            <div 
                className="img-remove"
                onClick={ e => removeFunc(e) }
            >X</div>
            <input
                type="file" 
                accept="image/*" 
                id="file" 
                onChange={ e => func(e) }
                ref={photoInput}
                style={{display: 'none', cursor: 'pointer'}}
            /> 
            <div className="img-command">
            5MB 이하, <br />가로 1200px를 권장합니다!
            </div>
        </div>
        </>
    )
}

export default AddContentImg
