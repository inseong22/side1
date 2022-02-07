import React from 'react'

function BoxCustom(props) {
    return (
        <div className="one-element">
            <div className="edit-element__box">
                {props.children}
            </div>
        </div>
    )
}

export default BoxCustom
