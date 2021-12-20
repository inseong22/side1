import React from 'react'

function MakeNavigation(props) {
    return (
        <div className="make-navigation" style={{width:`${props.full ? '100%' : '100%'}`, backgroundColor:`${props.naviColor}`}}>
            <span className="make-nav-bar-title" onClick={() => {props.history.push(`/#/${props.urlId}`); props.history.go();}} style={{fontFamily:`${props.font}`, cursor:'pointer', color:`${props.naviTitleColor}`}}>
                {props.naviTitle}
            </span>
            <span className="make-nav-on">
                <button className="make-nav-button" style={{color:`${props.naviButtonColor}`,fontFamily:`${props.descFont}`, cursor:'pointer'}} onClick={() => console.log("내비 클릭")}>{props.naviButtonTitle}</button>
            </span>
        </div>
    )
}

export default MakeNavigation
