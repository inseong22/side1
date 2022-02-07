import React from 'react'
import './ApplyInputCustom.css'

function ApplyInputCustom({value, func, placeholder}) {
    return (
        <div className="edit-element" style={{justifyContent:'start', flexDirection:'column'}}>
            <div className="centera" style={{justifyContent:'start', marginTop:'12px'}}>
                <input  type='text' placeholder={placeholder}  value={value} onChange={e => func(e.currentTarget.value)} >
                </input>
                    <input type="button" value="생성"/>
            </div>
        </div>
    )
}

export default ApplyInputCustom

