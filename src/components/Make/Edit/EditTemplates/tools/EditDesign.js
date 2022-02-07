import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import ElementsTable from './ElementsTable'
import TemplateChoose from '../../tools/TemplateChoose'
import {EditRadioContainer} from '../../tools/Custom/RadioCustom'
import produce from 'immer';
import {EditColorContainer} from '../../tools/Custom/ColorCustom'
import TextSizeCustom from '../../tools/func/TextSizeCustom'
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import {EditSliderContainer} from '../../tools/Custom/SliderCustom'

const alignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
]

const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]

function EditDesign({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.


    const backgroundColorOrImage = () => {
        switch(content.backgroundType){
            case 'color':
                return(
                        <>
                            <EditColorContainer text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].backgroundColor = e
                            }))} />
                        </>
                )           
            case 'image':
                return(
                    <div className='edit-element'>
                    </div>
                )
            default:
                return(<></>)
        }
    }
    
    return (
        <div>
            <OpenCloseCustom title="배경">
                <EditRadioContainer options={backOptions} value={content.backgroundType} func={e=>action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].backgroundType = e;
                }))} />
                { 
                    backgroundColorOrImage() 
                }
            </OpenCloseCustom>
            <OpenCloseCustom title="제목">
                <EditColorContainer text="색상" value={content.title.color} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.color = e;
                }))} />
                <EditRadioContainer text="정렬" options={alignOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.align = e;
                }))} />
                <TextSizeCustom text="크기" value={content.title.size} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].title.size = e;
                }))} />
            </OpenCloseCustom>
            <OpenCloseCustom title="본문">
                <EditColorContainer text="색상" value={content.desc.color} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.color = e;
                }))} />
                <EditRadioContainer text="정렬" options={alignOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.align = e;
                }))} />
                <TextSizeCustom text="크기" value={content.desc.size} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].desc.size = e;
                }))} />
            </OpenCloseCustom>
            <OpenCloseCustom title="여백">
                <EditSliderContainer text="상단 여백" value={content.padding.top} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].padding.top = e.target.value;
                }))}/>
                <EditSliderContainer text="하단 여백" value={content.padding.bottom} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].padding.bottom = e.target.value;
                }))}/>
            </OpenCloseCustom>            
        </div>
    )
}

export default EditDesign
