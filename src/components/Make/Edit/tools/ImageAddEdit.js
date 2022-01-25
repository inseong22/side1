import React from 'react'

function ImageAddEdit({value, func}) {
    return (
        <>
            <input type="file" accept="image/*" id="file" onChange={ e => func(e) }/> 
            <img src={value} width={50} />
        </>
    )
}

export default ImageAddEdit
