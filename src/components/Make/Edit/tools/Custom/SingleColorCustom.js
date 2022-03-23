import React, {useContext, useState, useRef} from 'react'
import { MakeContext } from '../../NewSectionMake'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import './ColorCustom.css'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Portal,
  } from '@chakra-ui/react'

export function EditColor({onChange, value}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const {stateC, actionC} = useContext(MakeContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [color, setColor] = useColor("hex", value);
    const popover = useRef();    

    return (
        <ChakraProvider>
        <div className="center-row" style={{justifyContent: "center"}}>
            <Popover
                    placement='right'
                    onClose={() => {
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
                    <button className="color-button" style={{backgroundColor:`${value}`, color:`${value === '#ffffff' ? '#555C67' : 'white'}`}}>    
                        {value}
                    </button>
                </PopoverTrigger>
                <Portal>
                <PopoverContent style={{zIndex: 100}}>
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
                </Portal>
                </Popover>
        </div>
        </ChakraProvider>
    )
}

const SingleColorCustom = ({text, value, func}) => {
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

export default SingleColorCustom
