import React, { useContext } from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer'
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import ColorCustom from '../../tools/Custom/ColorCustom'
import TextSizeCustom from '../../tools/func/TextSizeCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'
import AlignCustom from '../../tools/Custom/AlignCustom'

const sizeOptions = [
    { label: '작게', value: 14 },
    { label: '보통', value: 16 },
    { label: '크게', value: 18 },
]

function EditNotice({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <OpenCloseCustom title="안내사항" use={content.caution.use}>
           <>
            <ColorCustom text="색상" value={content.caution.color} func={e => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].caution.color = e;
            }))} />
            <AlignCustom value={content.caution.align} func={e => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].caution.align = e;
            }))} />
            <TextSizeCustom text="크기" desc options={sizeOptions} value={content.caution.size} func={e => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].caution.size = e;
            }))} />
            </>
        </OpenCloseCustom>
    )
}

export default EditNotice
