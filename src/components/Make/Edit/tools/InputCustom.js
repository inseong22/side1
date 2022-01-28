import React from 'react'
import {Link45deg} from '@styled-icons/bootstrap'

function InputCustom({value, func}) {
    return (
        <div className="center-row">
            <div>
                <Link45deg size="25" />
            </div>
            <div>
                <input className="edit-input" placeholder="링크를 입력하세요." value={value} onChange={e => func(e.currentTarget.value)} />
            </div>
        </div>
    )
}

export default InputCustom
