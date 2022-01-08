import React from 'react'

function NaviTemplate1({navi}) {
    return (
        <>
            <span className="make-nav-bar-title" onClick={() => console.log("하이")}>
                {navi.title}
            </span>
            <span className="make-nav-on">
                { navi.button.use && <button className="make-nav-button" style={{backgroundColor:`${navi.button.color}`}}>{navi.button.title}</button> }
            </span>
        </>
    )
}

export default NaviTemplate1
