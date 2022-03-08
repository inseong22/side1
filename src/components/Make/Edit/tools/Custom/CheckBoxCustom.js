import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import {Check} from '@styled-icons/bootstrap';

export const EditCheckbox = ({value, func}) => {
    return(
        <>
        {/* <Checkbox
            checked={value || false}
            value={value || false}
            onClick={func}
            inputProps={{ 'aria-label': 'controlled' }}
        /> */}
        <div className={value ? 'custom-check' : 'custom-check cc-unclicked'}>
            <Check color='white' />
        </div>
        </>
    )
}

function CheckboxCustom({text, value, func}) {
    return(
        <div className="element__container opacity-hover" onClick={func}>
            <EditCheckbox 
                value={value || false}
                func={func}/>
            <div className="element_list_text" style={{color:`${value ? 'black' : 'var(--main-gray)'}`}}>
                {text}
            </div>
        </div>
    )
}

export default CheckboxCustom
