import React,{ useContext } from 'react'
import produce from 'immer';
import RadioCustom from '../../tools/Custom/RadioCustom'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import AddContentImg from '../../tools/func/FuncContentImg'
import {CustomSwitch} from '../../tools/Custom/OnOffCustom'
import { Select } from '@chakra-ui/react'
import './Contents.css'
import SliderCustom from '../../tools/Custom/SliderCustom'
import FuncContentImg from '../../tools/func/FuncContentImg'

function AddMockup({content}){

    const {state, action} = useContext(MyContext) 

    // 목업 타입
    const mockOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mockup.type = e;
        }))
    }

    // 목업 모바일 2 이미지 업로드
    const uploadMockup= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            if(oneFile.size > 3000000){
                alert("파일의 크기가 3MB를 초과합니다.")
                return;
            }
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mockup.attachment = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 모바일 2 이미지 업로드
    const uploadMockup2= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            if(oneFile.size > 3000000){
                alert("파일의 크기가 3MB를 초과합니다.")
                return;
            }
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mockup.attachment2 = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }

    const returnMockup = () => {
        switch(content.mockup.type){
            case 'mobile':
                return(
                    <>
                        <FuncContentImg text='목업' subtext="최대 3MB 업로드 가능" value={content.mockup.attachment} func={uploadMockup}/>
                        <SliderCustom top="크기" text="목업" value={content.image.size} func={e =>
                            action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].image.size = e
                            }))} max="100"/>
                    </>
                )
            case 'desktop':
                return(
                    <>
                        <FuncContentImg text='목업' subtext="최대 3MB 업로드 가능" value={content.mockup.attachment} func={uploadMockup}/>
                        <SliderCustom top="크기" text="목업" value={content.image.size} func={e =>
                            action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].image.size = e
                            }))} max="100"/>   
                    </>
                )
            case 'mobile2':
                return(
                    <>
                    <FuncContentImg text='모바일1' subtext="최대 3MB 업로드 가능" value={content.mockup.attachment1} func={uploadMockup}/>
                    <FuncContentImg text='모바일2' subtext="최대 3MB 업로드 가능" value={content.mockup.attachment2} func={uploadMockup2}/>
                    <SliderCustom top="크기" text="목업" value={content.image.size} func={e =>
                        action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].image.size = e
                        }))} max="100"/>   
                    </>
                )
            default:
                return(
                    <>
                        <div className="edit-element">
                            <div className="func-title">
                            디바이스 
                            </div>
                        </div> 
                        <div className='mockup-select'>
                            <Select  
                            className='select_list'
                            onChange={e=>mockOption(e.target.value)}
                            bg='white'
                            borderColor='rgba(0, 0, 0, 0.08)'
                            icon='none'
                            color='gray'>
                            <option value='mobile'>모바일</option>
                            <option value='desktop'>데스크탑</option>
                            <option value='mobile2'>모바일 2대</option>                     
                            </Select>
                        </div>
                        {returnMockup()}
                    </>
                )
        }
    }

    return(
        <>
            <div className="edit-element">
                <div className="func-title">
                디바이스 
                </div>
            </div> 
            <div className='mockup-select'>
                <Select  
                className='select_list'
                onChange={e=>mockOption(e.target.value)}
                bg='white'
                borderColor='rgba(0, 0, 0, 0.08)'
                icon='none'
                color='gray'>
                <option value='mobile'>모바일</option>
                <option value='desktop'>데스크탑</option>
                <option value='mobile2'>모바일 2대</option>                     
                </Select>
            </div>
            {returnMockup()}
        </>
    )
}

export default AddMockup