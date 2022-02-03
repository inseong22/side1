import React from 'react'
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import './OnOffCustom.css'

export const CustomSwitch = ({value, onChange}) => {
  return(
    <div className={value ? 'custom-switch' : 'custom-switch unclicked'} onClick={onChange}>
      <div className="custom-switch-thumb" style={{left : `${value ? '32px' : '2px'}`}}></div>
    </div>
  )
}

function OnOffCustom({text, value, func}) {
    return (
      <div className="edit-element">
        <div className="edit-element__left">
            {text}
        </div>
        <div className="edit-element__right">
            <CustomSwitch value={value} onChange={e => func()} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
        </div>
      </div>
    )
}

export default OnOffCustom
