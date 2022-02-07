import React from 'react'
import '../custom.css'

export function EditRadio({options, value, onChange}) {
    return (
        <div className="radio-container">
            {options.map((item, index) => {
                return(
                    <div className={value === item.value ? 'radio-element' : 'radio-element r-unclicked'} onClick={() => onChange(item.value)} key={index}>
                        {item.label}
                    </div>
                )
            })}
        </div>
    )
}

export function EditRadioButtom({options, value, onChange}) {
    const ROUNDBORDER = 5;
    const CIRCLEBORDER = 15;

    return (
        <div className="radio-container">
            <div className={value === 0 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(0)}>
                <div className="radio-shape box">

                </div>
                <div className="radio-shape-text">
                    사각형
                </div>
            </div>
            <div className={value === ROUNDBORDER ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(ROUNDBORDER)}>
                <div className="radio-shape round">

                </div>
                <div className="radio-shape-text">
                    라운드
                </div>
            </div>
            <div className={value === CIRCLEBORDER ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(CIRCLEBORDER)}>
                <div className="radio-shape circle">

                </div>
                <div className="radio-shape-text">
                    원형
                </div>
            </div>
        </div>
    )
}

const RadioCustom = ({text, options, value, func, button}) => {
    if (button === true){
        return(
            <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                {text ? 
                    <div className="edit-element__left">{text}</div> 
                    : 
                    <div className="edit-element__left">{text}</div> 
                }
                <div className="radio-container">
                    <EditRadioButtom
                        options={options}
                        onChange={e => {func(e)}}
                        value={value}
                        />
                </div>
            </div>
        </div>
        )
    }else{
        return(
            <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                {text ? 
                    <div className="edit-element__left">{text}</div> 
                    : 
                    <div className="edit-element__left">{text}</div> 
                }
                <div className="radio-container">
                    <EditRadio 
                        options={options}
                        onChange={e => {func(e)}}
                        value={value}
                        />
                </div>
            </div>
        </div>
        )
    }
}

export default RadioCustom
