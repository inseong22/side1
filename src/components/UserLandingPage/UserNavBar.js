import React from 'react'
import AutosizeInput from 'react-input-autosize';
import {dbService} from '../../tools/fbase'

function UserNavBar({setting, navi}) {

    const moveToPage = async () => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            urlId:setting.urlId,
            type:'click',
            from:'navi',
            created:Date.now(),
        })
    }

    return (
        <div className="make-nav-container" 
            style={{
                borderBottom:`${navi.bottomBorder.use ? `1px solid ${navi.bottomBorder.color}` : ''}`, 
                backgroundColor:`${navi.backgroundColor}`, 
                height:`${navi.height}px`, position:`${navi.fixed ? 'fixed' : 'relative'}`
            }}
            >
                
            <>
                <div className="make-nav-logoc" style={{height:`${navi.height}px`, justifyContent:`${navi.logo.align}`}}>
                    {navi.logo.image.use && 
                        <div className="make-nav-logo-image">
                            <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                        </div>}
                    {navi.logo.text.use && 
                        <div className="make-nav-logo-image" style={{
                            paddingLeft:`${navi.logo.image.use ? '1px' : '8px'}`
                        }}>
                            <div
                                className="text-input-flex ti"
                                style={{fontSize:`${navi.logo.text.fontSize}px`, color:`${navi.logo.text.color}`, fontFamily:`${setting.font}`}}>
                                {navi.title} 
                            </div>
                        </div>
                    }
                </div>
                <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
                    { navi.button.cta.use && 
                        <button className="cta-button-made" style={{
                            borderRadius:`${setting.cta.borderRadius}px`,
                            backgroundColor:`${setting.cta.backgroundColor}`,
                            color:`${setting.cta.color}`,
                            boxShadow:`${setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                            border:`${setting.cta.border ? `1px solid ${setting.cta.borderColor}` : 'none'}`
                        }} onClick={() => {
                            moveToPage()
                            window.open(
                                navi.button.cta.link,
                                '_blank' // <- This is what makes it open in a new window.
                              );
                            // window.location.href = navi.button.cta.link
                        }}>
                            <div className="text-input-flex pointer"
                                style={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.cta.borderRadius}px`,  backgroundColor:`${setting.cta.backgroundColor}`}}>
                                {navi.button.cta.text }
                            </div>
                        </button>
                    }
                    { navi.button.ghost.use && 
                        <button className="cta-button-made" style={{
                            marginLeft:`${ navi.button.cta.use ? '5px' : '0px'}`,
                            borderRadius:`${setting.ghost.borderRadius}px`,
                            backgroundColor:`${setting.ghost.backgroundColor}`,
                            color:`${setting.ghost.color}`,
                            boxShadow:`${setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                            border:`${setting.ghost.border ? `1px solid ${setting.ghost.borderColor}` : 'none'}`
                        }} onClick={() => {
                            moveToPage()
                            window.open(
                                navi.button.ghost.link,
                                '_blank' // <- This is what makes it open in a new window.
                              );
                        }}>
                            <div className="text-input-flex pointer"
                                style={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.ghost.borderRadius}px`,  backgroundColor:`${setting.ghost.backgroundColor}`}}>
                                { navi.button.ghost.text }
                            </div>
                        </button>
                    }
                </div>
            </>
        </div>
    )
}

export default UserNavBar
