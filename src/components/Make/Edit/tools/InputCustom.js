import React from 'react'
import {Link45deg} from '@styled-icons/bootstrap'

function InputCustom({value, onChange}) {
    return (
        <div className="center-row">
            <div>
                <Link45deg size="25" />
            </div>
            <div>
                <input placeholder="링크를 입력하세요." value={value} onChange={e => onChange(e.currentTarget.value)} />
            </div>
        </div>
    )
}

export default InputCustom
