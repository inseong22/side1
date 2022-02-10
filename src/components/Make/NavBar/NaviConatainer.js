import React, {useContext} from 'react'
import Editor from '../tools/Editor'
import { MyContext } from '../../../pages/Make/MakePageV2'
import produce from 'immer'
import AutosizeInput from 'react-input-autosize';

function NaviConatainer({navi, setNavi, CustomCtaButton, CustomGhostButton}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <>
            <div className="make-nav-logoc" style={{height:`${navi.height}px`, justifyContent:`${navi.logo.align}`}}>
                {navi.logo.image.use && 
                    <div className="make-nav-logo-image">
                        <img src={navi.logo.image.attachment} width={navi.logo.image.width} />
                    </div>}
                {navi.logo.text.use && 
                    <div className="make-nav-logo-image">
                        <input
                            className="text-input-flex ti"
                            value={navi.title} 
                            onChange={(e) => {
                                setNavi({...navi, title:e.currentTarget.value});
                            }}
                            style={{fontSize:`${navi.logo.text.fontSize}px`, color:`${navi.logo.text.color}`, fontFamily:`${state.setting.font}`, width:''}}
                        />
                    </div>
                }
            </div>
            <div className="make-nav-buttonc" style={{justifyContent:`${navi.button.align}`}}>
                { navi.button.cta.use && 
                    <div className="cta-button-made" style={{
                        borderRadius:`${state.setting.cta.borderRadius}px`,
                        backgroundColor:`${state.setting.cta.backgroundColor}`,
                        color:`${state.setting.cta.color}`,
                        boxShadow:`${state.setting.cta.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                        border:`${state.setting.cta.border ? `1px solid ${state.setting.cta.borderColor}` : 'none'}`
                    }} onClick={() => {}}>
                        <AutosizeInput className="text-input-flex ti" value={navi.button.cta.text } onChange={(e) => setNavi(produce(navi, draft => {
                            draft.button.cta.text = e.currentTarget.value;
        }))} inputStyle={{fontFamily:`${state.setting.smallFont}`, borderRadius:`${state.setting.cta.borderRadius}px`,  backgroundColor:`${state.setting.cta.backgroundColor}`}}/>
                    </div>
                }
                { navi.button.ghost.use && 
                    <div className="cta-button-made" style={{
                        marginLeft:`${ navi.button.cta.use ? '5px' : '0px'}`,
                        borderRadius:`${state.setting.ghost.borderRadius}px`,
                        backgroundColor:`${state.setting.ghost.backgroundColor}`,
                        color:`${state.setting.ghost.color}`,
                        boxShadow:`${state.setting.ghost.shadow ? '1px 2px 4px rgba(0,0,0,0.2)' : 'none'}`,
                        border:`${state.setting.ghost.border ? `1px solid ${state.setting.ghost.borderColor}` : 'none'}`
                    }} onClick={() => {}}>
                        <AutosizeInput className="text-input-flex ti" value={navi.button.ghost.text } onChange={(e) => setNavi(produce(navi, draft => {
                            draft.button.ghost.text = e.currentTarget.value;
        }))} inputStyle={{fontFamily:`${state.setting.smallFont}`, borderRadius:`${state.setting.ghost.borderRadius}px`,  backgroundColor:`${state.setting.ghost.backgroundColor}`}}/>
                    </div>
                }
            </div>
        </>
    )
}

export default NaviConatainer
