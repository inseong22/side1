import React, {useContext} from 'react'
import produce from 'immer';
import { MyContext } from '../../../../pages/Make/MakePageV2'
import {EditRadioContainer} from '../tools/RadioCustom'
import {EditColorContainer} from '../tools/ColorCustom'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ImageAddEdit from '../tools/ImageAddEdit'
import EditSlider from '../tools/EditSlider'
import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';


const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]
const alignOptions = [
    { label: <AlignStart width={30} />, value: 'left' },
    { label: <AlignCenter width={30} />, value: 'center' },
    { label: <AlignEnd width={30} />, value: 'right' },
]
const textSizeOptions = [
    { label: 's', value: 15 },
    { label: 'm', value: 20 },
    { label: 'l', value: 25 },
]
const paddingOptions = [
    { label: '없음', value: 0 },
    { label: '좁게', value: 5 },
    { label: '보통', value: 10 },
    { label: '넓게', value: 20 },
    { label: '커스텀', value: 0.1},
]

function DesignHero({content}) {
    const {state, action} = useContext(MyContext)

    // 배경 관련
    const changeBackgroundOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].backgroundType = e;
        }));
    }
    const changeImageOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.type = e;
        }));
    }
    // 이미지의 경우에는 (이미지 로드)
    const onChangeBackgroundImage = e => {
        let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            // newContents[state.secNum].backgroundImage.attachment = result;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].backgroundImage.attachment = result;
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 체크가 눌리지 않았을 경우, 이미지 삭제
    const DeleteBackgroundImage = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].backgroundImage.attachment = '';
        }))
    }
    const backgroundColorOrImage = () => {
        switch(content.backgroundType){
            case 'color':
                return(
                        <>
                        <EditColorContainer text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundColor = e
                        }))} />
                        <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">배경 색상 투명도</div>
                            <div className="edit-element__right">
                                <input onChange={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].backgroundOpacity = e.currentTarget.value
                                    draft[state.secNum].backgroundImage.use = 'hidden'
                                }))} value={content.backgroundOpacity} type="number" />
                            </div>
                        </div>
                        </div>
                        </>
                )           
            case 'image':
                return(
                    <div className='edit-element'>
                        <div className="edit-element__one">
                        <CheckBoxContainer text="배경 업로드" value={content.backgroundImage.use} func={ () => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundImage.use = !content.backgroundImage.use;
                            draft[state.secNum].backgroundColor= 'transparent';
                        }))} />
                        {
                            content.backgroundImage.use ? ( 
                                <ImageAddEdit value={content.backgroundImage.attachment} func={e => onChangeBackgroundImage(e)} />
                            ):
                            (
                                DeleteBackgroundImage()
                            )
                        }
                        </div>
                    </div>
                )
        }
    }

    // 여백 관련
    const setPaddingTop = (e) => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingTop = e.target.value
        }))
    }
    const setPaddingBottom = (e) => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingBottom = e.target.value
        }))
    }
    const customPadding = () => {
        if(content.paddingCustom) 
        return(
            <>
            <div className="edit-element">
                <div className="edit-element__one">
                    <div className="edit-element__left">여백(위)</div>
                    <div className="edit-element__right">
                        <EditSlider content={content} value={content.paddingTop} func={setPaddingTop} max="20"/>
                    </div>
                </div>
            </div>
            <div className="edit-element">
            <div className="edit-element__one">
                <div className="edit-element__left">여백(아래)</div>
                <div className="edit-element__right">
                    <EditSlider content={content} value={content.paddingBottom} func={setPaddingBottom} max="20"/>
                </div>
            </div>
            </div>
        </>
        )  
    }
    const changePaddingOption = e => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingTop = e
            draft[state.secNum].paddingBottom = e
            if(draft[state.secNum].paddingTop == 0.1)
                draft[state.secNum].paddingCustom = true
            else
                draft[state.secNum].paddingCustom = false
        }))
    }

    return (
        <>
        <EditRadioContainer text='배경' options={backOptions} value={content.backgroundType} func={e=>changeBackgroundOption(e)} />
        {
            backgroundColorOrImage()
        } 
        <EditRadioContainer text="제목 텍스트 배치" options={alignOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.align = e
        }))}/> 
        <EditRadioContainer text="제목 크기 설정" options={textSizeOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.size = e
        }))}/> 
        <EditColorContainer text={"제목 텍스트 색상"} value={content.title.color} func={e => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.color = e
        }))} />
        <EditRadioContainer text="본문 텍스트 배치" options={alignOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].desc.align = e
        }))}/> 
        <EditRadioContainer text="본문 크기 설정" options={textSizeOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
            draft[state.secNum].desc.size = e
        }))}/>      
        <EditColorContainer text={"본문 텍스트 색상"} value={content.desc.color} func={e => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].desc.color = e
        }))} /> 
        <EditRadioContainer text="위아래 여백" options={paddingOptions} value={content.paddingTop} func={e => changePaddingOption(e)} />
        {
            customPadding()
        }
        </>
    )
}

export default DesignHero
