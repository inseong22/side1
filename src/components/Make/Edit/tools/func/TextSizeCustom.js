import React from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

const textSizeOptions = [
    { label: 's', value: 24 },
    { label: 'm', value: 32 },
    { label: 'l', value: 42 },
]
const subTextSizeOptions = [
    { label: 's', value: 16 },
    { label: 'm', value: 18 },
    { label: 'l', value: 20 },
]

function RadioCustom({options, value, onChange}) {
    return (
        <>
            {options.map((item, index) => {
                return(
                    <div className={value === item.value ? 'radio-element' : 'radio-element r-unclicked'} onClick={() => onChange(item.value)} key={index}>
                        {item.label}
                    </div>
                )
            })}
        </>
    )
}

export function NumberInputCustom({value, func}) {
    return(
        <NumberInput size='sm' value={value} onChange={val => func(val)} min={10}>
            <NumberInputField focusBorderColor='red.200' />
            <NumberInputStepper>
                <NumberIncrementStepper
                bg='green.200'
                _active={{ bg: 'green.300' }}
                children='+'
                />
                <NumberDecrementStepper
                bg='pink.200'
                _active={{ bg: 'pink.300' }}
                children='-'
                />
            </NumberInputStepper>
        </NumberInput>
    )
}

function TextSizeCustom({text, value, func, desc, options}) {
    return (
        <div className="edit-element">
            <div className="edit-element__one" style={{flexDirection: 'column'}}>
                <div className="edit-element__left">{text}</div>
                <div className="edit-element__right" style={{flexDirection: 'row'}}>
                    {
                        options ? 
                        <RadioCustom 
                            options={options}
                            onChange={e => func(e)}
                            value={value}
                        /> :
                        desc ? 
                        <RadioCustom 
                            options={subTextSizeOptions}
                            onChange={e => func(e)}
                            value={value}
                        /> : 
                        <RadioCustom 
                            options={textSizeOptions}
                            onChange={e => func(e)}
                            value={value}
                        />
                    }
                    <input className="text-size__input" type="number" value={value} onChange={e => func(e.currentTarget.value)}/>
                </div>
            </div>
        </div>
    )
}

export default TextSizeCustom
