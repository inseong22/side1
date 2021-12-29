import React from 'react'

function NaviTemplate2({navi}) {
    return (
        <>
            <span className="make-nav-on">
                <button className="make-nav-button" onClick={() => console.log("내비 클릭")}>{navi.buttonTitle}</button>
            </span>
            <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                {navi.title}
            </span>
        </>
    )
}

export default NaviTemplate2
