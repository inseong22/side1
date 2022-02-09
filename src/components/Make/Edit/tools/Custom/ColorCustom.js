import React, {useContext, useState, useRef} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import { MakeContext } from '../../NewSectionMake'
import produce from 'immer'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import './ColorCustom.css'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
  } from '@chakra-ui/react'


export function EditColor({onChange, value}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const {stateC, actionC} = useContext(MakeContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [color, setColor] = useColor("hex", value);
    const [open, setOpen] = useState(null);
    const popover = useRef();
    const handleClick = () => {
        setOpen(!open);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ChakraProvider>
        <div className="center-row" style={{justifyContent: "start"}}>
            <div className="color-button" style={{backgroundColor : `${state.setting.color}`, color:`${state.setting.color === '#ffffff' ? '#555C67' : 'white'}`}} onClick={() => onChange(`${state.setting.color}`)}>
                {/* <div style={{color:'rgba(255,255,255,0.8)'}}>
                    main
                </div> */}
                <div>
                    {state.setting.color}
                </div>
            </div>
                <Popover
                    placement='right'
                    closeOnBlur={false}
                    isOpen={open}
                    onClose={() => {
                        handleClose();
                        if(stateC.usedColors.includes(value)){
                            return
                        }else{
                            if(stateC.usedColors.length > 5){
                                actionC.setUsedColors(produce(stateC.usedColors, draft => {
                                    draft.shift()
                                    draft.push(value)
                                }))
                            }else{
                                actionC.setUsedColors(produce(stateC.usedColors, draft => {
                                    draft.push(value)
                                }))
                            }
                        }
                    }}>
                <PopoverTrigger>
                    <div className="color-button" style={{backgroundColor:`${value}`, color:`${value === '#ffffff' ? '#555C67' : 'white'}`}} onClick={handleClick}>    
                        {value}
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    
                    <PopoverBody>
                        <div className="center-column">
                            <ColorPicker
                                width={300}
                                height={150}
                                color={color}
                                onChange={(e) => {
                                    setColor(e);
                                    onChange(e.hex);
                                }}
                                hideHSV
                                alpha
                            />
                            <div className="center-row">
                                {stateC.usedColors.map((item, index) => {
                                    return(
                                        <div onClick={() => {onChange(item); setColor({...color, hex:item})}} key={index}>
                                            <div className="recent-color-button" style={{backgroundColor:`${item}`}}>
                                                
                                            </div>
                                            {/* <div className="recent-color-text">
                                                {item}
                                            </div> */}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </PopoverBody>
                </PopoverContent>
                </Popover>
{/* 
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
            </Popover> */}
        </div>
        </ChakraProvider>
    )
}

const ColorCustom = ({text, value, func}) => {
    return(
        <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                {
                    text && <div className="edit-element__left">{text}</div>
                }
                <div className="edit-element__bottom">
                    <EditColor onChange={(e) => func(e)} value={value || 'white'} />
                </div>
            </div>
        </div>
    )
}

export default ColorCustom
