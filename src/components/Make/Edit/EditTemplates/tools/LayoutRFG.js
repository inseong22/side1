import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import RadioCustom from '../../tools/Custom/RadioCustom'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'

const alignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]
const layoutOptions = [
    { label: '2', value: 2},
    { label: '3', value: 3},
    { label: '4', value: 4},
    { label: '5', value: 5},
]
const mobileLayoutOptions = [
    { label: '1', value: 1},
    { label: '2', value: 2},
]

function LayoutRFG({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <OpenCloseCustom title="레이아웃" use={true} subtext={state.isPhone ? '모바일' : 'PC'}>
            {
                state.isPhone ? 
                <>
                <RadioCustom text="단 개수" options={mobileLayoutOptions} value={content.mobile.layout} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].mobile.layout = e;
                    }))} />
                <RadioCustom text="정렬" options={alignOptions} value={content.mobile.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].mobile.align = e;
                    draft[state.secNum].title.align = e;
                    draft[state.secNum].desc.align = e;
                }))} />
                </>
                :
                <>
                <RadioCustom text="단 개수" options={layoutOptions} value={content.numOfElements} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].layout = e;
                        draft[state.secNum].numOfElements = e;
                    }))} />
                <RadioCustom text="정렬" options={alignOptions} value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                    draft[state.secNum].align = e
                    draft[state.secNum].title.align = e;
                    draft[state.secNum].desc.align = e;
                }))} />
                </>
            }
        </OpenCloseCustom>
    )
}

export default LayoutRFG
