import React from 'react'
import AutosizeInput from 'react-input-autosize';
import {dbService} from '../../tools/fbase'
import { isMobile } from 'react-device-detect'

function UserNavBar({setting, navi}) {

    const CustomButton = (type) => { return (
        <div className="cta-button-made" 
            style={{
                borderRadius:`${setting[type].borderRadius}px`,
                backgroundColor:`${setting[type].backgroundColor}`,
                color:`${setting[type].color}`,
                boxShadow:`${setting[type].shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${setting[type].border ? `1px solid ${setting[type].borderColor}` : 'none'}`,
            }} 
            onClick={() => {
                moveToPage(type)
                window.open(
                    navi.button[type].link,
                    '_blank' // <- This is what makes it open in a new window.
                  );
                // window.location.href = navi.button.cta.link
            }}>
    
            <div className="text-input-flex"
                style={{
                    fontFamily:`${setting.smallFont}`,
                    borderRadius:`${setting[type].borderRadius}px`,  
                    backgroundColor:`${setting[type].backgroundColor}`, 
                    padding: `${setting[type].padding * 0.3}px ${setting[type].padding}px`, 
                }}>
                { navi.button[type].text } 
            </div>
        </div>
    )}

    const moveToPage = async (button) => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            urlId:setting.urlId,
            type:'click',
            button:button,
            from:'내비게이션',
            created:Date.now(),
        })
    }

    return (
        <div className="make-nav-container" 
            style={{
                paddingRight: `${isMobile ? '12px' : 'calc(14vw + 30px)'}`,
                paddingLeft: `${isMobile ? '12px' : 'calc(14vw + 30px)'}`,
                borderBottom:`${navi.bottomBorder.use ? `1px solid ${navi.bottomBorder.color}` : ''}`, 
                backgroundColor:`${navi.backgroundColor}`, 
                height:`${navi.height}px`, position:`${navi.fixed ? 'fixed' : 'relative'}`
            }}
            >
                
            <>
                <div className="make-nav-logoc" style={{height:`${navi.height}px`, justifyContent:`${navi.logo.align}`}}>
                    {navi.logo.image.use && 
                        <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                    }
                    {navi.logo.text.use && 
                        <div
                            className="text-input-flex"
                            style={{
                                zIndex: 5,
                                fontSize:`${navi.logo.text.fontSize}px`, 
                                color:`${navi.logo.text.color}`, 
                                fontFamily:`${setting.font}`,
                                padding: '5px',
                                paddingLeft: '0px',
                                marginLeft:`${navi.logo.image.use ? '8px' : '1px'}`
                            }}>{navi.title}</div>
                    }
                </div>
                <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
                    { navi.button.cta.use && 
                        <>{CustomButton('cta')}</>
                    }
                    { navi.button.ghost.use && 
                        <>{CustomButton('ghost')}</>
                    }
                </div>
            </>
        </div>
    )
}

export default UserNavBar
