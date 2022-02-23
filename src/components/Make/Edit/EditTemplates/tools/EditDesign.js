import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import RadioCustom from '../../tools/Custom/RadioCustom'
import produce from 'immer';
import ColorCustom from '../../tools/Custom/ColorCustom'
import TextSizeCustom from '../../tools/func/TextSizeCustom'
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import BoxCustom from '../../tools/Custom/BoxCustom'
import SliderCustom from '../../tools/Custom/SliderCustom'
import OnOffCustom from '../../tools/Custom/OnOffCustom'
import FuncContentImg from '../../tools/func/FuncContentImg'
import {Phone} from '@styled-icons/bootstrap'
import {Desktop} from '@styled-icons/fa-solid'

const alignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]

const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '약간 둥글게', value: 5 },
    { label: '많이 둥글게', value: 50 },
]

function EditDesign({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    // 콘텐츠 - 이미지 업로드
    const onChangeContentImage= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].backgroundImage.attachment = result;             
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 콘텐츠 - 이미지 삭제
    const RemoveImage = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].backgroundImage.attachment = '';
        }))
    }

    const backgroundColorOrImage = () => {
        switch(content.backgroundType){
            case 'color':
                return(
                        <>
                            <ColorCustom text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].backgroundColor = e
                            }))} />
                        </>
                )           
            case 'image':
                return(
                    <>
                        <FuncContentImg text="이미지" subtext="최대 5MB 업로드 가능" value={content.backgroundImage.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        <OnOffCustom value={content.backgroundImage.overlay} text="오버레이" func={e=>action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundImage.overlay = !content.backgroundImage.overlay;
                        }))} />
                        {
                            content.backgroundImage.overlay && 
                            <ColorCustom text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].backgroundColor = e
                            }))} />
                        }
                    </>
                )
            default:
                return(<></>)
        }
    }
    
    return (
        <div>
            <OpenCloseCustom title="배경" use={true}>
                <RadioCustom options={backOptions} value={content.backgroundType} func={e=>action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].backgroundType = e;
                }))} />
                { 
                    backgroundColorOrImage() 
                }
            </OpenCloseCustom>
            <OpenCloseCustom title="제목" use={content.title.use}>
                <ColorCustom text="색상" value={content.title.color} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.color = e;
                }))} />
                <RadioCustom text="정렬" options={alignOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.align = e;
                }))} />
                <TextSizeCustom text="크기" title value={content.title.size} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.size = e;
                }))} />
            </OpenCloseCustom>
            <OpenCloseCustom title="본문" use={content.desc.use}>
                <ColorCustom text="색상" value={content.desc.color} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.color = e;
                }))} />
                <RadioCustom text="정렬" options={alignOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.align = e;
                }))} />
                <TextSizeCustom text="크기" desc value={content.desc.size} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.size = e;
                }))} />
            </OpenCloseCustom>
            <OpenCloseCustom title="여백" use={true}>
                <SliderCustom top="상단 여백" value={content.padding.top} max={40} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].padding.top = e;
                }))}/>
                <SliderCustom top="하단 여백" value={content.padding.bottom} max={40} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].padding.bottom = e;
                }))}/>
            </OpenCloseCustom> 
            <OpenCloseCustom title="박스" use={true}>
                <OnOffCustom text="박스 사용" value={content.box.use} func={(e) => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].box.use = !content.box.use;
                }))} />
                {
                    content.box.use && <>
                        <ColorCustom text="색상" value={content.box.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].box.backgroundColor = e;
                        }))} />
                        <RadioCustom text="테두리" options={shapeOptions} value={content.box.borderRadius} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].box.borderRadius = e;
                        }))} />
                        <SliderCustom top="크기" value={content.box.height} max={15} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].box.height = e;
                        }))}/>
                    </>
                }
            </OpenCloseCustom>
            <BoxCustom title="반응형">
                <div className="edit-element">
                    <div className="edit-element__one" style={{flexDirection: 'column'}}>
                        <div className="edit-element__left">반응형</div> 
                        <div className="radio-container" style={{justifyContent:'center'}}>
                            <div className={content.responsive.pc ? 'radio-element-b' : 'radio-element-b r-unclicked radio-hover'} onClick={() => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].responsive.pc = !content.responsive.pc
                            }))}>
                                <Desktop size="30"/>
                                <div className="radio-shape-text ">
                                    PC
                                </div>
                            </div>
                            <div className={content.responsive.mobile ? 'radio-element-b' : 'radio-element-b r-unclicked radio-hover'} onClick={() => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].responsive.mobile = !content.responsive.mobile
                            }))}>
                                <Phone size="30"/>
                                <div className="radio-shape-text">
                                    모바일
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'8px'}}>
                            {
                                !content.responsive.pc && !content.responsive.mobile ? 
                                <div>
                                    이 섹션은 유저에게 보이지 않습니다.
                                </div>
                                :
                                !content.responsive.pc ?
                                <div>
                                    이 섹션은 PC에서는 보이지 않습니다.
                                </div>
                                :
                                !content.responsive.mobile ?
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
    )
}

export default EditDesign
