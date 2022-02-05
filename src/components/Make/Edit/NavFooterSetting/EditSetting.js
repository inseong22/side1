import React, {useState, useContext} from 'react'
import RadioCustom from '../tools/RadioCustom'
import {EditRadioContainer} from '../tools/RadioCustom'
import { EditColorContainer } from '../tools/ColorCustom'
import InputCustom from '../tools/InputCustom'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import SelectCustom from '../tools/SelectCustom'
import './EditSetting.css'
import '../EditTemplates/Edit.css'
import EditTopBar from '../tools/EditTopBar'
import OpenCloseCustom from '../tools/OpenCloseCustom'
import OnOffCustom from '../tools/OnOffCustom'
import produce from 'immer';
import {EditAnimationContainer} from '../tools/AnimationCustom'
import { base } from '../../SectionTypes/baseTypes'

const fontOptions = [
    { label: '노토산스', value: 'Noto Sans KR' },
    { label: '에스코어 드림', value: '' },
    { label: '노토산스', value: 'Noto Sans KR' },
    { label: '노토산스', value: 'Noto Sans KR' },
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 20 },
]

const sizeOptions = [
    { label: 'small', value: 50 },
    { label: 'medium', value: 75 },
    { label: 'large', value: 100 },
]

function EdtiSetting({setting, setSetting, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    // 애니메이션 관련 
    const animationOptions = [
        {label:'없음', value: 'none'},
        {label:'떠오르기', value: 'fade-up'},
        {label:'zoom-in', value: 'zoom-in'}
    ]

    const changeAnimationOption = e => {
        base.map((section)=>section.animation.type=e)
        action.setContents(base)
        setSetting({...setting, animation:e})
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <div>
                        <OpenCloseCustom title="파비콘" tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지를 대표하는 아이콘입니다.">
                            
                        </OpenCloseCustom>
                        <OpenCloseCustom title="페이지 이름" tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지의 이름입니다.">
                            
                        </OpenCloseCustom>
                        <OpenCloseCustom title="플로팅 버튼" tooltip="화면 하단에 고정되어 떠다니는 버튼입니다. 내비게이션의 버튼과 플로팅 버튼 중 하나만 사용하시길 바랍니다.">
                            <OnOffCustom text="플로팅 버튼" value={setting.fta.use} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.use = !setting.fta.use
                            }))} />
                            <EditRadioContainer text="사이즈" options={sizeOptions} value={setting.fta.size} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.size = e
                            }))} />
                            <EditRadioContainer text="모양" options={shapeOptions} value={setting.fta.shape} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.shape = e
                            }))} />
                            <EditColorContainer text="배경 색상" value={setting.fta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.backgroundColor = e;
                            }))} />
                            <InputCustom value={setting.fta.link} placeholder="링크를 입력하세요" func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.link = e
                            }))}/>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="URL">
                            <div className="center-column">
                                <div className="edit-element center-row">
                                    <div>
                                        <InputCustom value={setting.urlId} placeholder="사용할 url을 입력하세요" func={(e) => setSetting(produce(setting, draft => {
                                            draft.urlId = e;
                                        }))}/>
                                    </div>
                                    <div>
                                        .surfee.co.kr
                                    </div>
                                </div>
                                <div className="edit-element">
                                    * 영문, 숫자만 사용 가능합니다.
                                </div>
                            </div>
                        </OpenCloseCustom>
                    </div>
                    </>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                    <div>
                        <OpenCloseCustom title="메인 색상">
                            <EditColorContainer text="색상" value={setting.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.color = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="글씨체">
                            <div className="edit-element">
                                <div className="left">
                                    글씨체
                                </div>
                                <SelectCustom options={fontOptions} value={setting.font} onChange={(e) => setSetting(produce(setting, draft => {
                                    draft.font = e;
                                }))} />
                            </div>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="CTA 버튼" preseen={
                            <div className="edit-element">
                                <div className="centera" style={{padding:'5px 10px'}}>
                                    <div className="custom-button" style={{ color:`${setting.cta.color}`, border:`${setting.cta.border ? `1px solid ${setting.cta.borderColor}` : 'none'}`, boxShadow:`${setting.cta.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : 'none'}`, borderRadius:`${setting.cta.borderRadius}px`, backgroundColor:`${setting.cta.backgroundColor}`}}>
                                        디자인 미리보기
                                    </div>
                                </div>
                            </div>
                        }>
                            <EditRadioContainer button text="모양" options={shapeOptions} value={setting.cta.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.borderRadius = e
                            }))} />
                            <EditColorContainer text="배경 색상" value={setting.cta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.backgroundColor = e;
                            }))} />
                            <EditColorContainer text="폰트 색상" value={setting.cta.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.color = e;
                            }))} />
                            <OnOffCustom text="그림자" value={setting.cta.shadow} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.shadow = !setting.cta.shadow
                            }))} />
                            <OnOffCustom text="테두리" value={setting.cta.border} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.border = !setting.cta.border
                            }))} />
                            {
                                setting.cta.border && 
                                    <EditColorContainer value={setting.cta.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                        draft.cta.borderColor = e;
                                    }))} />
                            }
                        </OpenCloseCustom>
                        <OpenCloseCustom title="고스트 버튼" preseen={
                            <div className="edit-element">
                                <div className="centera" style={{padding:'5px 10px'}}>
                                    <div className="custom-button" style={{ color:`${setting.ghost.color}`, border:`${setting.ghost.border ? `1px solid ${setting.borderColor}` : 'none'}`, boxShadow:`${setting.ghost.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : 'none'}`, borderRadius:`${setting.ghost.borderRadius}px`, backgroundColor:`${setting.ghost.backgroundColor}`}}>
                                        디자인 미리보기
                                    </div>
                                </div>
                            </div>
                        }>
                            <EditRadioContainer text="모양" options={shapeOptions} value={setting.ghost.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.borderRadius = e
                            }))} />
                            <EditColorContainer text="배경 색상" value={setting.ghost.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.backgroundColor = e;
                            }))} />
                            <EditColorContainer text="폰트 색상" value={setting.ghost.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.color = e;
                            }))} />
                            <OnOffCustom text="그림자" value={setting.ghost.shadow} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.shadow = !setting.ghost.shadow
                            }))} />
                            <OnOffCustom text="테두리" value={setting.ghost.border} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.border = !setting.ghost.border
                            }))} />
                            <EditColorContainer text="테두리 색상" value={setting.ghost.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.borderColor = e;
                            }))} />
                        </OpenCloseCustom>
                    </div>
                    <OpenCloseCustom title="애니메이션">
                        <EditAnimationContainer 
                            text="애니메이션" 
                            options={animationOptions} 
                            value={setting.animation} 
                            func={ e => changeAnimationOption(e)} />
                    </OpenCloseCustom>
                    </>
                )
        }
    }

    return(
        <>
            {returnTable()}
        </>
    )
}

export default EdtiSetting
