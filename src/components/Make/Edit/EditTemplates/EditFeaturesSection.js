import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import RadioCustom from '../tools/Custom/RadioCustom'
import produce from 'immer';
import ColorCustom from '../tools/Custom/ColorCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import EditDesign from './tools/EditDesign'

const alignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
]

const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 20 },
]
const imageSizeOptions = [
    { label: 'Small', value: 33 },
    { label: 'Medium', value: 50 },
    { label: 'Large', value: 100 },
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
            use:content.featureText.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].featureText.use = !content.featureText.use;
            }))
        },
    ]

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
                            <RadioCustom text="정렬" options={alignOptions} value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].align = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이미지">
                            <RadioCustom text="프레임" button value={content.featureImage.borderRadius} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].featureImage.borderRadius = e;
                            }))} />
                            <RadioCustom text="크기" value={content.featureImage.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].featureImage.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="설명글">
                            <ColorCustom text="색상" value={content.featureText.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].featureText.color = e;
                            }))} />
                            <OnOffCustom text="특징 제목" value={content.featureText.titleUse} func={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].featureText.titleUse = !content.featureText.titleUse;
                            }))} />
                            <OnOffCustom text="특징 본문" value={content.featureText.descUse} func={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].featureText.descUse = !content.featureText.descUse;
                            }))} />
                        </OpenCloseCustom>
                    </div>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <div>
                        <EditDesign content={content} />
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