import React from 'react'
import '../custom.css'
import Flay11 from '../../../../../tools/img/layoutFooter/lay1-1.png'
import Flay12 from '../../../../../tools/img/layoutFooter/lay1-2.png'
import Flay21 from '../../../../../tools/img/layoutFooter/lay2-1.png'
import Flay22 from '../../../../../tools/img/layoutFooter/lay2-2.png'
import Flay31 from '../../../../../tools/img/layoutFooter/lay3-1.png'
import Flay32 from '../../../../../tools/img/layoutFooter/lay3-2.png'
import Clay11 from '../../../../../tools/img/layoutCta/layout1W.png'
import Clay12 from '../../../../../tools/img/layoutCta/layout1G.png'
import Clay21 from '../../../../../tools/img/layoutCta/layout2W.png'
import Clay22 from '../../../../../tools/img/layoutCta/layout2G.png'
import Clay31 from '../../../../../tools/img/layoutCta/layout3W.png'
import Clay32 from '../../../../../tools/img/layoutCta/layout3G.png'

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

export function EditRadioLayout({options, value, onChange, version}){
    switch(version){
        case 'cta': 
            return(
                <div className="radio-container">
                    {/* {value === 1 ? (<>클릭</>):(<>안클릭</>)} */}
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img className="icon" src={Clay11} />
                        ):(
                            <img className="icon" src={Clay12} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img className="icon" src={Clay21} />
                        ):(
                            <img className="icon" src={Clay22} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img className="icon" src={Clay31} />
                        ):(
                            <img className="icon" src={Clay32} />
                        )}
                    </div>
                </div>
            )
        case 'footer':
            return (
                <div className="radio-container">
                    {/* {value === 1 ? (<>클릭</>):(<>안클릭</>)} */}
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img className="icon" src={Flay12} />
                        ):(
                            <img className="icon" src={Flay11} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img className="icon" src={Flay22} />
                        ):(
                            <img className="icon" src={Flay21} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img className="icon" src={Flay32} />
                        ):(
                            <img className="icon" src={Flay31} />
                        )}
                    </div>
                </div>
            )
    }
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

const RadioCustom = ({text, options, value, func, button, layout, version}) => {
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
        if (layout === 'on'){
            return(
                <>
                 <div className="edit-element">
                    <div className="edit-element__one" style={{flexDirection: 'column'}}>
                        <div className="radio-container">
                            <EditRadioLayout 
                                options={options}
                                onChange={e => {func(e)}}
                                value={value}
                                version={version}
                            />
                        </div>
                    </div>
                </div>
                </>
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
}

export default RadioCustom
