import React, {useEffect, useState, useRef, createContext} from 'react'
import './MakePage.css'
import './MakeLanding.css'

import { dbService } from '../../tools/fbase';
import { stService } from '../../tools/fbase';
import {Link} from 'react-router-dom';
import NewSection from '../../components/Make/LookAhead/NewSection'
import NewSectionMake from '../../components/Make/Edit/NewSectionMake'
import NavBarInMakePage from '../../components/Make/NavBar/NavBarInMakePage'
import MakeNavigationV2 from '../../components/Make/LookAhead/MakeNavigationV2'
import MakeFooterV2 from '../../components/Make/LookAhead/MakeFooterV2'
import ModalMade from '../../components/Make/utils/FirstQuestions'
import LoadingModal from '../../components/Make/Modal/LoadingModal'
import CheckModal from '../../components/Make/Modal/CheckModal'
import OverflowScrolling from 'react-overflow-scrolling';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useParams } from 'react-router';
import { base } from '../../components/Make/SectionTemplates/baseTemplates'
import ReactGa from 'react-ga'
import lodash from 'lodash'
import EditNaviSection from '../../components/Make/Edit/EditTemplates/EditNaviSection'
import EditFooterSection from '../../components/Make/Edit/EditTemplates/EditFooterSection'

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const MakePageV2 = ({history}, props) => {
    const targets = useRef(null)
    const [device, setDevice] = useState(true)
    const [full, setFull] = useState(false)
    const [isWidget, setIsWidget] = useState(false)
    const [password, setPassword] = useState("");
    const [ch, setCh] = useState(false);
    const [nowState, setNowState] = useState('new');
    const [load, setLoad] = useState(false);
    const location = useLocation();

    // 새로운 세팅
    const [contents, setContents] = useState([ lodash.cloneDeep(base[0]), lodash.cloneDeep(base[1]) ])

    // 네비게이션
    const [navi, setNavi] = useState({
        sectionTemplateNumber:1,
        title:'Surfee',
        backgroundColor:'rgba(0,0,0,0)', 
        buttonFunc:'link',
        link:'www.naver.com',
        buttonTitle:'신청하기'
    });
    // 푸터
    const [foot, setFoot] = useState({
        sectionTemplateNumber:1,
        footerOrNot:true,
        text:"<p>E-mail : surfee.business@gmail.com</p><p>2021 Copyright © , All rights reserved</p>"
    });

    const [addingSectionAt, setAddingSectionAt] = useState(1000); // 1000은 추가하고 있지 않다는 것을 의미.

    // 메인 세팅
    const [mainColor, setMainColor] = useState("#6B63F7");
    const [mainTitleColor, setMainTitleColor] = useState("#000000");
    const [urlId, setUrlId] = useState("");
    const [urlTitle, setUrlTitle] = useState("Surfee | Landing Page Saas");
    const [font, setFont] = useState("Pretendard-ExptraBold");
    const [descFont, setDescFont] = useState("Pretendard-Regular");
    const [faviconAttachment, setFaviconAttachment] = useState("");

    // 섹션 1
    const [s1title, setS1title] = useState("Surfee에 오신 것을 환영합니다.\n프로젝트의 타이틀 설명을\n적어보세요.");

    // 네비게이션
    const [naviTitle, setNaviTitle] = useState("")
    const [naviColor, setNaviColor] = useState("rgba(255,255,255,0)")

    // 푸터
    const [footerOrNot, setFooterOrNot] = useState(false);
    const [footerColor, setFooterColor] = useState("white");
    const [userEmail, setUserEmail] = useState("surfee.business@gmail.com");
    const [userPhoneNumber, setUserPhoneNumber] = useState("010-4690-5086");

    // 사진들 아래는 기타
    const [secNum, setSecNum] = useState(0); // 현재 수정중인 페이지를 의미.
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/making/`);

        if(load === false && location.state !== undefined){
            const arr = location.pathname.split('/');
            setNowState(arr[arr.length -1]);
            setLoad(true);
            // setContents(location.state.item)
        }
        console.log("base")
    })

    const contextValue = {
        state: {addingSectionAt, secNum, contents},
        action : {setAddingSectionAt, setSecNum, setContents}
    }

    const onSubmit = async () => {
        if(nowState === 'edit'){
            setLoading(true);
            // 기존에 있는걸 업데이트 해야한다.
            const body = {
                contents:contents
            }
            await dbService.doc(`apply-landing-data/${contents.id}`)
                .update(body)
            
            alert("업데이트된 정보로 배포하였습니다.");
            
            setLoading(false);
        }else{
            setCh(true);
        }
    }

    const onSubmit2 = async () => {
            setLoading(true);

            const oneLandingPage = {};

            await dbService.collection("apply-landing-data").add(oneLandingPage);
            
            setTimeout(() => {
                setLoading(false);
                history.push('/#/submit');
                history.go();
            },2000)
    }

    const doSave = async () => {
        // 저장하기
        if(password.length < 4){
            alert("4글자 이상 입력해주시기 바랍니다.");
            return;
        }else{
            setLoading(true);
            const checkDatas = await dbService
                .collection("apply-landing")
                .where("password", "==", password)
                .get(); // uid를 creatorId로 줬었으니까.
            let checkData = checkDatas.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            const attachmentRef = stService.ref().child(`${urlId}/${uuidv4()}`)

            const oneLandingPage = {

            }

            if(checkData.length === 0){
                // 없으면 새로 저장
                await dbService.collection("apply-landing").add(oneLandingPage);
                alert("저장되었습니다!");
                setLoading(false);
                return;
            }else{
                // 있으면 업데이트                
                await dbService.doc(`apply-landing/${checkData[0].id}`)
                .update(oneLandingPage)
                alert("저장되었습니다!");
                setLoading(false);
                return;
            }
        }
    }

    const doLoad = async () => {
        setLoading(true);
        const checkDatas = await dbService
            .collection("apply-landing")
            .where("password", "==", password)
            .get(); // uid를 creatorId로 줬었으니까.
        let checkData = checkDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(checkData.length === 0){
            alert("해당하는 불러오기 정보가 없습니다!");
            return;
        }else{

        }
    }

    const selectorTable = () => {
        // 50은 내비를 의미, 51은 푸터를 의미
        if(secNum === 50 && addingSectionAt === 1000){
            return(
                <EditNaviSection navi={navi} setNavi={setNavi}/>
            )

        }else if(secNum === 51 && addingSectionAt === 1000 ){
            return(
                <EditFooterSection foot={foot} setFoot={setFoot} />
            )
        }else{
            return(
                <NewSectionMake contents={contents} content={contents[secNum]} setContents={setContents} />
            )
        }
    }

    const sectionsReturn = contents.map((item, index) => {
        return(
            <>
                <NewSection content={item} index={index} setSecNum={setSecNum} contents={contents} setContents={setContents} setIsWidget={setIsWidget}/>
            </>
        )
    })

    const backgroundClick = e => {
        if(e.target.className === "make-left-landing"){
            setIsWidget(false)
        }else if(e.target.className === 'make-hover-section' || e.target.className === 'template' || e.target.className === "make-nav-on" || e.target.className === "make-footer"){
            setIsWidget(true)
        }else{
            return;
        }
    }

    return (<>
       <NavBarInMakePage 
            doLoad={doLoad}
            open={open} setOpen={setOpen}
            full={full} setFull={setFull}
            device={device} setDevice={setDevice} doSave={doSave}
            naviColor={naviColor}
            password={password} setPassword={setPassword}
            onSubmit={onSubmit}
            nowState={nowState}
       />
       <MyContext.Provider value={contextValue}>
            <div className="make-page-container" style={{marginTop:'-10px'}}>
                {/* 여기서부터 메인페이지 베껴옴 */}
                    <div className="make-left-landing" onClick={e => backgroundClick(e)} style={{width:`${full || !isWidget ? '100%' : '70%' }`}}>
                        {/* <div className="make-left-top-container" style={{display:`${full ? 'none' : 'flex'}`, justifyContent:`${device ? 'start':'center'}`}}>
                            Let's Building Your Web site! {device ?  <></> : <span>in Mobile</span>}
                        </div> */}
                        <OverflowScrolling className="scroll-container" style={{ width:`${full ? '100%' : device ? '80%' : '400px' }`, height:`${full ? '94vh' : '80vh'}`}}>
                            <div className="make-main-page-container" style={{fontSize:`${full ? `${bigfont}` : `${smallfont}`}`}}>  
                                {/* 네비게이션 */}
                                <MakeNavigationV2 full={full} navi={navi} history={history} setIsWidget={setIsWidget} />
                                
                                {/* 새로운 섹션 방식 */}
                                {sectionsReturn}

                                {/* 푸터 */}
                                { footerOrNot ?  <></> : 
                                <MakeFooterV2 foot={foot} setFoot={setFoot} setIsWidget={setIsWidget} /> 
                                } 
                            </div> 
                        </OverflowScrolling>
                    </div>
                {/* 여기까지 메인페이지 베껴옴 */}
                {/* 아래는 제작하는 곳 */}
                    <div style={{display:`${isWidget ? 'flex' : 'none'}`, justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                        <OverflowScrolling className='overflow-scrolling'>
                            <div className="make-page-make-space" style={{display:`${full ? 'none' : 'flex'}`}}>
                                <div className="section-table-container" style={{width:'100%'}}>
                                    {/* 제작페이지 메인 */}
                                    {selectorTable()}
                                </div>
                                <div style={{display: 'flex', width:'80%', justifyContent: 'center', alignItems:'center', marginTop:'10%', position:'absolute', bottom:'70px'}}>
                                    <ModalMade open={open} setOpen={setOpen} naviTitle={naviTitle} setNaviTitle={setNaviTitle} s1title={s1title} setS1title={setS1title} />
                                    <LoadingModal loading={loading} />
                                    <CheckModal ch={ch} setCh={setCh} onSubmit2={onSubmit2}/>
                                </div>
                            </div>
                        </OverflowScrolling>
                    </div>
                {/* 모바일 제한 페이지 */}
                    <div className="mobile-hide">
                        <div>
                            본 사이트는 PC환경에 최적화되어있습니다. <br />
                            PC로 이동해서 랜딩페이지 제작을 시작해보세요. 😁
                        </div>
                    </div>
            </div>
        </MyContext.Provider>
        </>)
}

export default MakePageV2
