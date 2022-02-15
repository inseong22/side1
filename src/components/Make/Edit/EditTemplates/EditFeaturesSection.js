import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import ElementsTable from './tools/ElementsTable'
import RadioCustom from '../tools/Custom/RadioCustom'
import produce from 'immer';
import ColorCustom from '../tools/Custom/ColorCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import EditDesign from './tools/EditDesign'
import LayoutRFG from './tools/LayoutRFG'

const featureOptions = [
    { label: '아이콘', value: 'icon' },
    { label: '이미지', value: 'image'},
]

const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 500 },
]
const imageSizeOptions = [
    { label: 'Small', value: 50 },
    { label: 'Medium', value: 100 },
    { label: 'Large', value: 150 },
]
const imageSmallSizeOptions = [
    { label: 'Small', value: 55 },
    { label: 'Medium', value: 70 },
    { label: 'Large', value: 90 },
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
            use:content.element.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].element.use = !content.element.use;
            }))
        },
        {
            title:'설명글',
            use:content.elementText.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].elementText.use = !content.elementText.use;
            }))
        },
    ]

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <LayoutRFG content={content} />
                        <OpenCloseCustom title="이미지">
                            <RadioCustom text="특징" value={content.element.type} options={featureOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].element.type = e;
                            }))} />
                            {
                                content.element.type === 'icon' && 
                                <>
                                
                                <ColorCustom text="색상" value={content.element.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].element.backgroundColor = e;
                                }))} />
                                <RadioCustom text="프레임" button value={content.element.iconBorder} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].element.iconBorder = e;
                                }))} />
                                <RadioCustom text="크기" value={content.element.size} options={imageSmallSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].element.size = e;
                                }))} />
                                </>
                            }
                            {
                                content.element.type === 'image' &&
                                <>
                                <RadioCustom text="프레임" button value={content.element.imageBorder} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].element.imageBorder = e;
                                }))} />
                                <RadioCustom text="크기" value={content.element.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].element.size = e;
                                }))} />
                                </>
                            }
                        </OpenCloseCustom>
                        <OpenCloseCustom title="설명글">
                            <ColorCustom text="색상" value={content.elementText.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elementText.color = e;
                            }))} />
                            <OnOffCustom text="특징 제목" value={content.elementText.titleUse} func={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elementText.titleUse = !content.elementText.titleUse;
                            }))} />
                            <OnOffCustom text="특징 본문" value={content.elementText.descUse} func={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].elementText.descUse = !content.elementText.descUse;
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