import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import ElementsTable from './tools/ElementsTable'
import produce from 'immer'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import RadioCustom from '../tools/Custom/RadioCustom'
import AddContentVideo from '../tools/func/FuncContentVideo'
import AddYoutubeLink from '../tools/func/FuncYoutubeLink'
import EditSlider from '../tools/Custom/SliderCustom'
import {CustomSwitch} from '../tools/Custom/OnOffCustom'
import ColorCustom from '../tools/Custom/ColorCustom'

const videoOptions = [
    { label: '업로드', value: 'base'},
    { label: '유튜브 링크', value: 'youtube'}
]
const alignOptions = [
    { label: '왼쪽', value: 'left' },
    { label: '중앙', value: 'center' },
]

function EditVideoSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
    // video size
    const setImgSize = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.size = e.target.value
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

    const elements = [
        {
            title:'제목',
            use:content.title.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].title.use = !content.title.use;
            }))
        },
        {
            title:'본문',
            use:content.desc.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].desc.use = !content.desc.use;
            }))
        },
        {
            title:'동영상',
            use:content.video.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].video.use = !content.video.use;
            }))
        },
        {
            title:'설명',
            use:content.explanation.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].explanation.use = !content.explanation.use;
            }))
        },
    ]

    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <OpenCloseCustom title="동영상">
                        <div style={{marginTop: '40px'}}/>
                        <RadioCustom text="방식" options={videoOptions} value={content.video.type} func={e=>changeVideoOption(e)}/>
                        <div style={{marginBottom: '25px'}}/>
                        {videoType()}
                        </OpenCloseCustom>
                        <OpenCloseCustom title='설명'>
                        <ColorCustom text="색상" value={content.explanation.color} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].explanation.color = e;
                        }))} />
                        <RadioCustom text="정렬" options={alignOptions} value={content.explanation.align} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].explanation.align = e;
                        }))} />
                        </OpenCloseCustom>
                    </div>
                )
            case 1:
                return(
                    <div>
                        <EditDesign content={content} />
                    </div>
                )
        }
    }

    return (
        <>
            {returnTable()}
        </>
    )
}

export default EditVideoSection
