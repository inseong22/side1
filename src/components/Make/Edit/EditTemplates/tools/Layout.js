import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'
import AlignCustom from '../../tools/Custom/AlignCustom'

const layout3Options = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
]
const layout4Options = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
]

const alignOptions = [
    { label: '왼쪽', value: 'start' },
    { label: '중앙', value: 'center' },
]

function Layout({content, version, foot, setFoot}) {

    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const ReturnLayout = () => {
        switch(version){
            case 'main':
                return(
                    <>
                    {
                        state.isPhone ? 
                        <>
                            <RadioCustom layout='on' version='two' options={layout4Options} value={content.mobile.layout} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.layout = e;
                            }))} />
                            <AlignCustom all value={content.mobile.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.align = e;
                            }))} />
                        </>
                        :
                        <>
                        <RadioCustom layout='on' version='main' options={layout4Options} value={content.layout} func={(e, align, contAlign) => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].layout = e;
                            draft[state.secNum].title.align = align;
                            draft[state.secNum].desc.align = align;
                            draft[state.secNum].button.align = align;
                            draft[state.secNum].contents.align= contAlign;
                        }))} />
                        <AlignCustom all value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.align = e;
                            draft[state.secNum].desc.align = e;
                            draft[state.secNum].button.align = e;
                            draft[state.secNum].contents.align= e;
                            draft[state.secNum].align= e;
                        }))} />
                        </>
                    }
                    </>
                )
            case 'detail':
                return(
                    <>
                    {
                        state.isPhone ? 
                        <>
                            <RadioCustom layout='on' version='two' options={layout4Options} value={content.mobile.layout} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.layout = e;
                            }))} />
                            <RadioCustom text="정렬" options={alignOptions} value={content.mobile.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.align = e;
                            }))} />
                        </>
                        :
                        <>
                        <RadioCustom layout='on' version='main' options={layout4Options} value={content.layout} func={(e,align, contAlign) => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].layout = e;
                            draft[state.secNum].title.align = align;
                            draft[state.secNum].desc.align = align;
                            draft[state.secNum].contents.align= contAlign;
                        }))} />
                        <AlignCustom all value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.align = e;
                            draft[state.secNum].desc.align = e;
                            draft[state.secNum].align= e;
                        }))} />
                        </>
                    }
                    </>
                )
            case 'cta':
                return(
                    <>
                    {
                        state.isPhone ? 
                        <>
                            <RadioCustom layout='on' version='two' options={layout4Options} value={content.mobile.layout} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.layout = e;
                            }))} />
                            <AlignCustom all value={content.mobile.align} func={e => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.align = e;
                                draft[state.secNum].title.align = e;
                                draft[state.secNum].desc.align = e;
                                draft[state.secNum].caution.align = e;
                            }))} />
                        </>
                        :
                        <>
                        <RadioCustom layout='on' version='cta' options={layout4Options} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].layout = e;
                        }))} />
                        <AlignCustom all value={content.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].align = e;
                            draft[state.secNum].title.align = e;
                            draft[state.secNum].desc.align = e;
                            draft[state.secNum].button.align = e;
                            draft[state.secNum].appButton.align = e;
                            draft[state.secNum].caution.align = e;
                        }))} />
                        </>
                    }
                    </>
                )
            case 'apply':
                return(
                    <RadioCustom layout='on' version='cta' options={layout3Options} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].layout = e;
                    }))} />
                )
            case 'app':
                return(
                    <RadioCustom layout='on' version='cta' options={layout3Options} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].layout = e;
                    }))} />
                )
            case 'text': 
                return(
                    <>
                    { state.isPhone ? 
                        <>
                            <RadioCustom layout='on' version='text' options={layout3Options} value={content.mobile.layout} func={(e,align,top,bottom) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].mobile.layout = e;
                                draft[state.secNum].mobile.align = align;
                            }))} />
                        </> 
                        :
                        <>
                            <RadioCustom layout='on' version='text' options={layout3Options} value={content.layout} func={(e,align,top,bottom) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].layout = e;
                                draft[state.secNum].title.align = align;
                                draft[state.secNum].desc.align = align;
                            }))} />
                        </>
                    }
                    </>
                )
            case 'footer':
                return(
                    <>
                    <RadioCustom layout='on' version='footer' options={layout3Options} value={foot.layout} func={e => {setFoot(produce(foot, draft => {
                            draft.layout = e;
                        }))}} />
                    </>
                )
        }
    }

    return (
        <OpenCloseCustom title="레이아웃" use={true} subtext={state.isPhone ? '모바일' : 'PC'}>
            {ReturnLayout()}
        </OpenCloseCustom>
    )
}

export default Layout
