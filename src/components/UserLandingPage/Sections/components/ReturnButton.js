import React, { useContext, useState, useRef } from 'react'
import AutosizeInput from 'react-input-autosize';
import appstorebutton from '../../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../../tools/img/playstorebutton.png'
import {dbService} from '../../../../tools/fbase'
import produce from 'immer'

function ReturnButton({content, setting}){
    const [values, setValues] = useState(['', '', '', '', ''])

    const moveToPage = async () => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            urlId:setting.urlId,
            type:'click',
            from:content.name,
            created:Date.now(),
        })
    }

    const apply = async () => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            urlId:setting.urlId,
            type:'apply',
            values:values,
            from:content.name,
            created:Date.now(),
        })
        alert("완료되었습니다.");
        setValues(['','','','',''])
    }

    const CustomCtaButton = () => {
        return (
        <div className="cta-button-made" style={{
            marginTop:`${content.ctaApplyInputs.length > 1 ? '8px' : '0px'}`,
            borderRadius:`${setting.cta.borderRadius}px`,
            backgroundColor:`${setting.cta.backgroundColor}`,
            color:`${setting.cta.color}`,
            boxShadow:`${setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
            border:`${setting.cta.border ? `1px solid ${setting.cta.borderColor}` : 'none'}`
        }} onClick={() => {
            if(content.button.ctaOption === 'link'){
                moveToPage()
                window.open(
                    content.button.ctaLink,
                    '_blank' // <- This is what makes it open in a new window.
                );
            }else{
                apply()
            }
        }}>
        <div className="text-input-flex pointer" 
            style={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.cta.borderRadius}px`, backgroundColor:`${setting.cta.backgroundColor}`,}}>
                {content.button.ctaText}
            </div>
    </div>)}

    const CustomGhostButton = () => {
        return (
        <div className="cta-button-made" style={{
            marginTop:`${content.ctaApplyInputs.length > 1 ? '8px' : '0px'}`,
            marginLeft:`${ content.button.ctaUse ? '5px' : '0px'}`,
            borderRadius:`${setting.ghost.borderRadius}px`,
            backgroundColor:`${setting.ghost.backgroundColor}`,
            color:`${setting.ghost.color}`,
            boxShadow:`${setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
            border:`${setting.ghost.border ? `1px solid ${setting.ghost.borderColor}` : 'none'}`
        }} onClick={() => {
                if(content.button.ghostOption === 'link'){
                    moveToPage()
                    window.open(
                        content.button.ghostLink,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }else{
                    apply()
                }
            }}>
        <div className="text-input-flex pointer" 
            inputStyle={{fontFamily:`${setting.smallFont}`, borderRadius:`${setting.ghost.borderRadius}px`,  backgroundColor:`${setting.ghost.backgroundColor}`}}>
                { content.button.ghostText } 
            </div>
    </div>)}

    const returnCtaInputs = () => {
        return(
            <div className="centera" style={{flexDirection:`${content.ctaApplyInputs.length > 1 ? 'column' : 'row'}`}}>
                {content.ctaApplyInputs.map((item, index) => {
                    return(
                        <input className="input-placeholder" value={values[index]} placeholder={item} key={index} 
                        style={{marginTop:`${content.ctaApplyInputs.length > 1 ? '8px' : '0px'}`}}
                        onChange={e => setValues(produce(values, draft => {
                            draft[index] = e.currentTarget.value
                        }))} />
                    )
                })}
                {CustomCtaButton()}
            </div>
        )
    }

    const returnGhostInputs = () => {
        return(
            <div className="centera" style={{flexDirection:`${content.ghostApplyInputs.length > 1 ? 'column' : 'row'}`}}>
                {content.ghostApplyInputs.map((item, index) => {
                    return(
                        <input className="input-placeholder" value={values[index]} placeholder={item} key={index} 
                        style={{marginTop:`${content.ghostApplyInputs.length > 1 ? '8px' : '0px'}`}}
                        onChange={e => setValues(produce(values, draft => {
                            draft[index] = e.currentTarget.value
                        }))} />
                    )
                })}
                {CustomGhostButton()}
            </div>
        )
    }

    if(content.button.use){
        // ctaOption === 'link' => 버튼 클릭 시 링크 이동
        // ctaOption === 'apply' => 신청

        {/* <CustomCtaButton className="action-button" onClick={() => {window.open(`${content.button.ctaLink}`)}}> */}
        return(
            <div style={{width:'100%'}}>
                <div className="button__container" style={{justifyContent:`${content.button.align}`}}>
                    {
                        content.button.ctaUse && 
                            ( content.button.ctaOption === 'link' ? CustomCtaButton() : returnCtaInputs() )
                    }
                    {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                    {
                        content.button.ghostUse && 
                            ( content.button.ghostOption === 'link' ? CustomGhostButton() : returnGhostInputs() )
                    }
                </div>
                {
                    content.appButton.use && 
                    <div className="button__container" style={{justifyContent:`${content.button.align}`}}>
                        {
                            content.appButton.google.length > 0 && 
                                <img src={playstorebutton} className="store-button" onClick={e => {
                                    window.open(
                                        content.appButton.google,
                                        '_blank' // <- This is what makes it open in a new window.
                                      )
                                      moveToPage()
                                    }}/>
                        }
                        {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                        {
                            content.appButton.apple.length > 0 && 
                                <img src={appstorebutton} className="store-button" onClick={e => {
                                    window.open(
                                        content.appButton.google,
                                        '_blank' // <- This is what makes it open in a new window.
                                      )
                                      moveToPage()
                                    }}/>
                        }
                    </div>
                }
            </div>
        )
    }else{
        return(<></>)
    }
}

export default ReturnButton