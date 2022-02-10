import React, {useState, useEffect, useContext} from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyContext } from '../../../pages/Make/MakePageV2'
import EditDetailSection from './EditTemplates/EditDetailSection'
import EditCtaSection from './EditTemplates/EditCtaSection'
import EditHeroSection from './EditTemplates/EditHeroSection'
import EditReviewSection from './EditTemplates/EditReviewSection'
import EditFeaturesSection from './EditTemplates/EditFeaturesSection'
import EditAppDownloadSection from './EditTemplates/EditAppDownloadSection'
import EditApplySection from './EditTemplates/EditApplySection'
import EditQnaSection from './EditTemplates/EditQnaSection'
import EditGallerySection from './EditTemplates/EditGallerySection'
import EditTextSection from './EditTemplates/EditTextSection'
import EditMockupSection from './EditTemplates/EditMockupSection'
import EditVideoSection from './EditTemplates/EditVideoSection'
import EditTopBar from './tools/func/FuncTopBar'

import EditSetting from './NavFooterSetting/EditSetting'
import EditNaviSection from './NavFooterSetting/EditNaviSection'
import EditFooterSection from './NavFooterSetting/EditFooterSection'
import EditContents from './NavFooterSetting/EditContents'
import BackButton from '../../../tools/img/backButton.png'
import './NewSectionMake.css'

const NAVSECNUM = 50;
const FOOTSECNUM = 51;
const SETTINGSECNUM = 52;
const CONTENTSSECNUM = 53;

export const MakeContext = React.createContext({
    stateC : {usedColors : [
        "#ffffff",
        "#00ff00",
        "#ff0000",
        "#0000ff",
        "#000000",
    ]},
    actionC : {setUsedColors : () => {}}
});

function NewSectionMake({content, foot, setFoot, navi, setNavi, setting, setSetting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [usedColors, setUsedColors] = useState([
        "#ffffff",
        "#00ff00",
        "#ff0000",
        "#0000ff",
        "#000000",
    ]);

    const contextValue = {
        stateC: {usedColors},
        actionC : {setUsedColors},
    }

    const sectionMakeTable = () => {

        switch(content.sectionTypeName){
            case 'DetailSection':
                return (
                    <EditDetailSection content={content} category={state.category}/>
                )

            // 이미지인 경우 편집화면
            case 'HeroSection':
                return (
                    <EditHeroSection content={content} category={state.category}/>
                )

            case 'CtaSection':
                return (
                    <EditCtaSection content={content} category={state.category}/>
                )

            // 리뷰들인 경우 편집화면
            case 'ReviewSection':
                return(
                    <EditReviewSection content={content} category={state.category}/>
                )
            
            case 'FeaturesSection':
                return(
                    <EditFeaturesSection content={content} category={state.category}/>

                )

            case 'ApplySection':
                return(
                    <EditApplySection content={content} category={state.category}/>

                )
            
            case 'AppDownloadSection':
                return(
                    <EditAppDownloadSection content={content} category={state.category}/>

                )
    
            case 'QnaSection':
                return(
                    <EditQnaSection content={content} category={state.category}/>
                )

            case 'GallerySection':
                return(
                    <EditGallerySection content={content} category={state.category}/>
                )

            case 'TextSection':
                return(
                    <EditTextSection content={content} category={state.category}/>
                )

            case 'MockupSection':
                return(
                    <EditMockupSection content={content} category={state.category}/>
                )

            case 'VideoSection':
                return(
                    <EditVideoSection content={content} category={state.category}/>
                )
    
            default:
                return(
                    <div>
                        섹션 {state.secNum}번이고 템플릿은 뭐지? 디폴트 값입니다.
                        <br/>
                    </div>
                )

        }
    }

    const returnMake = () => {
        if(state.secNum === NAVSECNUM){
            return(
                <>
                    <div className="back__container">
                        <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                            <span className="back-button">
                                <img src={BackButton} />
                            </span>
                            <span className="back-text">
                                내비게이션 바
                            </span>
                        </div>
                    </div>
                    <EditTopBar category={state.category} setCategory={action.setCategory} />
                    <EditNaviSection navi={navi} setNavi={setNavi} category={state.category}/>
                </>
            )

        }else if(state.secNum === FOOTSECNUM ){
            return(
                <>
                    <div className="back__container">
                        <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                            <span className="back-button">
                            <img src={BackButton} />
                            </span>
                            <span className="back-text">
                                푸터 바
                            </span>
                        </div>
                    </div>
                    <EditTopBar category={state.category} setCategory={action.setCategory} />
                    <EditFooterSection foot={foot} setFoot={setFoot} category={state.category}/>
                </>
            )
        }else if(state.secNum === SETTINGSECNUM ){
            return(
                <>
                    <div className="back__container">
                        <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                            <span className="back-button">
                            <img src={BackButton} />
                            </span>
                            <span className="back-text">
                                기본설정
                            </span>
                        </div>
                    </div>
                    <EditTopBar category={state.category} setCategory={action.setCategory} />
                    <EditSetting setting={setting} setSetting={setSetting} category={state.category}/>
                </>
            )
        }else if(state.secNum === CONTENTSSECNUM ){
            return(
                <EditContents navi={navi} setNavi={setNavi} foot={foot} setFoot={setFoot}/>
            )
        }else{
            return (
                <>
                {content && 
                <>
                    <div className="back__container">
                        <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                            <span className="back-button">
                            <img src={BackButton} />
                            </span>
                            <span className="back-text">
                                {content.name}
                            </span>
                        </div>
                    </div>
                    <EditTopBar category={state.category} setCategory={action.setCategory} />
                    {sectionMakeTable()}
                </> }
                </>
            )
        }
    }

    return (
        <MakeContext.Provider value={contextValue}>
            {returnMake()}
        </MakeContext.Provider>
    )
}

export default NewSectionMake
