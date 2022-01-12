import React, {useEffect, useState, useRef, createContext} from 'react'
import './MakePage.css'
import './MakeLanding.css'

// Recoil , Immer JS 적용
// 

import { dbService } from '../../tools/fbase';
import { stService } from '../../tools/fbase';
import {Link} from 'react-router-dom';
import NewSection from '../../components/Make/NewSection'
import NewSectionMake from '../../components/Make/Edit/NewSectionMake'
import EditSetting from '../../components/Make/Edit/NavFooterSetting/EditSetting'
import NavBarInMakePage from './NavBarInMakePage/NavBarInMakePage'
import MakeNavigationV2 from '../../components/Make/NavBar/MakeNavigationV2'
import MakeFooterV2 from '../../components/Make/Footer/MakeFooterV2'
import FirstQuestions from '../Questions/FirstQuestions'
import LoadingModal from '../../components/Make/Modal/LoadingModal'
import OverflowScrolling from 'react-overflow-scrolling';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useParams } from 'react-router';
import { base } from '../../components/Make/SectionTypes/baseTypes'
import ReactGa from 'react-ga'
import lodash from 'lodash'
import EditNaviSection from '../../components/Make/Edit/NavFooterSetting/EditNaviSection'
import EditFooterSection from '../../components/Make/Edit/NavFooterSetting/EditFooterSection'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {motion} from 'framer-motion'
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil'
import { contentsState, settingState, naviState, footState } from '../../components/Make/state'

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const MakePageV2 = ({history, userObj}, props) => {
    const targets = useRef(null);
    // 데이터 베이스에 저장하지 않고 제작을 위해서만 사용되는 것들.
    const [secNum, setSecNum] = useState(0); // 현재 수정중인 페이지를 의미.
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // 첫 질문을 위한 Open

    const [isPhone, setIsPhone] = useState(true);
    const [full, setFull] = useState(false);
    const [isWidget, setIsWidget] = useState(false);
    const [password, setPassword] = useState("");
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
        fixed:false,
        isLogo:'logo',
        logo:'',
        backgroundColor:'rgba(0,0,0,0)', 
        bottomBorder:false,
        button:{
            use:true,
            func:'link',
            templateNum:1,
            link:'www.naver.com',
            title:'신청하기',
            color:'rgba(0,0,0,0.4)',
        }
    });

    // 푸터
    const [foot, setFoot] = useState({
        sectionTemplateNumber:1,
        footerOrNot:true,
        backgroundColor:'white', 
        padding:1,
        text:" <p style=\"text-align:center;\">About Us - Contact Us - 개인정보 처리방침 - 팀 소개</p><p style=\"text-align:center;\">E-mail : surfee.business@gmail.com</p><p style=\"text-align:center;\"><strong>2021 Copyright © , All rights reserved</strong></p>",
        iconUse:true,
        iconStyle:'circle',
        iconColor:'white',
        iconAlign:'start',
        icons:[
            
        ],
        second:{
            text:'<p>두번 째 단입니다.</p>'
        }
    });

    const [addingSectionAt, setAddingSectionAt] = useState(1000); // 1000은 추가하고 있지 않다는 것을 의미.

    const [urlId, setUrlId] = useState("");
    // 푸터
    const [footerOrNot, setFooterOrNot] = useState(false);

    // 반복 실행되는 useEffect
    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/making/`);

        function repeat(){
            console.log("임시 저장");
            localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
        }
        // 60초에 한번 씩 자동 저장
        let id = setInterval(repeat, 30000);
        return () => clearInterval(id);
    })

    // 처음에 한번만 실행되는 useEffect
    useEffect(() => {
        
        // 관리하기 페이지에서 state.item으로 내용을 가지고 넘어왔다.
        if(location.state !== undefined){

            const arr = location.pathname.split('/');
            setNowState(arr[arr.length -1]);

            const item = location.state.item;
            setContents(item[0]);
            setNavi(item[1]);
            setFoot(item[2]);
            setSetting(item[3]);
            setOpen(false);
            setEditing(true);
        }else{
            // 로컬스토리지에 저장되어인게 있다면
            if(localStorage.getItem('temp') !== null){
                
                // const cf = window.confirm("작업중이던 페이지가 있습니다. 불러오시겠습니까? 취소 시 이전에 작업하던 내용은 사라집니다.");

                setFooterOrNot(true);

                // if(cf){
                //     const temp = JSON.parse(localStorage.getItem('temp'));
                //     setContents(temp[0]);
                //     setNavi(temp[1]);
                //     setFoot(temp[2]);
                //     setSetting(temp[3]);
                //     setOpen(false);
                //     setEditing(true);
                // }else{
                // }
            }else{
                console.log("처음 저장")
                localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
            }
        }

        setLoad(true);
    },[])

    const contextValue = {
        state: {addingSectionAt, secNum, contents, isWidget, isPhone},
        action : {setAddingSectionAt, setSecNum, setContents, setIsWidget, setIsPhone},
    }

    const loadLocalStorage = () => {
        const temp = JSON.parse(localStorage.getItem('temp'));
        setContents(temp[0]);
        setNavi(temp[1]);
        setFoot(temp[2]);
        setSetting(temp[3]);
        setOpen(false);
        setEditing(true);
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
                doLoad={doLoad} history={history} userObj={userObj}
                open={open} setOpen={setOpen}
                full={full} setFull={setFull}
                isPhone={isPhone} setIsPhone={setIsPhone} doSave={doSave}
                nowState={nowState}
                loading={loading} setLoading={setLoading}
                navi={navi} foot={foot} setting={setting}
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
                            <MakeNavigationV2 full={full} navi={navi} setNavi={setNavi} history={history} setIsWidget={setIsWidget} />
                            
                            {/* 섹션 디스플레이 */}
                            {sectionsReturn}

                            {/* 푸터 */}
                            <MakeFooterV2 full={full} history={history} foot={foot} setFoot={setFoot} setIsWidget={setIsWidget} /> 

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
            <ConfirmCustom open={footerOrNot} setOpen={setFooterOrNot} message={"제작 중이던 페이지가 있습니다. 불러오시겠습니까? 취소 시 이전에 작업하던 내용은 사라집니다."} callback={ loadLocalStorage } />
        </MyContext.Provider>
        </> }
        </>)
}

export default MakePageV2
