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
    { label: '사각형', value: 0 },
    { label: '라운드', value: 5 },
    { label: '원형', value: 15 },
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
            if(oneFile.size > 3000000){
                alert("파일의 크기가 3MB를 초과합니다.")
                return;
            }
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
    const onChangeSlideImage= (num, e) => {
        let numName = ''
        if(num === 1){
            numName = 'attachment1'
        }else if(num === 2){
            numName = 'attachment2'
        }else{
            numName = 'attachment3'
        }
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
                draft[state.secNum].slide_img[numName] = result;
            }))
        }
        if(oneFile){
            reader.readAsDataURL(oneFile);
        }
    }
    const RemoveSlide = (num) => {
        let numName = ''
        if(num === 1){
            numName = 'attachment1'
        }else if(num === 2){
            numName = 'attachment2'
        }else{
            numName = 'attachment3'
        }
        action.setContents(produce(state.contents, draft=>{
            draft[state.secNum].slide_img[numName] = '';
        }))
    }

    const setImgSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e
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
                draft[state.secNum].video.attachment = result;
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
            draft[state.secNum].video.attachment = '';
        }))
    }

    const videoType = () => {
        switch(content.video.type){
            case 'base':
                return(
                    <>
                    <AddContentVideo text="동영상" value={content.video.attachment} func={e => onChangeContentVideo(e)} removeFunc={e => RemoveVideo(e)}/>
                    <SliderCustom top="크기" text="동영상을" value={content.image.size} func={e => setImgSize(e)} max="100"/>
                    </>
                )
            case 'youtube':
                return(
                    <>
                    <AddYoutubeLink content={content} value={content.video.link} />
                    {
                        content.video.link.length !== 0 && 
                    <>
                        <CustomSwitch text="자동 재생" value={content.video.auto} 
                            onChange={ () => action.setContents(produce(state.contents, draft => {
                                if (content.video.link.includes('autoplay=1'))
                                    {draft[state.secNum].video.link = content.video.link.replace('autoplay=1', 'autoplay=0');
                                    draft[state.secNum].video.auto = false;}
                                else if (content.video.link.includes('autoplay=0'))
                                    {draft[state.secNum].video.link = content.video.link.replace('autoplay=0', 'autoplay=1');
                                    draft[state.secNum].video.auto = true;}
                            }))}/>
                        <div className="mid-command">
                            {
                                content.video.auto ? <> 유저가 페이지에 들어오면 동영상이 음소거 상태로 자동 재생됩니다. </>
                                : <> 유저가 페이지에 들어온 후 동영상을 클릭하면 재생됩니다. </>
                            }
                        </div>
                    </>
                    }
                    <SliderCustom top="크기" text="동영상을" value={content.image.size} func={e => setImgSize(e)} max="100"/>
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
            default:
                return(
                    <>
                    </>
                )
        }
    }

    const returnImageOrVideoAdd = () => {
        switch(content.contents.type){
            case 'image':
                return(
                    <div style={{width:'100%'}}>
                        <AddContentImg text="이미지" subtext="최대 3MB 업로드 가능" value={content.image.attachment} func={e => onChangeContentImage(e)} removeFunc={e => RemoveImage(e)}/>
                        <SliderCustom top="크기" text="이미지를" value={content.image.size} func={setImgSize} max="100"/>
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
                    </div>
                )
            case 'slide':
                return(
                    <>
                    <div style={{display: 'flex', marginTop: '10px'}}>
                    <AddSlideImg value={content.slide_img.attachment1} func={e => onChangeSlideImage(1, e)} removeFunc={e => RemoveSlide(1)}/>
                    <AddSlideImg value={content.slide_img.attachment2} func={e => onChangeSlideImage(2, e)} removeFunc={e => RemoveSlide(2)}/>
                    <AddSlideImg value={content.slide_img.attachment3} func={e => onChangeSlideImage(3, e)} removeFunc={e => RemoveSlide(3)}/>
                    </div>
                    <div className="small-command">
                        최대 3MB까지 가능합니다.
                    </div>
                    <SliderCustom top="크기" text="이미지를" value={content.image.size} func={setImgSize} max="100"/>
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
                    </>
                )         
            case 'video':
                return(
                    <>
                    <RadioCustom text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                    {videoType()}
                    </>
                )
            case 'mockup':
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
                        </Select>
                    </div>
                    {returnMockup()}
                    </>
                )
        }
    }


    return (
        <OpenCloseCustom title="콘텐츠" use={content.contents.use}>
            <RadioCustom options={contentsOptions} value={content.contents.type} func={e => changeContentOption(e)} />                 
            {
                returnImageOrVideoAdd()
            } 
        </OpenCloseCustom>
    )
}

export default Contents
