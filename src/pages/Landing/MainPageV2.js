import React, {useEffect,useRef, useState} from 'react'
import './old/MainPage.css'
import './MainPageV2.css'
import {Link} from 'react-router-dom';
import { dbService } from '../../tools/fbase'
import Footer from '../NavAndFooter/Footer'
import { motion } from "framer-motion"
import AskLoginModal from './tools/AskLoginModal'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import RegisterModal from '../../components/Login/RegisterModal'
import ChannelTalk from '../../tools/ChannelTalk'
import {detect} from 'detect-browser'
import {isMobile} from 'react-device-detect'
import "@lottiefiles/lottie-player";

import {DeveloperBoardOff, Animation, DesignServices} from '@styled-icons/material';
import {DataPie, MobileOptimized} from '@styled-icons/fluentui-system-regular'
import {Template} from '@styled-icons/heroicons-outline';
import {MenuButtonWide} from '@styled-icons/bootstrap';
import {ImageEdit} from '@styled-icons/remix-fill'

import s1 from '../../tools/img/surfee1.png';
import main1 from '../../tools/img/main/main1.png';
import main3 from '../../tools/img/main/main3.gif';
import main4 from '../../tools/img/main/main4.gif';
import main5 from '../../tools/img/main/main5.gif';
import main6 from '../../tools/img/main/main6.gif';

const ourInfos = [
    {
        icon : <DeveloperBoardOff className="func-icon" size="35" />,
        title: '노코드 툴',
        desc : "타이핑과 이미지로만!",
    },
    {
        icon : <DataPie className="func-icon" size="35" />,
        title: '반응형',
        desc : '반응형으로 모바일 랜딩페이지도 한번에!',
    },
    {
        icon : <MobileOptimized className="func-icon" size="35" />,
        title: '데이터 시각화',
        desc : "정량적 데이터를 한눈에!",
    },
    {
        icon : <Animation className="func-icon" size="35" />,
        title: '애니메이션 효과',
        desc : "섹션별 애니메이션 효과도 쉽게",
    },
    { 
        icon : <Template className="func-icon" size="35" />,
        title: '템플릿 제공',
        desc : "멋진 템플릿 디자인 제공",
    },
    {
        icon : <MenuButtonWide className="func-icon" size="35" />,
        title: '옵트인 버튼',
        desc : "랜딩페이지 안에서 데이터 수집도 가능",
    },
    {
        icon : <DesignServices className="func-icon" size="35" />,
        title: '섹션별 커스텀',
        desc : "섹션에 따라 취향대로 커스텀 가능",
    },
    {
        icon : <ImageEdit className="func-icon" size="35" />,
        title: '파비콘 커스텀',
        desc : "아이콘 이미지 커스텀 가능",
    },
];

