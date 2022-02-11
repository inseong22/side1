import React from 'react'
import '../custom.css'
import Blay1G from '../../../../../tools/img/layoutMainDetail/base1G.png'
import Blay1W from '../../../../../tools/img/layoutMainDetail/base1W.png'
import Blay2G from '../../../../../tools/img/layoutMainDetail/base2G.png'
import Blay2W from '../../../../../tools/img/layoutMainDetail/base2W.png'
import Blay3G from '../../../../../tools/img/layoutMainDetail/base3G.png'
import Blay3W from '../../../../../tools/img/layoutMainDetail/base3W.png'
import Blay4G from '../../../../../tools/img/layoutMainDetail/base4G.png'
import Blay4W from '../../../../../tools/img/layoutMainDetail/base4W.png'
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
import Tlay1G from '../../../../../tools/img/layoutText/text1G.png'
import Tlay1W from '../../../../../tools/img/layoutText/text1W.png'
import Tlay23G from '../../../../../tools/img/layoutText/text23G.png'
import Tlay23W from '../../../../../tools/img/layoutText/text23W.png'

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
        case 'main':
            return(
                <div className="radio-container">
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img src={Blay1W} />
                        ):(
                            <img src={Blay1G} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img src={Blay2W} />
                        ):(
                            <img src={Blay2G} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img src={Blay3W} />
                        ):(
                            <img src={Blay3G} />
                        )}
                    </div>
                    <div className={value === 4 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(4)}>
                    {value === 4 ? (
                            <img src={Blay4W} />
                        ):(
                            <img src={Blay4G} />
                        )}
                    </div>
                </div>
            )
        case 'cta': 
            return(
                <div className="radio-container">
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img src={Clay11} />
                        ):(
                            <img src={Clay12} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img src={Clay21} />
                        ):(
                            <img src={Clay22} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img src={Clay31} />
                        ):(
                            <img src={Clay32} />
                        )}
                    </div>
                </div>
            )
        case 'text':
            return (
                <div className="radio-container">
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img src={Tlay1W} />
                        ):(
                            <img src={Tlay1G} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img className='text-layout2' src={Tlay23W} />
                        ):(
                            <img className='text-layout2' src={Tlay23G} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img className='text-layout3' src={Tlay23W} />
                        ):(
                            <img className='text-layout3' src={Tlay23G} />
                        )}
                    </div>
                </div>
            )
        case 'footer':
            return (
                <div className="radio-container">
                    <div className={value === 1 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(1)}>
                        {value === 1 ? (
                            <img src={Flay12} />
                        ):(
                            <img src={Flay11} />
                        )}
                    </div>
                    <div className={value === 2 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(2)}>
                        {value === 2 ? (
                            <img src={Flay22} />
                        ):(
                            <img src={Flay21} />
                        )}
                    </div>
                    <div className={value === 3 ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(3)}>
                    {value === 3 ? (
                            <img src={Flay32} />
                        ):(
                            <img src={Flay31} />
                        )}
                    </div>
                </div>
            )
    }
}

export function EditRadioButtom({options, value, onChange}) {
    const ROUNDBORDER = 5;
    const CIRCLEBORDER = 500;

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
