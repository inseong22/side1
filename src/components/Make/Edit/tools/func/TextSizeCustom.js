import React from 'react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

const titleSizeOptions = [
    { label: '작게', value: 36 },
    { label: '보통', value: 42 },
    { label: '크게', value: 54 },
]
const textSizeOptions = [
    { label: '작게', value: 28 },
    { label: '보통', value: 36 },
    { label: '크게', value: 42 },
]
const subTextSizeOptions = [
    { label: '작게', value: 16 },
    { label: '보통', value: 18 },
    { label: '크게', value: 20 },
]
const elementTitleOptions = [
    { label: '작게', value: 18 },
    { label: '보통', value: 20 },
    { label: '크게', value: 22 },
]
const elementDescOptions = [
    { label: '작게', value: 14 },
    { label: '보통', value: 16 },
    { label: '크게', value: 18 },
]
const buttonTextOptions = [
    { label: '작게', value: 10 },
    { label: '보통', value: 12 },
    { label: '크게', value: 14 }
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

function TextSizeCustom({text, value, func, desc, button, title, options, elementTitle, elementDesc}) {
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
                        />
                        :
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
                    <input className="text-size__input" type="number" value={value} onChange={e => func(e.currentTarget.value)}/>
                </div>
            </div>
        </div>
    )
}

export default TextSizeCustom