function MainPageV2({history, isLoggedIn, userObj}) {
    const [email,setEmail] = useState("");
    const [askOpen,setAskOpen] = useState(false);
    const [registerOpen,setRegisterOpen] = useState(false);
    const [loginOpen,setLoginOpen] = useState(false);
    const targets = useRef(null)

    useEffect(() => {
        const browser = detect();
        if(browser.name !== 'chrome' || isMobile){
            alert("본 서비스는 PC 환경과 Chrome 환경에 최적화되어있습니다.")
        }
    },[])
    
    ChannelTalk.boot({
        "pluginKey": "e6b830bc-7731-43fa-8eea-1245d3d4fc3e", //please fill with your plugin key"
    });

    const scrollDown = () => {
        targets.current.scrollIntoView({behavior: 'smooth'})
    }

    const ourInfosTable = ourInfos.map((item, index) => {
        return(
            <span className="main__feature" key={index}>
                <div style={{width:'100%', textAlign:'center'}}>
                    {item.icon}
                </div>
                <div className="main-feature__title">
                    {item.title}
                </div>
                <div className="main-feature__desc">
                    {item.desc}
                </div>
            </span>
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
    
    const moveButton = (top) => {
        return(<>
            {
                isLoggedIn ? 
                <Link to='/response' className="main__button2 uphover">
                    무료로 제작하기
                </Link>:
                <>
                {
                    top === 'top' ?
                    <button className="main__button2 uphover" onClick={() => setAskOpen(true)}>
                        무료로 제작하기
                    </button>:
                    <button className="main__button2 uphover" onClick={() => setAskOpen(true)}>
                        무료로 제작하기
                    </button>
                }
                </>
            }
        </>)
    }
    
    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} buttonOpen />
        <div className="main-page-container">
            <div className="main-page-section1" style={{paddingTop:'30px', marginTop:'50px', flexDirection:'column', background:"linear-gradient(0deg, #6C63FF 0%, #ffffff 100%)"}}>
                <div className="main-section-left-topbottom" style={{color:'black', marginTop:'50px'}}>
                    <span className="one-section-big osb2" style={{textAlign: 'center'}}>
                        '랜딩페이지'를 3분만에 <br/>쉽고 간단하게 제작해 보세요
                    </span>
                    <span className="one-section-small" style={{textAlign: 'center'}}>
                        Surfee와 함께 '타이핑'과 '이미지'로만 <br/>
                        빠르고 간단하게 랜딩페이지를 제작해 보세요
                    </span>
                    {moveButton('top')}
                </div>
                <img src={main1} className="section-one-image-main-topbottom mt30" />
                <span className="one-section-big mt30" style={{textAlign: 'center', fontSize:'1.2em'}}>
                    고객 검증을 위한 '랜딩페이지'제작은<br/>
                    이제 선택이 아닌 필수입니다.
                </span>
            </div>
            <div className="main-page-section1" style={{position:'relative'}}>
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets6.lottiefiles.com/packages/lf20_46tauco6.json"
                    style={{width:'100%', height:'100%', position:'absolute', zIndex:'0'}}
                >
                </lottie-player>
                <div className="one-section-big" style={{color:'var(--main-color)'}}>
                    Surfee?
                </div>
            </div>
            <div className="main-page-section1 bg1">
                <div className="main-section-right">              
                    <img src={main3} className="section-image" />
                </div>
                <div className="main-section-left">
                    <span className="one-section-big" style={{marginTop:`${isMobile ? '30px' : '0px'}`}}>
                        코딩도 디자인도 필요 없는<br/>
                        One-stop 랜딩페이지 제작
                    </span>
                    <span className="one-section-small">
                        개발자 없이도, 외주 없이도 직접<br/>
                        템플릿을 고르고 블로그를 꾸미듯<br/>
                        쉽고 빠르게 랜딩페이지를 만들어 보세요.
                    </span>
                </div>
            </div>
            <div className="main-page-section1">
                <div className="main-section-left">
                    <span className="one-section-big">
                        모바일 환경에서도<br/>
                        불편함 없이, 반응형으로
                    </span>
                    <span className="one-section-small">
                        Surfee를 통해 제작한 랜딩페이지는<br/>
                        모바일 환경에서도 최적화된<br/>
                        반응형으로 제공됩니다.
                    </span>
                </div>
                <div className="main-section-right">              
                    <img src={main4} className="section-image" />
                </div>
            </div>
            <div className="main-page-section1 bg1">
                <div className="main-section-right">              
                    <img src={main5} className="section-image" />
                </div>
                <div className="main-section-left">
                    <span className="one-section-big" style={{marginTop:`${isMobile ? '30px' : '0px'}`}}>
                        잠재 유저 분석을 위한<br/>
                        유저 데이터를 직관적으로!
                    </span>
                    <span className="one-section-small">
                        조회 수, 사용자 수, 전환율(CVR), 유입 채널 등 <br/>
                        고객의 반응을 확인할 수 있는 유의미한 데이터로 <br/>
                        개발자에게 요청할 필요없이 직접 확인해 보세요.
                    </span>
                </div>
            </div>
            <div className="main-page-section1" style={{flexDirection: "column", position:'relative'}}>
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets9.lottiefiles.com/packages/lf20_tkvgymkx.json"
                    style={{transform:'rotate(90deg)', position:'absolute', zIndex:'0', width:'100%', height:'200%'}}
                >
                </lottie-player>
                <span className="one-section-big bt2" style={{textAlign:'center'}}>
                    랜딩페이지를 가장 효율적으로<br/> 제작해 보세요
                </span>
                <span className="one-section-small">
                    Surfee가 제공하는 기능!
                </span>
                <div className="info__table">
                    {ourInfosTable}
                </div>
            </div>
            <div className="main-page-section1 bg1" style={{flexDirection: "column", padding:'50px 0px'}}>
                <span className="one-section-big osb2" style={{textAlign:'center'}}>
                    Surfee와 함께<br/>랜딩페이지를 제작해 보세요.
                </span>
                {moveButton()}
            </div>
        </div>
        <Footer />
        <AskLoginModal open={askOpen} setOpen={setAskOpen} SomeoneClickMoveToMake={SomeoneClickMoveToMake} registerOpen={registerOpen} setRegisterOpen={setRegisterOpen}/>
        <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
        <RegisterModal open={loginOpen} setOpen={setLoginOpen} />
        </>
    )
}

export default MainPageV2