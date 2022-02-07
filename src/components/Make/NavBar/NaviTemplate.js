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
                {navi.logoImage.use && 
                    <div className="centera" style={{width:'80px'}}><img src={navi.logoImage.attachment} height={30} /></div>}
                {navi.logoText.use && 
                    <input
                        className="text-input"
                        value={navi.title} 
                        onChange={(e) => {
                            setNavi({...navi, title:e.currentTarget.value});
                        }}
                        style={{fontSize:`${navi.logoText.fontSize}px`, color:`${navi.logoText.color}`}}
                        />
                }
            </span>
            <span className="make-nav-buttonc centera">
                { navi.button.cta.use && returnCtaButton() }
                { navi.button.ghost.use && returnGhostButton() }
            </span>
        </>
    )
}

export default NaviTemplate
