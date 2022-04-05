import React, {useEffect,useRef, useState} from 'react'
import './old/MainPage.css'
import './MainPageV3.css'
import {Link} from 'react-router-dom';
import Footer from '../NavAndFooter/Footer'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import AskLoginModal from './tools/AskLoginModal'
import RegisterModal from '../../components/Login/RegisterModal'
import ChannelTalk from '../../tools/ChannelTalk'
import {detect} from 'detect-browser'
import {isMobile} from 'react-device-detect'
import {LandingPageExamples} from '../ExamplePage/ExamplePage'
import {ExampleCard} from '../ExamplePage/ExamplePage'
import styled from 'styled-components'
import LandingTemplates from '../../components/Landing/LandingTemplates'
import ChoiceModal from '../../components/Landing/ChoiceModal'
import "@lottiefiles/lottie-player";

import mainpc from '../../tools/img/main/mainpc.webp';
import mainmobile from '../../tools/img/main/mainmobile.webp';
import ddaom from '../../tools/img/main/ddaom.png';
import vote from '../../tools/img/main/vote.png';

const Tc = styled('span')`
    color:#6c63ff;
`;

const FCard = styled('div')`
    background: rgba(108, 99, 255, 0.1);
    border: 1px solid rgba(108, 99, 255, 0.25);
    box-sizing: border-box;
    border-radius: 6px;
    width:${isMobile ? '90vw' : '27vw'};
    height:500px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin:20px 30px;
    font-family:Pretendard;
    padding:22px;
`

