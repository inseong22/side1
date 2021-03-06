import React, {useContext} from 'react'
import produce from 'immer';
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import {CustomSwitch} from '../../tools/Custom/OnOffCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'
import InputCustom from '../../tools/Custom/InputCustom'
import ApplyInputCustom from '../../tools/Custom/ApplyInputCustom'
import OnOffCustom from '../../tools/Custom/OnOffCustom'
import TextSizeCustom from '../../tools/func/TextSizeCustom'

const buttonOptions = [
    {label: '링크 연결', value: 'link'},
    {label: '신청', value: 'apply'},
]

const buttonTextOptions = [
    { label: '작게', value: 10 },
    { label: '보통', value: 12 },
    { label: '크게', value: 14 }
]

function AddCtaButton({content, num}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const ctaOpen = () => {
        if(!(content.button.ghostUse && content.button.ghostOption === 'apply')){
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].button.ctaUse = !content.button.ctaUse}))
        }
    }

    const changeCtaOption = (e) => {
        action.setContents(produce(state.contents, draft => {
            if (draft[state.secNum].button.ctaOption === 'link'){
                draft[state.secNum].button.ctaOption = 'apply'
                draft[state.secNum].button.ghostUse = false
            }else{
                draft[state.secNum].button.ctaOption = 'link'
            }
        }))
    }

    const returnCtaOptions = () => {
        switch(content.button.ctaOption){
            case 'link':
                return(
                    <>
                    <InputCustom placeholder="연결하고 싶은 URL을 입력해 주세요" value={content.button.ctaLink} func = {(e) => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.ctaLink = e
                    }))} />
                    </>
                )
            case 'apply':
                return(
                    <>
                    {
                        content.ctaApplyInputs.length >= num ?  
                        <ApplyInputCustom disabled /> 
                        :
                        <ApplyInputCustom func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].ctaApplyInputs.push(e)
                        }))} /> 
                    }
                    
                    { content.ctaApplyInputs.length > 0 && 
                    <>
                        { content.ctaApplyInputs.map((item, index) => {
                                return(
                                    <ApplyInputCustom made value={item} func={e => action.setContents(produce(state.contents, draft => {
                                        if(index === 0 ){
                                            draft[state.secNum].ctaApplyInputs.shift()
                                        }else{
                                            draft[state.secNum].ctaApplyInputs.splice(index, index)
                                        }
                                    }))} key={index}/>
                                )
                            })
                        } 
                    </> }
                    <div className="mid-command-light"> 최대 {num}개의 신청 박스만 생성 가능합니다. 
                    </div>
                    <OnOffCustom text="개인정보 동의 확인 사용" value={content.button.ctaCheck} func={e => {
                        action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].button.ctaCheck = !content.button.ctaCheck
                        }))
                        console.log(content.button)
                    }}/>
                    </>
                )
            default:
                return(
                <> </>
                )
        }
    }

    return (
        <div className="box-gray__container">
        <CustomSwitch text="CTA 버튼" value={content.button.ctaUse} onChange = {e => ctaOpen(e)}/>
        { content.button.ctaUse && (
            <>
                <RadioCustom options={buttonOptions} value={content.button.ctaOption} func={e => changeCtaOption(e)}/>
                {returnCtaOptions()}
            </>
        )}
        </div>
    )
}

export default AddCtaButton
