import React, {useEffect, useState, useRef, createRef, useMemo} from 'react'
import './MakePage.css'
import './MakeLanding.css'
// Recoil , Immer JS 적용

import NewSection from '../../components/Make/NewSection'
import NewSectionMake from '../../components/Make/Edit/NewSectionMake'
import NavBarInMakePage from './NavBarInMakePage/NavBarInMakePage'
import MakeNavigationV2 from '../../components/Make/NavBar/MakeNavigationV2'
import MakeFooterV2 from '../../components/Make/Footer/MakeFooterV2'
import LoadingModal from '../../components/Make/Modal/LoadingModal'
import OverflowScrolling from 'react-overflow-scrolling';
import { useLocation, useParams } from 'react-router';
import { base } from '../../components/Make/SectionTypes/baseTypes'
import { defaults } from '../../components/Make/SectionTypes/baseTypes'
import lodash from 'lodash'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {dbService} from '../../tools/fbase'
import { isMobile } from 'react-device-detect';
import {Prompt} from 'react-router-dom';
import produce from 'immer'
import ChannelTalk from '../../tools/ChannelTalk'
import {ButtonEditor} from '../../components/Make/tools/Editor'
import ReactGa from 'react-ga'

export const MyContext = React.createContext({
    state : {},
    action : {}
});

export const MySubContext = React.createContext({
    state : {},
    action : {}
});

// const isPhoneState = atom({
//     key:'isPhoneState',
//     default: false,
// })

