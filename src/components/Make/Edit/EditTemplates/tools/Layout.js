import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'

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
function Layout({content, version, foot, setFoot}) {

    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const ReturnLayout = () => {
        switch(version){
            case 'main':
                return(
                    <>main
                    </>
                    // <RadioCustom options={layout4Options} value={setting.ghost.borderRadius} func={(e) => setSetting(produce(setting, draft => {
                    //     draft.ghost.borderRadius = e
                    // }))} />
                )
            case 'detail':
                return(
                    <>
                    detail
                    </>
                )
            case 'cta':
                return(
                    <RadioCustom layout='on' version='cta' options={layout3Options} value={content.layout} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].layout = e;
                    }))} />
                )
            case 'apply':
                return(
                    <>
                    apply
                    </>
                )
            case 'app':
                return(
                    <>
                    app
                    </>
                )
            case 'feature':
                return(
                    <>
                    feature
                    </>
                )
            case 'review':
                return(
                    <>
                    review
                    </>
                )
            case 'gallery':
                return(
                    <>
                    gallery
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
        <OpenCloseCustom title="레이아웃">
            {ReturnLayout()}
        </OpenCloseCustom>
    )
}

export default Layout
