import React, {useState, useContext} from 'react'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import SingleColorCustom from '../tools/Custom/SingleColorCustom'
import InputCustom from '../tools/Custom/InputCustom'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import './EditSetting.css'
import '../EditTemplates/Edit.css'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import produce from 'immer';
import AnimationCustom from '../tools/Custom/AnimationCustom'
import AddFaviconImg from '../tools/func/FuncFaviconImg'
import {Check} from '@styled-icons/bootstrap'
import {ChevronDown} from '@styled-icons/bootstrap'
import OverflowScrolling from 'react-overflow-scrolling';
import {base} from '../../SectionTypes/baseTypes'
import {
    ChakraProvider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
import './Fonts.css'

export const fontOptions = [
    { label: 'Gmarket Sans', value: 'GmarketSansBold' },
    { label: 'Neo 둥근모', value: 'NeoDunggeunmo' },
    { label: 'Noto Sans KR', value: 'Noto Sans KR' },
    { label: 'Pretendard', value: 'Pretendard-Bold' },
    { label: 'Spoqa Han Sans Neo', value: 'SpoqaHanSansNeo-Bold' },
    { label: 'Y유니버스체', value: 'YUniverse-B' },
    { label: '강원교육모두', value: 'GangwonEdu_OTFBoldA' },
    { label: '경기천년바탕', value : 'GyeonggiBatang'},
    { label: '고운바탕', value: 'GowunBatang-Bold'},
    { label: '나눔스퀘어라운드', value: 'NanumSquareRound'},
    { label: '레페리포인트', value:'LeferiPoint-BlackA'},
    { label: '리디바탕', value : 'RIDIBatang'},
    { label: '마포금빛나루', value: 'MapoGoldenPier'},
    { label: '마포꽃섬', value: 'MapoFlowerIsland'},
    { label: '바른공군체', value: 'ROKAFSansMedium'},
    { label: '배달의민족 을지로체', value: 'BMEULJIRO'},
    { label: '배달의민족 주아체', value: 'BMJUA'},
    { label: '산돌 삼립호빵체', value: 'SDSamliphopangche_Outline'},
    { label: '순천체', value: 'SuncheonB'},
    { label: '아임혜민', value: 'IM_Hyemin'},
    { label: '에스코어 드림', value: 'S-CoreDream'},
    { label: '영도체', value: 'Yeongdo-Rg'},
    { label: '여기어때 잘난체', value: 'yg-jalnan'},
    { label: '원스토어 모바일POP체', value: 'ONE-Mobile-POP'},
    { label: '유앤피플 고딕', value: 'UNPGothicKS'},
    { label: '이서윤체', value: 'LeeSeoyun'},
    { label: '조선일보명조', value: 'Chosunilbo_myungjo'},
    { label: '카페24 고운밤', value: 'Cafe24Oneprettynight'},
    { label: '카페24 써라운드', value: 'Cafe24Ssurround'},
    { label: '카페24 아네모네', value: 'Cafe24Ohsquare'},
    { label: '코트라 희망체', value: 'KOTRAHOPE'},
    { label: '티머니 둥근바람', value: 'TmoneyRoundWindExtraBold'},
    { label: '함박눈체', value: 'SF_HambakSnow'},
]

const smallFontOptions = [
    { label: 'Gmarket Sans', value: 'GmarketSansLight' },
    { label: 'Neo 둥근모', value: 'NeoDunggeunmo' },
    { label: 'Noto Sans KR', value: 'Noto Sans KR' },
    { label: 'Pretendard', value: 'Pretendard-Regular' },
    { label: 'Spoqa Han Sans Neo', value: 'SpoqaHanSansNeo-Regular' },
    { label: 'Y유니버스체', value: 'YUniverse-L' },
    { label: '강원교육모두', value: 'GangwonEdu_OTFLight' },
    { label: '경기천년바탕', value : 'GyeonggiBatang'},
    { label: '고운바탕', value: 'GowunBatang-Regular'},
    { label: '나눔스퀘어라운드', value: 'NanumSquareRound'},
    { label: '레페리포인트', value:'LeferiPoint-WhiteA'},
    { label: '리디바탕', value : 'RIDIBatang'},
    { label: '마포금빛나루', value: 'MapoGoldenPier'},
    { label: '마포꽃섬', value: 'MapoFlowerIsland'},
    { label: '바른공군체', value: 'ROKAFSansBold'},
    { label: '배달의민족 을지로체', value: 'BMEULJIRO'},
    { label: '배달의민족 주아체', value: 'BMJUA'},
    { label: '산돌 삼립호빵체', value: 'SDSamliphopangche_Basic'},
    { label: '순천체', value: 'SuncheonR'},
    { label: '아임혜민', value: 'IM_Hyemin'},
    { label: '에스코어 드림', value: 'S-CoreDream'},
    { label: '영도체', value: 'Yeongdo-Rg'},
    { label: '여기어때 잘난체', value: 'yg-jalnan'},
    { label: '원스토어 모바일POP체', value: 'ONE-Mobile-POP'},
    { label: '유앤피플 고딕', value: 'UNPGothicKS'},
    { label: '이서윤체', value: 'LeeSeoyun'},
    { label: '조선일보명조', value: 'Chosunilbo_myungjo'},
    { label: '카페24 고운밤', value: 'Cafe24Oneprettynight'},
    { label: '카페24 써라운드', value: 'Cafe24SsurroundAir'},
    { label: '카페24 아네모네', value: 'Cafe24Ohsquareair'},
    { label: '코트라 희망체', value: 'KOTRAHOPE'},
    { label: '티머니 둥근바람', value: 'TmoneyRoundWindRegular'},
    { label: '함박눈체', value: 'SF_HambakSnow'},
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 20 },
]

