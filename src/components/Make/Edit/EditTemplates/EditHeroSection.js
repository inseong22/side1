import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import DesignHero from './DesignHero'
// import TemplateChoose from '../tools/TemplateChoose'
import {EditRadioContainer} from '../tools/RadioCustom'
import produce from 'immer';
import {CustomSwitch} from '../tools/OnOffCustom'
import OpenCloseCustom from '../tools/OpenCloseCustom'
// import OnOffCustom from '../tools/OnOffCustom'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ImageAddEdit from '../tools/ImageAddEdit'
import AddContentImg from '../tools/AddContentImg'
import AddSlideImg from '../tools/AddSlideImg'
import AddContentVideo from '../tools/AddContentVideo'
import AddYoutubeLink from '../tools/AddYoutubeLink'
import EditSlider from '../tools/EditSlider'

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
    { label:'이미지', value:'image'},
    { label:'동영상', value:'video'},
    { label:'목업', value:'mockup'},
    { label:'슬라이드', value:'slide'},
]
const alignOptions = [
    {label:'왼쪽', value: '0'},
    {label:'중앙', value: '0 auto'}
]
const animationOptions = [
    { label: '없음', value: false},
    { label: '있음', value: true}
]
const videoOptions = [
    { label: '업로드', value: 'base'},
    { label: '유튜브 링크', value: 'youtube'}
]


function EditHeroSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    

    const changeImageOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.type = e;
        }));
    }

    const changeAlignOption = e => {
        action.setContents(produce(state.contents, draft => {
            if (draft[state.secNum].button.align == '0')
                draft[state.secNum].button.align = '0 auto'
            else
                draft[state.secNum].button.align = '0'
        }))
    }

    const setImgSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e.target.value
        }))
    }

    const setSlideSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e.target.value
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
                draft[state.secNum].image.slide = false
                draft[state.secNum].video.youtube = false
                draft[state.secNum].image.slide = false
                draft[state.secNum].image.oneImg = false 
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
                    <AddContentVideo text="동영상" value={content.video.file} func={e => onChangeContentVideo(e)} removeFunc={e => RemoveVideo(e)}/>
                    <EditSlider top="크기" text="동영상" value={content.image.size} func={setImgSize} max="500"/>
                    </>
                )
            case 'youtube':
                return(
                    <>
                    <AddYoutubeLink content={content} value={content.video.link} />
                    <CustomSwitch text="자동 재생" value={content.video.auto} 
                        onChange={ () => action.setContents(produce(state.contents, draft => {
                            if (content.video.link.includes('autoplay=1'))
                                {draft[state.secNum].video.link = content.video.link.replace('autoplay=1', 'autoplay=0');
                                draft[state.secNum].video.auto = false;}
                            else
                                {draft[state.secNum].video.link = content.video.link.replace('autoplay=0', 'autoplay=1');
                                draft[state.secNum].video.auto = true;}
                        }))}/>
                    <div className="mid-command">
                        유저가 페이지에 들어오면 동영상이 음소거 상태로 자동 재생됩니다.
                    </div>
                    <EditSlider top="크기" text="동영상" value={content.image.size} func={setImgSize} max="500"/>
                    </>
                )
        }
    }

    const returnImageOrVideoAdd = () => {
        switch(content.image.type){
            case 'image':
                return(
                    <div>
                        <AddContentImg text="이미지" value={content.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        <EditSlider top="크기" text="이미지" value={content.image.size} func={setImgSize} max="200"/>
                        <EditRadioContainer text="프레임" options={imageBorderOptions} value={content.image.border} func={e =>  action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].image.border = e;
                        }))} />
                        <CustomSwitch text="그림자" value={content.image.shadow} onChange={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].image.shadow = !content.image.shadow
                                if (draft[state.secNum].image.shadow)
                                    draft[state.secNum].image.shadowValue = "2px 4px 20px #E8F0F9"
                                else
                                draft[state.secNum].image.shadowValue = "none"
                        }))} />
                        <div style={{marginBottom: "20px"}}/>
                    </div>
                )
            case 'slide':
                return(
                    <>
                    <div style={{display: 'flex', marginTop: '10px'}}>
                    <AddSlideImg value={content.slide_img.slide1} func={e => onChangeSlideImage1(e)} removeFunc={e => RemoveSlide1(e)}/>
                    <AddSlideImg value={content.slide_img.slide2} func={e => onChangeSlideImage2(e)} removeFunc={e => RemoveSlide2(e)}/>
                    <AddSlideImg value={content.slide_img.slide3} func={e => onChangeSlideImage3(e)} removeFunc={e => RemoveSlide3(e)}/>
                    </div>
                    <div className="small-command">
                        최대 5MB까지 가능합니다.
                    </div>
                    <EditSlider top="크기" text="이미지" value={content.image.size} func={setImgSize} max="300"/>
                    <EditRadioContainer text="프레임" options={imageBorderOptions} value={content.image.border} func={e =>  action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].image.border = e;
                    }))} />
                    <CustomSwitch text="그림자" value={content.image.shadow} onChange={(e) => action.setContents(produce(state.contents, draft => {
                                draft[state.secNum].image.shadow = !content.image.shadow
                                if (draft[state.secNum].image.shadow)
                                    draft[state.secNum].image.shadowValue = "2px 4px 20px #E8F0F9"
                                else
                                draft[state.secNum].image.shadowValue = "none"
                        }))} />
                        <div style={{marginBottom: "20px"}}/>
                    </>
                )
            
            case 'video':
                return(
                    <>
                    <div style={{marginTop: '40px'}}/>
                    <EditRadioContainer text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                    <div style={{marginBottom: '25px'}}/>
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
                draft[state.secNum].video.youtube = false
                draft[state.secNum].video.use = false
                draft[state.secNum].image.slide = false
                draft[state.secNum].image.oneImg = true               
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
                draft[state.secNum].video.youtube = false
                draft[state.secNum].video.use = false
                draft[state.secNum].image.slide = false
                draft[state.secNum].image.oneImg = false 
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
                    <OpenCloseCustom title="콘텐츠">
                    <EditRadioContainer options={imageOptions} value={content.image.type} func={e => changeImageOption(e)} />                   
                    {
                        returnImageOrVideoAdd()
                    } 
                    </OpenCloseCustom>
                    <OpenCloseCustom title="버튼">
                    <EditRadioContainer options={alignOptions} value={content.button.align} func={e => changeAlignOption(e)} />
                    <CustomSwitch text="CTA 버튼"/>
                    {/* <EditRadioContainer options={linkOptions} value={} */}
                    <CustomSwitch text="고스트 버튼"/>
                    </OpenCloseCustom>
                    <CheckBoxContainer text="버튼 1 사용" value={content.button.first} func={ () => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.first = !content.button.first;
                    }))} />
                    <CheckBoxContainer text="버튼 2 사용" value={content.button.second} func={ () => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].button.second = !content.button.second;
                    }))} />
                    <div className="left">
                        <div className="content__name">
                                    애니메이션
                        </div>
                        <div style={{paddingLeft:'7%'}}>
                            <CustomSwitch value={content.animation.use} 
                                onChange={ e => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].animation.use = !content.animation.use
                                }))}/>
                        </div>
                    </div>
                    </>
                )

            case 1:
                // case 1은 템플릿 변경
                return(
                    <>
                        <DesignHero content={content}/>
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