const MakePageV2 = ({history, userObj}) => {
    ChannelTalk.boot({
        "pluginKey": "e6b830bc-7731-43fa-8eea-1245d3d4fc3e", //please fill with your plugin key"
    });

    // 데이터 베이스에 저장하지 않고 제작을 위해서만 사용되는 것들.
    const [secNum, setSecNum] = useState(52); // 현재 수정중인 페이지를 의미.
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // 첫 질문을 위한 Open
    const [editingId, setEditingId] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [callback, setCallback] = useState()

    const [isPhone, setIsPhone] = useState(false);
    const [full, setFull] = useState(false);
    const [load, setLoad] = useState(false);
    const [editing, setEditing] = useState(false);
    const [category, setCategory] = useState(0);
    const [focus, setFocus] = useState('');
    const location = useLocation();

    // 메인 세팅
    const [setting, setSetting] = useState(lodash.cloneDeep(defaults.setting));
    // 새로운 세팅
    // local storage 저장을 위한 contents 재설정 - video의 용량 초과 때문에 일단..ㅠ
    const arr = lodash.cloneDeep(base[0])
    delete arr.video.attachment
    const [contents, setContents] = useState([ arr, lodash.cloneDeep(base[1]), lodash.cloneDeep(base[4]), lodash.cloneDeep(base[5]), lodash.cloneDeep(base[6]) ])

    // 네비게이션
    const [navi, setNavi] = useState(lodash.cloneDeep(defaults.navi));

    // 푸터
    const [foot, setFoot] = useState(lodash.cloneDeep(defaults.foot));

    // 푸터
    const [openConfirm, setOpenConfirm] = useState(false);

    // 피드백
    const [feedback, setFeedback] = useState(lodash.cloneDeep(defaults.feedback));
    const elementsRef = useRef([0,1,2,3,4,5,6,8,9,7,10,11,12,13,14,15].map(() => createRef()));

    // 반복 실행되는 useEffect
    useEffect(() => {
        function repeat(){
            saveLocalStorage();
        }
        // 30초에 한번 씩 자동 저장
        let id = setInterval(repeat, 10000);
        return () => clearInterval(id);
    })

    // 처음에 한번만 실행되는 useEffect
    useEffect(() => {
        // to report page view
        ReactGa.initialize('UA-213792742-1');
        ReactGa.pageview(`/make`);
        // 관리하기 페이지에서 state.item으로 내용을 가지고 넘어왔다.
        if(location.state !== undefined){
            if(location.state.now){
                setLoad(false);
                loadLocalStorage()
                setIsPhone(location.state.isPhone)
                setLoad(true);
            }else if(location.state.template){
                getTemplate()
            }else{
                getEdit()
                // saveLocalStorage();
            }
        }else if(location.pathname.length > 10 && location.pathname.split('/')[2]){
            setLoad(true);
            setConfirmMessage(<div>공유받은 템플릿을 사용하겠습니까?</div>)
            setOpenConfirm(true);
            setCallback(() => getTemplateFromUser);
        }else{
            // 로컬스토리지에 저장되어인게 있다면
            if(localStorage.getItem('temp') !== null){
                setConfirmMessage(<div>제작 중이던 페이지가 있습니다. 불러오시겠습니까? <br /> 취소 시 이전에 작업하던 내용은 사라집니다.</div>)
                setOpenConfirm(true);
                setCallback(() => loadLocalStorage);
            }else{
                saveLocalStorage();
            }
            setLoad(true);
        }

    },[])

    const contextValue = {
        state: { secNum, contents, isPhone, category, setting, focus},
        action : {setSecNum, setContents, setIsPhone, setCategory, setSetting, setFocus},
    }

    const contextSubValue = {
        state: { secNum, isPhone, category, focus},
        action : {setSecNum, setIsPhone, setCategory, setFocus},
    }

    const getEdit = async () => {
        setLoading(true)

        const item = location.state.item;

        let ttem

        const ssede = await dbService.doc(`saved-page/${item}`)
            .get()
            .then(snapshot => ttem = {...snapshot.data(), id:snapshot.id});

        console.log(ttem);

        setOpen(false);
        setEditing(true);
        setEditingId(item);
        
        setContents(ttem.contents)
        setNavi(ttem.navi)
        setFoot(ttem.foot)
        setSetting(ttem.setting)
        
        setTimeout(() => {
            setLoad(true);
            setLoading(false);
        },50)
    }

    const getTemplateFromUser = async () => {
        setLoading(true)
        setLoad(false);
        let ttem

        const ssede = await dbService.doc(`saved-page/${location.pathname.split('/')[2]}`)
            .get()
            .then(snapshot => ttem = {...snapshot.data(), id:snapshot.id});
        
        if(!ttem.setting){
            setLoading(false)
            alert("코드에 해당하는 템플릿이 존재하지 않습니다.")
            history.push('/questions')
            history.go()
        }else{
            ttem.setting.urlId = ''
    
            setContents(ttem.contents)
            setNavi(ttem.navi)
            setFoot(ttem.foot)
            setSetting(ttem.setting)
            setTimeout(() => {
                setLoad(true);
                setLoading(false);
            },50)
        }
    }

    const getTemplate = async () => {

        const savedPages = await dbService
            .collection("saved-page")
            .where("urlId", "==", location.state.templateNum)
            .get(); // uid를 creatorId로 줬었으니까.
    
        let savedPage = savedPages.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        let tempSetting = savedPage[0].setting;
        tempSetting.urlId = location.state.urlId

        console.log("여기까지는 왔다", savedPage)

        setContents(savedPage[0].contents)
        setNavi(savedPage[0].navi)
        setFoot(savedPage[0].foot)
        setSetting(tempSetting)
        
        saveLocalStorage();

        setTimeout(() => {
            setLoad(true);
            setLoading(false);
        },50)
    }

    const saveLocalStorage = async () => {
        if(JSON.stringify([contents, navi, foot, setting, editing, editingId]).length > 48000){
            // 임시 방편으로 큰 데이터는 건너뛰도록 조치.
            return
        }else{
            localStorage.setItem('temp', JSON.stringify([contents, navi, foot, setting, editing, editingId]));
        }
    }

    const loadLocalStorage = () => {
        setLoading(true);
        const temp = JSON.parse(localStorage.getItem('temp'));
        setContents(temp[0]);
        setNavi(temp[1]);
        setFoot(temp[2]);
        setSetting(temp[3]);
        setEditing(temp[4]);
        setOpen(false);
        setLoading(false);
    }

    const sectionsReturn = contents.map((item, index) => {
        return(
            <div style={{width:'100%'}}>
                <NewSection setCategory={setCategory} content={item} key={index} index={index} secNum={secNum} isPhone={isPhone} setSecNum={setSecNum} contents={contents} setContents={setContents} full={full} setting={setting}/>
            </div>
        )
    })
    
    // const isScroll = useCallback((scroll)=>{
    //     setScroll(scroll);
    //     if(scroll){
    //         // 스크롤 내리기
    //         scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    //     }
    // },[scroll])

    return (<>
    { isMobile ? 
        <div className="mobile-hide">
            <div>
                본 사이트는 PC환경에 최적화되어있습니다. <br />
                PC로 이동해서 랜딩페이지 제작을 시작해 보세요. 😁
            </div>
        </div> 
        :
    <>
        <MyContext.Provider value={contextValue}>
           <MySubContext.Provider value={contextSubValue}>
            <Prompt 
                when={true}
                message="편집내용이 저장되지 않았을 수 있습니다. 정말로 제작을 그만두시겠습니까?"
            />
               <NavBarInMakePage 
                    editing={editing} editingId={editingId}
                    setEditing={setEditing} setEditingId={setEditingId}
                    history={history} userObj={userObj}
                    full={full} setFull={setFull}
                    isPhone={isPhone} setIsPhone={setIsPhone}
                    loading={loading} setLoading={setLoading}
                    navi={navi} foot={foot} setting={setting} setNavi={setNavi}
                    saveLocalStorage={saveLocalStorage}
               />
            {
            load &&
            <div className="make-page-container" style={{paddingTop:`${full ? '55px' : '60px'}`}}>
                {/* 아래는 제작하는 곳 */}
                {
                    !full && 
                    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', width:'28vw'}}>
                        <div className="make-page-make-space">
                            <OverflowScrolling className='overflow-scrolling' style={{
                                // backgroundColor:`${bgc}`, 
                                // mozTransition: `all 0.3s ease-in`,
                                // webkitTransition: `all ${bgc === 'white' ? 0.7 : 0}s ease-in`,
                                // oTransition: `all 0.3s ease-in`,
                                // transition: `all 0.3s ease-in`,
                                }}>
                                {/* 제작페이지 메인 */}
                               <NewSectionMake elementsRef={elementsRef} content={contents[secNum]} foot={foot} setFoot={setFoot} navi={navi} setNavi={setNavi} setting={setting} setSetting={setSetting} />
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
                            width:`${full ? '100vw' : isPhone ? '26vw' : '70vw'}`,
                        }}>
                        {/* 실시간으로 바뀌는 모습이 보이는 랜딩페이지 */}
                        {(!full && !isPhone) && <div className="make-tab-preseen" onClick={() => setSecNum(52)}>
                            <div className="left">
                                <div className="make-tab-circle" style={{marginLeft:'15px'}}></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-circle"></div>
                                <div className="make-tab-one-tab">
                                    <img src={setting.faviconAttachment} className='make-tab-favicon opacity-hover' onClick={() => {setFocus('setting-favicon'); setCategory(0)}}/>
                                    <span className="opacity-hover" style={{padding:'0px 3px', borderRadius:'2px'}} onClick={() => {setFocus('setting-title'); setCategory(0)}}>
                                        {setting.title}
                                    </span>
                                </div>
                            </div>
                            <div className="right" style={{paddingRight:'23px'}}>
                                <div className="make-tab-url opacity-hover" onClick={() => {setFocus('setting-urlId'); setCategory(0)}}>
                                    https://surfee.co.kr/{setting.urlId}
                                </div>
                            </div>
                        </div>}
                            <div className="make-main-page-container" style={{borderRadius:`${isPhone ? '7px' : '0px'}`,fontSize:`${isPhone ? '22px' : '28px'}` }}>  
                                {/* 네비게이션 */}
                                {navi.use && <MakeNavigationV2 full={full} navi={navi} setNavi={setNavi} history={history} /> }
                                
                                {/* 섹션 디스플레이 */}
                                
                                {contents.map((item, index) => {
                                    return(
                                        <div style={{width:'100%'}}>
                                            <NewSection elementRef={elementsRef.current[index]} setCategory={setCategory} content={item} key={index} index={index} secNum={secNum} isPhone={isPhone} setSecNum={setSecNum} contents={contents} setContents={setContents} full={full} setting={setting}/>
                                        </div>
                                    )
                                })}
                                {/* 푸터 */}
                                {foot.use && 
                                <MakeFooterV2 full={full} history={history} foot={foot} setFoot={setFoot} /> 
                                }                             
                            </div>
                            <>
                            {  ( setting.fta.use ) &&
                            <div className="fta__container" style={{width:`${full ? '100vw' : isPhone ? '26vw' : '70vw'}`, fontSize:`${isPhone ? '22px' : '28px'}`}}>
                                <div className="fta-button"
                                    onClick={() => {setFocus('setting-fab'); setCategory(0); setSecNum(52)}}
                                    style={{
                                        fontFamily: `${setting.smallFont}`,
                                        backgroundColor:`${setting.fta.backgroundColor}`, 
                                        width:`${isPhone ? 93 : setting.fta.size }%`, 
                                        borderRadius:`${setting.fta.shape}px`, 
                                        border:`${setting.fta.border ? `1px solid ${setting.fta.borderColor}` : 'none'}`,
                                        boxShadow:`${setting.fta.shadow ? '2px 2px 5px rgba(0,0,0,0.3)' : ''}`,
                                        fontSize:'0.7em',
                                        color:`${setting.fta.color}`,
                                    }}>
                                    
                                    <div className="alignCenter"
                                        style={{width:'100%', cursor:'default'}}>
                                        <ButtonEditor  
                                            placeholder="플로팅 버튼입니다!"
                                            data={setting.fta.text} 
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setSetting(produce(setting, draft => {
                                                    draft.fta.text = data;
                                                }))
                                            }}
                                            style={{
                                                fontFamily: `${setting.smallFont}`,
                                                resize: 'none'
                                            }}
                                            color={setting.fta.color} align="center" />
                                    </div>
                                </div>
                            </div> }
                            </>
                        </div>
                    </div>
                </div>
            }
            {/* 모달 모아두기 */}
            <div>
                {/* <FirstQuestions saveLocalStorage={saveLocalStorage} setContents={setContents} history={history} foot={foot} setFoot={setFoot} type={makingTypeByUser} setType={setMakingTypeByUser} open={open} setOpen={setOpen} navi={navi} setNavi={setNavi} editing={editing} setEditing={setEditing} setting={setting} setSetting={setSetting} setIsPhone={setIsPhone}/> */}
                <LoadingModal loading={loading} />
            </div>
            <ConfirmCustom open={openConfirm} setOpen={setOpenConfirm} message={confirmMessage} callback={ callback } />
        </MySubContext.Provider>
        </MyContext.Provider>
    </> }
    </>)
}

export default MakePageV2
