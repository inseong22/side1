import React, {useContext} from 'react'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import InputCustom from '../../tools/Custom/InputCustom'

function AddAppButton({content}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    
    return (
        <OpenCloseCustom title="앱 다운로드 버튼">
            <div className="edit-element">
                <div className="edit-element__one" style={{flexDirection: 'column'}}>
                    <div className="edit-element__left">Google Play Store</div> 
                    <InputCustom placeholder="링크를 입력해주세요." value={content.appButton.google} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].appButton.google = e
                    }))} />
                </div>
            </div>
            <div className="edit-element">
                <div className="edit-element__one" style={{flexDirection: 'column'}}>
                    <div className="edit-element__left">Apple App Store</div> 
                    <InputCustom placeholder="링크를 입력해주세요." value={content.appButton.apple} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].appButton.apple = e
                    }))} />
                </div>
            </div>
        </OpenCloseCustom>
    )
}

export default AddAppButton
