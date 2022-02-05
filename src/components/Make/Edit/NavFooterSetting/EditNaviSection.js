import React, {useState} from 'react'
import {EditRadioContainer} from '../tools/RadioCustom'
import EditButtonTable from '../tools/EditButtonTable'
import {EditColorContainer} from '../tools/ColorCustom'
import OpenCloseCustom from '../tools/OpenCloseCustom'
import OnOffCustom from '../tools/OnOffCustom'
import InputCustom from '../tools/InputCustom'
import ResponsiveCustom from '../tools/ResponsiveCustom'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ElementsTable from '../tools/ElementsTable'
import EditSlider from '../tools/EditSlider'
import TextSizeCustom from '../tools/TextSizeCustom'
import BoxCustom from '../tools/BoxCustom'
import produce from 'immer';

const logoOptions = [
    { label: '로고 이미지', value: 'logo' },
    { label: '텍스트', value: 'text' },
]
const logoAlignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
]
const buttonOptions = [
    { label: '링크', value: 'link' },
    { label: '스크롤', value: 'scroll' },
    { label: '팝업', value: 'popup' },
]

function EditNaviSection({navi, setNavi, category}) {
    const [logo, setLogo] = useState("logo")
    const [buttonUse, setButtonUse] = useState(true)
    const [buttonFunc, setButtonFunc] = useState("link")
    const [buttonTemplate, setButtonTemplate] = useState(1)

    const elements = [
        {
            title:'버튼',
            use:navi.button.use,
            func:() => setNavi(produce(navi, draft => {
                draft.button.use = !navi.button.use;
            }))
        },
        {
            title:'로고',
            use:navi.logoUse,
            func:() => setNavi(produce(navi, draft => {
                draft.logoUse = !navi.logoUse;
            }))
        },
        {
            title:'앱 다운로드',
            use:navi.appButton.use,
            func:() => setNavi(produce(navi, draft => {
                draft.appButton.use = !navi.appButton.use;
            }))
        },
    ]

    const changeNaviTemplate = num => {
        let newNavi = JSON.parse(JSON.stringify(navi))
        newNavi.sectionTemplateNumber = num
        setNavi(newNavi);
    }

    // 템플릿 2 이미지의 경우에는
    const onChangeLogoImage = e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            setNavi(produce(navi, draft => {
                draft.logoImage.attachment = result;
            }))
        }
        reader.readAsDataURL(oneFile);
    }

    const returnFuncEdit = () => {
        switch(buttonFunc){
            case "link":
                return(
                    <div className="edit-element">
                        링크 수정
                    </div>
                )
            case "scroll":
                return(
                    <div className="edit-element">
                        스크롤 수정
                    </div>
                )
            case "popup":
                return(
                    <div className="edit-element">
                        팝업 수정
                    </div>
                )
        }
    }

    const returnButtonTemplates = () => {

    }

    return (
        <div>
            { category === 0 ? 
            <>
                <div>
                    <ElementsTable elements={elements} />
                    <OpenCloseCustom title="로고">
                        <OnOffCustom value={navi.logoUse} func={(e) => setNavi(produce(navi, draft => {
                            draft.logoUse = !navi.logoUse;
                        }))} text="로고" />
                        <EditRadioContainer options={logoAlignOptions} value={navi.logoAlign} func={(e) => setNavi(produce(navi, draft => {
                            draft.logoAlign = e;
                        }))} text="정렬" />

                        <OnOffCustom value={navi.logoImage.use} func={(e) => setNavi(produce(navi, draft => {
                            draft.logoImage.use = !navi.logoImage.use;
                        }))} text="로고 (Image)" />
                        {
                            navi.logoImage.use && 
                            <>
                                <div className="edit-element no-border">
                                    <div className="edit-element__one">
                                        <div className="edit-element__left">로고</div>
                                        <div className="edit-element__right">
                                            <input type="file" accept="image/*" id="file" onChange={ e => onChangeLogoImage(e) } />
                                        </div>
                                    </div>
                                </div>
                                <EditSliderContainer text="Image 사이즈" subtext="이미지의 세로 길이를 조절해주세요." value={navi.logoImage.width} func={e => setNavi(produce(navi, draft => {
                                    draft.logoImage.width = e;
                                }))} />
                            </>
                        }
                        <OnOffCustom value={navi.logoText.use} func={(e) => setNavi(produce(navi, draft => {
                            draft.logoText.use = !navi.logoText.use;
                        }))} text="서비스/제품명 (Text)" />
                        {
                            navi.logoText.use && <>
                                <EditColorContainer text="Text 색상" value={navi.logoText.color} func={e =>  setNavi(produce(navi, draft => {
                                    draft.logoText.color = e;
                                }))} />
                                <TextSizeCustom text="Text 크기" value={navi.logoText.fontSize} func={e =>  setNavi(produce(navi, draft => {
                                    draft.logoText.fontSize = e;
                                }))} />
                            </>
                        }
                    </OpenCloseCustom>
                    <OpenCloseCustom title="버튼 사용">

                        <OnOffCustom text="버튼 사용" value={navi.button.use} func={() => setNavi(produce(navi, draft => {
                            draft.button.use = !navi.button.use
                        }))} />
                        <EditRadioContainer options={logoAlignOptions} value={navi.button.align} func={(e) => setNavi(produce(navi, draft => {
                            draft.button.align = e;
                        }))} text="정렬" />
                        
                        <OnOffCustom text="CTA 버튼" value={navi.button.cta.use} func={() => setNavi(produce(navi, draft => {
                            draft.button.cta.use = !navi.button.cta.use
                        }))} />
                        {
                            navi.button.cta.use && 
                                <InputCustom placeholder="연결하고 싶은 URL을 입력해주세요." value={navi.button.cta.link} func={(e) => setNavi(produce(navi, draft => {
                                    draft.button.cta.link = e
                                }))} />
                        }
                        
                        <OnOffCustom text="고스트 버튼" value={navi.button.ghost.use} func={() => setNavi(produce(navi, draft => {
                            draft.button.ghost.use = !navi.button.ghost.use
                        }))} />
                        {
                            navi.button.ghost.use && 
                                <InputCustom placeholder="연결하고 싶은 URL을 입력해주세요." value={navi.button.ghost.link} func={(e) => setNavi(produce(navi, draft => {
                                    draft.button.ghost.link = e
                                }))} />
                        }
                    </OpenCloseCustom>
                    <BoxCustom>
                        <OnOffCustom text="페이지 상단 고정" value={navi.fixed} func={e => setNavi({...navi, fixed:!navi.fixed})}/>
                        <div>
                            {
                                navi.fixed ? <p>스크롤을 내리면 내비게이션 바는 더 이상 보이지 않습니다.</p> 
                                    : 
                                <p>스크롤을 내려도 내비게이션 바가 화면 상단에 따라 다닙니다.</p>
                            }
                        </div>
                    </BoxCustom>
                </div>
            </>
            : 
            <>
            <div>
                <OpenCloseCustom title="배경색">
                    <EditColorContainer func={(e) => setNavi({...navi, backgroundColor:e})} value={navi.backgroundColor} text="색상" />
                </OpenCloseCustom>
                <OpenCloseCustom title="구분선">
                    <CheckBoxContainer text="구분선" value={navi.bottomBorder.use} func={e => setNavi(produce(navi, draft => {
                        draft.bottomBorder.use = !navi.bottomBorder.use;
                    }))}/>
                    {
                        navi.bottomBorder.use && <>
                            <EditColorContainer func={(e) => setNavi(produce(navi, draft => {
                                draft.bottomBorder.color = e
                            }))} value={navi.bottomBorder.color} text="색상" />
                        </>
                    }
                </OpenCloseCustom>
                <OpenCloseCustom title="높이">
                    <EditSlider text="높이 조정" value={navi.height} func={e => setNavi({...navi, height:e})}/>
                </OpenCloseCustom>
                <ResponsiveCustom />
            </div>
            </>
            }
        </div>
    )
}

export default EditNaviSection
