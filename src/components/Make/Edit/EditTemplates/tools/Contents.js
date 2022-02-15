import React,{ useContext } from 'react'
import produce from 'immer';
import OpenCloseCustom from '../../tools/Custom/OpenCloseCustom'
import RadioCustom from '../../tools/Custom/RadioCustom'
import { MyContext } from '../../../../../pages/Make/MakePageV2'
import AddContentImg from '../../tools/func/FuncContentImg'
import AddSlideImg from '../../tools/func/FuncSlideImg'
import AddContentVideo from '../../tools/func/FuncContentVideo'
import AddYoutubeLink from '../../tools/func/FuncYoutubeLink'
import SliderCustom from '../../tools/Custom/SliderCustom'
import {CustomSwitch} from '../../tools/Custom/OnOffCustom'
import { Select } from '@chakra-ui/react'
import './Contents.css'
import FuncContentImg from '../../tools/func/FuncContentImg'
import { StoreMallDirectoryRounded } from '@mui/icons-material';

const contentsOptions = [
    { label:'이미지', value:'image'},
    { label:'동영상', value:'video'},
    { label:'목업', value:'mockup'},
    { label:'슬라이드', value:'slide'},
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
const videoOptions = [
    { label: '업로드', value: 'base'},
    { label: '유튜브 링크', value: 'youtube'}
]


function Contents({content}) {

    const {state, action} = useContext(MyContext) 

    const usingContents = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].contents.use = !content.contents.use;
        }))
    }

    const changeContentOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].contents.type = e;
        }));
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

    const setImgSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e
        }))
    }

    const setSlideSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e
        }))
    }

    const setMobileSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.size = e
        }))
    }
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
            }))
            // actionImgCompress(result);
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    // video remove
    const RemoveVideo = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].video.file = '';
        }))
    }

    const BaseTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = true
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const YoutubeTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = true
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
            
        }))
    }
    
    const videoType = () => {
        switch(content.video.type){
            case 'base':
                BaseTrue()
                return(
                    <>
                    <AddContentVideo text="동영상" value={content.video.file} func={e => onChangeContentVideo(e)} removeFunc={e => RemoveVideo(e)}/>
                    <div style={{marginBottom: '-20px'}} />
                    <SliderCustom top="크기" text="동영상" value={content.image.size} func={e => setImgSize(e)} max="320"/>
                    </>
                )
            case 'youtube':
                YoutubeTrue()
                return(
                    <>
                    <div style={{marginTop: '20px'}} />
                    <AddYoutubeLink content={content} value={content.video.link} />
                    <div style={{marginTop: '-20px'}} />
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
                    <div style={{marginTop: '10px'}} />
                    <SliderCustom top="크기" text="동영상" value={content.image.size} func={e => setImgSize(e)} max="320"/>
                    </>
                )
        }
    }

    // 목업 타입
    const mockOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mockup.type = e;
        }))
    }
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
    const MobileTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = true
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
        }))
    }
    const TabletTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = true
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
        }))
    }
    const DesktopTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = true
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
        }))
    }
    const Mobile2True = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = true
            draft[state.secNum].deskMobile.use = false
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
        }))
    }
    const DeskMobTrue = () => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = true
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
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

    const ImageTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = true    
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const SlideTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false    
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = true
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const VideoTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = true
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }
    const MockupTrue = () =>{
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mockup.use = true
            draft[state.secNum].mobile.use = false
            draft[state.secNum].tablet.use = false
            draft[state.secNum].desktop.use = false
            draft[state.secNum].mobile2.use = false
            draft[state.secNum].deskMobile.use = false
        }))
    }

    const returnImageOrVideoAdd = () => {
        switch(content.contents.type){
            case 'image':
                ImageTrue()
                return(
                    <div style={{width:'100%'}}>
                        <AddContentImg text="이미지" subtext="최대 5MB 업로드 가능" value={content.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        <div style={{marginTop: '-10px'}}/>
                        <SliderCustom top="크기" text="이미지" value={content.image.size} func={setImgSize} max="100"/>
                        <div style={{marginBottom: '20px'}}/>
                        <RadioCustom text="프레임" options={imageBorderOptions} value={content.image.border} func={e =>  action.setContents(produce(state.contents, draft => {
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
                SlideTrue()
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
                    <SliderCustom top="크기" text="이미지" value={content.image.size} func={setImgSize} max="300"/>
                    <RadioCustom text="프레임" options={imageBorderOptions} value={content.image.border} func={e =>  action.setContents(produce(state.contents, draft => {
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
                VideoTrue()
                return(
                    <>
                    <div style={{marginTop: '10px'}}/>
                    <RadioCustom text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                    {videoType()}
                    </>
                )
            case 'mockup':
                MockupTrue()
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
                    iconSize='none'
                    onChange={e=>mockOption(e.target.value)}
                    bg='white'
                    borderColor='rgba(0, 0, 0, 0.08)'
                    color='gray'>
                    <option value='mobile'>모바일</option>
                    <option value='tablet'>태블릿</option>
                    <option value='desktop'>데스크탑</option>
                    <option value='mobile2'>모바일 2대</option>
                    <option value='desk+mob'>데스크탑 + 모바일</option>                       
                </Select>
                    </div>
                    {returnMockup()}
                    </>
                )
        }
    }


    return (
        <OpenCloseCustom title="콘텐츠">
            <RadioCustom options={contentsOptions} value={content.contents.type} func={e => changeContentOption(e)} />                 
            {
                returnImageOrVideoAdd()
            } 
        </OpenCloseCustom>
    )
}

export default Contents
