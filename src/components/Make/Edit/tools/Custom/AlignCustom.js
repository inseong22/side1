import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import {AlignLeft} from '@styled-icons/fa-solid'
import {AlignCenter} from '@styled-icons/fa-solid'

const alignOptions = [
    {label:<AlignLeft size="20"/>, value: 'start'},
    {label:<AlignCenter size="20"/>, value: 'center'}
]

export function EditAlignRadio({options, value, onChange}) {
    return (
        <div className="radio-container">
            {options.map((item, index) => {
                return(
                    <div className={value === item.value ? 'radio-element' : 'radio-element r-unclicked radio-hover'} onClick={() => onChange(item.value)} key={index}>
                        {item.label}
                    </div>
                )
            })}
        </div>
    )
}

function AlignCustom({value, func, all}) {
    return (
        <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                <div className="edit-element__left">
                    {all ? '전체 정렬' : '정렬'}
                </div> 
                <div className="radio-container">
                    <EditAlignRadio 
                        options={alignOptions}
                        onChange={e => {func(e)}}
                        value={value}
                        />
                </div>
            </div>
        </div>
    )
}

export default AlignCustom
