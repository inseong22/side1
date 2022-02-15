import React, {useEffect,useRef, useState} from 'react'
import './MainPage.css'
import {Link} from 'react-router-dom';
import { dbService } from '../../../tools/fbase';
import NavBar from '../../NavAndFooter/NavBar/NavBar'
import Footer from '../../NavAndFooter/Footer'

import section1 from '../../../tools/img/001.png';
import section0 from '../../../tools/img/005.png';
import section2 from '../../../tools/img/003.png';

import {Input} from 'antd'

function MainPage({history}) {
    const [email,setEmail] = useState("");
    const targets = useRef(null)

    useEffect(() => {
    },[])

    const sendData = async () => {
        console.log(dbService);
        if(email.length < 4){
            alert("올바른 이메일 양식을 입력해 주세요!");
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

    return (
        <>
        <div className="main-page-container">
            <NavBar history={history}/>
            <div className="main-page-section" style={{backgroundColor:'#6B63F7'}}>
                <div className="main-section-left" style={{color:'white'}}>
                    <span className="one-section-big">
                        랜딩페이지 제작부터<br/>
                        데이터 분석까지<br/>
                        빠르고 간단하게
                    </span>
                    <span className="one-section-small">
                    신규 서비스와 이벤트부터 스타트업 아이템 검증까지,<br/>
                    코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해 <br/>
                    최고의 고객 전환율을 경험해 보세요.
                    </span>
                    <button className="apply-button" onClick={scrollDown} style={{height:'60px', width:'200px', borderRadius:'10px', marginTop:'20px'}}>
                        지금 바로 시작하기
                    </button>
                </div>
                <div className="main-section-right">              
                    <img src={section0} className="section-one-image-main" />
                </div>
            </div>
            
            <div className="main-page-section" style={{backgroundColor:"white"}}>
                <div className="main-section-left">
                    <span className="one-section-big">
                        코딩도 디자인도 필요없이<br/>One-stop으로<br/>랜딩페이지 제작하기
                    </span>
                    <span className="one-section-small">
                        개발자 없이도, 외주 없이도 직접<br/>
                        템플릿을 고르고 블로그를 꾸미듯<br/>
                        쉽고 빠르게 랜딩페이지를 만들어 보세요.
                    </span>
                </div>
                <div className="main-section-right">                   
                    <img src={section1} className="section-one-image"/>
                </div>
            </div>
            <div className="main-page-section2" style={{backgroundColor:"white"}}>
                <div className="main-section-right">
                    <img src={section2} className="section-one-image"/>
                </div>
                <div className="main-section-left">
                    <div className="middle-section">
                        <span className="one-section-big">
                        최적의 전환율을 위한 <br/>
                        데이터 분석 자료를<br/>
                        실시간으로 확인하기
                        </span>
                        <span className="one-section-small">
                        조회수, 사용자 수, 전환율(CVR), 유입 채널 등<br/>
                        고객의 반응을 확인할 수 있는 유의미한 데이터를<br/>
                        개발자에게 요청할 필요없이 직접 확인해 보세요.
                        </span>
                    </div>  
                </div>
            </div>
            {/* <div className="main-page-section" style={{backgroundColor:"white"}}>
                <div className="main-section-left">
                    <div className="middle-section">
                        <span className="one-section-big">
                            제작부터 데이터 분석까지<br/>9,990원의<br/>합리적인 가격으로
                        </span>
                        <span className="one-section-small">
                            9,900원에 일주일 무료<br/>
                            이후 하루마다 단돈 500원이 추가되는<br/>
                            합리적인 가격으로 만나 보세요.
                        </span>
                    </div>
                </div>
                <div className="main-section-right">                   
                    <img src={section3}  className="section-one-image"/>
                </div>
            </div> */}
            <div ref={targets} className="main-page-section-last" style={{backgroundColor:'#6B63F7'}}>
                <span className="last-one-component" style={{width:'50%'}}>
                    <div className="main-section-last-title">
                        One-stop 랜딩페이지 제작 툴,<br/>
                        가장 먼저 이용해 보세요
                    </div>
                    <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일을 입력하세요." className="input-text"/>
                    <button className="apply-button" onClick={sendData}>사전신청하고 혜택받기</button>
                    <div className="main-section-last-desc">
                        사전신청하신 분들에겐 오픈 시 사용 가능한<br/>일주일 무료 이용권이 제공됩니다.
                        {/* <br/> <p style={{color:'rgb(30,30,30)', fontFamily:'OTWelcomeBA'}}>기간 : 21.11.20 ~ 21.12.20</p> */}
                    </div>
                </span>
                {/* <span className="last-one-component">
                    <div className="main-section-last-title">
                        지금 당장 필요하지 않다면<br/>쿠폰 받아가세요!
                    </div>
                    <Link to="coupon" onClick={AddLog} className="apply-button" style={{backgroundColor:'rgba(0,0,0,0)', color:'white'}}>
                        할인쿠폰 받으러 가기</Link>
                    
                    <div className="main-section-last-desc">
                        이벤트 기간 : 2021.00.00 ~ 2021.00.00 <br/>
                        사용 가능 기간 : ~ 2022.02.28
                    </div>
                </span> */}
            </div>
            {/* <div className="main-page-section-last" style={{backgroundColor:'white', color:'black'}}>
                <span className="last-one-component" style={{width:'100%'}}>
                    <div>
                        여기에 뭐 설명같은거
                    </div>
                </span>
            </div> */}
        </div>
            <Footer />
           </>
    )
}

export default MainPage