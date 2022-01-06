import React, {useEffect, useState, useRef, createContext} from 'react'
import './MakePage.css'
import './MakeLanding.css'

import { dbService } from '../../tools/fbase';
import { stService } from '../../tools/fbase';
import {Link} from 'react-router-dom';
import NewSection from '../../components/Make/LookAhead/NewSection'
import NewSectionMake from '../../components/Make/Edit/NewSectionMake'
import EditSetting from '../../components/Make/Edit/EditSetting'
import NavBarInMakePage from '../../components/Make/NavBar/NavBarInMakePage'
import MakeNavigationV2 from '../../components/Make/LookAhead/MakeNavigationV2'
import MakeFooterV2 from '../../components/Make/LookAhead/MakeFooterV2'
import FirstQuestions from '../../components/Make/Modal/FirstQuestions'
import LoadingModal from '../../components/Make/Modal/LoadingModal'
import CheckModal from '../../components/Make/Modal/CheckModal'
import OverflowScrolling from 'react-overflow-scrolling';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useParams } from 'react-router';
import { base } from '../../components/Make/SectionTypes/baseTypes'
import ReactGa from 'react-ga'
import lodash from 'lodash'
import EditNaviSection from '../../components/Make/Edit/EditTemplates/EditNaviSection'
import EditFooterSection from '../../components/Make/Edit/EditTemplates/EditFooterSection'
import {motion} from 'framer-motion'
import { isMobile } from 'react-device-detect';

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const MakePageV2 = ({history}, props) => {
    const targets = useRef(null);
    // 데이터 베이스에 저장하지 않고 제작을 위해서만 사용되는 것들.
    const [isPhone, setIsPhone] = useState(true);
    const [full, setFull] = useState(false);
    const [isWidget, setIsWidget] = useState(false);
    const [password, setPassword] = useState("");
    const [ch, setCh] = useState(false);
    const [nowState, setNowState] = useState('new');
    const [load, setLoad] = useState(false);
    const [editing, setEditing] = useState(false);
    const location = useLocation();

    // 메인 세팅
    const [setting, setSetting] = useState({
        urlId:'',
        faviconAttachment:'',
        font:'',
        smallFont:'',
        color:'',
        fta:{
            use:false,
            backgroundColor:'rgba(150,150,0,1)',
            text:'fta 버튼'
        }
    });

    // 새로운 세팅
    const [contents, setContents] = useState([ lodash.cloneDeep(base[0]), lodash.cloneDeep(base[1]), lodash.cloneDeep(base[2]), lodash.cloneDeep(base[4]) ])

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

    const [urlId, setUrlId] = useState("");

    // 네비게이션
    const [naviColor, setNaviColor] = useState("rgba(255,255,255,0)")

    // 푸터
    const [footerOrNot, setFooterOrNot] = useState(false);

    // 사진들 아래는 기타
    const [secNum, setSecNum] = useState(0); // 현재 수정중인 페이지를 의미.
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/making/`);

        console.log("base")

        function repeat(){
            localStorage.setItem('temp', JSON.stringify(contents));
        }
        // 70초에 한번 씩 자동 저장
        let id = setInterval(repeat, 70000);
        return () => clearInterval(id);
    })

    useEffect(() => {

        if(load === false && location.state !== undefined){
            const arr = location.pathname.split('/');
            setNowState(arr[arr.length -1]);
            // setContents(location.state.item)
            
            // 처음에만, 로컬스토리지에 저장된 정보가 있다면 불러온다.
            const item = localStorage.getItem('temp');
            
            if( item !== null ){
                const ask = window.confirm("작업 중이던 정보가 있습니다. 불러오시겠습니까?")
                if(ask){
                    setContents(JSON.parse(item));
                    setOpen(false);
                    setEditing(true);
                }else{
                    return
                }
            }
            setLoad(true);
            console.log("처음에만 실행");
        }
    },[])

    const contextValue = {
        state: {addingSectionAt, secNum, contents, isWidget, isPhone},
        action : {setAddingSectionAt, setSecNum, setContents, setIsWidget, setIsPhone},
    }

    const onSubmit = async () => {
        // 배포하기 클릭
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
            // 새로 업로드 해야한다.
            setCh(true);
        }
    }

    const onSubmit2 = async () => {
            setLoading(true);

            const oneLandingPage = {};

            await dbService.collection("apply-landing-data").add(oneLandingPage);

            // 자동저장 하던 걸 지운다.
            window.localStorage.removeItem("temp");
            
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
        }else if(secNum === 52 && addingSectionAt === 1000 ){
            return(
                <EditSetting setting={setting} setSetting={setSetting}/>
            )
        }else{
            return(
                <NewSectionMake contents={contents} content={contents[secNum]} setContents={setContents} />
            )
        }
    }

    const sectionsReturn = contents.map((item, index) => {
        return(
            <div>
                <NewSection content={item} index={index} setSecNum={setSecNum} contents={contents} setContents={setContents} setIsWidget={setIsWidget}/>
            </div>
        )
    })

    const backgroundClick = e => {
        if(e.target.className === "make-left-landing" || e.target.className === "for-section-hover"){
            setIsWidget(false);
            setAddingSectionAt(1000);
        }
        // else if(e.target.className === 'make-hover-section' || e.target.className === 'template' || e.target.className === "make-nav-on" || e.target.className === "make-footer" || e.target.className === "footer-section"){
        //     setIsWidget(true)
        // }
        else{
            return;
        }
    }

    return (<>
    { isMobile ? 
        <div className="mobile-hide">
            <div>
                본 사이트는 PC환경에 최적화되어있습니다. <br />
                PC로 이동해서 랜딩페이지 제작을 시작해보세요. 😁
            </div>
        </div> 
        :
    <>
       <MyContext.Provider value={contextValue}>
            <NavBarInMakePage 
                doLoad={doLoad}
                open={open} setOpen={setOpen}
                full={full} setFull={setFull}
                isPhone={isPhone} setIsPhone={setIsPhone} doSave={doSave}
                naviColor={naviColor}
                password={password} setPassword={setPassword}
                onSubmit={onSubmit}
                nowState={nowState}
            />
            <div className="make-page-container" style={{marginTop:'0px'}}>
                {/* 아래는 제작하는 곳 */}
                <motion.div style={{display:`${isWidget ? 'flex' : 'none'}`, justifyContent:'center', alignItems: 'center'}}>
                    <div className="make-page-make-space" style={{display:`${full ? 'none' : 'flex'}`}}>
                        <OverflowScrolling className='overflow-scrolling'>
                            <div>
                                {/* 제작페이지 메인 */}
                                {selectorTable()}
                            </div>
                            <div style={{display: 'flex', width:'80%', justifyContent: 'center', alignItems:'center', marginTop:'10%', position:'absolute', bottom:'70px'}}>
                                <FirstQuestions open={open} setOpen={setOpen} navi={navi} setNavi={setNavi} editing={editing} setEditing={setEditing} setting={setting} setSetting={setSetting}/>
                                <LoadingModal loading={loading} />
                                <CheckModal ch={ch} setCh={setCh} onSubmit2={onSubmit2}/>
                            </div>
                        </OverflowScrolling>
                    </div>
                </motion.div>
                {/* 아래는 미리보기 화면 */}
                <motion.div className="make-left-landing" onClick={e => backgroundClick(e)}
                    animate={ full || !isWidget ? {}: isPhone ? {
                            x:[0, 250],
                            transition:{
                                duration:0.3,
                            }
                        }: {
                                width:['100%', '70%'],
                                transition:{
                                    duration:0.3,
                                }
                            }
                        }
                        >
                    <motion.div className="scroll-container" 
                        style={{ width:`${full ? '100%' :'80%'}`}}
                        animate={
                            isPhone ? {
                                width:['70%', '30%'],
                                transition:{
                                    duration:0.3
                                }
                            } : {}
                        }>
                        {/* 실시간으로 바뀌는 모습이 보이는 랜딩페이지 */}
                        <div ref={targets} className="make-main-page-container" style={{fontSize:`${full ? `${bigfont}` : `${smallfont}`}`, borderRadius:`${isPhone ? '7px' : '0px'}` }}>  
                            
                            {/* 네비게이션 */}
                            <MakeNavigationV2 full={full} navi={navi} history={history} setIsWidget={setIsWidget} />
                            
                            {/* 섹션 디스플레이 */}
                            {sectionsReturn}

                            {/* 푸터 */}
                            <MakeFooterV2 foot={foot} setFoot={setFoot} setIsWidget={setIsWidget} /> 

                            {/* ${targets.current.clientWidth-targets.current.clientWidth/100}px */}
                            { ( setting.fta.use && targets.current ) &&
                                <button className="fta-button" style={{backgroundColor:`${setting.fta.backgroundColor}`, width:`${targets.current.clientWidth-targets.current.clientWidth/10}px`}}>
                                    {setting.fta.text}
                                </button>
                            }
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </MyContext.Provider>
        </> }
        </>)
}

export default MakePageV2
