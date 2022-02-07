import React, {useState, useContext} from 'react'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import InputCustom from '../tools/Custom/InputCustom'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import SelectCustom from '../tools/Custom/SelectCustom'
import './EditSetting.css'
import '../EditTemplates/Edit.css'
import EditTopBar from '../tools/func/FuncTopBar'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import produce from 'immer';
import AnimationCustom from '../tools/Custom/AnimationCustom'
import { base } from '../../SectionTypes/baseTypes'
import AddContentImg from '../tools/func/FuncContentImg'
import {Check} from '@styled-icons/bootstrap'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    ButtonGroup,
    Portal,
    Button
  } from '@chakra-ui/react'

const fontOptions = [
    { label: '노토산스', value: 'Noto Sans KR' },
    { label: '프리텐다드', value: 'Pretendard-Regular' },
    { label: '나눔스퀘어 라운드', value: 'NanumSquareRound' },
    { label: '바른 공군', value: 'ROKAFSansBold' },
    { label: '지마켓 산스', value: 'GmarketSansMedium' },
    { label: '고운 돋움', value: 'GowunDodum-Regular' },
    { label: '에스코어 드림', value: 'S-CoreDream-4Regular' },
    
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
    const [isFontOpen, setIsFontOpen] = useState(false)
    const open = () => setIsFontOpen(!isFontOpen)
    const close = () => setIsFontOpen(false)

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

    // 이미지 업로드
    const onChangeContentImage= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            setSetting(produce(setting, draft=>{
                draft.faviconAttachment = result;             
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 이미지 삭제
    const RemoveImage = () => {
        setSetting(produce(setting, draft=>{
            draft.faviconAttachment = '';
        }))
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <div>
                        <OpenCloseCustom title="파비콘" tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지를 대표하는 아이콘입니다.">
                            <AddContentImg text="이미지" value={setting.faviconAttachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="페이지 이름" tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지의 이름입니다.">
                            <InputCustom value={setting.title} placeholder="웹 브라우저의 주소창에 표시되는 웹 페이지의 이름입니다." func={(e) => setSetting(produce(setting, draft => {
                                draft.title = e
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="플로팅 버튼" tooltip="화면 하단에 고정되어 떠다니는 버튼입니다. 내비게이션의 버튼과 플로팅 버튼 중 하나만 사용하시길 바랍니다.">
                            <OnOffCustom text="플로팅 버튼" value={setting.fta.use} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.use = !setting.fta.use
                            }))} />
                            <RadioCustom text="사이즈" options={sizeOptions} value={setting.fta.size} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.size = e
                            }))} />
                            <RadioCustom text="모양" options={shapeOptions} value={setting.fta.shape} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.shape = e
                            }))} />
                            <ColorCustom text="배경 색상" value={setting.fta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.backgroundColor = e;
                            }))} />
                            <InputCustom value={setting.fta.link} placeholder="링크를 입력하세요" func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.link = e
                            }))}/>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="URL">
                            <div className="edit-element" style={{flexDirection:'column'}}>
                                <div className="center-row" style={{justifyContent: 'start'}}>
                                    <InputCustom value={setting.urlId} placeholder="사용할 url을 입력하세요" noKorean func={(e) => setSetting(produce(setting, draft => {
                                        draft.urlId = e;
                                    }))}/>
                                    <div style={{color:'#202936'}}>
                                        .surfee.co.kr
                                    </div>
                                </div>
                                <div style={{width:'90%', justifyContent:'start', fontSize:'12px'}}>
                                    * 영문, 숫자만 입력 가능
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
                            <ColorCustom text="색상" value={setting.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.color = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="글씨체">
                            <ChakraProvider>
                                <div className="edit-element" style={{flexDirection:'row'}}>
                                    
                                {/* <SelectCustom options={fontOptions} value={setting.font} onChange={(e) => setSetting(produce(setting, draft => {
                                    draft.font = e;
                                }))} /> */}
                                <div className="left" style={{width:'20%'}}>제목</div>
                                <Popover
                                    placement='right'
                                    closeOnBlur={false}
                                    isOpen={isFontOpen}
                                    onClose={close}
                                >
                                <PopoverTrigger>
                                    <div className="font-button right" style={{fontFamily: `${setting.font}`}} onClick={open}>노코드 랜딩페이지 제작 툴, Surfee</div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />

                                    <PopoverHeader>폰트를 선택하세요.</PopoverHeader>
                                    
                                    <PopoverCloseButton />
                                    
                                    <PopoverBody>
                                        {fontOptions.map((item, index) => {
                                            return(
                                                <div className={item.value === setting.font ? 'select-hover clicked' : 'select-hover'} onClick={(e) => {setSetting(produce(setting, draft => {
                                                    draft.font = item.value
                                                }))}} style={{fontFamily: `${item.value}`}}>
                                                    <div className="left">
                                                        {item.label}
                                                    </div>
                                                    {
                                                        item.value === setting.font && 
                                                        <div className="right">
                                                            <Check size="20"/>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </PopoverBody>
                                    
                                    <PopoverFooter d='flex' justifyContent='flex-end'>
                                        <ButtonGroup size='sm'>
                                        <Button className="font-done-button" onClick={() => close()}>Apply</Button>
                                        </ButtonGroup>
                                    </PopoverFooter>

                                </PopoverContent>
                                </Popover>
                                </div>
                            </ChakraProvider>
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
                            <RadioCustom button text="모양" options={shapeOptions} value={setting.cta.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.borderRadius = e
                            }))} />
                            <ColorCustom text="배경 색상" value={setting.cta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.backgroundColor = e;
                            }))} />
                            <ColorCustom text="폰트 색상" value={setting.cta.color} func={(e) => setSetting(produce(setting, draft => {
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
                                    <ColorCustom value={setting.cta.borderColor} func={(e) => setSetting(produce(setting, draft => {
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
                            <RadioCustom text="모양" options={shapeOptions} value={setting.ghost.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.borderRadius = e
                            }))} />
                            <ColorCustom text="배경 색상" value={setting.ghost.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.backgroundColor = e;
                            }))} />
                            <ColorCustom text="폰트 색상" value={setting.ghost.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.color = e;
                            }))} />
                            <OnOffCustom text="그림자" value={setting.ghost.shadow} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.shadow = !setting.ghost.shadow
                            }))} />
                            <OnOffCustom text="테두리" value={setting.ghost.border} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.border = !setting.ghost.border
                            }))} />
                            {
                                setting.ghost.border && 
                                <ColorCustom text="테두리 색상" value={setting.ghost.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                    draft.ghost.borderColor = e;
                                }))} />
                            }
                        </OpenCloseCustom>
                    </div>
                    <OpenCloseCustom title="애니메이션">
                        <AnimationCustom 
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
