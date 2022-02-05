import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from '../tools/ElementsTable'
import TemplateChoose from '../tools/TemplateChoose'
import {EditRadioContainer} from '../tools/RadioCustom'
import produce from 'immer';
import {EditColorContainer} from '../tools/ColorCustom'
import OnOffCustom from '../tools/OnOffCustom'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ImageAddEdit from '../tools/ImageAddEdit'
import AddContentImg from '../tools/AddContentImg'
import AddContentVideo from '../tools/AddContentVideo'
import AddYoutubeLink from '../tools/AddYoutubeLink'
import TextSizeCustom from '../tools/TextSizeCustom'
import OpenCloseCustom from '../tools/OpenCloseCustom'
import {EditSliderContainer} from '../tools/EditSlider'
import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';

const alignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
]

const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]

function EditFeaturesSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const elements = [
        {
            title:'제목',
            use:content.title.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.use = !content.title.use;
            }))
        },
        {
            title:'본문',
            use:content.desc.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].desc.use = !content.desc.use;
            }))
        },
        {
            title:'이미지',
            use:content.featureImage.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].featureImage.use = !content.featureImage.use;
            }))
        },
        {
            title:'설명글',
            use:content.featureDesc.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].featureDesc.use = !content.featureDesc.use;
            }))
        },
    ]

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

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <OpenCloseCustom title="레이아웃">
                            {/* <EditRadioContainer title="단 개수" /> */}
                            <EditRadioContainer title="정렬" options={alignOptions} value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].align = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이미지">
                            {/* <EditRadioContainer button={true} title="단 개수" /> */}
                        </OpenCloseCustom>
                        <OpenCloseCustom title="설명글">

                        </OpenCloseCustom>
                    </div>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
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
                            <EditRadioContainer title="정렬" options={alignOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
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
                            <EditRadioContainer title="정렬" options={alignOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].desc.align = e;
                            }))} />
                            <TextSizeCustom text="크기" value={content.desc.size} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].desc.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="여백">
                            <EditSliderContainer text="상단 여백" value={content.padding.top} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].padding.top = e;
                            }))}/>
                            <EditSliderContainer text="하단 여백" value={content.padding.bottom} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].padding.bottom = e;
                            }))}/>
                        </OpenCloseCustom>
                    </div>
                )

            default:
                <></>
        }
    }


    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditFeaturesSection