import React, {useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AutosizeInput from 'react-input-autosize';
import {ButtonEditor} from '../tools/Editor'
import '../SectionTypes/components/ReturnButton.css'

function NaviConatainer({navi, setNavi}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const CustomButton = (type) => { return (
        <>
        <div className="cta-button-edit" style={{
            borderRadius:`${state.setting[type].borderRadius}px`,
            backgroundColor:`${state.setting[type].backgroundColor}`,
            color:`${state.setting[type].color}`,
            boxShadow:`${state.setting[type].shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
            border:`${state.setting[type].border ? `1px solid ${state.setting[type].borderColor}` : 'none'}`,
            textAlign: 'center',
            fontFamily:`Pretendard-Regular`,
            fontSize:'14px',
        }}>
            {/* <AutosizeInput 
                className="text-input-flex" 
                value={ navi.button[type].text } 
                onChange={(e) => setNavi(produce(navi, draft => {
                    draft.button[type].text = e.currentTarget.value;
                }))} 
                inputStyle={{
                    fontSize:14,
                    borderRadius:`${state.setting[type].borderRadius}px`,  
                    backgroundColor:`rgba(0,0,0,0)`, 
                    padding: `2px 8px`, 
                    }} /> */}
            <div style={{padding:'10px 15px'}}>
                <ButtonEditor 
                    data={navi.button[type].text}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setNavi(produce(navi, draft => {
                            draft.button[type].text = data;
                        }))
                    }}
                />
            </div>
        </div>
        </>
        )}

    return (
        <>
        {navi.logo.use &&  
            <div 
                onClick={() => {action.setCategory(0); action.setFocus('navi-logo')}}
                className="make-nav-logoc" 
                style={{
                    height:`${navi.height}px`, 
                    justifyContent:`${navi.logo.align === 'center' && navi.button.use && !state.isPhone ? 'right' : navi.logo.align}`,
                    width: `${navi.logo.align === 'center' && navi.button.use && !state.isPhone ? '115%' : '100%'}`}}>
                {navi.logo.image.use &&  
                    <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                }
                {navi.logo.text.use && 
                    <div style={{
                        // textAlign:`${navi.logo.align === 'center' && navi.button.use ? 'right' : navi.logo.align === 'center' ? 'center' : 'left'}`,
                        display: 'flex',
                        zIndex: 5,
                        color:`${navi.logo.text.color}`, 
                        fontFamily:`${state.setting.font}`,
                        fontSize:`${state.isPhone ? '19px' : '24px'}`,
                        resize:'none',
                        padding: '0px',
                        marginLeft:`${navi.logo.image.use ? '8px' : '0px'}`,
                        marginRight: `${navi.logo.align === 'center' && navi.button.use ? '-8px' : navi.logo.align === 'center' ? '0px':'0px'}`,
                        backgroundColor: 'transparent',
                    }}>
                        {/* <AutosizeInput
                            name="form-field-name"
                            value={navi.title}
                            placeholder="서비스명을 입력하세요"
                            inputStyle={{ 
                                // textAlign:`${navi.logo.align === 'center' && navi.button.use ? 'right' : navi.logo.align === 'center' ? 'center' : 'left'}`,
                                display: 'flex',
                                zIndex: 5,
                                color:`${navi.logo.text.color}`, 
                                fontFamily:`${state.setting.font}`,
                                fontSize:`${state.isPhone ? '19px' : '24px'}`,
                                resize:'none',
                                padding: '0px',
                                marginLeft:`${navi.logo.image.use ? '8px' : '0px'}`,
                                marginRight: `${navi.logo.align === 'center' && navi.button.use ? '-8px' : navi.logo.align === 'center' ? '0px':'0px'}`,
                                backgroundColor: 'transparent',
                            }}
                            onChange={(e) => {
                                setNavi(produce(navi, draft => {
                                    draft.title = e.currentTarget.value;
                                }))
                            }}
                            /> */}
                        <ButtonEditor
                            data={navi.title}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setNavi(produce(navi, draft => {
                                    draft.title = data;
                                }))
                            }}
                        />
                    </div>
                }
            </div>
        }  
        {navi.button.use && !state.isPhone &&
        <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
            <span>
                { navi.button.cta.use && CustomButton('cta') }
            </span>
            <span>
                { navi.button.ghost.use && CustomButton('ghost')}
            </span>
        </div>
        }     
        </>
    )
}

export default NaviConatainer
