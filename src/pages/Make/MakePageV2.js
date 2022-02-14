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
import {ChakraProvider} from '@chakra-ui/react'
import {Prompt} from 'react-router-dom';
import produce from 'immer'
import TextAuto from '../../components/Make/SectionTypes/components/TextAuto'

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const NOTADDING = 1000;

const MakePageV2 = ({history, userObj}) => {
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
    const [makingTypeByUser, setMakingTypeByUser] = useState("");
    const [category, setCategory] = useState(0);
    const location = useLocation();
      
    // 메인 세팅
    const [setting, setSetting] = useState(lodash.cloneDeep(defaults.setting));

    // 새로운 세팅
    // local storage 저장을 위한 contents 재설정 - video의 용량 초과 때문에 일단..ㅠ
    const arr = lodash.cloneDeep(base[0])
    delete arr.video.file
    const [contents, setContents] = useState([ arr, lodash.cloneDeep(base[1]), lodash.cloneDeep(base[4]), lodash.cloneDeep(base[5]), lodash.cloneDeep(base[6]) ])

    // 네비게이션
    const [navi, setNavi] = useState(lodash.cloneDeep(defaults.navi));

    // 푸터
    const [foot, setFoot] = useState(lodash.cloneDeep(defaults.foot));

    const [addingSectionAt, setAddingSectionAt] = useState(NOTADDING); // 1000은 추가하고 있지 않다는 것을 의미.

    // 푸터
    const [openConfirm, setOpenConfirm] = useState(false);
    // 반복 실행되는 useEffect
    useEffect(() => {
        // to report page view
        // ReactGa.initialize('UA-213792742-1');
        // ReactGa.pageview(`/making/${userObj.email}`);
        function repeat(){
            localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
        }
        // 30초에 한번 씩 자동 저장
        let id = setInterval(repeat, 30000);
        return () => clearInterval(id);
    })

    // 처음에 한번만 실행되는 useEffect
    useEffect(() => {
        // 관리하기 페이지에서 state.item으로 내용을 가지고 넘어왔다.
        if(location.state !== undefined){
            if(location.state.newMake){
                setOpen(true);
            }else{
                setLoading(true)
                console.log(location.state);

                const item = location.state.item;
                setContents(item.contents);
                setNavi(item.navi);
                setFoot(item.foot);
                setSetting(item.setting);
                setOpen(false);
                setEditing(true);
                
                setTimeout(() => {
                    setLoading(false);
                },700)
            }
        }else{
            // 로컬스토리지에 저장되어인게 있다면
            if(localStorage.getItem('temp') !== null){
                
                // const cf = window.confirm("작업중이던 페이지가 있습니다. 불러오시겠습니까? 취소 시 이전에 작업하던 내용은 사라집니다.");

                setOpenConfirm(true);

                // if(cf){
                //     const temp = JSON.parse(localStorage.getItem('temp'));
                //     setContents(temp[0]);
                //     setNavi(temp[1]);
                //     setFoot(temp[2]);
                //     setSetting(temp[3]);
                //     setOpen(false);
                //     setEditing(true);
                // }else{
                //     return
                // }
            }else{
                saveLocalStorage();
            }
        }

        setLoad(true);
    },[])

    const contextValue = {
        state: {addingSectionAt, secNum, contents, isPhone, category, setting},
        action : {setAddingSectionAt, setSecNum, setContents, setIsPhone, setCategory, setSetting},
    }

    const saveLocalStorage = () => {
        localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting]));
    }

    const loadLocalStorage = () => {
        setLoading(true);
        const temp = JSON.parse(localStorage.getItem('temp'));
        setContents(temp[0]);
        setNavi(temp[1]);
        setFoot(temp[2]);
        setSetting(temp[3]);
        setOpen(false);
        // setEditing(true);
        setTimeout(() => {
            setLoading(false);
        },1000)
    }

    const sectionsReturn = contents.map((item, index) => {
        return(
            <div style={{width:'100%'}}>
                <NewSection content={item} key={index} index={index} setSecNum={setSecNum} contents={contents} setContents={setContents} full={full} setting={setting}/>
            </div>
        )
    })

    const FTA = () => {
        return(
            <>
            { 
            ( setting.fta.use ) &&
            <div className="fta__container">
                <button className="fta-button" 
                    style={{
                        backgroundColor:`${setting.fta.backgroundColor}`, 
                        width:`${isPhone ? setting.fta.size/2 : setting.fta.size}%`, 
                        borderRadius:`${setting.fta.shape}px`, 
                        border:`${setting.fta.border ? `1px solid ${setting.fta.borderColor}` : 'none'}`,
                        boxShadow:`${setting.fta.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : ''}`
                    }}>
                    <TextAuto 
                        small
                        value={setting.fta.text} 
                        onChange={e => setSetting(produce(setting, draft => {
                            draft.fta.text = e.currentTarget.value;
                        }))}
                        color={setting.fta.color} align="center" />
                </button>
            </div>
            }
            </>
        )
    }

    const saveTo = async () => {
        setLoading(true);

        const urlDatas = await dbService
            .collection("saved-page")
            .where("urlId", "==", setting.urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let urlData = urlDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        const body = {
            contents:contents,
            navi:navi,
            foot:foot,
            setting:setting,
            created:Date.now(),
            makerEmail:userObj.email,
            makingTypeByUser:makingTypeByUser,
            urlId:setting.urlId,
        }

        if(editing){
            // 업데이트 하기
            await dbService.doc(`saved-page/${urlData[0].id}`).update(body);
            // 자동저장 하던 걸 지운다.
            window.localStorage.removeItem("temp");
            
            setTimeout(() => {
                setLoading(false);
                history.push('/#/response');
                history.go();
            },1000)
        }else{
            if(setting.urlId === ''){
                alert("url을 설정해야 합니다.");
                setLoading(false);
            }else if(urlData.length > 0){
                alert("이미 존재하는 url입니다. 다른 url을 사용해주세요.");
                setLoading(false);
            }else{
                await dbService.collection("saved-page").add(body);

                await dbService.collection("urlStores").add({urlId:body.setting.urlId});

                // 자동저장 하던 걸 지운다.
                window.localStorage.removeItem("temp");
                
                setTimeout(() => {
                    setLoading(false);
                    history.push('/#/response');
                    history.go();
                },1000)
            }
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
            <Prompt 
                when={true}
                message="편집내용이 저장되지 않았습니다. 정말로 제작을 그만두시겠습니까?"
            />
           {
               !full &&
               <NavBarInMakePage 
                    history={history} userObj={userObj}
                   full={full} setFull={setFull}
                   isPhone={isPhone} setIsPhone={setIsPhone}
                   nowState={nowState}
                   loading={loading} setLoading={setLoading}
                   navi={navi} foot={foot} setting={setting}
                   saveTo={saveTo} saveLocalStorage={saveLocalStorage}
               />
           }
            <div className="make-page-container" style={{paddingTop:`${full ? '0px' : '60px'}`}}>
                {/* 아래는 제작하는 곳 */}
                {
                    !full && 
                    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', width:'28vw'}}>
                        <div className="make-page-make-space">
                            <OverflowScrolling className='overflow-scrolling'>
                                {/* 제작페이지 메인 */}
                               <NewSectionMake content={contents[secNum]} foot={foot} setFoot={setFoot} navi={navi} setNavi={setNavi} setting={setting} setSetting={setSetting} />
                            </OverflowScrolling>
                        </div>
                        <div className="fake-make">
                        </div>
                    </div>
                }
                {/* 아래는 미리보기 화면 */}
                <div className="make-left-landing" style={{width:`${full ? '100vw' : '72vw'}`}}>
                    <div className="scroll-container" 
                        style={{ 
                            width:`${full ? '100vw' :'70vw'}`,
                            paddingBottom:`${full ? '0px' : '30px'}`
                        }}
                        animate={
                            isPhone ? {
                                width:['80%', '40%'],
                                transition:{
                                    duration:0.3
                                }
                            } : {}
                        }>
                        {/* 실시간으로 바뀌는 모습이 보이는 랜딩페이지 */}
                        {!full && <div className="make-tab-preseen" onClick={() => setSecNum(52)}>
                            <div className="left">
                                <div className="make-tab-circle" style={{marginLeft:'15px'}}></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-one-tab">
                                    <img src={setting.faviconAttachment} className='make-tab-favicon'/>
                                    {setting.title}
                                </div>
                            </div>
                            <div className="right" style={{paddingRight:'23px'}}>
                                <div className="make-tab-url">
                                    https://{setting.urlId}.surfee.co.kr
                                </div>
                            </div>
                        </div>}
                        <div ref={targets} className="make-main-page-container" style={{fontSize:`${smallfont}`, borderRadius:`${isPhone ? '7px' : '0px'}` }}>  
                            
                            {/* 네비게이션 */}
                            {navi.use && <MakeNavigationV2 full={full} navi={navi} setNavi={setNavi} history={history} /> }
                            
                            {/* 섹션 디스플레이 */}
                            
                            {sectionsReturn}

                            {/* 푸터 */}
                            {foot.use && <MakeFooterV2 full={full} history={history} foot={foot} setFoot={setFoot} /> }                             

                            <FTA />
                            {full && <div className="cancel-full-screen" onClick={() => setFull(false)}>
                                전체화면<br/>취소
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 모달 모아두기 */}
            <div>
                <FirstQuestions type={makingTypeByUser} setType={setMakingTypeByUser} open={open} setOpen={setOpen} navi={navi} setNavi={setNavi} editing={editing} setEditing={setEditing} setting={setting} setSetting={setSetting}/>
                <LoadingModal loading={loading} />
            </div>
            <ConfirmCustom open={openConfirm} setOpen={setOpenConfirm} message={<div>제작 중이던 페이지가 있습니다. 불러오시겠습니까? <br /> 취소 시 이전에 작업하던 내용은 사라집니다.</div>} callback={ loadLocalStorage } />
        </MyContext.Provider>
        </> }
        </>)
}

export default MakePageV2
