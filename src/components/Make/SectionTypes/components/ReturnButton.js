import React, { useContext, useState, useRef } from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import AutosizeInput from 'react-input-autosize';
import appstorebutton from '../../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../../tools/img/playstorebutton.png'
import produce from 'immer';
import { Checkbox, ChakraProvider } from '@chakra-ui/react'
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
    }}>

        <AutosizeInput className="text-input-flex" value={ content.button[type === "cta" ? 'ctaText' : 'ghostText'] } onChange={(e) => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button[type === "cta" ? 'ctaText' : 'ghostText'] = e.currentTarget.value;
        }))} 
        inputStyle={{
            textAlign: 'center',
            fontSize:'14px',
            fontFamily:`${state.setting.smallFont}`,
            borderRadius:`${state.setting[type].borderRadius}px`,  
            backgroundColor:`rgba(0,0,0,0)`, 
            padding: `2px 5px`, 
            }}/>
    
    </div>)}
    
    const returnInputs = (type) => {
        return(
            <div className="centera" style={{flexDirection:`${state.isPhone || content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].length > 1 ? 'column' : 'row'}`, alignItems:`${state.isPhone ? 'center' : 'start'}`, justifyContent:`${state.isPhone ? content.mobile.buttonAlign : content.button.align}`}}>
                <div style={{ display:'flex', flexDirection:'column', justifyContent:`${state.isPhone ? content.mobile.buttonAlign : content.button.align}`}}>
                    {content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].map((item, index) => {
                        return <input readOnly
                                    className="input-placeholder" 
                                    placeholder={item} 
                                    key={index} 
                                    style={{  margin:'4px', padding: `11px 10px`, }}/>
                    })}
                    {/* <div className="input-before">
                        <Checkbox colorScheme='gray' />&nbsp;(필수) <a href="https://www.notion.so/377223464ebd42e6adb9095f4b6548e5" target='_blank' style={{textDecoration:'underline'}}>&nbsp;개인정보 수집 및 이용</a>&nbsp;동의
                    </div> */}
                </div>
                <div style={{marginTop:`${state.isPhone ? '10px' : '0px'}`}}>
                {
                    type === 'cta' && <>{CustomButton('cta')}</>
                }
                {
                    type === 'ghost' && <>{CustomButton('ghost')}</>
                }
                </div>
            </div>
        )
    }

    return (
        <ChakraProvider>
    {onlyapp ? 
        (content.appButton.use && 
               <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.appButton.align}`}}>
                {
                    content.appButton.google.length > 0 && 
                        <img src={playstorebutton} className="store-button" style={{height:`${state.isPhone ? '31px' : '51px'}`}} />
                }
                {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                {
                    content.appButton.apple.length > 0 && 
                        <img src={appstorebutton} className="store-button" style={{height:`${state.isPhone ? '30px' : '50px'}`}} />
                }
            </div>) 
        : 
        <>
        {content.button.use && 
                    <div style={{width:'100%'}}>
                        <div className="button__container" style={{
                            justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`,
                            flexDirection:`${ 
                                ((content.button.ctaUse && content.button.ctaOption === 'apply') && 
                                (content.button.ghostUse && content.button.ghostOption === 'apply') )|| 
                                ((content.button.ctaUse && content.button.ctaOption === 'apply') && 
                                (content.button.ghostUse && content.button.ghostOption === 'link') )||
                                ((content.button.ctaUse && content.button.ctaOption === 'link') &&
                                (content.button.ghostUse && content.button.ghostOption === 'apply')) ? 'column' : 'row' 
                                }`
                            }}>
                            <>
                            {
                                content.button.ctaUse && 
                                <>
                                    { content.button.ctaOption === 'link' ? CustomButton('cta') : returnInputs('cta') }
                                </>
                            }
                            </>
                            <>
                            {
                                content.button.ghostUse &&
                                <>
                                    { content.button.ghostOption === 'link' ? CustomButton('ghost') : returnInputs('ghost') }
                                </>
                            }
                            </>
                        </div>
                    </div>
        }
        {
            content.appButton.use && 
            <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`}}>
                {
                    content.appButton.google.length > 0 && 
                        <img src={playstorebutton} className="store-button" style={{height:`${state.isPhone ? '31px' : '51px'}`}} />
                }
                {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                {
                    content.appButton.apple.length > 0 && 
                        <img src={appstorebutton} className="store-button" style={{height:`${state.isPhone ? '30px' : '50px'}`}} />
                }
            </div>
        }
        </>}
        </ChakraProvider>
    )
}


export default ReturnButton