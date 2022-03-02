import React, {useEffect,useRef, useState} from 'react'
import './MainPage.css'
import {Link} from 'react-router-dom';
import { dbService } from '../../../tools/fbase';
import NavBar from '../../NavAndFooter/NavBar/NavBar'
import Footer from '../../NavAndFooter/Footer'
import gadata from '../../../tools/datacodes/gadata.json'

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

    const scrollDown = async () => {
        await dbService.collection('gadata').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.delete();
            });
          });

        for (var i = 0; i < gadata.length; i++) {
            await dbService.collection('gadata').add(gadata[i])
            //Do something
        }
        
            const ee = await dbService.collection('saved-page').where("urlId", '==', '0').get()

            let eee = ee.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

        targets.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <>
        <div className="main-page-container">
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
            
            <div ref={targets} className="main-page-section" style={{backgroundColor:"white"}}>
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
            </div>
           </>
    )
}

export default MainPage