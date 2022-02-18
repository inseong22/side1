import React, {useState} from 'react'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import InputCustom from '../tools/Custom/InputCustom'
import ResponsiveCustom from '../tools/Custom/ResponsiveCustom'
import CheckBoxContainer from '../tools/Custom/CheckBoxCustom'
import ElementsTable from '../EditTemplates/tools/ElementsTable'
import SliderCustom from '../tools/Custom/SliderCustom'
import TextSizeCustom from '../tools/func/TextSizeCustom'
import BoxCustom from '../tools/Custom/BoxCustom'
import produce from 'immer';
import AddContentImg from '../tools/func/FuncContentImg'
import {Phone} from '@styled-icons/bootstrap'
import {Desktop} from '@styled-icons/fa-solid'

const logoOptions = [
    { label: '로고 이미지', value: 'logo' },
    { label: '텍스트', value: 'text' },
]

const logoAlignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]

const buttonAlignOptions = [
    { label: '중앙', value: 'center' },
    { label: '오른쪽', value: 'end' },
]

function EditNaviSection({navi, setNavi, category}) {
    const [logo, setLogo] = useState("logo")
    const [buttonUse, setButtonUse] = useState(true)
    const [buttonFunc, setButtonFunc] = useState("link")
    const [buttonTemplate, setButtonTemplate] = useState(1)

    const elements = [
        {
            title:'로고',
            use:navi.logo.use,
            func:() => setNavi(produce(navi, draft => {
                draft.logo.use = !navi.logo.use;
            }))
        },
        {
            title:'버튼',
            use:navi.button.use,
            func:() => setNavi(produce(navi, draft => {
                draft.button.use = !navi.button.use;
            }))
        },
    ]


    // 이미지 업로드
    const onChangeContentImage= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            setNavi(produce(navi, draft=>{
                draft.logo.image.attachment = result;             
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 이미지 삭제
    const RemoveImage = () => {
        setNavi(produce(navi, draft=>{
            draft.logo.image.attachment = '';
        }))
    }

    return (
        <div>
            { category === 0 ? 
            <>
                <div>
                    <ElementsTable elements={elements} />
                    <OpenCloseCustom title="로고" use={navi.logo.use}>
                        <RadioCustom options={logoAlignOptions} value={navi.logo.align} func={(e) => setNavi(produce(navi, draft => {
                            draft.logo.align = e;
                        }))} text="정렬" />

                        <OnOffCustom value={navi.logo.image.use} func={(e) => setNavi(produce(navi, draft => {
                            draft.logo.image.use = !navi.logo.image.use;
                        }))} text="로고 (Image)" />
                        {
                            navi.logo.image.use && 
                            <>
                                <AddContentImg text="로고" value={navi.logo.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                                <SliderCustom text="로고 사이즈" max='53' func={e => setNavi(produce(navi, draft => {
                                    draft.logo.image.width = e;
                                }))} />
                            </>
                        }
                        <OnOffCustom value={navi.logo.text.use} func={(e) => setNavi(produce(navi, draft => {
                            draft.logo.text.use = !navi.logo.text.use;
                        }))} text="서비스/제품명 (Text)" />
                        {
                            navi.logo.text.use && <>
                                <ColorCustom text="Text 색상" value={navi.logo.text.color} func={e =>  setNavi(produce(navi, draft => {
                                    draft.logo.text.color = e;
                                }))} />
                                <TextSizeCustom text="Text 크기" desc value={navi.logo.text.fontSize} func={e =>  setNavi(produce(navi, draft => {
                                    draft.logo.text.fontSize = e;
                                }))} />
                            </>
                        }
                    </OpenCloseCustom>
                    <OpenCloseCustom title="버튼 사용" use={navi.button.use}>
                        <RadioCustom options={buttonAlignOptions} value={navi.button.align} func={(e) => setNavi(produce(navi, draft => {
                            draft.button.align = e;
                        }))} text="정렬" />
                        
                        <OnOffCustom text="CTA 버튼" value={navi.button.cta.use} func={() => setNavi(produce(navi, draft => {
                            draft.button.cta.use = !navi.button.cta.use
                        }))} />
                        {
                            navi.button.cta.use && 
                            <>
                                <InputCustom placeholder="연결하고 싶은 URL을 입력해 주세요." value={navi.button.cta.link} func={(e) => setNavi(produce(navi, draft => {
                                    draft.button.cta.link = e
                                }))} />
                                <SliderCustom top="CTA 여백" value={navi.button.cta.padding} max={26} func={e => setNavi(produce(navi, draft => {
                                    draft.button.cta.padding = e;
                                }))}/>
                            </>
                        }
                        <div></div>
                        <OnOffCustom text="고스트 버튼" value={navi.button.ghost.use} func={() => setNavi(produce(navi, draft => {
                            draft.button.ghost.use = !navi.button.ghost.use
                        }))} />

                        {
                            navi.button.ghost.use && 
                            <>
                                <InputCustom placeholder="연결하고 싶은 URL을 입력해 주세요." value={navi.button.ghost.link} func={(e) => setNavi(produce(navi, draft => {
                                    draft.button.ghost.link = e
                                }))} />
                                <SliderCustom top="고스트 여백" value={navi.button.ghost.padding} max={26} func={e => setNavi(produce(navi, draft => {
                                    draft.button.ghost.padding = e;
                                }))}/>
                            </>
                        }
                    </OpenCloseCustom>
                    
                    <BoxCustom>
                        <OnOffCustom text="페이지 상단 고정" value={navi.fixed} func={e => setNavi({...navi, fixed:!navi.fixed})}/>
                        <div className="edit-element">
                            {
                                navi.fixed ? <p className="mid-command">스크롤을 내리면 내비게이션 바는 더 이상 보이지 않습니다.</p> 
                                    : 
                                <p className="mid-command">스크롤을 내려도 내비게이션 바가 화면 상단에 따라 다닙니다.</p>
                            }
                        </div>
                    </BoxCustom>
                </div>
            </>
            : 
            <>
            <div>
                <OpenCloseCustom title="배경색" use={true}>
                    <ColorCustom func={(e) => setNavi({...navi, backgroundColor:e})} value={navi.backgroundColor} text="색상" />
                </OpenCloseCustom>
                <OpenCloseCustom title="구분선" use={true}>
                    <CheckBoxContainer text="구분선" value={navi.bottomBorder.use} func={e => setNavi(produce(navi, draft => {
                        draft.bottomBorder.use = !navi.bottomBorder.use;
                    }))}/>
                    {
                        navi.bottomBorder.use && <>
                            <ColorCustom func={(e) => setNavi(produce(navi, draft => {
                                draft.bottomBorder.color = e
                            }))} value={navi.bottomBorder.color} text="색상" />
                        </>
                    }
                </OpenCloseCustom>
                <OpenCloseCustom title="높이" use={true}>
                    <SliderCustom text="높이를" value={navi.height} func={e => setNavi({...navi, height:e})}/>
                </OpenCloseCustom>
                <BoxCustom title="반응형">
                <div className="edit-element">
                    <div className="edit-element__one" style={{flexDirection: 'column'}}>
                        <div className="edit-element__left">반응형</div> 
                        <div className="radio-container" style={{justifyContent:'center'}}>
                            <div className={navi.responsive.pc ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => setNavi(produce(navi, draft => {
                                draft.responsive.pc = !navi.responsive.pc
                            }))}>
                                <Desktop size="30"/>
                                <div className="radio-shape-text">
                                    PC
                                </div>
                            </div>
                            <div className={navi.responsive.mobile ? 'radio-element-b' : 'radio-element-b r-unclicked'} onClick={() => setNavi(produce(navi, draft => {
                                draft.responsive.mobile = !navi.responsive.mobile
                            }))}>
                                <Phone size="30"/>
                                <div className="radio-shape-text">
                                    모바일
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'8px'}}>
                            {
                                !navi.responsive.pc && !navi.responsive.mobile ? 
                                <div>
                                    이 섹션은 유저에게 보이지 않습니다.
                                </div>
                                :
                                !navi.responsive.pc ?
                                <div>
                                    이 섹션은 PC에서는 보이지 않습니다.
                                </div>
                                :
                                !navi.responsive.mobile ?
                                <div>
                                    이 섹션은 모바일에서는 보이지 않습니다.
                                </div>
                                :<></>
                            }
                        </div>
                    </div>
                </div>
            </BoxCustom>
            </div>
            </>
            }
        </div>
    )
}

export default EditNaviSection
