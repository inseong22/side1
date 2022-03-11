import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import produce from 'immer';
import ElementsTable from './tools/ElementsTable'
import EditTitleDesc from './tools/EditTitleDesc'
import RadioCustom from '../tools/Custom/RadioCustom'
import OnOffCustom from '../tools/Custom/OnOffCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import TextSizeCustom from '../tools/func/TextSizeCustom'
import LayoutRFG from './tools/LayoutRFG'
import SliderCustom from '../tools/Custom/SliderCustom'

const layoutOptions = [
    { label: '1', value: 1},
    { label: '2', value: 2},
    { label: '3', value: 3},
    { label: '4', value: 4},
]
const shapeOptions = [
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 20 },
]

function EditGallerySection({content, category}) {
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
            title:'카드',
            use:content.card.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].card.use = !content.card.use;
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
                        <EditTitleDesc content={content} />
                        <OpenCloseCustom title="이미지" use={content.element.use} subtext={state.isPhone ? '모바일' : 'PC'} open={state.focus === 'gallery-image'}>
                            {
                                state.isPhone ? 
                                <>
                                    <SliderCustom top="크기" value={content.mobile.cardSize} func={e =>
                                        action.setContents(produce(state.contents, draft => {
                                            draft[state.secNum].mobile.cardSize = e
                                    }))} max="400"/>
                                </>
                                :
                                <>
                                    <SliderCustom top="크기" value={content.element.size} func={e =>
                                        action.setContents(produce(state.contents, draft => {
                                            draft[state.secNum].element.size = e
                                    }))} max="500"/>
                                </>
                            }
                        </OpenCloseCustom>
                        <OpenCloseCustom title='카드' use={content.card.use} open={state.focus === 'elementText'}>
                            <RadioCustom text="프레임" value={content.card.borderRadius} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].card.borderRadius = e;
                                }))} />
                            <ColorCustom text="카드 색상" value={content.card.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].card.color = e;
                            }))} />
                            <OnOffCustom text="그림자 적용" value={content.card.shadow} func={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].card.shadow = !content.card.shadow
                            }))} />
                            <ColorCustom text="설명 글 색상" value={content.text.color} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].text.color = e;
                                }))} />
                        </OpenCloseCustom>
                    </div>
                )
            case 1:
                return(
                    <div>
                        <EditDesign content={content} />
                    </div>
                )
        }
    }

    return (
        <>
            {returnTable()}
        </>
    )
}

export default EditGallerySection
