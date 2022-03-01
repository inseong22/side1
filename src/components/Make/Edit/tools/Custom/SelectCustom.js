import React, {useState, useEffect} from 'react'
import {ChevronDown} from '@styled-icons/bootstrap';
import Popover from '@mui/material/Popover';
import './SelectCustom.css'

function SelectCustom({options, onChange, value}) {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div className="select-open-button center-row" aria-describedby={id} variant="contained" onClick={handleClick}>
                <div className="select-button__content" style={{paddingLeft:'15px'}}>
                    {options.filter(doc => doc.value === value)[0].label}
                </div>
                <div className="select-button__content" style={{justifyContent:'end', paddingRight:'15px'}}><ChevronDown size="17" /></div>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="so__container">
                    {options.map((item, index) => {
                        return(
                            <div className="select-hover" onClick={() => {onChange(item.value); setAnchorEl('')}}
                                style={{ fontFamily:`${item.value}`, borderBottomLeftRadius:`${index === options.length -1 ? '5px' : '0px'}`,borderBottomRightRadius:`${index === options.length ? '5px' : '0px'}`}}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            </Popover>
        </div>
    )
}

export default SelectCustom
