import React, {useContext, useState, useRef} from 'react'
import { Chrome } from '@uiw/react-color';
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import { Alpha } from '@uiw/react-color';

import Popover from '@mui/material/Popover';

export function EditColor({onChange, value}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const colorRef = useRef(null)
    const [colorShow, setColorShow] = useState(null);
    const [usedColors, setUsedColors] = useState([
        "rgb(0,0,0)",
        "rgb(0,0,255)",
        "rgb(0,255,0)",
        "rgb(255,0,0)",
        "rgb(255,255,255)",
    ]);

    return (
        <div className="center-row" style={{justifyContent: "start"}}>
            <div className="color-button" style={{backgroundColor : `${state.setting.color}`, color:`${state.setting.color === '#ffffff' ? '#555C67' : 'white'}`}} onClick={() => onChange(`${state.setting.color}`)}>
                {/* <div style={{color:'rgba(255,255,255,0.8)'}}>
                    main
                </div> */}
                <div>
                    {state.setting.color}
                </div>
            </div>

            <div ref={colorRef} className="color-button" style={{backgroundColor:`${value}`, color:`${value === '#ffffff' ? '#555C67' : 'white'}`}} onClick={(e) =>{ setColorShow(e.currentTarget)}}>    
                {value}
            </div>

            <Popover
                id={Boolean(colorShow) ? 'simple-popover' : undefined} // 수정
                open={Boolean(colorShow)} // 수정
                anchorEl={colorShow} // 수정 // 수정
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}

                onClose={() => {
                    setColorShow(null)
                    if(usedColors.includes(value)){
                        return
                    }else{
                        if(usedColors.length > 4){
                            usedColors.shift()
                            setUsedColors([...usedColors, value])
                        }else{
                            setUsedColors([...usedColors, value])
                        }
                    }
                }}>
                <div>
                    <div>
                        <div>
                            <Chrome
                                color={value}
                                // placement={GithubPlacement.Right}
                                onChange={(color) => {
                                    onChange(color.hex);
                                }}
                            />
                        </div>
                        <div>
                            사용한 색상
                        </div>
                        <div className="center-row">
                            {usedColors.map((item, index) => {
                                return(
                                    <div className="color-button" style={{backgroundColor:`${item}`}} onClick={() => onChange(item)} key={index}>
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

const ColorCustom = ({text, value, func}) => {
    return(
        <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                <div className="edit-element__left">{text}</div>
                <div className="edit-element__bottom">
                    <EditColor onChange={(e) => func(e)} value={value || 'white'} />
                </div>
            </div>
        </div>
    )
}

export default ColorCustom
