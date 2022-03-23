import React, {useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditDesign from './tools/EditDesign'
import produce from 'immer';
import ElementsTable from './tools/ElementsTable'
import OpenCloseCustom from '../tools/Custom/OpenCloseCustom'
import SliderCustom from '../tools/Custom/SliderCustom'
import EditTitleDesc from './tools/EditTitleDesc'
import FuncContentImg from '../tools/func/FuncContentImg'
import { Select } from '@chakra-ui/react'

function EditMockupSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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
            title:'목업',
            use:content.mockup.use,
            func:() => action.setContents(produce(state.contents, draft => {
                draft[state.secNum].mockup.use = !content.mockup.use;
                draft[state.secNum].contents.type= 'mockup';
            }))
        },
    ]

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


    const returnTable = () => {
        switch(category){
            case 0:
                // case 0은 디자인 수정
                return(
                    <div>
                        <ElementsTable elements={elements} />
                        <EditTitleDesc content={content} />
                        <OpenCloseCustom title='목업' use={content.mockup.use}>
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

export default EditMockupSection
