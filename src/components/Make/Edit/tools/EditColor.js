import React from 'react'

function EditColor({onChange}) {
    return (
        <div className="center-row">
            <div className="color-button" style={{backgroundColor:"red"}} onClick={() => onChange('red')}>
                
            </div>
            <div className="color-button" style={{backgroundColor:"blue"}} onClick={() => onChange('blue')}>
                
            </div>
            <div className="color-button" style={{backgroundColor:"green"}} onClick={() => onChange('green')}>
                
            </div>
            <input className="color-button" type="color" value onChange={(e) => onChange(e.currentTarget.value)}/>
        </div>
    )
}

export const returnColorContainer = (text, value, func) => {
    return(
        <div className="edit-element">
            <div className="edit-element__one">
                <div className="edit-element__left">{text}</div>
                <div className="edit-element__right">
                    <EditColor onChange={(e) => func(e)} value={value || 'white'} />
                </div>
            </div>
        </div>
    )
}

export const EditColorContainer = ({text, value, func}) => {
    return(
        <div className="edit-element">
            <div className="edit-element__one">
                <div className="edit-element__left">{text}</div>
                <div className="edit-element__right">
                    <EditColor onChange={(e) => func(e)} value={value || 'white'} />
                </div>
            </div>
        </div>
    )
}

export default EditColor
