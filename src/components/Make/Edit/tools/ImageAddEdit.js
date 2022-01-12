import React from 'react'

function ImageAddEdit({text, value, func}) {
    return (
        <>
            <div className="edit-element">
                <div className="edit-element__one">
                    <div className="edit-element__left">{text}</div>
                    <div className="edit-element__right">
                        <input type="file" accept="image/*" id="file"
                            onChange={ e => func(e) } style={{width:'20px', height:'20px'}}/> 
                    </div>
                </div>
            </div>
            <div className="edit-element">
                <div className="edit-element__one">
                    <img src={value} width={50} />
                </div>
            </div>
        </>
    )
}

export default ImageAddEdit
