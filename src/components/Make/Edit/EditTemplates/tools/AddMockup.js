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

    // 타입 관리
    const mockOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mockup.type = e;
        }))
    }

    // 업로드 관리
    // 목업 모바일 이미지 업로드
    const uploadMobile = e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mobile.file = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 데스크탑 이미지 업로드
    const uploadDesk= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].desktop.file = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 모바일 1 이미지 업로드
    const uploadM1= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mobile2.file1 = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 모바일 2 이미지 업로드
    const uploadM2= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mobile2.file2 = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 모바일 이미지 업로드
    const uploadDM1= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].deskMobile.file1 = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 목업 데스크탑 이미지 업로드
    const uploadDM2= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].deskMobile.file2 = result;               
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    const setMobileSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.size = e
        }))
    }

    // 사이즈 관리
    const setDesktopSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].desktop.size = e
        }))
    }
    const setM2Size =e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile2.size = e
        }))
    }
    const setMSize =e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].deskMobile.size1 = e
        }))
    }
    const setDSize =e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].deskMobile.size2 = e
        }))
    }

    // 설정 관리
    const MobileTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = true
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const TabletTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = true
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const DesktopTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = true
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const Mobile2True = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = true
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const DeskMobTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = true
        }))
    }

    const returnMockup = () => {
        switch(content.mockup.type){
            case 'mobile':
                MobileTrue()
                return(
                    <>
                        <FuncContentImg text='목업' subtext="최대 10MB 업로드 가능" value={content.mobile.file} func={uploadMobile}/>
                        <SliderCustom top="크기" text="목업" value={content.mobile.size} func={setMobileSize} max="100"/>
                    </>
                )
            case 'tablet':
                TabletTrue()
                return(
                    <>
                        태블릿
                    </>
                )
            case 'desktop':
                DesktopTrue()
                return(
                    <>
                        <FuncContentImg text='목업' subtext="최대 10MB 업로드 가능" value={content.desktop.file} func={uploadDesk}/>
                        <SliderCustom top="크기" text="목업" value={content.desktop.size} func={setDesktopSize} max="100"/>   
                    </>
                )
            case 'mobile2':
                Mobile2True()
                return(
                    <>
                    <FuncContentImg text='모바일1' subtext="최대 10MB 업로드 가능" value={content.mobile2.file1} func={uploadM1}/>
                    <FuncContentImg text='모바일2' subtext="최대 10MB 업로드 가능" value={content.mobile2.file2} func={uploadM2}/>
                    <SliderCustom top="크기" text="목업" value={content.mobile2.size} func={setM2Size} max="100"/>   
                    </>
                )
            case 'desk+mob':
                DeskMobTrue()
                return(
                    <>
                    <FuncContentImg text='모바일' subtext="최대 10MB 업로드 가능" value={content.deskMobile.file1} func={uploadDM1}/>
                    <FuncContentImg text='데스크탑' subtext="최대 10MB 업로드 가능" value={content.deskMobile.file2} func={uploadDM2}/>
                    <SliderCustom top="모바일 크기" text="모바일" value={content.deskMobile.size1} func={setMSize} max="100"/>  
                    <SliderCustom top="데스크탑 크기" text="데스크탑" value={content.deskMobile.size2} func={setDSize} max="100"/>   
                    </>
                )
            default:
            return(
                <>
                </>
            )
        }
    }
    return(
        <>
        {returnMockup()}
        </>
    )
}

export default AddMockup