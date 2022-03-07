import React, {useState, useEffect, useContext} from 'react'
import { MyContext } from '../../../pages/Make/MakePageV2'
import EditNaviSection from './NavFooterSetting/EditNaviSection'
import EditDetailSection from './EditTemplates/EditDetailSection'
import EditCtaSection from './EditTemplates/EditCtaSection'
import EditHeroSection from './EditTemplates/EditHeroSection'
import EditReviewSection from './EditTemplates/EditReviewSection'
import EditFeaturesSection from './EditTemplates/EditFeaturesSection'
import EditQnaSection from './EditTemplates/EditQnaSection'
import EditGallerySection from './EditTemplates/EditGallerySection'
import EditTextSection from './EditTemplates/EditTextSection'
import EditMockupSection from './EditTemplates/EditMockupSection'
import EditVideoSection from './EditTemplates/EditVideoSection'
import EditTopBar from './tools/func/FuncTopBar'
import {ArrowIosBack} from '@styled-icons/evaicons-solid'
import EditSetting from './NavFooterSetting/EditSetting'
import EditFooterSection from './NavFooterSetting/EditFooterSection'
import EditContents from './NavFooterSetting/EditContents'
import {sectionIcons} from './NavFooterSetting/ContentsIcons';
import {Trash} from '@styled-icons/boxicons-solid'
import './NewSectionMake.css'

const NAVSECNUM = 50;
const FOOTSECNUM = 51;
const SETTINGSECNUM = 52;
const CONTENTSSECNUM = 53;

const MARGINTOP = '100px'

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

function NewSectionMake({content, foot, setFoot, navi, setNavi, setting, setSetting, elementsRef, setContents}) {
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

    const deleteSection = (index) => {
        if(index === 0){
            action.setContents([
                ...state.contents.slice(1,state.contents.length)
            ])
        }if(index === state.contents.length){
            action.setContents([
                ...state.contents.slice(0,index-1),
            ])
        }else{
            action.setContents([
                ...state.contents.slice(0,index),
                ...state.contents.slice(index+1, state.contents.length)
            ])
        }
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
                    <EditCtaSection content={content} category={state.category} type="cta"/>
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
                    <EditCtaSection content={content} category={state.category} type="apply"/>

                )
            
            case 'AppDownloadSection':
                return(
                    <EditCtaSection content={content} category={state.category} type="appDownload"/>

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
                    <div className="top-bar__fixed">
                        <div className="back__container">
                            <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                <span className="back-button">
                                    <ArrowIosBack size="20" />
                                </span>
                                <span className="content__name">
                                    내비게이션 바
                                </span>
                            </div>
                        </div>
                        <EditTopBar category={state.category} setCategory={action.setCategory} />
                    </div>
                    <div style={{marginTop:`${MARGINTOP}`}}></div>
                    <EditNaviSection navi={navi} setNavi={setNavi} category={state.category}/>
                </>
            )

        }else if(state.secNum === FOOTSECNUM ){
            return(
                <>
                    <div className="top-bar__fixed">
                        <div className="back__container">
                            <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                <span className="back-button">
                                    <ArrowIosBack size="20" />
                                </span>
                                <span className="back-text">
                                    푸터 바
                                </span>
                            </div>
                        </div>
                        <EditTopBar category={state.category} setCategory={action.setCategory} />
                    </div>
                    <div style={{marginTop:`${MARGINTOP}`}}></div>
                    <EditFooterSection foot={foot} setFoot={setFoot} category={state.category}/>
                </>
            )
        }else if(state.secNum === SETTINGSECNUM ){
            return(
                <>
                    <div className="top-bar__fixed">
                        <EditTopBar category={state.category} setCategory={action.setCategory} />
                    </div>
                    <div style={{marginTop:`60px`}}></div>
                    <EditSetting setting={setting} setSetting={setSetting} category={state.category} setContents={setContents} content={content}/>
                </>
            )
        }else if(state.secNum === CONTENTSSECNUM ){
            return(
                <EditContents setting={setting} navi={navi} setNavi={setNavi} foot={foot} setFoot={setFoot} elementsRef={elementsRef}/>
            )
        }else{
            return (
                <>
                {content && 
                <>
                    <div className="top-bar__fixed">
                        <div className="back__container">
                            <div className="centera" style={{width:'50%', justifyContent:'start'}}>
                                <div className="back__container-button" onClick={() => action.setSecNum(CONTENTSSECNUM)} style={{cursor:'pointer'}}>
                                    <span className="back-button">
                                        <ArrowIosBack size="20" />
                                    </span>
                                    {
                                        sectionIcons.filter(doc => doc.sectionTypeName === content.sectionTypeName)[0].icon
                                    }
                                    <span className="back-text">
                                        {content.name}
                                    </span>
                                </div>
                            </div>
                            <div style={{width:'50%',display:'flex', justifyContent:'end', paddingRight:'10px'}}>
                                <span className="back__container-button" style={{padding:'6px', cursor:'pointer'}} 
                                    onClick={() => {
                                        const yes = window.confirm("정말 삭제하시겠습니까?");
                                        if(yes){
                                            deleteSection(state.secNum);
                                        }
                                    } }>
                                    <Trash size="20" style={{color:'rgba(105,105,105,1)'}} />
                                </span>
                            </div>
                        </div>
                        <EditTopBar category={state.category} setCategory={action.setCategory} />
                    </div>
                    <div style={{marginTop:`${MARGINTOP}`}}></div>
                    {sectionMakeTable()}
                </> }
                </>
            )
        }
    }

    return (
        <MakeContext.Provider value={contextValue} style={{position:'relative'}}>
            {returnMake()}
        </MakeContext.Provider>
    )
}

export default NewSectionMake
