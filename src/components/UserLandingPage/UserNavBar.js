import React from 'react'
import {dbService} from '../../tools/fbase'
import { isMobile } from 'react-device-detect'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AutosizeInput from 'react-input-autosize';

function UserNavBar({setting, navi}) {

    const CustomButton = (type) => { return (
        <div className="cta-button-edit" style={{
            borderRadius:`${setting[type].borderRadius}px`,
            backgroundColor:`${setting[type].backgroundColor}`,
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
            <AutosizeInput className="text-input-flex" value={ navi.button[type].text } 
                inputStyle={{
                    color:`${setting[type].color}`,
                    cursor:'pointer',
                    border:'none',
                    textAlign: 'center',
                    fontSize:'14px',
                    fontFamily:`${setting.smallFont}`,
                    borderRadius:`${setting[type].borderRadius}px`,  
                    backgroundColor:`rgba(0,0,0,0)`, 
                    padding: `5px 8px`, 
                    WebkitTextFillColor: `${setting[type].color}`,
                    WebkitOpacity: 1,
                    }}
                    disabled/>
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
                <div className="make-nav-logoc" style={{
                    height:`${navi.height}px`, 
                    justifyContent:`${navi.logo.align === 'center' && navi.button.use && !isMobile ? 'right' : navi.logo.align}`,
                    width: `${navi.logo.align === 'center' && navi.button.use && !isMobile ? '115%' : '100%'}`}}>
                        {navi.logo.image.use &&  
                            <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                        }
                        {navi.logo.text.use && 
                        <div style={{
                                display: 'flex',
                                zIndex: 5,
                                color:`${navi.logo.text.color}`, 
                                fontFamily:`${setting.font}`,
                                fontSize:`${isMobile ? '19px' : '24px'}`,
                                resize:'none',
                                padding: '0px',
                                marginLeft:`${navi.logo.image.use ? '8px' : '0px'}`,
                                marginRight: `${navi.logo.align === 'center' && navi.button.use ? '-8px' : navi.logo.align === 'center' ? '0px':'0px'}`,
                                backgroundColor: 'transparent',
                                WebkitTextFillColor: `${navi.logo.text.color}`,
                                WebkitOpacity: 1
                            }}>
                            {navi.title}
                        </div>
                            // <AutosizeInput
                            //     disabled
                            //     name="text-no-input"
                            //     value={navi.title}
                            //     placeholder="서비스명을 입력하세요"
                            //     inputStyle={{ 
                            //         // textAlign:`${navi.logo.align === 'center' && navi.button.use ? 'right' : navi.logo.align === 'center' ? 'center' : 'left'}`,
                            //         display: 'flex',
                            //         zIndex: 5,
                            //         color:`${navi.logo.text.color}`, 
                            //         fontFamily:`${setting.font}`,
                            //         fontSize:'25px',
                            //         resize:'none',
                            //         padding: '0px',
                            //         marginLeft:`${navi.logo.image.use ? '8px' : '0px'}`,
                            //         marginRight: `${navi.logo.align === 'center' && navi.button.use ? '-8px' : navi.logo.align === 'center' ? '0px':'0px'}`,
                            //         backgroundColor: 'transparent',
                            //         WebkitTextFillColor: `${navi.logo.text.color}`,
                            //         WebkitOpacity: 1,
                            //     }}
                            // />
                        }
                </div>
                {
                navi.button.use && !isMobile &&
                <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
                    { navi.button.cta.use && 
                        <>{CustomButton('cta')}</>
                    }
                    { navi.button.ghost.use && 
                        <>{CustomButton('ghost')}</>
                    }
                </div>
                }
            </>
        </div>
    )
}

export default UserNavBar
