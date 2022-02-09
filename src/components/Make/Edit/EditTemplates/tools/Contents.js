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

    const setMockupSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].mockup.size = e
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
            draft[state.secNum].mockup.use = false
        }))
    }
    const YoutubeTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = true
            draft[state.secNum].mockup.use = false
        }))
    }
    
    const videoType = () => {
        switch(content.video.type){
            case 'base':
                BaseTrue()
                return(
                    <>
                    <AddContentVideo text="동영상" value={content.video.file} func={e => onChangeContentVideo(e)} removeFunc={e => RemoveVideo(e)}/>
                    <SliderCustom top="크기" text="동영상" value={content.image.size} func={setImgSize} max="100"/>
                    </>
                )
            case 'youtube':
                YoutubeTrue()
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
                    <SliderCustom top="크기" text="동영상" value={content.image.size} func={setImgSize} max="100"/>
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
    // 목업 이미지 업로드
    const uploadImg = e => {
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            action.setContents(produce(state.contents, draft=>{
                draft[state.secNum].mockup.file = result;               
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
                        <FuncContentImg text='이미지' value={content.mockup.file} func={uploadImg}/>
                        <SliderCustom top="크기" text="이미지" value={content.mockup.size} func={setMockupSize} max="100"/>
                    </>
                )
            case 'tablet':
                return(
                    <>
                        태블릿
                    </>
                )
            case 'desktop':
                return(
                    <>
                        데스크탑
                    </>
                )
            case 'mobile2':
                return(
                    <>
                        모바일 2대
                    </>
                )
            case 'desk+mob':
                return(
                    <>
                        데스크탑 + 모바일
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
            draft[state.secNum].mockup.use = false
        }))
    }
    const SlideTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false    
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = true
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mockup.use = false
        }))
    }
    const VideoTrue = () => {
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = true
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mockup.use = false
        }))
    }
    const MockupTrue = () =>{
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].image.oneImg = false   
            draft[state.secNum].video.use = false
            draft[state.secNum].image.slide = false
            draft[state.secNum].video.youtube = false
            draft[state.secNum].mockup.use = true
        }))
    }

    const returnImageOrVideoAdd = () => {
        switch(content.contents.type){
            case 'image':
                ImageTrue()
                return(
                    <div style={{width:'100%'}}>
                        <AddContentImg text="이미지" value={content.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        <SliderCustom top="크기" text="이미지" value={content.image.size} func={setImgSize} max="100"/>
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
                    <div style={{marginTop: '40px'}}/>
                    <RadioCustom text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                    <div style={{marginBottom: '25px'}}/>
                    {videoType()}
                    </>
                )
            case 'mockup':
                MockupTrue()
                return(
                    <>
                    <div className="edit-element">
                    <div className="edit-element__one" style={{flexDirection: 'column'}}>
                    <div className="edit-element__left">디바이스</div> 
                    <div className='mockup-select'>
                    <Select  
                    className='select_list'
                    onChange={e=>mockOption(e.target.value)}
                    bg='white'
                    borderColor='rgba(0, 0, 0, 0.08)'
                    color='white'
                    >
                        <option value='mobile' >모바일</option>
                        <option value='tablet'>태블릿</option>
                        <option value='desktop'>데스크탑</option>
                        <option value='mobile2'>모바일 2대</option>
                        <option value='desk+mob'>데스크탑 + 모바일</option>                       
                    </Select>
                    </div>
                    {returnMockup()}
                    </div>
                    </div>
                    </>
                )
        }
    }


    return (
        <OpenCloseCustom title="콘텐츠" use={content.contents.use} onChange={(e)=>usingContents(e)}>
            <RadioCustom options={contentsOptions} value={content.contents.type} func={e => changeContentOption(e)} />                 
            {
                returnImageOrVideoAdd()
            } 
        </OpenCloseCustom>
    )
}

export default Contents
