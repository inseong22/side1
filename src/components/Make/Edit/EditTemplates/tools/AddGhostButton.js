import React, {useContext} from 'react'
import produce from 'immer';
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import {CustomSwitch} from '../../tools/Custom/OnOffCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'
import InputCustom from '../../tools/Custom/InputCustom'
import ApplyInputCustom from '../../tools/Custom/ApplyInputCustom'
import SliderCustom from '../../tools/Custom/SliderCustom'

const buttonOptions = [
    {label: '링크 연결', value: 'link'},
    {label: '신청', value: 'apply'},
]

function AddGhostButton({content, num}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const ghostOpen = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.ghostUse = !content.button.ghostUse}))
    }

    const changeGhostOption = () => {
        action.setContents(produce(state.contents, draft => {
            if (draft[state.secNum].button.ghostOption == 'link')
                draft[state.secNum].button.ghostOption = 'apply'
            else
                draft[state.secNum].button.ghostOption = 'link'
        }))
    }

    const returnGhostOptions = () => {
        switch(content.button.ghostOption){
            case 'link':
                return(
                    <>
                    <InputCustom placeholder="연결하고 싶은 URL을 입력해 주세요" value={content.button.ghostLink} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.ghostLink = e
                    }))} />
                    {/* <SliderCustom top="고스트 여백" value={content.button.ghostPadding} max={18} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.ghostPadding = e
                    }))}/> */}
                    </>
                )
            case 'apply':
                return(
                    <>
                    {
                        content.ghostApplyInputs.length > num ?  
                        <ApplyInputCustom disabled /> 
                        :
                        <ApplyInputCustom func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].ghostApplyInputs.push(e)
                        }))} /> 
                    }
                    
                    { content.ghostApplyInputs.length > 0 && 
                    <>
                        { content.ghostApplyInputs.map((item, index) => {
                                return(
                                    <ApplyInputCustom made value={item} func={e => action.setContents(produce(state.contents, draft => {
                                        if(index === 0 ){
                                            draft[state.secNum].ghostApplyInputs.shift()
                                        }else{
                                            draft[state.secNum].ghostApplyInputs.splice(index, index)
                                        }
                                    }))} key={index}/>
                                )
                            })
                        } 
                    </> }
                    <div className="mid-command-light"> 최대 {num}개의 신청 박스만 생성 가능합니다. 
                    </div>
                    </>
                )
            default:
                return(
                <> </>
                )
        }
    }

    return (
        <>
        <CustomSwitch text="고스트 버튼" value={content.button.ghostUse} onChange = {e => ghostOpen(e)}/>
            { content.button.ghostUse && (
                <>
                    <RadioCustom options={buttonOptions} value={content.button.ghostOption} func={e => changeGhostOption(e)}/>
                    {returnGhostOptions()}
                </>
            )}
        </>
    )
}

export default AddGhostButton
