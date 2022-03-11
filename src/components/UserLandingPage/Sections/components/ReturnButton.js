import React, { useState, useContext } from 'react'
import appstorebutton from '../../../../tools/img/appstorebutton.png'
import playstorebutton from '../../../../tools/img/playstorebutton.png'
import { UserContext } from '../../../../pages/UserLanding/UserLandingPage'
import {dbService} from '../../../../tools/fbase'
import { isMobile } from 'react-device-detect'
import produce from 'immer'
import AutosizeInput from 'react-input-autosize';
import { Checkbox, ChakraProvider } from '@chakra-ui/react'

function ReturnButton({content}){
    const [values, setValues] = useState(['', '', '', '', ''])
    const [check, setCheck] = useState(false)
    const {state, action} = useContext(UserContext)

    const moveToPage = async (button) => {
        // 파이어베이스에 기록
        await dbService.collection('datas').add({
            pageId:state.pageId,
            type:'click',
            from:content.name,
            button:button,
            created:Date.now(),
        })
    }

    const apply = async () => {
        // 파이어베이스에 기록
        // if(!check){
        //     alert("개인정보 수집 및 이용에 동의해주세요.");
        // }else 
        if(values === ['','','','','']){
            alert("정보를 입력해주세요.");
        }else{
            await dbService.collection('datas').add({
                pageId:state.pageId,
                type:'apply',
                values:values,
                from:content.name,
                created:Date.now(),
            })
            setValues(['','','','',''])
            alert("완료되었습니다.");
        }
    }

const CustomButton = (type) => { return (
    <div className="cta-button-edit" style={{
        borderRadius:`${state.setting[type].borderRadius}px`,
        backgroundColor:`${state.setting[type].backgroundColor}`,
        boxShadow:`${state.setting[type].shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
        border:`${state.setting[type].border ? `1px solid ${state.setting[type].borderColor}` : 'none'}`,
    }} onClick={() => {
        if(content.button[type === "cta" ? 'ctaOption' : 'ghostOption'] === 'link'){
            moveToPage(type)
            window.open(
                content.button[[type === "cta" ? 'ctaLink' : 'ghostLinkg']],
                '_blank' // <- This is what makes it open in a new window.
            );
        }else{
            apply()
        }
    }}>

        <AutosizeInput className="text-input-flex" value={ content.button[type === "cta" ? 'ctaText' : 'ghostText'] } 
            inputStyle={{
                color:`${state.setting[type].color}`,
                cursor:'pointer',
                border:'none',
                textAlign: 'center',
                fontSize:'14px',
                fontFamily:`${state.setting.smallFont}`,
                borderRadius:`${state.setting[type].borderRadius}px`,  
                backgroundColor:`${state.setting[type].backgroundColor}`, 
                padding: `5px 5px`, 
                WebkitTextFillColor: `${state.setting[type].color}`,
                WebkitOpacity: 1,
                }}
                disabled/>
    
    </div>)}
    
    const returnInputs = (type) => {
        return(
            <div className="centera" style={{flexDirection:`${isMobile || content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].length > 1 ? 'column' : 'row'}`, alignItems:`${isMobile ? 'center' : 'start'}`, justifyContent:`${isMobile ? content.mobile.align : content.button.align}`}}>
                <div style={{ display:'flex', flexDirection:'column', justifyContent:`${isMobile ? content.mobile.buttonAlign : content.button.align}`}}>
                    {content[type === 'cta' ? 'ctaApplyInputs' : 'ghostApplyInputs'].map((item, index) => {
                        return (
                            <input 
                                className="input-placeholder" 
                                placeholder={item} 
                                style={{ margin:'4px', padding: '15px 10px', }}
                                onChange={e => setValues(produce(values, draft => {
                                    draft[index] = e.currentTarget.value
                                }))} 
                                key={index} />
                        )
                    })}
                    {/* <div className="input-before">
                        <Checkbox value={check} onClick={() => setCheck(!check)} colorScheme='gray' />&nbsp;(필수) <a href="https://www.notion.so/377223464ebd42e6adb9095f4b6548e5" target='_blank' style={{textDecoration:'underline'}}>&nbsp;개인정보 수집 및 이용</a>&nbsp;동의
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
        {
        content.sectionTypeName !== 'AppDownloadSection' && content.button.use && 
            <div style={{width:'100%'}}>
                <div className="button__container" style={{
                    justifyContent:`${isMobile ? content.mobile.align : content.button.align}`,
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
            content.sectionTypeName !== 'ApplySection' && content.appButton.use && 
            <div className="button__container" style={{justifyContent:`${state.isPhone ? content.mobile.align : content.button.align}`}}>
                {
                    content.appButton.google.length > 0 && 
                        <img src={playstorebutton} className="store-button" style={{height:`${isMobile ? '41px' : '51px'}`}} onClick={e => {
                            window.open(
                                content.appButton.google,
                                '_blank' // <- This is what makes it open in a new window.
                              )
                              moveToPage('google')
                            }}/>
                }
                {/* onClick={() => {window.open(`${content.button.ghostLink}`)}} */}
                {
                    content.appButton.apple.length > 0 && 
                        <img src={appstorebutton} className="store-button" style={{height:`${isMobile ? '40px' : '50px'}`}} onClick={e => {
                            window.open(
                                content.appButton.apple,
                                '_blank' // <- This is what makes it open in a new window.
                              )
                              moveToPage('apple')
                            }}/>
                }
            </div>
        }
        </ChakraProvider>
    )
}


export default ReturnButton