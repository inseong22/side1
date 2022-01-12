import React, {useState, useRef, useEffect} from 'react'
import {ChevronDown} from '@styled-icons/bootstrap';
import Popover from '@mui/material/Popover';

function SelectCustom({options, onChange, value}) {
    const [selectOpen, setSelectOpen] = useState(false);
    const el = useRef();

    return (
        <div>
            <div className="select-open-button center-row" onClick={(e) => setSelectOpen(!selectOpen)} 
                style={{
                    borderBottom:`${selectOpen ? 'none' : '1px solid rgb(192, 192, 192)'}`,
                    borderBottomLeftRadius:`${selectOpen ? '0px' : '5px'}`,
                    borderBottomRightRadius:`${selectOpen ? '0px' : '5px'}`,
                }}>
                <div className="select-button__content" style={{paddingLeft:'15px'}}>
                    {options.filter(doc => doc.value === value).label}
                </div>
                <div className="select-button__content" style={{justifyContent:'end', paddingRight:'15px'}}><ChevronDown size="20" /></div>
            </div>
            {
            selectOpen && 
                <div className="select-options__container" ref={el}>
                    {options.map((item, index) => {
                        return(
                            <div className="select-hover" onClick={() => {onChange(item.value); setSelectOpen(!selectOpen)}}
                                style={{borderBottomLeftRadius:`${index === options.length -1 ? '5px' : '0px'}`,borderBottomRightRadius:`${index === options.length ? '5px' : '0px'}`}}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SelectCustom
