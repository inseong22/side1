import React, {useEffect,useRef, useState} from 'react'
import './old/MainPage.css'
import './MainPageV2.css'
import {Link} from 'react-router-dom';
import { dbService } from '../../tools/fbase'
import Footer from '../NavAndFooter/Footer'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { ToolOutlined, PieChartOutlined, MobileOutlined, GroupOutlined, FormatPainterOutlined, BranchesOutlined, PicLeftOutlined, AlertOutlined, PictureOutlined, FormOutlined } from '@ant-design/icons';
import { motion } from "framer-motion"

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
    const targets = useRef(null)
    // const [scrollPosition, setScrollPosition] = useState(0);

    // const updateScroll = () => {
    //     setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    // }

    useEffect(()=>{
        // window.addEventListener('scroll', updateScroll);
        setInterval(() => {
            // console.log("시작")
            // dbService.collection("test").add({
            //     id:'id'
            // })
            // console.log("끝")
        },1000)
    });

    const sendData = async () => {
        console.log(dbService);
        if(email.length < 4){
            alert("올바른 이메일 양식을 입력해주세요!");
            return;
        }
        await dbService.collection("apply-datas").add({
            email:email,
            created:Date.now(),
        });

        alert("신청되셨습니다. 감사합니다. 빠른 시일내로 연락드리겠습니다.");
        setEmail("");
    }

    const scrollDown = () => {
        targets.current.scrollIntoView({behavior: 'smooth'})
    }

    const ourInfosTable = ourInfos.map((item, index) => {
        return(
            <div className="one-desc-func" index={index}>
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
        console.log("로그인했나?", isLoggedIn)
        if(isLoggedIn === false){
            alert("로그인하셔야 이용가능한 페이지입니다.");
            return
        }else{
            history.push('/#/seeResponse');
            history.go();
            return;
        }
    }

    const SomeoneClickMoveToMake = () => {
        if(userObj !== null){
            dbService.collection('SomeoneClickMoveToMake').add({
                name:userObj.displayName,
                email:userObj.email,
                createdAt: new Date(),
            })
        }else{
            dbService.collection('SomeoneClickMoveToMake').add({
                createdAt: new Date(),
            })
        }
    }

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }

    return (
        <>
        <div className="main-page-container">
            <div className="main-page-section-topbottom" style={{backgroundColor:'white'}}>
                <div className="main-section-left-topbottom" style={{color:'black'}}>
                    <span className="one-section-big-topbottom">
                        '타이핑'과 '이미지'로만<br/>
                        빠르고 간단하게 랜딩페이지를 제작해보세요
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
                {/* <div className="main-section-right-topbottom">                   
                    <img src={section1} className="section-one-image"/>
                </div> */}
            </div>
            <div ref={targets} className="main-page-section-last-v2" style={{backgroundColor:'#c5c2fa'}}>
                <span className="last-one-component-v2">
                    <div className="main-section-last-title-v2">
                        <span>
                        고객 검증을 위한 '랜딩페이지' 제작은<br/>
                        <span style={{color:'#6a63f7', borderBottom:'3px solid #6a63f7'}}>이제 선택이 아닌 필수</span>입니다.
                        </span>
                    </div>
                    <div style={{flexDirection:'row', display:'flex', justifyContent:'center', width:'100%', marginTop:'5%'}}>
                        <div style={{width:'30%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <span>Let's Build Your Page!</span>
                            <Link to="/make" className="apply-button-v2" onClick={() => SomeoneClickMoveToMake()}>제작하러가기</Link>
                        </div>
                        <div style={{width:'30%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <span style={{color:'#6a63f7'}}>이미 제작을 완료하셨다면</span>
                        <Link className="apply-button-v2" onClick={() => checkLoggedIn()} style={{backgroundColor:'#ffffff', color:'#6a63f7'}}>관리하기</Link>   
                        </div>
                    </div>
                </span>
                {/* 
                <span className="last-one-component">
                    <div className="main-section-last-title">
                        지금 당장 필요하지 않다면<br/>쿠폰 받아가세요!
                    </div>
                    <Link to="coupon" onClick={AddLog} className="apply-button" style={{backgroundColor:'rgba(0,0,0,0)', color:'white'}}>
                        할인쿠폰 받으러 가기</Link>
                    
                    <div className="main-section-last-desc">
                        이벤트 기간 : 2021.00.00 ~ 2021.00.00 <br/>
                        사용 가능 기간 : ~ 2022.02.28
                    </div>
                </span> 
                */}
            </div>
        </div>
        <Footer />
        </>
    )
}

export default MainPageV2