const sizeOptions = [
    { label: '작게', value: 50 },
    { label: '보통', value: 75 },
    { label: '크게', value: 98 },
]

function EdtiSetting({setting, setSetting, category, setContents}) {
    const [alarm, setAlarm] = useState(false);
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    // 애니메이션 관련 
    const animationOptions = [
        {label:'없음', value: 'none'},
        {label:'떠오르기', value: 'fade-up'},
        {label:'fade-zoom-in', value: 'fade-zoom-in'}
    ]

    const changeAnimationOption = e => {
        setSetting({...setting, animation : e});
        action.setContents(produce(state.contents, draft => {
            draft.map(item => item.animation = e)
        }))
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

    const FontSelect = () => {
        return(
        <div className="edit-element" style={{flexDirection:'row'}}>
            <div className="left" style={{width:'20%'}}>제목</div>
            <div className="right" style={{width:'80%'}}>
            <Menu>
                <MenuButton className="font-button opacity-hover" style={{fontFamily:`${setting.font}`, width:'250px'}}>
                    {
                    fontOptions.filter(doc => doc.value === setting.font).length !== 0 ?
                        fontOptions.filter(doc => doc.value === setting.font)[0].label
                        :
                        <span>폰트 수정이 필요합니다.</span>
                    }
                    <ChevronDown size="15" style={{position:'absolute', right:'12px'}}/>
                </MenuButton>
                <MenuList>

                <div style={{height:'350px'}}>
                    <OverflowScrolling className='overflow-scrolling2'>
                    {fontOptions.map((item, index) => {
                        return(
                            <MenuItem className={item.value === setting.font ? 'select-hover clicked' : 'select-hover'} onClick={(e) => {setSetting(produce(setting, draft => {
                                draft.font = item.value
                            }))}} style={{fontFamily: `${item.value}`, width:'250px'}}>
                                <div className="left" style={{width:'70%'}}>
                                    {item.label}
                                </div>
                                {
                                    item.value === setting.font && 
                                    <div className="right">
                                        <Check size="20"/>
                                    </div>
                                }
                            </MenuItem>
                        )
                    })}
                    </OverflowScrolling>
                </div>
                </MenuList>
            </Menu>
            </div>
        </div>
        )
    }

    const SmallFontSelect = () => {
        return(
        <div className="edit-element" style={{flexDirection:'row'}}>
            <div className="left" style={{width:'20%'}}>본문</div>
            <div className="right" style={{width:'80%'}}>
            <Menu>
                <MenuButton className="font-button opacity-hover" style={{fontFamily:`${setting.smallFont}`, width:'250px'}}>
                    {smallFontOptions.filter(doc => doc.value === setting.smallFont).length !== 0 ?
                        smallFontOptions.filter(doc => doc.value === setting.smallFont)[0].label
                        :
                        <span>폰트 수정이 필요합니다.</span>
                }
                    <ChevronDown size="15" style={{position:'absolute', right:'12px'}}/>
                </MenuButton>
                <MenuList>

                <div style={{height:'350px'}}>
                    <OverflowScrolling className='overflow-scrolling2'>
                    {smallFontOptions.map((item, index) => {
                        return(
                            <MenuItem className={item.value === setting.smallFont ? 'select-hover clicked' : 'select-hover'} onClick={(e) => {setSetting(produce(setting, draft => {
                                draft.smallFont = item.value
                            }))}} style={{fontFamily: `${item.value}`, width:'250px'}}>
                                <div className="left" style={{width:'70%'}}>
                                    {item.label}
                                </div>
                                {
                                    item.value === setting.smallFont && 
                                    <div className="right">
                                        <Check size="20"/>
                                    </div>
                                }
                            </MenuItem>
                        )
                    })}
                    </OverflowScrolling>
                </div>
                </MenuList>
            </Menu>
            </div>
        </div>
        )
    }

    const isNotNumber = (v) => {
        const regExp = /[a-z0-9]/g; 
        return regExp.test(v);
    }
    
    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <div>
                        <OpenCloseCustom title="파비콘" use={true} tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지를 대표하는 아이콘입니다." open={ state.focus === 'setting-favicon'}>
                            <AddFaviconImg text="파비콘" subtext="최대 1MB 업로드 가능, 64x64px 권장" value={setting.faviconAttachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="페이지 이름" use={true} tooltip="웹 브라우저의 주소창에 표시되는 웹 페이지의 이름입니다." open={ state.focus === 'setting-title'}>
                            <InputCustom value={setting.title} placeholder="웹 브라우저의 주소창에 표시되는 웹 페이지의 이름입니다." func={(e) => setSetting(produce(setting, draft => {
                                draft.title = e
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="URL" use={true} open={ state.focus === 'setting-urlId'}>
                            <div style={{flexDirection:'column'}}>
                                <div style={{display:'flex'}}>
                                    <div style={{color:'#202936', marginTop: '20px'}}>
                                        https://surfee.co.kr
                                    </div>
                                    <div>
                                        <InputCustom value={setting.urlId} placeholder="사용할 url을 입력하세요" noKorean func={(e) =>  {
                                            if (isNotNumber(e.nativeEvent.data)){ 
                                                setAlarm(false)
                                                setSetting(produce(setting, draft => {
                                                    draft.urlId = e.currentTarget.value
                                                }))
                                            }else{
                                                setAlarm(true)
                                                e.preventDefault(); 
                                                return null; 
                                            }}}/>
                                    </div>
                                </div>
                            </div>
                                <div style={{width:'90%', justifyContent:'center', fontSize:'12px', marginBottom:'16px', color:`${alarm ? 'red' : 'black'}`}}>
                                    * 영문 소문자와 숫자만 입력 가능합니다.
                                </div>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="플로팅 버튼" use={true} tooltip="화면 하단에 고정되어 떠다니는 버튼입니다. 내비게이션의 버튼과 플로팅 버튼 중 하나만 사용하시길 바랍니다." open={ state.focus === 'setting-fab'}>
                            <OnOffCustom text="ON/OFF" value={setting.fta.use} func={(e) => setSetting(produce(setting, draft => {
                                draft.fta.use = !setting.fta.use
                            }))} />
                            {
                                setting.fta.use && 
                                <>
                                    <RadioCustom text={state.isPhone ? '사이즈 - 모바일에서는 크기가 고정됩니다.' : '사이즈'} options={sizeOptions} value={setting.fta.size} func={(e) => setSetting(produce(setting, draft => {
                                        draft.fta.size = e
                                    }))} />
                                    <RadioCustom text="모양" options={shapeOptions} value={setting.fta.shape} func={(e) => setSetting(produce(setting, draft => {
                                        draft.fta.shape = e
                                    }))} />
                                    <div className="edit-element">
                                        {/* 폰트 색상 연결 안해놓음 디자인만! */}
                                        <SingleColorCustom text="폰트 색상" value={setting.fta.color} func={(e) => setSetting(produce(setting, draft => {
                                            draft.fta.color = e;
                                        }))} />
                                        <div className="edit-element-bar"/>
                                        <SingleColorCustom text="배경 색상" value={setting.fta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                            draft.fta.backgroundColor = e;
                                        }))} />
                                    </div>
                                    <OnOffCustom text="테두리" value={setting.fta.border} func={(e) => setSetting(produce(setting, draft => {
                                        draft.fta.border = !setting.fta.border
                                    }))} />
                                    {
                                        setting.fta.border && 
                                        <ColorCustom text="테두리 색상" value={setting.fta.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                            draft.fta.borderColor = e;
                                        }))} />
                                    }
                                    <OnOffCustom text="그림자" value={setting.fta.shadow} func={(e) => setSetting(produce(setting, draft => {
                                        draft.fta.shadow = !setting.fta.shadow
                                    }))} />
                                    <InputCustom text="링크 연결" value={setting.fta.link} placeholder="링크를 입력하세요" func={(e) => setSetting(produce(setting, draft => {
                                        draft.fta.link = e
                                    }))}/>
                                </>
                            }
                        </OpenCloseCustom>
                    </div>
                    </>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                    <div>
                        <OpenCloseCustom title="메인 색상" use={true} tooltip="메인 색상으로 설정한 색상은 다른 요소의 색상을 설정할 때 쉽게 적용할 수 있습니다.">
                            <SingleColorCustom value={setting.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.color = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="글씨체" use={true}>
                            <ChakraProvider>
                                {FontSelect()}
                                {SmallFontSelect()}
                            </ChakraProvider>
                        </OpenCloseCustom>
                        <OpenCloseCustom title="CTA 버튼" use={true} preseen={
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
                            <div className="edit-element">
                            <SingleColorCustom text="배경 색상" value={setting.cta.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.backgroundColor = e;
                            }))} />
                            <div>
                            <div className="edit-element-bar"/>
                            </div>
                            <SingleColorCustom text="폰트 색상" value={setting.cta.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.color = e;
                            }))} />
                            </div>
                            <OnOffCustom text="테두리" value={setting.cta.border} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.border = !setting.cta.border
                            }))} />
                                {
                                    setting.cta.border && 
                                        <ColorCustom value={setting.cta.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                            draft.cta.borderColor = e;
                                        }))} />
                                }
                            <OnOffCustom text="그림자" value={setting.cta.shadow} func={(e) => setSetting(produce(setting, draft => {
                                draft.cta.shadow = !setting.cta.shadow
                            }))} />
                            {/* <SliderCustom top="여백" value={setting.cta.padding} max={24} func={e => setSetting(produce(setting, draft => {
                                draft.cta.padding = e
                            }))}/> */}
                        </OpenCloseCustom>
                        <OpenCloseCustom title="고스트 버튼" use={true} preseen={
                            <div className="edit-element">
                                <div className="centera" style={{padding:'5px 10px'}}>
                                    <div className="custom-button" style={{ color:`${setting.ghost.color}`, border:`${setting.ghost.border ? `1px solid ${setting.ghost.borderColor}` : 'none'}`, boxShadow:`${setting.ghost.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : 'none'}`, borderRadius:`${setting.ghost.borderRadius}px`, backgroundColor:`${setting.ghost.backgroundColor}`}}>
                                        디자인 미리보기
                                    </div>
                                </div>
                            </div>
                        }>
                            <RadioCustom button text="모양" options={shapeOptions} value={setting.ghost.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.borderRadius = e
                            }))} />
                            <div className="edit-element">
                            <SingleColorCustom text="배경 색상" value={setting.ghost.backgroundColor} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.backgroundColor = e;
                            }))} />
                            <div>
                            <div className="edit-element-bar"/>
                            </div>
                            <SingleColorCustom text="폰트 색상" value={setting.ghost.color} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.color = e;
                            }))} />
                            </div>
                            <OnOffCustom text="테두리" value={setting.ghost.border} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.border = !setting.ghost.border
                            }))} />
                            {
                                setting.ghost.border && 
                                <ColorCustom text="테두리 색상" value={setting.ghost.borderColor} func={(e) => setSetting(produce(setting, draft => {
                                    draft.ghost.borderColor = e;
                                }))} />
                            }
                            <OnOffCustom text="그림자" value={setting.ghost.shadow} func={(e) => setSetting(produce(setting, draft => {
                                draft.ghost.shadow = !setting.ghost.shadow
                            }))} />
                            {/* <SliderCustom top="여백" value={setting.ghost.padding} max={24} func={e => setSetting(produce(setting, draft => {
                                draft['ghost'].padding = e
                            }))}/> */}
                        </OpenCloseCustom>
                    </div>
                    <OpenCloseCustom title="애니메이션" use={true}>
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
