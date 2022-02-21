import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import InputCustom from '../../tools/Custom/InputCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'

const buttonAlignOptions = [
    {label:'왼쪽', value: 'start'},
    {label:'중앙', value: 'center'}
]

function AddAppButton({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    return (
        <OpenCloseCustom title="앱 다운로드" use={content.appButton.use}>
            <div className="edit-element">
                <RadioCustom content={content} 
                    options={buttonAlignOptions} 
                    value={content.appButton.align} 
                    func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].appButton.align = e
                    }))}  />
            </div>
            <div className="edit-element">
                <div className="edit-element__one" style={{flexDirection: 'column'}}>
                    <div className="edit-element__left">Google Play Store</div> 
                    <InputCustom placeholder="링크를 입력해 주세요." value={content.appButton.google} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].appButton.google = e
                        console.log(e)
                    }))} />
                </div>
            </div>
            <div className="edit-element">
                <div className="edit-element__one" style={{flexDirection: 'column'}}>
                    <div className="edit-element__left">Apple App Store</div> 
                    <InputCustom placeholder="링크를 입력해 주세요." value={content.appButton.apple} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].appButton.apple = e
                    }))} />
                </div>
            </div>
        </OpenCloseCustom>
    )
}

export default AddAppButton
