import React, {useState, useEffect, useContext} from 'react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyContext } from '../../../pages/Make/MakePageV2'
import EditDetailSection from './EditTemplates/EditDetailSection'
import EditCtaSection from './EditTemplates/EditCtaSection'
import EditHeroSection from './EditTemplates/EditHeroSection'
import EditReviewSection from './EditTemplates/EditReviewSection'
import EditFeaturesSection from './EditTemplates/EditFeaturesSection'
import EditTopBar from './tools/EditTopBar'
import AddingSection from './AddingSection'

import EditSetting from './NavFooterSetting/EditSetting'
import EditNaviSection from './NavFooterSetting/EditNaviSection'
import EditFooterSection from './NavFooterSetting/EditFooterSection'
import EditContents from './NavFooterSetting/EditContents'
import {ChevronLeft} from '@styled-icons/bootstrap'
import './NewSectionMake.css'

const NAVSECNUM = 50;
const FOOTSECNUM = 51;
const SETTINGSECNUM = 52;
const CONTENTSSECNUM = 53;

function NewSectionMake({content, foot, setFoot, navi, setNavi, setting, setSetting}) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

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

            // 리뷰들인 경우 편집화면
            case 'ReviewSection':
                return(
                    <EditReviewSection content={content} category={state.category}/>
                )
            
            case 'FeaturesSection':
                return(
                    <EditFeaturesSection content={content} category={state.category}/>

                )

            case 'CtaSection':
                return(
                    <EditCtaSection content={content} category={state.category}/>
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
                            <div className="left" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                <span className="back-button">
                                    <ChevronLeft size={17} />
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
                            <div className="left" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                <span className="back-button">
                                    <ChevronLeft size={17} />
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
                            <div className="left" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                <span className="back-button">
                                    <ChevronLeft size={17} />
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
        <>
            {returnMake()}
        </>
    )
}

export default NewSectionMake
