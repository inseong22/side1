import React from 'react'

function EditAnimation({options, value, onChange}) {
    const NONE = 'none'
    const FADEUP = 'fade-up'
    const ZOOMIN = 'zoom-in'

    return (
        <div>
            <div className="radio-container">
                <div className={value === NONE ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(NONE)}>
                    <div className="radio-shape round">
            
                    </div>
                    <div className="radio-shape-text">
                        없음
                    </div>
                </div>
                <div className={value === FADEUP ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(FADEUP)}>
                    <div className="radio-shape round">
            
                    </div>
                    <div className="radio-shape-text">
                        떠오르기
                    </div>
                </div>
                <div className={value === ZOOMIN ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(ZOOMIN)}>
                    <div className="radio-shape circle">
            
                    </div>
                    <div className="radio-shape-text">
                        페이드인
                    </div>
                </div>
            </div>
        </div>
    )
}

const AnimationCustom = ({text, options, value, func}) => {
    return(
        <div className="edit-element">
            <div className="animation-div" />
                <EditAnimation 
                    options={options}
                    onChange={e => {func(e)}}
                    value={value}
                />
        </div>
    )
}

export default AnimationCustom

