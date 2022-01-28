import React from 'react'
import Editor from '../tools/Editor'

function NaviTemplate({navi, setNavi}) {

    const returnCtaButton = () => {
        return(
            <button className="make-nav-button b-one">
                버튼
            </button>
        )
    }
    const returnGhostButton = () => {
        return(
            <button className="make-nav-button b-one">
                버튼
            </button>
        )
    }

    return (
        <>
            <span className="make-nav-logoc centera">
                {navi.isLogo === "logo" && 
                    <div className="centera" style={{width:'80px'}}><img className="hover" src={navi.logo} height={30} /></div>}
                {navi.isLogo === "text" && 
                <input 
                    value={navi.title} 
                    onChange={(e) => {
                        setNavi({...navi, title:e.currentTarget.value});
                    }}
                    />}
            </span>
            <span className="make-nav-buttonc centera">
                { navi.cta.use && returnCtaButton() }
                { navi.ghost.use && returnGhostButton() }
            </span>
        </>
    )
}

export default NaviTemplate
