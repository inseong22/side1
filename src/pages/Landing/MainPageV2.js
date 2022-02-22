import React, {useEffect,useRef, useState} from 'react'
import './old/MainPage.css'
import './MainPageV2.css'
import {Link} from 'react-router-dom';
import { dbService } from '../../tools/fbase'
import Footer from '../NavAndFooter/Footer'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { ToolOutlined, PieChartOutlined, MobileOutlined, GroupOutlined, FormatPainterOutlined, BranchesOutlined, PicLeftOutlined, AlertOutlined, PictureOutlined, FormOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"
import Icons from '../../components/Make/tools/Icons'
import AskLoginModal from './tools/AskLoginModal'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import LoginModal from '../../components/Login/LoginModal'
import RegisterModal from '../../components/Login/RegisterModal'
import ChannelTalk from '../../tools/ChannelTalk'

import s1 from '../../tools/img/surfee1.png';

const ourInfos = [
    {
        icon : <ToolOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "노코딩 툴",
    },
    {
        icon : <PieChartOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "데이터 시각화",
    },
    {
        icon : <MobileOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "반응형",
    },
    {
        icon : <BranchesOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "도메인 연결",
    },
    { 
        icon : <AlertOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "CTA 제공",
    },
    {
        icon : <PictureOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "favicon 커스텀",
    },
    {
        icon : <FormOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "섹션별 커스텀",
    },
    {
        icon : <PicLeftOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "템플릿 제공",
    },
    {
        icon : <GroupOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "네비바 / 푸터바 커스텀",
    },
    {
        icon : <FormatPainterOutlined className="func-icon" style={{color:'#6a63f7', fontSize:'2em'}}/>,
        desc : "폰트 크기, 색상 변경",
    },
];

function MainPageV2({history, isLoggedIn, userObj}) {
    const [email,setEmail] = useState("");
    const [askOpen,setAskOpen] = useState(false);
    const [registerOpen,setRegisterOpen] = useState(false);
    const [loginOpen,setLoginOpen] = useState(false);
    const targets = useRef(null)
    
    ChannelTalk.boot({
        "pluginKey": "e6b830bc-7731-43fa-8eea-1245d3d4fc3e", //please fill with your plugin key"
    });

    const scrollDown = () => {
        targets.current.scrollIntoView({behavior: 'smooth'})
    }

    const ourInfosTable = ourInfos.map((item, index) => {
        return(
            <div className="one-desc-func" key={index}>
                <div className="func-content">
                    {item.icon}
                </div>
                <div className="func-content">
                    {item.desc}
                </div>
            </div>
        )
    })

    const checkLoggedIn = () => {
        if(isLoggedIn === false){
            alert("로그인하셔야 이용가능한 페이지입니다.");
            setRegisterOpen(true);
        }else{
            history.push('/#/response');
            history.go();
            return;
        }
    }

    const SomeoneClickMoveToMake = async () => {
        const isNew = localStorage.getItem('isNew');
        if(isNew === null){
            localStorage.setItem('isNew', false);
            if(userObj !== null){
                dbService.collection('SomeoneClickMoveToMake').add({
                    name:userObj.displayName,
                    email:userObj.email,
                    new:true,
                    createdAt: new Date(),
                })
            }else{
                dbService.collection('SomeoneClickMoveToMake').add({
                    new:true,
                    createdAt: new Date(),
                })
            }
        }else{
            if(userObj !== null){
                dbService.collection('SomeoneClickMoveToMake').add({
                    name:userObj.displayName,
                    email:userObj.email,
                    new:false,
                    createdAt: new Date(),
                })
            }else{
                dbService.collection('SomeoneClickMoveToMake').add({
                    new:false,
                    createdAt: new Date(),
                })
            }
        }
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }

    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} buttonOpen />
        <div className="main-page-container">
            <div className="main-page-section-topbottom" style={{backgroundColor:'white'}}>
                <div className="main-section-left-topbottom" style={{color:'black'}}>
                    <span className="one-section-big-topbottom">
                        '타이핑'과 '이미지'로만<br/>
                        빠르고 간단하게 랜딩페이지를 제작해 보세요
                        {/* <Icons /> */}
                    </span>
                    {/* <span className="one-section-small">
                    신규 서비스와 이벤트부터 스타트업 아이템 검증까지,<br/>
                    코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해 <br/>
                    최고의 고객 전환율을 경험해 보세요.
                    </span> */}
                    <button className="apply-button-v2" onClick={scrollDown} style={{height:'60px', width:'200px', borderRadius:'30px', marginTop:'20px'}}>
                        무료로 체험하기
                    </button>
                </div>
                <motion.div className="main-section-right-topbottom" 
                    initial="hidden" 
                    animate="visible" 
                    variants={variants}>
                    <img src={s1} className="section-one-image-main-topbottom" />
                </motion.div>
            </div>
            
            <div className="main-page-section-topbottom" style={{backgroundColor:"white"}}>
                <div className="main-section-left-topbottom">
                    <span className="one-section-big-topbottom">
                        랜딩페이지 제작을 가장 효율적으로!
                    </span>
                    <span className="one-section-small-topbottom">
                        <span className="one-desc-card">
                            <div className="card-content">
                                이미지
                            </div>
                            <div className="card-content" style={{fontSize:'2em', fontFamily:'Pretendard-ExtraBold'}}>
                                코딩도 디자인도 필요없는<br/>One-stop 랜딩페이지 제작툴
                            </div>
                            <div className="card-content" style={{color:'rgb(30,30,30)', fontSize:'1.5em'}}>
                                개발자 없이도, 외주 없이도 직접<br/>
                                템플릿을 고르고 블로그를 꾸미듯<br/>
                                쉽고 빠르게 랜딩페이지를 만들어 보세요.
                            </div>
                            <div className="card-content-link">
                                <Link to="" className="card-link">지금 바로 만들기</Link>
                            </div>
                        </span>
                        <span className="one-desc-card">
                            <div className="card-content">
                                이미지
                            </div>
                            <div className="card-content" style={{fontSize:'2em', fontFamily:'Pretendard-ExtraBold'}}>
                                잠재 유저 분석을 위한<br/>유저 데이터를 직관적으로!
                            </div>
                            <div className="card-content" style={{color:'rgb(30,30,30)', fontSize:'1.5em'}}>
                                조회수, 사용자 수, 전환율(CVR), 유입 채널 등<br/>
                                고객의 반응을 확인할 수 있는 유의미한 데이터를<br/>
                                개발자에게 요청할 필요없이 직접 확인해 보세요.
                            </div>
                            <div className="card-content-link">
                                <Link to="" className="card-link">지금 바로 만들기</Link>
                            </div>
                        </span>
                        <span className="one-desc-card">
                            <div className="card-content">
                                이미지
                            </div>
                            <div className="card-content" style={{fontSize:'2em', fontFamily:'Pretendard-ExtraBold'}}>
                                모바일 환경에서도<br/>불편함 없이, 반응형으로!
                            </div>
                            <div className="card-content" style={{color:'rgb(30,30,30)', fontSize:'1.5em'}}>
                                Surfee를 통해 제작한 랜딩페이지는<br/>
                                모바일 환경에서도 최적화된<br/>
                                반응형으로 제공됩니다.
                            </div>
                            <div className="card-content-link">
                                <Link to="" className="card-link">지금 바로 만들기</Link>
                            </div>
                        </span>
                    </span>
                </div>
                {/* <div className="main-section-right-topbottom">                   
                    <img src={section1} className="section-one-image"/>
                </div> */}
            </div>
            <div className="main-page-section-topbottom" style={{backgroundColor:"white", height:'500px'}}>
                <div className="main-section-left-topbottom">
                    <span className="one-section-big-topbottom">
                        Surfee가 제공하는 기능!
                    </span>
                    <span className="one-section-small-topbottom">
                        <div className="info-table">
                            {ourInfosTable}
                        </div>
                    </span>
                </div>
            </div>
            <div ref={targets} className="main-page-section-last-v2">
                <span className="last-one-component-v2 last-card">
                    <div className="main-section-last-title-v2">
                        <span>
                        고객 검증을 위한 '랜딩페이지' 제작은<br/>
                        <span style={{color:'#6a63f7', borderBottom:'3px solid #6a63f7'}}>이제 선택이 아닌 필수</span>입니다.
                        </span>
                    </div>
                    <div style={{flexDirection:'row', display:'flex', justifyContent:'center', width:'100%', marginTop:'5%'}}>
                        <div style={{width:'30%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <span>Let's Build Your Page!</span>
                            <div to="/make" className="apply-button-v2" onClick={() => {
                                if(isLoggedIn){
                                    history.push('/#/response')
                                    history.go()
                                }else{
                                    setAskOpen(true)
                                }}}>제작하러가기</div>
                        </div>
                        <div style={{width:'30%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <span style={{color:'#6a63f7'}}>이미 제작을 완료하셨다면</span>
                        <span className="apply-button-v2" onClick={() => checkLoggedIn()} style={{backgroundColor:'#ffffff', color:'#6a63f7'}}>관리하기</span>   
                        </div>
                    </div>
                </span>
            </div>
        </div>
        <Footer />
        <AskLoginModal open={askOpen} setOpen={setAskOpen} SomeoneClickMoveToMake={SomeoneClickMoveToMake}/>
        <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
        <RegisterModal open={loginOpen} setOpen={setLoginOpen} />
        </>
    )
}

export default MainPageV2