import React from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

const titleSizeOptions = [
    { label: 'S', value: 36 },
    { label: 'M', value: 42 },
    { label: 'L', value: 54 },
]
const textSizeOptions = [
    { label: 'S', value: 28 },
    { label: 'M', value: 36 },
    { label: 'L', value: 42 },
]
const subTextSizeOptions = [
    { label: 'S', value: 16 },
    { label: 'M', value: 18 },
    { label: 'L', value: 20 },
]
const logoSizeOptions = [
    { label: 'S', value: 28 },
    { label: 'M', value: 32 },
    { label: 'L', value: 36 },
]
const elementTitleOptions = [
    { label: 'S', value: 18 },
    { label: 'M', value: 20 },
    { label: 'L', value: 22 },
]
const elementDescOptions = [
    { label: 'S', value: 14 },
    { label: 'M', value: 16 },
    { label: 'L', value: 18 },
]
const buttonTextOptions = [
    { label: 'S', value: 10 },
    { label: 'M', value: 12 },
    { label: 'L', value: 14 }
]

function RadioCustom({options, value, onChange}) {
    return (
        <>
            {options.map((item, index) => {
                return(
                    <div className={value === item.value ? 'radio-element' : 'radio-element r-unclicked radio-hover'} onClick={() => onChange(item.value)} key={index}>
                        {item.label}
                    </div>
                )
            })}
            <input className="text-size__input" type="number" value={value} onChange={e => onChange(e.currentTarget.value)}
                style={{border:`${options.filter(doc => doc.value === value).length === 0 ? '1.5px solid #6C63FF' : '1.5px solid rgba(0,0,0,0)'}`}}
            />
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

function TextSizeCustom({text, value, logo, func, desc, button, title, options, elementTitle, elementDesc}) {
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
                        title ?
                        <RadioCustom 
                            options={titleSizeOptions}
                            onChange={e => func(e)}
                            value={value}
                        /> :
                        logo ?
                        <RadioCustom
                            options={logoSizeOptions}
                            onChange={e => func(e)}
                            value={value}
                        /> :
                        elementTitle ?
                        <RadioCustom 
                            options={elementTitleOptions}
                            onChange={e => func(e)}
                            value={value}
                        />
                        :
                        elementDesc ?
                        <RadioCustom 
                            options={elementDescOptions}
                            onChange={e => func(e)}
                            value={value}
                        />
                        :
                        button ?
                        <RadioCustom 
                            options={buttonTextOptions}
                            onChange={e => func(e)}
                            value={value}
                        />
                        :
                        <RadioCustom 
                            options={textSizeOptions}
                            onChange={e => func(e)}
                            value={value}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default TextSizeCustom
