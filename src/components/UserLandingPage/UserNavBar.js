import React from 'react'
import AutosizeInput from 'react-input-autosize';

function UserNavBar({setting, navi}) {
    return (
        <div className="make-nav-container" style={{borderBottom:`${navi.bottomBorder.use ? `1px solid ${navi.bottomBorder.color}` : ''}`, backgroundColor:`${navi.backgroundColor}`, height:`${navi.height}px`}}>
                
            <>
                <div className="make-nav-logoc" style={{height:`${navi.height}px`, justifyContent:`${navi.logo.align}`}}>
                    {navi.logo.image.use && 
                        <div className="make-nav-logo-image">
                            <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                        </div>}
                    {navi.logo.text.use && 
                        <div className="make-nav-logo-image">
                            <input
                                className="text-input-flex ti"
                                value={navi.title} 
                                style={{fontSize:`${navi.logo.text.fontSize}px`, color:`${navi.logo.text.color}`, fontFamily:`${setting.font}`, width:''}}
                            />
                        </div>
                    }
                </div>
                <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
                    { navi.button.cta.use && 
                        <div className="cta-button-made" style={{
                            borderRadius:`${setting.cta.borderRadius}px`,
                            backgroundColor:`${setting.cta.backgroundColor}`,
                            color:`${setting.cta.color}`,
                            boxShadow:`${setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                            border:`${setting.cta.border ? `1px solid ${setting.cta.borderColor}` : 'none'}`
                        }} onClick={() => {}}>
                            <AutosizeInput className="text-input-flex ti" value={navi.button.cta.text }
                                inputStyle={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.cta.borderRadius}px`,  backgroundColor:`${setting.cta.backgroundColor}`}}/>
                        </div>
                    }
                    { navi.button.ghost.use && 
                        <div className="cta-button-made" style={{
                            marginLeft:`${ navi.button.cta.use ? '5px' : '0px'}`,
                            borderRadius:`${setting.ghost.borderRadius}px`,
                            backgroundColor:`${setting.ghost.backgroundColor}`,
                            color:`${setting.ghost.color}`,
                            boxShadow:`${setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                            border:`${setting.ghost.border ? `1px solid ${setting.ghost.borderColor}` : 'none'}`
                        }} onClick={() => {}}>
                            <AutosizeInput className="text-input-flex ti" value={navi.button.ghost.text }
                                inputStyle={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.ghost.borderRadius}px`,  backgroundColor:`${setting.ghost.backgroundColor}`}}/>
                        </div>
                    }
                </div>
            </>
        </div>
    )
}

export default UserNavBar
