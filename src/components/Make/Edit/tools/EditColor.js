import React from 'react'

function EditColor({onChange}) {
    return (
        <div className="center-row">
            <div className="color-button" style={{backgroundColor:"red"}}>
                
            </div>
            <div className="color-button" style={{backgroundColor:"blue"}}>
                
            </div>
            <div className="color-button" style={{backgroundColor:"green"}}>
                
            </div>
            <input type="color" onChange={onChange}/>
        </div>
    )
}

export default EditColor
