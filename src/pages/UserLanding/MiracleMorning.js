import React, {useEffect,useRef, useState} from 'react'
import './MiracleMorning.css'
import {Link} from 'react-router-dom';
// import { dbService } from '../../../tools/fbase';
import NavBar from './NavAndFooter/NavBar'
import Footer from './NavAndFooter/Footer'
import {dbService} from '../../tools/fbase'
import { isMobile } from 'react-device-detect';

import section1 from './NavAndFooter/001.jpeg'
import section2 from './NavAndFooter/002.jpeg'
import section3 from './NavAndFooter/003.png'

import {Input} from 'antd'

function MiracleMorning({history}) {
    const [email,setEmail] = useState("");
    const targets = useRef(null)

    const sendData = async () => {
        if(email.length < 4){
            alert("올바른 이메일 양식을 입력해주세요!");
            return;
        }

        await dbService.collection("miracle-morning").add({
            email:email,
            created:Date.now(),
        });

        alert("신청되셨습니다. 감사합니다.");
        setEmail("");
    }

    const scrollDown = () => {
        window.scrollTo(0,document.body.scrollHeight-200)
    }

    return (
        <>
        { true ? 
        <>
        <div className="main-page-container22" style={{paddingTop:'60px'}}>
            <NavBar scrollDown={scrollDown}/>
            <div className="main-page-section1 bgc1" style={{backgroundColor:'black', flexDirection:'column', padding:'3% 0%'}}>
                <div className="main-section-right">              
                    <img src={section1} className="section-image2"/>
                </div>
                <div className="main-section-left" style={{justifyContent:'center', color:'white'}}>
                    <span className="one-section-big" style={{ textAlign:'center', width:'100%'}}>
                        나만의 시간을 만드는 마법,<br/>
                        LIFE CEO 미라클 모닝
                    </span>
                    <span className="one-section-small" style={{textAlign:'center', width:'100%'}}>
                        덜 피곤한데 내 시간은 늘어나는 미라클 모닝 함께 하실래요? <br/>
                        이 모임은 무료로 참여 가능합니다. <br/>
                        하지만 얻을 수 있는 가치는 무료가 아니죠.
                    </span>
                    <div style={{justifyContent:'center', width:'100%', display:'flex', alignItems:'center', color:'#6CCAD0'}}>
                        <button className="apply-button" onClick={() => scrollDown()}>
                            무료 PDF 신청
                        </button>
                    </div>
                </div>
            </div>

            <div className="main-page-section1 bgc4" style={{backgroundColor:'white'}}>
                <div className="main-section-right">              
                    <img src={section2} className="section-image2" />
                </div>
                <div className="main-section-left">
                    <span className="one-section-big" style={{color:'black', marginTop:'20px'}}>
                        LIFE CEO 미라클 모닝 PDF 무료 증정
                    </span>
                    <span className="one-section-small" style={{color:'#6CCAD0'}}>
                        일주일 10분, 피곤함은 덜어내고 <br/>
                        내 할일은 해결되는 아침을 함께해요!
                    </span>
                </div>
            </div>

            <div className="main-page-section1 bgc4" style={{backgroundColor:'black'}}>
                <div className="main-section-left">
                    <span className="one-section-big" style={{color:'white'}}>
                        미라클 모닝 요약 제공<br/>
                    </span>
                    <span className="one-section-small" style={{color:'#6CCAD0'}}>
                        하나의 챕터를 한 페이지로 요약하고 <br/>
                        중요한 내용은 모두 포함한 <br/>
                        간단한 요약본을 제공합니다.
                    </span>
                </div>
                <div className="main-section-right" style={{width:'100%'}}>              
                    <img src={section3} className="section-image2" />
                </div>
            </div>

            <div ref={targets} className="main-page-section-last" style={{backgroundColor:'white', color:'black'}}>
                <span className="last-one-component" style={{width:'100%'}}>
                    <div className="one-section-big" style={{backgroundColor:'white', color:'black'}}>
                        나를 위한 아침을 맞이해보세요!
                    </div>
                    <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일을 입력하세요" className="input-text"/>
                    <button className="apply-button" onClick={sendData} style={{backgroundColor:'#6CCAD0'}}>무료 PDF 신청</button>
                    <div className="one-section-small" style={{textAlign: 'center', color:'black'}}>
                        미라클 모닝은 시작을 잘하는 게 제일 중요합니다.<br />
                        간단하게 기다려왔던 아침을 맞이하세요.
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
        </div>
        <Footer />
        </>
        :

        <>
        </>}
        </>
    )
}

export default MiracleMorning