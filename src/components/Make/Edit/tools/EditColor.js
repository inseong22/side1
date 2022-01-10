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

export default EditColor
