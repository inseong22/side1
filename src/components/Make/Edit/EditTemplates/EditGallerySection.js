import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import produce from 'immer';
import ElementsTable from './tools/ElementsTable'
import RadioCustom from '../tools/Custom/RadioCustom'
import ColorCustom from '../tools/Custom/ColorCustom'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'

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
const imageSizeOptions = [
    { label: 'Small', value: 33 },
    { label: 'Medium', value: 50 },
    { label: 'Large', value: 100 },
]
const alignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
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
            use:content.galleryImg.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].galleryImg.use = !content.galleryImg.use;
            }))
        },
        {
            title:'카드',
            use:content.card.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].card.use = !content.card.use;
            }))
        },
        {
            title:'설명',
            use:content.text.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].text.use = !content.text.use;
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
                        <OpenCloseCustom title="레이아웃">
                        <RadioCustom text="단 개수" options={layoutOptions} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].layout = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title="이미지">
                            <RadioCustom text="프레임" button value={content.galleryImg.border} options={shapeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].galleryImg.border = e;
                                }))} />
                            <RadioCustom text="크기" value={content.galleryImg.size} options={imageSizeOptions} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].galleryImg.size = e;
                            }))} />
                        </OpenCloseCustom>
                        <OpenCloseCustom title='설명'>
                        <ColorCustom text="색상" value={content.text.color} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].text.color = e;
                            }))} />
                        <RadioCustom text="정렬" options={alignOptions} value={content.text.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].text.align = e;
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
