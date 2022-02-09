import React from 'react'
import RiseW from '../../../../../tools/img/animationIcon/riseUpW.png'
import RiseG from '../../../../../tools/img/animationIcon/riseUpG.png'
import FadeW from '../../../../../tools/img/animationIcon/fadeInW.png'
import FadeG from '../../../../../tools/img/animationIcon/fadeInG.png'

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
                    {value === FADEUP ? (
                    <>
                        <img src={RiseW} />
                        <div className="radio-shape-text">
                            떠오르기
                        </div>
                        <div className="radio-shape-subtext">
                            0.8초
                        </div>
                    </>
                    ):(
                        <>
                        <img src={RiseG} />
                        <div className="radio-shape-text">
                            떠오르기
                        </div>
                        <div className="radio-shape-subtext">
                            0.8초
                        </div>
                        </>
                    )}
                </div>

                <div className={value === ZOOMIN ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(ZOOMIN)}>
                    {value === ZOOMIN ? (
                    <>
                        <img src={FadeW} />
                        <div className="radio-shape-text">
                            페이드 인                           
                        </div>
                        <div className="radio-shape-subtext">
                            0.8초
                        </div>
                    </>
                    ):(
                        <>
                        <img src={FadeG} />
                        <div className="radio-shape-text">
                            페이드 인
                        </div>
                        <div className="radio-shape-subtext">
                            0.8초
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

const AnimationCustom = ({options, value, func}) => {
    return(
            <EditAnimation 
                options={options}
                onChange={e => {func(e)}}
                value={value}
            />

    )
}

export default AnimationCustom

