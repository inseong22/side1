import React from 'react'
import './custom.css'

function AnimationCustom({options, value, onChange}) {
    return (
        <div>
            {options.map((item, index) => {
                let backColor = "rgb(100,100,100)";
                if(value === item.value){
                    backColor = "#6a6cfa";
                }
                if(index === 0){
                    return(
                        <span className="animation-box" style={{border:`1px solid ${backColor}`, color:`${backColor}`}} onClick={() => onChange(item.value)} key={index}>
                            {item.label}
                        </span>
                    )
                }else if(index === (options.length - 1)){
                    return(
                        <span className="animation-box" style={{border:`1px solid ${backColor}`, color:`${backColor}`}} onClick={() => onChange(item.value)} key={index}>
                            {item.label}
                        </span>
                    )
                }
                else{
                    return(
                        <span className="animation-box" style={{border:`1px solid ${backColor}`, color:`${backColor}`}} onClick={() => onChange(item.value)} key={index}>
                            {item.label}
                        </span>
                    )
                }
            })}
        </div>
    )
}

export const EditAnimationContainer = ({text, options, value, func}) => {
    return(
        <div className="edit-element">
                <div className="animation-div" />
                    <AnimationCustom 
                        options={options}
                        onChange={e => {func(e)}}
                        value={value}
                    />
        </div>
    )
}

export default AnimationCustom
