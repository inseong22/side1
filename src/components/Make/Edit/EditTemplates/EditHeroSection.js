import React, {useState, useContext} from 'react'
import { MyContext } from '../../../../pages/Make/MakePageV2'
import EditAnimation from '../tools/EditAnimation'
import { detailSectionTemplateList } from './InnerTemplates'
import TemplateChoose from '../tools/TemplateChoose'
import {EditRadioContainer} from '../tools/RadioCustom'
import produce from 'immer';
import {EditColorContainer} from '../tools/EditColor'
import CheckBoxContainer from '../tools/CheckBoxContainer'
import ImageAddEdit from '../tools/ImageAddEdit'

const paddingOptions = [
    { label: '없음', value: 0 },
    { label: '좁게', value: 5 },
    { label: '보통', value: 10 },
    { label: '넓게', value: 20 },
]
const imageBorderOptions = [
    { label: '원형', value: 50 },
    { label: '라운드', value: 7 },
    { label: '사각형', value: 0 },
]
const imageSizeOptions = [
    { label: '작게', value: 150 },
    { label: '보통', value: 200 },
    { label: '크게', value: 300 },
]

const imageOptions = [
    { label:'동영상', value:'video'},
    { label:'사진', value:'image'},
    { label:'목업', value:'mockup'},
    { label:'슬라이드', value:'slide'},
]

function EditHeroSection({content, category}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [selectOpen, setSelectOpen] = useState(false)

    const changeImageOption = e => {
        action.setContents(produce(state.contents, draft => {
            draft[state.secNum].image.type = e;
        }));
    }

    // 템플릿 2 이미지의 경우에는
    const onChangeBackgroundImage = e => {
        let newContents = JSON.parse(JSON.stringify(state.contents))
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            // newContents = state.contents.map((item, index) => index === state.secNum ? {...item, image: {...item.image, attachment : result}} : item)
            newContents[state.secNum].backgroundImage.attachment = result;
        }
        reader.readAsDataURL(oneFile);
        action.setContents(newContents);
    }

    const returnImageOrVideoAdd = () => {
        switch(content.image.type){
            case 'image':
                return(
                    <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">사진 삽입</div>
                            <div className="edit-element__right">
                            </div>
                        </div>
                    </div>
                )
            
            case 'video':
                return(
                    <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">동영상 사용</div>
                            <div className="edit-element__right">
                            </div>
                        </div>
                    </div>

                )
            default:
                return(
                    <div>아니</div>
                )
        }
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
                    <EditColorContainer text={"배경 색상"} value={content.backgroundColor} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].backgroundColor = e
                        }))} />
                    <div className="edit-element">
                        <div className="edit-element__one">
                            <div className="edit-element__left">배경 색상 투명도</div>
                            <div className="edit-element__right">
                                <input onChange={(e) => action.setContents(produce(state.contents, draft => {
                                    draft[state.secNum].backgroundOpacity = e.currentTarget.value
                                }))} value={content.backgroundOpacity} type="number" />
                            </div>
                        </div>
                    </div>
                    <CheckBoxContainer text="배경에 이미지 삽입" value={content.backgroundImage.use} func={ () => action.setContents(produce(state.contents, draft => {
                        draft[state.secNum].backgroundImage.use = !content.backgroundImage.use;
                    }))} />
                    {
                        content.backgroundImage.use && 
                            <ImageAddEdit text="배경에 이미지 삽입" value={content.backgroundImage.attachment} func={e => onChangeBackgroundImage(e)} />
                    }
                    <EditRadioContainer text="위아래 여백" options={paddingOptions} value={content.paddingSize} func={e => action.setContents(produce(state.contents, draft => {
                            draft[state.secNum].paddingSize = e;
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
