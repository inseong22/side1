import React, {useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AutosizeInput from 'react-input-autosize';
import '../SectionTypes/components/ReturnButton.css'

function NaviConatainer({navi, setNavi, CustomCtaButton, CustomGhostButton}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
        {navi.logo.use &&  
            <div className="make-nav-logoc" style={{height:`${navi.height}px`, 
            justifyContent:`${navi.logo.align === 'center' && navi.button.use && !state.isPhone ? 'right' : navi.logo.align}`,
            width: `${navi.logo.align === 'center' && navi.button.use && !state.isPhone ? '115%' : '100%'}`}}>
                {navi.logo.image.use &&  
                    <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                }
                {navi.logo.text.use && 
                    <AutosizeInput
                        name="form-field-name"
                        value={navi.title}
                        placeholder="서비스명을 입력하세요"
                        inputStyle={{ 
                            textAlign:`${navi.logo.align === 'center' && navi.button.use ? 'right' : navi.logo.align === 'center' ? 'center' : 'left'}`,
                            fontSize: `${navi.logo.text.fontSize/20}em`,
                            display: 'flex',
                            zIndex: 5,
                            color:`${navi.logo.text.color}`, 
                            fontFamily:`${state.setting.font}`,
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
                    />
                }
            </div>
        }  
        {navi.button.use && !state.isPhone &&
        <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
            { navi.button.cta.use && 
                <div className="cta-button-edit" style={{
                    borderRadius:`${state.setting.cta.borderRadius}px`,
                    backgroundColor:`${state.setting.cta.backgroundColor}`,
                    color:`${state.setting.cta.color}`,
                    boxShadow:`${state.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                    border:`${state.setting.cta.border ? `1px solid ${state.setting.cta.borderColor}` : 'none'}`,
                    display: 'block'
                }} onClick={() => {}}>
                    <AutosizeInput 
                    className="text-input-button ti" 
                    value={navi.button.cta.text } 
                    onChange={(e) => setNavi(produce(navi, draft => {
                        draft.button.cta.text = e.currentTarget.value;
                    }))} 
                    inputStyle={{
                        textAlign: 'center', 
                        fontFamily:`${state.setting.smallFont}`, 
                        borderRadius:`${state.setting.cta.borderRadius}px`,  
                        backgroundColor:`${state.setting.cta.backgroundColor}`, 
                        padding: `${navi.button.cta.padding*0.3}px ${navi.button.cta.padding}px`
                    }}/>
                </div>
            }
                { navi.button.ghost.use && 
                <div className="cta-button-edit" style={{
                    marginLeft:`${ navi.button.cta.use ? '5px' : '0px'}`,
                    borderRadius:`${state.setting.ghost.borderRadius}px`,
                    backgroundColor:`${state.setting.ghost.backgroundColor}`,
                    color:`${state.setting.ghost.color}`,
                    boxShadow:`${state.setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                    border:`${state.setting.ghost.border ? `1px solid ${state.setting.ghost.borderColor}` : 'none'}`,
                    display: 'block'
                }} onClick={() => {}}>
                    <AutosizeInput className="text-input-button ti"  value={navi.button.ghost.text } 
                    onChange={(e) => setNavi(produce(navi, draft => {
                        draft.button.ghost.text = e.currentTarget.value;
                    }))} 
                    inputStyle={{
                        textAlign: 'center',
                        fontFamily:`${state.setting.smallFont}`, 
                        borderRadius:`${state.setting.ghost.borderRadius}px`,  
                        backgroundColor:`${state.setting.ghost.backgroundColor}`,
                        padding: `${navi.button.ghost.padding*0.3}px ${navi.button.ghost.padding}px`
                    }}/>
                </div>
                }
        </div>
        }     
        </>
    )
}

export default NaviConatainer
