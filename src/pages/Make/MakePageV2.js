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
import { defaults } from '../../components/Make/SectionTypes/baseTypes'
import ReactGa from 'react-ga'
import lodash from 'lodash'
import ConfirmCustom from '../../tools/ConfirmCustom'
import { isMobile } from 'react-device-detect';

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const NOTADDING = 1000;

const MakePageV2 = ({history, userObj}, props) => {
    const targets = useRef(null);
    // 데이터 베이스에 저장하지 않고 제작을 위해서만 사용되는 것들.
    const [secNum, setSecNum] = useState(0); // 현재 수정중인 페이지를 의미.
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // 첫 질문을 위한 Open

    const [isPhone, setIsPhone] = useState(true);
    const [full, setFull] = useState(false);
    const [isWidget, setIsWidget] = useState(true);
    const [password, setPassword] = useState("");
    const [nowState, setNowState] = useState('new');
    const [load, setLoad] = useState(false);
    const [editing, setEditing] = useState(false);
    const [category, setCategory] = useState(0);
    const location = useLocation();
      
    // 메인 세팅
    const [setting, setSetting] = useState(lodash.cloneDeep(defaults.setting));

    // 새로운 세팅
    // local storage 저장을 위한 contents 재설정 - video의 용량 초과 때문에 일단..ㅠ
    const arr = lodash.cloneDeep(base[0])
    delete arr.video.file
    const [contents, setContents] = useState([ arr, lodash.cloneDeep(base[1]), lodash.cloneDeep(base[2]), lodash.cloneDeep(base[4]) ])

    // 네비게이션
    const [navi, setNavi] = useState(lodash.cloneDeep(defaults.navi));

    // 푸터
    const [foot, setFoot] = useState(lodash.cloneDeep(defaults.foot));

    const [addingSectionAt, setAddingSectionAt] = useState(NOTADDING); // 1000은 추가하고 있지 않다는 것을 의미.

    // 푸터
    const [footerOrNot, setFooterOrNot] = useState(false);
    // 반복 실행되는 useEffect
    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/making/${userObj.email}`);
        function repeat(){
            // localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
        }
        // 30초에 한번 씩 자동 저장
        let id = setInterval(repeat, 30000);
        return () => clearInterval(id);
    })

    // 처음에 한번만 실행되는 useEffect
    useEffect(() => {
        console.log("처음에 한번만")
        
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
                localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
            }
        }

        setLoad(true);
    },[])

    const contextValue = {
        state: {addingSectionAt, secNum, contents, isPhone, category, setting},
        action : {setAddingSectionAt, setSecNum, setContents, setIsPhone, setCategory, setSetting},
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
                .get(); // uid를 creatorId로 줬었으니까.
            let checkData = checkDatas.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            const attachmentRef = stService.ref().child(`${setting.urlId}/${uuidv4()}`)

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

    const sectionsReturn = contents.map((item, index) => {
        return(
            <div style={{width:'100%'}}>
                <NewSection content={item} key={index} index={index} setSecNum={setSecNum} contents={contents} setContents={setContents} />
            </div>
        )
    })

    const backgroundClick = e => {
        // if(e.target.className === "make-left-landing" || e.target.className === "for-section-hover"){
        //     setSecNum(CONTENTSSECNUM)
        //     setAddingSectionAt(NOTADDING);
        // }
        // else{
        //     return;
        // }
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
            <div className="make-page-container">
                {/* 아래는 제작하는 곳 */}
                <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
                    <div className="make-page-make-space" style={{display:`${full ? 'none' : 'flex'}`}}>
                        <OverflowScrolling className='overflow-scrolling'>
                            {/* 제작페이지 메인 */}
                           <NewSectionMake content={contents[secNum]} foot={foot} setFoot={setFoot} navi={navi} setNavi={setNavi} setting={setting} setSetting={setSetting} />
                        </OverflowScrolling>
                    </div>
                    <div className="fake-make">
                    </div>
                </div>
                {/* 아래는 미리보기 화면 */}
                <div className="make-left-landing" onClick={e => backgroundClick(e)}>
                    <div className="scroll-container" 
                        style={{ width:`${full ? '100%' :'90%'}`}}
                        animate={
                            isPhone ? {
                                width:['80%', '40%'],
                                transition:{
                                    duration:0.3
                                }
                            } : {}
                        }>
                        {/* 실시간으로 바뀌는 모습이 보이는 랜딩페이지 */}
                        <div className="make-tab-preseen" onClick={() => setSecNum(52)}>
                            <div className="left">
                                <div className="make-tab-circle" style={{marginLeft:'15px'}}></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-one-tab">
                                    <img src={setting.faviconAttachment} className='make-tab-favicon' />
                                    {setting.title}
                                </div>
                            </div>
                            <div className="right" style={{paddingRight:'23px'}}>
                                <div className="make-tab-url">
                                    https://{setting.urlId}.surfee.co.kr
                                </div>
                            </div>
                        </div>
                        <div ref={targets} className="make-main-page-container" style={{fontSize:`${full ? `${bigfont}` : `${smallfont}`}`, borderRadius:`${isPhone ? '7px' : '0px'}` }}>  
                            
                            {/* 네비게이션 */}
                            {navi.use && <MakeNavigationV2 full={full} navi={navi} setNavi={setNavi} history={history} /> }
                            
                            {/* 섹션 디스플레이 */}
                            
                            {sectionsReturn}

                            {/* 푸터 */}
                            {foot.use && <MakeFooterV2 full={full} history={history} foot={foot} setFoot={setFoot} /> }                             

                            { ( setting.fta.use ) &&
                            <div className="fta__container">
                                <button className="fta-button" style={{backgroundColor:`${setting.fta.backgroundColor}`, width:`${isPhone ? setting.fta.size/2 : setting.fta.size}%`, borderRadius:`${setting.fta.shape}px`}}>
                                    {setting.fta.text}
                                </button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 모달 모아두기 */}
            <div style={{display: 'flex', width:'80%', justifyContent: 'center', alignItems:'center', marginTop:'10%', position:'absolute', bottom:'70px'}}>
                <FirstQuestions open={open} setOpen={setOpen} navi={navi} setNavi={setNavi} editing={editing} setEditing={setEditing} setting={setting} setSetting={setSetting}/>
                <LoadingModal loading={loading} />
            </div>
            <ConfirmCustom open={footerOrNot} setOpen={setFooterOrNot} message={"제작 중이던 페이지가 있습니다. 불러오시겠습니까? 취소 시 이전에 작업하던 내용은 사라집니다."} callback={ loadLocalStorage } />
        </MyContext.Provider>
        </> }
        </>)
}

export default MakePageV2
