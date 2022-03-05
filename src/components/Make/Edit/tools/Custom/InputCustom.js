import React from 'react'
import {Link45deg} from '@styled-icons/bootstrap'
import './InputCustom.css'

function EditInput({value, func, placeholder, noKorean}) {
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

export function InputCustom({value, func, placeholder, text, noKorean}) {
    const onChangeHandler = (e) => {
        if(noKorean){
            func(e)
        }else{
            func(e)
        }
    }

    return (
        <div className="edit-element" style={{justifyContent:'start', flexDirection:'column'}}>
            {
                text &&
                <div className="centera" style={{justifyContent:'start'}}>
                    {text}
                </div>
            }
            <div className="input-centera" style={{marginTop:`${text ? '12px' : '0px'}`, justifyContent:'start'}}>
                <input className="edit-input" placeholder={placeholder} value={value} onChange={e => onChangeHandler(e)} />
            </div>
        </div>
    )
}

export default InputCustom
