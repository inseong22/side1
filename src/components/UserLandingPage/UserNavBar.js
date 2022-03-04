import React from 'react'
import AutosizeInput from 'react-input-autosize';
import {dbService} from '../../tools/fbase'
import { isMobile } from 'react-device-detect'
import TextareaAutosize from '@mui/material/TextareaAutosize';

function UserNavBar({setting, navi}) {

    const CustomButton = (type) => { return (
        <div className="cta-button-edit" 
            style={{
                borderRadius:`${setting[type].borderRadius}px`,
                backgroundColor:`${setting[type].backgroundColor}`,
                color:`${setting[type].color}`,
                boxShadow:`${setting[type].shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                border:`${setting[type].border ? `1px solid ${setting[type].borderColor}` : 'none'}`,
                display: 'block',
                cursor: 'pointer'
            }} 
            onClick={() => {
                moveToPage(type)
                window.open(
                    navi.button[type].link,
                    '_blank' // <- This is what makes it open in a new window.
                  );
                // window.location.href = navi.button.cta.link
            }}>
    
            <AutosizeInput className="text-input-button"
                value={ navi.button[type].text } 
                style={{
                    fontFamily:`${setting.smallFont}`,
                    borderRadius:`${setting[type].borderRadius}px`,  
                    backgroundColor:`${setting[type].backgroundColor}`, 
                    textAlign: 'center', 
                    padding: `${navi.button[type].padding*0.3}px ${navi.button[type].padding}px`,
                    cursor: 'pointer',
                    WebkitTextFillColor: `${setting[type].color}`,
                    WebkitOpacity: 1,
                }}
                disabled
                />
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
                height:`${navi.height}px`, 
                position:`${navi.fixed ? 'relative' : 'fixed'}`
            }} >
            <>
                <div className="make-nav-logoc" style={{height:`${navi.height}px`, 
                    justifyContent:`${navi.logo.align === 'center' && navi.button.use && !isMobile ? 'right' : navi.logo.align}`,
                    width: `${navi.logo.align === 'center' && navi.button.use && !isMobile ? '115%' : '100%'}`}}>
                        {navi.logo.image.use &&  
                            <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                        }
                        {navi.logo.text.use && 
                            <TextareaAutosize
                                disabled
                                name="text-no-input"
                                value={navi.title}
                                placeholder="서비스명을 입력하세요"
                                style={{ 
                                    border:'none',
                                    backgroundColor:'rgba(0,0,0,0)',
                                    textAlign:`${navi.logo.align === 'center' ? 'center' : 'left'}`,
                                    fontSize: `${navi.logo.text.fontSize/20}em`,
                                    display: 'flex',
                                    zIndex: 5,
                                    color:`${navi.logo.text.color}`, 
                                    fontFamily:`${setting.font}`,
                                    resize:'none',
                                    padding: '1px',
                                    WebkitTextFillColor: `${navi.logo.text.color}`,
                                    WebkitOpacity: 1,
                                    marginLeft:`${navi.logo.image.use ? '8px' : '1px'}`,
                                }}
                            />
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
