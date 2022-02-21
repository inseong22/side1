import React, { useContext, useState, useRef } from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import AutosizeInput from 'react-input-autosize';
import appstorebutton from '../../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../../tools/img/playstorebutton.png'
import produce from 'immer';
import './ReturnButton.css'

function ReturnButton({content, onlyapp}){
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const CustomButton = (type) => { return (
    <div className="cta-button-edit" style={{
        borderRadius:`${state.setting[type].borderRadius}px`,
        backgroundColor:`${state.setting[type].backgroundColor}`,
        color:`${state.setting[type].color}`,
        boxShadow:`${state.setting[type].shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
        border:`${state.setting[type].border ? `1px solid ${state.setting[type].borderColor}` : 'none'}`,
    }} onClick={() => {}}>

        <AutosizeInput className="text-input-flex ti" value={ content.button[type === "cta" ? 'ctaText' : 'ghostText'] } onChange={(e) => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button[type === "cta" ? 'ctaText' : 'ghostText'] = e.currentTarget.value;
        }))} inputStyle={{
            textAlign: 'center',
            width: '100%',
            fontFamily:`${state.setting.smallFont}`,
            borderRadius:`${state.setting[type].borderRadius}px`,  
            backgroundColor:`${state.setting[type].backgroundColor}`, 
            // padding: `${state.setting[type].padding * 0.3}px ${state.setting[type].padding}px`, 
            }}/>
    
    </div>)}
    
    const returnInputs = (type) => {
        return(
            <div className="centera" style={{flexDirection:`${state.isPhone || content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].length > 1 ? 'column' : 'row'}`, justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`}}>
                {content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].map((item, index) => {
                    return <input className="input-placeholder" placeholder={item} key={index} 
                        style={{
                            margin:'4px',
                            padding: `${state.setting[type].padding * 0.3 + 7.2}px 10px`, }}/>
                })}
                {
                    type === 'cta' && <>{CustomButton('cta')}</>
                }
                {
                    type === 'ghost' && <>{CustomButton('ghost')}</>
                }
            </div>
        )
    }
<<<<<<< HEAD

    return (
        <>
    {onlyapp ? 
        (content.appButton.use && 
               <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.appButton.align}`}}>
                {
                    content.appButton.google.length > 0 && 
                        <img src={playstorebutton} className="store-button" />
                }
                {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                {
                    content.appButton.apple.length > 0 && 
                        <img src={appstorebutton} className="store-button" />
                }
            </div>) 
        : (content.button.use && 
                    <div style={{width:'100%'}}>
                        <div className="button__container" style={{
                            justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`,
                            flexDirection:`${ 
                                (content.button.ctaUse && content.button.ctaOption === 'apply' && 
                                content.button.ghostUse && content.button.ghostOption === 'apply') || 
                                (content.button.ctaUse && content.button.ctaOption === 'apply' && 
                                content.button.ghostUse && content.button.ghostOption === 'link') ||
                                (content.button.ctaUse && content.button.ctaOption === 'link' &&
                                content.button.ghostUse && content.button.ghostOption === 'apply') ? 'column' : 'row' 
                                }`
                            }}>
                            <>
                            {
                                content.button.ctaUse && 
                                    ( content.button.ctaOption === 'link' ? CustomButton('cta') : returnInputs('cta') )
                            }
                            </>
                            <>
                            {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                            {
                                content.button.ghostUse && 
                                    ( content.button.ghostOption === 'link' ? CustomButton('ghost') : returnInputs('ghost') )
                            }
                            </>
                        </div>
                        {
                            content.appButton.use && 
                            <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.appButton.align}`}}>
                                {
                                    content.appButton.google.length > 0 && 
                                        <img src={playstorebutton} className="store-button" />
                                }
                                {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                                {
                                    content.appButton.apple.length > 0 && 
                                        <img src={appstorebutton} className="store-button" />
                                }
                            </div>
                        }
                    </div>
        )}
=======
    {/* <CustomCtaButton className="action-button" onClick={() => {window.open(`${content.button.ctaLink}`)}}> */}
    return(
        <>
            {
                content.button.use && 
                <div className="button__container" style={{
                    justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`,
                    flexDirection:`${ 
                        content.button.ctaUse && content.button.ctaOption === 'apply' && 
                        content.button.ghostUse && content.button.ghostOption === 'apply' ? 'column' : 'row'
                        }`
                    }}>
                    <>
                    {
                        content.button.ctaUse && 
                            ( content.button.ctaOption === 'link' ? CustomButton('cta') : returnInputs('cta') )
                    }
                    </>
                    <>
                    {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                    {
                        content.button.ghostUse && 
                            ( content.button.ghostOption === 'link' ? CustomButton('ghost') : returnInputs('ghost') )
                    }
                    </>
                </div>
            }
            {
                content.appButton.use && 
                <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.appButton.align}`}}>
                    {
                        content.appButton.google.length > 0 && 
                            <img src={playstorebutton} className="store-button" style={{height:'51px'}} />
                    }
                    {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                    {
                        content.appButton.apple.length > 0 && 
                            <img src={appstorebutton} className="store-button" />
                    }
                </div>
            }
>>>>>>> 1b756eb41 (Response Tutorail)
        </>
    )
}


export default ReturnButton