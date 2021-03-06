import React from 'react'
import RiseW from '../../../../../tools/img/animationIcon/riseUpW.png'
import RiseG from '../../../../../tools/img/animationIcon/riseUpG.png'
import FadeW from '../../../../../tools/img/animationIcon/fadeInW.png'
import FadeG from '../../../../../tools/img/animationIcon/fadeInG.png'
import {ArrowRightSquareFill, ArrowLeftSquareFill } from '@styled-icons/bootstrap'
import {ExpandUpRight} from '@styled-icons/fluentui-system-filled'

// 애니메이션 관련 
const animationOptions = [
    {label:'없음', value: 'none'},
    {label:'떠오르기', value: 'fade-up'},
    {label:'fade-zoom-in', value: 'fade-zoom-in'},
    {label:'fade-right', value: 'fade-right'},
    {label:'fade-left', value:'fade-left'},
    {label:'zoom-in', value:'zoom-in'},
]

function EditAnimation({options, value, onChange}) {
    const NONE = 'none'
    const FADEUP = 'fade-up'
    const FADEIN = 'fade-in'
    const FADERIGHT = 'fade-right'
    const FADELEFT = 'fade-left'
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
                    </>
                    ):(
                        <>
                        <img src={RiseG} />
                        <div className="radio-shape-text">
                            떠오르기
                        </div>
                        </>
                    )}
                </div>

                <div className={value === FADEIN ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(FADEIN)}>
                    {value === FADEIN ? (
                    <>
                        <img src={FadeW} />
                        <div className="radio-shape-text">
                            페이드 인                           
                        </div>
                    </>
                    ):(
                        <>
                        <img src={FadeG} />
                        <div className="radio-shape-text">
                            페이드 인
                        </div>
                        </>
                    )}
                </div>
            </div>
            <div className="radio-container">
                <div className={value === FADERIGHT ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(FADERIGHT)}>
                    {value == FADERIGHT ? (
                        <>
                        <ArrowRightSquareFill style={{width: '28px', height: '28px'}}/>
                        <div className="radio-shape-text">
                            페이드 R
                        </div>
                        </>
                    ):(
                        <>
                        <ArrowRightSquareFill style={{width: '28px', height: '28px'}}/>
                        <div className="radio-shape-text">
                            페이드 R
                        </div>
                        </>
                    )}
                </div>
                <div className={value === FADELEFT ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(FADELEFT)}>
                {value == FADELEFT ? (
                        <>
                        <ArrowLeftSquareFill style={{width: '28px', height: '28px'}}/>
                        <div className="radio-shape-text">
                            페이드 L
                        </div>
                        </>
                    ):(
                        <>
                        <ArrowLeftSquareFill style={{width: '28px', height: '28px'}}/>
                        <div className="radio-shape-text">
                            페이드 L
                        </div>
                        </>
                    )}
                </div>
                <div className={value === ZOOMIN ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => onChange(ZOOMIN)}>
                {value == ZOOMIN ? (
                        <>
                        <ExpandUpRight style={{width: '30px', height: '30px'}}/>
                        <div className="radio-shape-text">
                            줌 인
                        </div>
                        </>
                    ):(
                        <>
                        <ExpandUpRight style={{width: '30px', height: '30px'}}/>
                        <div className="radio-shape-text">
                            줌 인
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
                options={animationOptions}
                onChange={e => {func(e)}}
                value={value}
            />

    )
}

export default AnimationCustom

