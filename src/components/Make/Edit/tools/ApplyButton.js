import React from 'react'
import './ApplyCustom.css'

function ApplyButton({value, func}) {
    return (
        <div>
            <div className="center-row">
            <div>
                <input className="edit-input" placeholder="연결하고 싶은 URL을 입력하세요" value={value} onChange={e => func(e.currentTarget.value)} >
                    {/* <div className="make-button" /> */}
                </input>
            </div>
        </div>
        </div>
    )
}

export default ApplyButton

