import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import { detailSectionTemplateList } from './InnerTemplates'
import TemplateChoose from '../tools/TemplateChoose'
import {EditRadioContainer} from '../tools/RadioCustom'
import produce from 'immer';
import {EditColorContainer} from '../tools/ColorCustom'
import OnOffCustom from '../tools/OnOffCustom'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ImageAddEdit from '../tools/ImageAddEdit'
import AddContentImg from '../tools/AddContentImg'
import AddContentVideo from '../tools/AddContentVideo'
import AddYoutubeLink from '../tools/AddYoutubeLink'
import EditSlider from '../tools/EditSlider'
import { AlignCenter, AlignEnd, AlignStart } from '@styled-icons/bootstrap';

const paddingOptions = [
    { label: '없음', value: 0 },
    { label: '좁게', value: 5 },
    { label: '보통', value: 10 },
    { label: '넓게', value: 20 },
    { label: '커스텀', value: 0.1},
]
const imageBorderOptions = [
    { label: '원형', value: 50 },
    { label: '라운드', value: 7 },
    { label: '사각형', value: 0 },
]
const imageSizeOptions = [
    { label: '작게', value: 250 },
    { label: '보통', value: 400 },
    { label: '크게', value: 500 },
]
const imageOptions = [
    { label:'동영상', value:'video'},
    { label:'사진', value:'image'},
    { label:'목업', value:'mockup'},
    { label:'슬라이드', value:'slide'},
]
const backOptions = [
    { label: '단색', value: 'color' },
    { label: '이미지', value: 'image'},
]
const animationOptions = [
    { label: '없음', value: false},
    { label: '있음', value: true}
]
const alignOptions = [
    { label: <AlignStart width={30} />, value: 'left' },
    { label: <AlignCenter width={30} />, value: 'center' },
    { label: <AlignEnd width={30} />, value: 'right' },
]
const textSizeOptions = [
    { label: 's', value: 15 },
    { label: 'm', value: 20 },
    { label: 'l', value: 25 },
]
const videoOptions = [
    { label: '업로드', value: 'base'},
    { label: '유튜브 링크', value: 'youtube'}
]


function EditHeroSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    
    // (a) 배경 관련
    const changeBackgroundOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].backgroundType = e;
        }));
    }
    const changeImageOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.type = e;
        }));
    }
    // 템플릿 2 이미지의 경우에는 (이미지 로드)
    const onChangeBackgroundImage = e => {
        let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            // newContents[state.secNum].backgroundImage.attachment = result;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].backgroundImage.attachment = result;
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 체크가 눌리지 않았을 경우, 이미지 삭제
    const DeleteBackgroundImage = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].backgroundImage.attachment = '';
        }))
    }
    const backgroundColorOrImage = () => {
        switch(content.backgroundType){
            case 'color':
                return(
                        <>
                        <EditColorContainer text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundColor = e
                        }))} />
                        <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">배경 색상 투명도</div>
                            <div className="edit-element__right">
                                <input onChange={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].backgroundOpacity = e.currentTarget.value
                                    draft[state.secNum].backgroundImage.use = 'hidden'
                                }))} value={content.backgroundOpacity} type="number" />
                            </div>
                        </div>
                        </div>
                        </>
                )           
            case 'image':
                return(
                    <div className='edit-element'>
                        <div className="edit-element__one">
                        <CheckBoxContainer text="배경 업로드" value={content.backgroundImage.use} func={ () => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundImage.use = !content.backgroundImage.use;
                            draft[state.secNum].backgroundColor= 'transparent';
                        }))} />
                        {
                            content.backgroundImage.use ? ( 
                                <ImageAddEdit value={content.backgroundImage.attachment} func={e => onChangeBackgroundImage(e)} />
                            ):
                            (
                                DeleteBackgroundImage()
                            )
                        }
                        </div>
                    </div>
                )
        }
    }

    // (b) 여백 관련
    const setPaddingTop = (e) => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingTop = e.target.value
        }))
    }
    const setPaddingBottom = (e) => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingBottom = e.target.value
        }))
    }
    const customPadding = () => {
        if(content.paddingCustom) 
        return(
            <>
            <div className="edit-element">
                <div className="edit-element__one">
                    <div className="edit-element__left">여백(위)</div>
                    <div className="edit-element__right">
                        <EditSlider content={content} func={setPaddingTop}/>
                    </div>
                </div>
            </div>
            <div className="edit-element">
            <div className="edit-element__one">
                <div className="edit-element__left">여백(아래)</div>
                <div className="edit-element__right">
                    <EditSlider content={content} func={setPaddingBottom}/>
                </div>
            </div>
            </div>
        </>
        )  
    }
    const changePaddingOption = e => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].paddingTop = e
            draft[state.secNum].paddingBottom = e
            if(draft[state.secNum].paddingTop == 0.1)
                draft[state.secNum].paddingCustom = true
            else
                draft[state.secNum].paddingCustom = false
        }))
    }

    // video type
    const changeVideoOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].video.type = e;
        }));
    }

    // video upload - BufferArray를 서버에서 stream으로 처리하는 방식으로 하는게 제일인데.. 포기...
    const onChangeContentVideo = e => {
        // let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].video.file = result;
                draft[state.secNum].video.use = true;
            }))
            // actionImgCompress(result);
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
        // action.setContents(newContents);
        // const reader = new FileReader();
        // reader.readAsArrayBuffer(e.target.files[0]);
        // reader.onloadend = (finishedEvent) => {
        //     const {currentTarget:{result}} = finishedEvent;
        //     console.log(result);
        //     action.setContents(produce(state.contents, draft => {
        //         draft[state.secNum].video.file = result;
        //         draft[state.secNum].video.use = true;
        //         console.log(draft[state.secNum].video.file)
        //     }))
        // }
    }
    // video remove
    const RemoveVideo = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].video.file = '';
        }))
    }
    

    const videoType = () => {
        switch(content.video.type){
            case 'base':
                return(
                    <>
                    <AddContentVideo value={content.video.file} func={e => onChangeContentVideo(e)} removeFunc={e => RemoveVideo(e)}/>
                    </>
                )
            case 'youtube':
                return(
                    <>
                    <AddYoutubeLink content={content} value={content.video.link} />
                    </>
                )
        }
    }

    const returnImageOrVideoAdd = () => {
        switch(content.image.type){
            case 'image':
                return(
                    <AddContentImg value={content.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                )
            case 'slide':
                return(
                    <>
                    <AddContentImg value={content.slide_img.slide1} func={e => onChangeSlideImage1(e)} removeFunc={e => RemoveSlide1(e)}/>
                    <AddContentImg value={content.slide_img.slide2} func={e => onChangeSlideImage2(e)} removeFunc={e => RemoveSlide2(e)}/>
                    <AddContentImg value={content.slide_img.slide3} func={e => onChangeSlideImage3(e)} removeFunc={e => RemoveSlide3(e)}/>
                    최대 5MB까지 가능합니다.
                    </>
                )
            
            case 'video':
                return(
                    <>
                    <EditRadioContainer text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                    {videoType()}
                    </>
                )
            default:
                return(
                    <div>아니</div>
                )
        }
    }

    // 콘텐츠 - 이미지 업로드
    const onChangeContentImage= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].image.attachment = result;
                draft[state.secNum].image.slide = false
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // 콘텐츠 - 이미지 삭제
    const RemoveImage = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.attachment = '';
        }))
    }

    // 슬라이드 - 이미지
    const onChangeSlideImage1= e => {
        let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].slide_img.slide1 = result;
                draft[state.secNum].image.slide = true
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    const RemoveSlide1 = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].slide_img.slide1 = '';
        }))
    }
    const onChangeSlideImage2= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            // newContents[state.secNum].image.attachment = result;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].slide_img.slide2 = result;
                draft[state.secNum].image.slide = true
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    const RemoveSlide2 = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].slide_img.slide2 = '';
        }))
    }
    const onChangeSlideImage3= e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            // newContents[state.secNum].image.attachment = result;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].slide_img.slide3 = result;
                draft[state.secNum].image.slide = true
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    const RemoveSlide3 = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].slide_img.slide3 = '';
        }))
    }

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <>
                    <div className="edit-element">
                        <div className="edit-element__one">
                            히어로 섹션 수정
                        </div>
                    </div>
                    <EditRadioContainer text='배경' options={backOptions} value={content.backgroundType} func={e=>changeBackgroundOption(e)} />
                    {
                        backgroundColorOrImage()
                    }
                    <EditRadioContainer text="위아래 여백" options={paddingOptions} value={content.paddingTop} func={e => changePaddingOption(e)} />
                    {
                        customPadding()
                    }
                    <EditRadioContainer text="제목 텍스트 배치" options={alignOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                                        draft[state.secNum].title.align = e
                    }))}/> 
                    <EditRadioContainer text="제목 크기 설정" options={textSizeOptions} value={content.title.align} func={e => action.setContents(produce(state.contents, draft => {
                                        draft[state.secNum].title.size = e
                    }))}/> 
                    <EditColorContainer text={"제목 텍스트 색상"} value={content.title.color} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].title.color = e
                    }))} />
                    <EditRadioContainer text="본문 텍스트 배치" options={alignOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].desc.align = e
                    }))}/> 
                    <EditRadioContainer text="본문 크기 설정" options={textSizeOptions} value={content.desc.align} func={e => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].desc.size = e
                    }))}/>      
                    <EditColorContainer text={"본문 텍스트 색상"} value={content.desc.color} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].desc.color = e
                    }))} />
                    <EditRadioContainer text="사진 테두리" options={imageBorderOptions} value={content.image.border} func={e =>  action.setContents(produce(state.contents, draft => {
                                        draft[state.secNum].image.border = e;
                                    }))} />
                    <EditRadioContainer text="사진 크기" options={imageSizeOptions} value={content.image.size} func={e =>  action.setContents(produce(state.contents, draft => {
                                        draft[state.secNum].image.size = e;
                                    }))} />
                    <EditRadioContainer text="사진 사용" options={imageOptions} value={content.image.type} func={e => changeImageOption(e)} />                   
                    {
                        returnImageOrVideoAdd()
                    } 
                    <OnOffCustom text="애니메이션" value={content.animation.type} 
                        func={ () => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].animation.use = !content.animation.use
                        }))}/>
                    <CheckBoxContainer text="버튼 1 사용" value={content.button.first} func={ () => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.first = !content.button.first;
                    }))} />
                    <CheckBoxContainer text="버튼 2 사용" value={content.button.second} func={ () => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.second = !content.button.second;
                    }))} />
                    </>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <TemplateChoose content={content} title="디테일" list={detailSectionTemplateList} />
                    </>
                )

            default:
                <></>
        }
    }

    return(
        <>
            {returnTable()}
        </>
    )
}

export default EditHeroSection