function MainPageV3({history, isLoggedIn, userObj}) {
    const [askOpen,setAskOpen] = useState(false);
    const [choiceOpen,setChoiceOpen] = useState(false);
    const [registerOpen,setRegisterOpen] = useState(false);
    const [commentory, setCommentory] = useState(0);

    useEffect(() => {
        const browser = detect();
        if(browser.name !== 'chrome' || isMobile){
            alert("본 서비스는 PC 환경과 Chrome 환경에 최적화되어있습니다.")
        }
    },[])
    
    ChannelTalk.boot({
        "pluginKey": "e6b830bc-7731-43fa-8eea-1245d3d4fc3e", //please fill with your plugin key"
    });

    const SomeoneClickMoveToMake = async () => {

    }

    const moveWhiteButton = () => {
        return(<div className="main-button__container">
            {
                isMobile ? 
                <button className="main__button6 uphover" onClick={() => alert('죄송합니다. Surfee는 PC 환경에서만 이용할 수 있습니다.')}>
                    지금 바로 시작하기
                </button>
                :
                isLoggedIn ? 
                <>
                    <Link to='/response' className="main__button6 uphover">
                        지금 바로 시작하기
                    </Link>
                    <button className="main__button5 uphover" 
                        style={{padding:'18px 30px'}} 
                        onClick={() => setChoiceOpen(true)}>
                        더 쉽게 시작하기
                    </button>
                </>
                :
                <>
                    <button className="main__button6 uphover" onClick={() => setAskOpen(true)}>
                        지금 바로 시작하기
                    </button>
                    <button className="main__button5 uphover" 
                        style={{padding:'18px 30px'}} 
                        onClick={() => setChoiceOpen(true)}>
                        더 쉽게 시작하기
                    </button>
                </>
            }
        </div>)
    }
    
    const moveButton = (top) => {
        return(<div className="main-button__container">
            {
                isMobile ? 
                <>
                    <button className="main__button4 uphover" onClick={() => alert('죄송합니다. Surfee는 PC 환경에서만 이용할 수 있습니다.')}>
                        시작하기
                    </button>
                    {/* <Link to='/surfeeintro' className="main__button3 uphover">
                        Surfee란?
                    </Link> */}
                </>
                :
                isLoggedIn ? 
                <>
                    <Link to='/response' className="main__button4 uphover">
                        지금 바로 시작하기
                    </Link>
                    <button className="main__button5 uphover" 
                        style={{padding:'18px 30px'}} 
                        onClick={() => setChoiceOpen(true)}>
                        더 쉽게 시작하기
                    </button>
                </>
                :
                <>
                    <button className="main__button4 uphover" onClick={() => setAskOpen(true)}>
                        지금 바로 시작하기
                    </button>
                    <button className="main__button5 uphover" 
                        style={{padding:'18px 30px'}} 
                        onClick={() => setChoiceOpen(true)}>
                        더 쉽게 시작하기
                    </button>
                </>
            }
        </div>)
    }

    const nextComment = () => {
        if(commentory === 0){
            setCommentory(1)
        }else{
            setCommentory(0)
        }
    }
    
    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} buttonOpen />
        <div className="main-page-container">
            {
                isMobile ?
                <div className="main-page-section1" style={{ padding:'30px 20px 0px 20px', marginTop:'50px', flexDirection:'column' }}>
                    <div className="main-section-left-topbottom" style={{color:'black', textAlign: 'left', marginTop:'10px'}}>
                        <h1 className="one-section-big osb2" style={{fontSize:'1.7em', textAlign: 'left'}}>
                            코딩없이<br/>나만의 <Tc>홍보페이지</Tc> 만들기
                        </h1>
                        <span style={{fontWeight:'500', fontSize:'19px', width:'100%', marginTop:'18px'}}>
                            당신이 원하는 대로 <br/>
                            어떤 페이지든 커스텀 해보세요.
                        </span>
                    </div>
                    <div className="centero" style={{position:'relative', width:'100%', height:'50vh', marginTop:'25px'}}>
                        <img src={mainmobile} style={{width:'100vw', position:'absolute', zIndex:0}}/>
                        <div className="centero" style={{zIndex:1, textAlign:'center', marginTop:'-60px', flexDirection:'column'}}>
                            {moveButton('top')}
                            <div style={{fontSize:'0.6em', marginTop:'5px'}}>
                                현재는 베타 서비스 기간이며,<br/>모든 서비스가 <span style={{fontWeight:'700'}}>무료</span>입니다.
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="main-page-section1" style={{ paddingTop:'30px', marginTop:'50px', flexDirection:'column' }}>
                    <div className="main-section-left-topbottom" style={{color:'black', marginTop:'50px'}}>
                        <h1 className="one-section-big osb2" style={{textAlign: 'center', fontSize:'1.7em'}}>
                            코딩없이 나만의 <span className="font-gradient-main">홍보페이지</span> 만들기
                        </h1>
                    </div>
                    <div className="centero" style={{position:'relative', width:'100%', height:'100vh', marginTop:'25px'}}>
                        <img src={mainpc} style={{width:'80%', position:'absolute', zIndex:0}}/>
                        <div className="centero" style={{zIndex:1, textAlign:'center', marginTop:'-150px', flexDirection:'column'}}>
                            <div style={{fontWeight:'600'}}>
                                당신이 <Tc>원하는 대로</Tc> <br/>
                                어떤 페이지든 커스텀 해보세요.
                            </div>
                            {moveButton('top')}
                            <div style={{fontSize:'0.6em', marginTop:'2vh'}}>
                                현재는 베타 서비스 기간이며, 모든 서비스가 <span style={{fontWeight:'700'}}>무료</span>입니다.
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="main-page-section1" style={{padding:'30px 0px', flexDirection:'column'}}>
                <div className="main-section-left-topbottom" style={{color:'black', margin:'10px 0px'}}>
                    <span className="one-section-big2 osb2" style={{textAlign: 'center'}}>
                        <span style={{color:'#6c63ff'}}>Surfee</span>로 이렇게도 만들 수 있어요
                    </span>
                    <span className="one-section-small2" style={{textAlign: 'center', fontSize:`${isMobile ? '0.9em' : '0.6em'}`}}>
                        아래는 실제로 Surfee를 사용한 예시예요.<br/>이미지를 클릭하여 전체 페이지를 구경해 보세요.
                    </span>
                </div>
                <LandingPageExamples />
            </div>
            <div className="main-page-section1" style={{
                    flexDirection: "column", 
                    position:'relative', 
                    boxSizing:'border-box', 
                    backgroundColor:'#E8E7FF',
                    position:'relative',
                    height:`${isMobile ? '300px' : '400px'}`,
                    marginTop:'10vh',
                }}>
                <img src={ddaom} style={{position:'absolute', left:'10vw', top:'50px', width:'120px', zIndex:'0'}} />
                <span className="slide__next-button" style={{left:'4vw'}} onClick={nextComment}>
                    〈
                </span>
                <span className="slide__next-button" style={{right:'4vw'}} onClick={nextComment}>
                    〉
                </span>
                {
                    commentory === 0 &&
                    <>
                        {
                        isMobile ? 
                        <div style={{textAlign:'left', fontSize:'15px', zIndex:'1'}}>
                            <div style={{fontWeight:'600', fontFamily:'Pretendard', lineHeight:'1.5rem'}}>
                                코딩 없이 실험하고, 아이디어를 검증하고,<br/>
                                이벤트를 구현하여 주도적으로 성과를 내는 마케터가<br/>
                                되고 싶다면 Surfee를 추천드립니다.<br/>
                                Surfee는 <span style={{color:'#6c63ff'}}>아이디어를 가볍고 빠르게 실행할 수 있도록<br/>
                                도와주는 무기</span>가 되어 줄 것입니다.<br/>
                                <br/>
                            </div>
                            <div style={{color:'rgba(0,0,0,0.4)', fontSize:`13px`}}>
                                퍼블리(PUBLY), 퍼블리 멤버십 Lead marketer, 여인애
                            </div>
                        </div>
                        :
                        <div style={{textAlign:'center', fontSize:'22px', zIndex:'1'}}>
                            <div style={{fontWeight:'600', fontFamily:'Pretendard', lineHeight:'2rem'}}>
                                코딩 없이 실험하고, 아이디어를 검증하고, 이벤트를 구현하여<br/>
                                주도적으로 성과를 내는 마케터가 되고 싶다면 Surfee를 추천드립니다.<br/>
                                Surfee는 <span style={{color:'#6c63ff'}}>아이디어를 가볍고 빠르게 실행할 수 있도록 도와주는 무기</span>가 되어 줄 것입니다.<br/>
                                <br/>
                            </div>
                            <div style={{color:'rgba(0,0,0,0.4)', fontSize:`20px`}}>
                                퍼블리(PUBLY), 퍼블리 멤버십 Lead marketer, 여인애
                            </div>
                        </div>
                        }
                    </>
                }
                {
                    commentory === 1 && 
                    <>
                        {
                        isMobile ? 
                            <div style={{textAlign:'left', fontSize:'15px', zIndex:'1'}}>
                                <div style={{fontWeight:'600', fontFamily:'Pretendard', lineHeight:'1.5rem'}}>
                                    스몰브랜드를 시작하는 단계에서 홈페이지를 구축한다는 게<br/>
                                    비용과 관리에서 큰 부담이었어요.<br/>
                                    Surfee의 <Tc>직관적인 디자인과 템플릿</Tc> 덕분에<br/>
                                    오잔디 페이지를 쉽게 제작할 수 있었어요.<br/>
                                    시즌별 이벤트 페이지, 신규 제품 페이지 등으로도 딱이라<br/>
                                    <Tc>스몰브랜드를 운영하시는 분들</Tc>께 적극 추천합니다.
                                </div>
                                <div style={{color:'rgba(0,0,0,0.4)', fontSize:'13px', marginTop:'40px'}}>
                                    오잔디(OhJandi), 브랜드 디렉터, 한스
                                </div>
                            </div>
                            :
                            <div style={{textAlign:'center', fontSize:'22px', zIndex:'1'}}>
                                <div style={{fontWeight:'600', fontFamily:'Pretendard', lineHeight:'2rem'}}>
                                스몰브랜드를 시작하는 단계에서 홈페이지를 구축한다는 게 비용과 관리에서 큰 부담이었어요.<br/>
                                Surfee의 <Tc>직관적인 디자인과 템플릿</Tc> 덕분에 오잔디 페이지를 쉽게 제작할 수 있었어요.<br/>
                                시즌별 이벤트 페이지, 신규 제품 페이지 등으로도 딱이라<br/>
                                <Tc>스몰브랜드를 운영하시는 분들</Tc>께 적극 추천합니다.
                                </div>
                                <div style={{color:'rgba(0,0,0,0.4)', fontSize:'20px', marginTop:'40px'}}>
                                    오잔디(OhJandi), 브랜드 디렉터, 한스
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
            <div className="main-page-section1" style={{padding:`${isMobile ? '50px 0px' : '130px 0px'}`, flexDirection:'column'}}>
                <div className="main-section-left-topbottom" style={{color:'black', margin:'10px 0px'}}>
                    <span className="one-section-big2 osb2" style={{textAlign: 'center'}}>
                        이런 상황에서 <Tc>Surfee</Tc>를 활용해 보세요
                    </span>
                    <span className="one-section-small2" style={{textAlign: 'center', fontSize:`${isMobile ? '1em' : '0.6em'}`}}>
                        상황별 템플릿을 골라 바로 제작을 시작할 수 있어요.
                    </span>
                </div>
                <LandingTemplates />
            </div>
            <div className="main-page-section1" style={{padding:'30px 0px', flexDirection:'column'}}>
                <div className="main-section-left-topbottom" style={{color:'black', margin:'15px 0px'}}>
                    <span className="one-section-big2 osb2" style={{textAlign: 'center'}}>
                        왜 <span style={{color:'#6c63ff'}}>Surfee</span>를 써야할까요?
                    </span>
                </div>
                <div style={{display:'flex', flexDirection:`${isMobile ? 'column' : 'row'}`}}>
                    <FCard>
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="https://s3.amazonaws.com/cdnl.iconscout.com/lottie/premium/original/3264482.json?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4VMJAKC54WWWCYMY%2F20220405%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220405T025014Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Signature=ea14eb82c200b446efc9d05ea8493a54c8d229021800f9cc02266bb6f1b7e232"
                            style={{width:'90%'}}
                        >
                        </lottie-player>
                        <div style={{fontSize:'28px', fontWeight:'700'}}>
                            이보다 쉽고 빠를 수 없어요
                        </div>
                        <div style={{fontSize:'16px', marginTop:'20px', lineHeight:'1.5rem'}}>
                            ✔️ 5가지 질문에 따른 맞춤형 템플릿<br/>
                            ✔️ 완성된 템플릿 목록으로도 시작 가능<br/>
                            ✔️ PC/모바일 하나만 만들면 나머지가 자동으로!
                        </div>
                    </FCard>
                    <FCard>
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="https://s3.amazonaws.com/cdnl.iconscout.com/lottie/premium/original/3264485.json?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4VMJAKC54WWWCYMY%2F20220405%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220405T025018Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Signature=b7a206467d98ee79249126cd4bd5037c505373d3678d755536a44213a3cba89c"
                            style={{width:'90%'}}
                        >
                        </lottie-player>
                        <div style={{fontSize:'28px', fontWeight:'700'}}>
                            새로운 방식의 신청폼
                        </div>
                        <div style={{fontSize:'16px', marginTop:'20px', lineHeight:'1.5rem'}}>
                            ✔️ 글만 쓰기는 아쉽지 않나요?<br/>
                            ✔️ 이미지, 동영상, FAQ등 자유로운 신청폼!<br/>
                            ✔️ 신청폼으로 받은 목록도 실시간으로 확인하세요.
                        </div>
                    </FCard>
                    <FCard>
                        <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="https://s3.amazonaws.com/cdnl.iconscout.com/lottie/premium/original/3264479.json?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4VMJAKC54WWWCYMY%2F20220405%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220405T025022Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Signature=faf2e00d13c282551059216c032ceb407ef10fd2a1f333e519ba911a4751f013"
                            style={{width:'90%'}}
                        >
                        </lottie-player>
                        <div style={{fontSize:'28px', fontWeight:'700'}}>
                            데이터 한눈에 확인하기
                        </div>
                        <div style={{fontSize:'16px', marginTop:'20px', lineHeight:'1.5rem'}}>
                            ✔️ 구글 애널리틱스? Surfee면 충분해요.<br/>
                            ✔️ 유입 수, 클릭 수, 전환율 등 핵심만 딱!<br/>
                            ✔️ 폼으로 받은 신청 목록을 엑셀로 다운받으세요.
                        </div>
                    </FCard>
                </div>
            </div>
            {
                isMobile ? 
                <div className="main-page-section1 back-image-fit" style={{ color:'white', background:'linear-gradient(180deg, #B0A4FF 0%, #6C63FF 100%)', flexDirection: "column", padding:'50px 0px'}}>
                    <span className="one-section-big osb2" style={{textAlign:'center'}}>
                        코딩 없이 나만의 홍보페이지 만들기,<br/>
                        Surfee와 함께 지금 바로 시작하세요!
                    </span>
                    {moveWhiteButton()}
                    <div style={{fontSize:'0.7em', marginTop:'1.5vh', zIndex:'2'}}>
                        현재는 베타 서비스 기간이며, 모든 서비스가 <span style={{fontWeight:'700'}}>무료</span>입니다.
                    </div>
                </div>
                :
                <div className="main-page-section1 back-image-fit" style={{ color:'white', background:'linear-gradient(180deg, #B0A4FF 0%, #6C63FF 100%)', flexDirection: "column", padding:'90px 0px'}}>
                    <span className="one-section-big osb2" style={{textAlign:'center'}}>
                        코딩 없이 나만의 홍보페이지 만들기,<br/>
                        Surfee와 함께 지금 바로 시작하세요!
                    </span>
                    {moveWhiteButton()}
                    <div style={{fontSize:'0.7em', marginTop:'3.5vh', zIndex:'2'}}>
                        현재는 베타 서비스 기간이며, 모든 서비스가 <span style={{fontWeight:'700'}}>무료</span>입니다.
                    </div>
                </div>
            }
            <div className="main-page-section1">
                {
                    !isMobile &&
                    <div className="main-section-right">              
                        <img src={vote} className="section-image" />
                    </div>
                }
                {
                    isMobile ?
                    <div className="main-section-left">
                        <span className="one-section-big" style={{marginTop:'30px', fontSize:'26px', textAlign:'left'}}>
                            <span style={{color:'#6c63ff'}}>Surfee</span>가 나아갈 방향을<br/> 함께 정해주세요
                        </span>
                        <span className="one-section-small" style={{fontSize:'14px', marginTop:'15px', textAlign:'left'}}>
                            Surfee의 소중한 유저분들의 의견을 바탕으로<br/>
                            앞으로 업데이트 할 기능을 정하고자 합니다.<br/>
                            추가되었으면 하는 기능에 투표해 주세요 🗳
                        </span>
                        <button onClick={() => alert('죄송합니다. 해당 페이지는 PC로 접속하셔야 이용가능합니다.')} className="main__button5 uphover" style={{marginTop:'20px'}}>
                            투표하러 가기
                        </button>
                    </div>
                    :
                    <div className="main-section-left">
                        <span className="one-section-big" style={{marginTop:'30px', fontSize:'32px'}}>
                            <span style={{color:'#6c63ff'}}>Surfee</span>가 나아갈 방향을 함께 정해주세요
                        </span>
                        <span className="one-section-small" style={{fontSize:'18px', marginTop:'15px'}}>
                            Surfee의 소중한 유저분들의 의견을 바탕으로<br/>
                            앞으로 업데이트 할 기능을 정하고자 합니다.<br/>
                            추가되었으면 하는 기능에 투표해 주세요 🗳
                        </span>
                        <Link to='/vote' className="main__button5 uphover" style={{marginTop:'20px'}}>
                            투표하러 가기
                        </Link>
                    </div>
                }
            </div>
            <div className="main-page-section1" style={{ color:'white', flexDirection: "column"}}>
                <div style={{width:'84%', height:'90%', backgroundColor:'#6c63ff33', borderRadius:'6px', color:'black', padding:'50px 0px', textAlign:'center'}}>
                    {
                        isMobile ?
                        <span className="one-section-big osb2" style={{textAlign:'center', fontSize:'1.2em'}}>
                            Surfee와 Surfee를 만든 사람들이<br/> 궁금하신가요?<br/>
                        </span>
                        :
                        <span className="one-section-big osb2" style={{textAlign:'center', fontSize:'1.2em'}}>
                            Surfee와 Surfee를 만든 사람들이 궁금하신가요?<br/>
                        </span>
                    }
                    <div style={{marginTop:'30px', fontSize:'0.8em'}}>
                        저희의 이야기를 읽고, 당신의 이야기도 들려주세요.
                    </div>
                    <div className="underline-hover" onClick={() => {
                        window.open(
                            'https://striped-cabin-4bf.notion.site/Surfee-903d24edba264a9e9a8245803f11db11',
                            '_blank'
                        )
                    }} style={{fontSize:'0.7em', marginTop:'3.5vh', zIndex:'2', color:'#6c63ff'}}>
                        > Surfee에 대해서 자세히 알아보기
                    </div>
                </div>
            </div>
            <div className="main-page-section1" style={{ color:'white', flexDirection: "column", padding:'10px 0px 5% 0px'}}>
                <div style={{width:'84%', height:'90%', color:'black', padding:'10px 0px', textAlign:'left'}}>
                    <div className="one-section-big osb2" style={{textAlign:'left', fontSize:'1.2em', marginBottom:'50px'}}>
                        자주 묻는 질문
                    </div>
                    <div style={{fontSize:'0.6em'}}>
                        <div style={{borderBottom:'1px solid rgba(0,0,0,0.3)'}}>
                            <div className="main-q">
                                정말 무료인가요?
                            </div>
                            <div className="main-a">
                                네, <span style={{color:'rgba(255,0,0,1)'}}>완전 무료</span>입니다!<br/>
                                현재 베타 서비스이기 때문에 금액적인 비용 대신, Surfee를 빠르게 개선해서 
                                더 좋은 퀄리티의 서비스로 여러분에게 도움이 되고자 <span style={{color:'#6c63ff'}}>첫 배포 시 ‘피드백'</span>을 배포 비용으로 받고 있습니다. 
                                여러분의 정성스러운 피드백을 바탕으로 빠르게 업데이트 해오겠습니다. 유료 버전 추가 시 미리 안내 메일을 드리고, 
                                쿠폰도 함께 드릴 예정이니 지금은 편하게 맘껏 써주세요 :)
                            </div>
                        </div>
                        <div style={{borderBottom:'1px solid rgba(0,0,0,0.3)'}}>
                            <div className="main-q">
                                개인 도메인을 연결하고 싶어요.
                            </div>
                            <div className="main-a">
                                아쉽게도 현재는 불가능하지만, 꼭 업데이트 하고자 하는 기능입니다. 빠른 시일 내에 업데이트 할 수 있도록 노력하겠습니다.
                                개발자가 열심히 방법을 찾고 있는 중인데, 혹시 작은 도움이라도 주실 수 있다면 연락 부탁드려요 😊
                            </div>
                        </div>
                        <div style={{borderBottom:'1px solid rgba(0,0,0,0.3)'}}>
                            <div className="main-q">
                                팀원들과 페이지 수정 및 데이터 확인을 공유할 수 없을까요?
                            </div>
                            <div className="main-a">
                                ‘이 템플릿 공유하기' 기능을 통해서 페이지를 복제하여 추가로 수정할 수는 있지만, 실시간으로 동시에 수정할 수는 없습니다. 또한 한 페이지에 공유 링크는 하나뿐이며, 실시간 수정이 반영됩니다. 공유하기 버튼을 누른 시점 버전으로 공유되는 것이 아니니 유의해 주세요.
                                공유를 원하신다면 팀 공동 계정으로 페이지를 만들어 수정 및 데이터 확인을 하실 수 있습니다. 한 계정에서 동시에 수정하면 오류가 있을 수 있으니 주의해 주세요.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        <ChoiceModal open={choiceOpen} setOpen={setChoiceOpen} />
        <AskLoginModal open={askOpen} setOpen={setAskOpen} SomeoneClickMoveToMake={SomeoneClickMoveToMake} registerOpen={registerOpen} setRegisterOpen={setRegisterOpen}/>
        <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
        {/* <RegisterModal open={loginOpen} setOpen={setLoginOpen} /> */}
        </>
    )
}

export default MainPageV3