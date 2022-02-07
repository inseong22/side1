import React from 'react'
import {Link45deg} from '@styled-icons/bootstrap'
import './InputCustom.css'

function EditInput({value, func, placeholder}) {
    return (
        <div className="edit-element" style={{justifyContent:'start'}}>
            {/* <div>
                <Link45deg size="25" />
            </div> */}
            <div className="centera">
                <input className="edit-input" placeholder={placeholder} value={value} onChange={e => func(e.currentTarget.value)} />
            </div>
        </div>
    )
}

export function InputCustom({value, func, placeholder, text}) {
    return (
        <div className="edit-element" style={{justifyContent:'start', flexDirection:'column'}}>
            <div className="centera" style={{justifyContent:'start'}}>
                {text}
            </div>
            <div className="centera" style={{marginTop:'12px'}}>
                <input className="edit-input" placeholder={placeholder} value={value} onChange={e => func(e.currentTarget.value)} />
            </div>
        </div>
    )
}

export default InputCustom
