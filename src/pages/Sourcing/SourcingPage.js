import React, {useState, useEffect} from 'react'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import Footer from '../NavAndFooter/Footer'
import './SourcingPage.css'
import "@lottiefiles/lottie-player";
import ribon from '../../tools/img/ribon.png'
import ch from '../../tools/img/sourcing/ch.png'
import mc from '../../tools/img/sourcing/mc.png'
import kmong from '../../tools/img/sourcing/kmong.png'
import {ExampleCard} from '../ExamplePage/ExamplePage'
import ChannelTalk from '../../tools/ChannelTalk'
import time from '../../tools/img/sourcing/time.svg'
import strategy from '../../tools/img/sourcing/strategy.svg'
import support from '../../tools/img/sourcing/support.svg'
import currency from '../../tools/img/sourcing/currency.svg'

function SourcingPage({history, isLoggedIn}) {

    ChannelTalk.boot({
        "pluginKey": "e6b830bc-7731-43fa-8eea-1245d3d4fc3e", //please fill with your plugin key"
    });

    const FCard = ({img, text}) => {
        return(
            <div style={{borderRadius:'6px', background:'white', width:'220px', height:'220px', margin:'20px', boxShadow:'6px 6px 15px rgba(0,0,0,0.25)'}}>
                <div className="centero" style={{width:'100%', height:'80%'}}>
                    <img src={img} style={{width:'60%'}} />
                </div>
                <div style={{fontSize:'0.8em', textAlign:'center', height:'20%', fontWeight:'700'}}>
                    {text}
                </div>
            </div>
        )
    }

    return (
        <div>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} />
        <div className="sourcing__container">
            <div className="fab__container">
                <button className="fab-button" onClick={() => {
                    window.open(
                        'https://bit.ly/3qUaVOW',
                        '_blank'
                    )
                }}>
                    📝 지금 바로 의뢰하기
                </button>
            </div>
            <div className="sourcing__section">
                <div className="s-middle">
                    디자인과 문구작성이 어려우신가요?
                </div>
                <div className="s-big">
                    <span className="font-gradient">Surfee</span>에게 제작을 의뢰해보세요.
                </div>
                <div className="mt-30">
                    <div className="s-small">
                        © 크몽에서 활동 중인 페이지 제작 전문가와 함께합니다.
                    </div>
                    <div className="s-small">
                        © 의뢰서만 작성해서 제출하면 1일안에 디자인과 제작까지 완성!
                    </div>
                </div>
                <div className="mt-30 centero" style={{width:'100%'}}>
                    <lottie-player
                        autoplay
                        loop
                        mode="normal"
                        src="https://s3.amazonaws.com/cdnl.iconscout.com/lottie/premium/original/4042273.json?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4VMJAKC54WWWCYMY%2F20220405%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220405T024911Z&X-Amz-SignedHeaders=host&X-Amz-Expires=259200&X-Amz-Signature=d2238275c851d54b81e6c89611dde0b7af7ba3cbe270661325dc229eb476c738"
                        style={{width:'30%', zIndex:'1'}}
                    >
                    </lottie-player>
                </div>
                <div style={{marginTop:'100px'}}>
                    <div className="s-small">
                        제작 예시
                    </div>
                    <div style={{display:'flex', flexDirection:'row', marginTop:'25px'}}>
                        <ExampleCard url="cakehousesurfeeex" title="제작예시 1" img={ch} />
                        <ExampleCard url="mercurysurfeeex" title="제작예시 2" img={mc} />
                    </div>
                </div>
            </div>
            <div className="sourcing__section2">
                <div className="s-small" style={{fontWeight:'400'}}>
                    비합리적인 가격 X &nbsp;&nbsp; 긴 제작기간 X
                </div>
                <div className="s-big mt-30" style={{textAlign:'left', fontSize:'2.3em'}}>
                    의뢰서 작성 &nbsp; 〉 &nbsp;
                    결제 &nbsp; 〉 &nbsp;
                    제작 &nbsp; 〉 &nbsp;
                    피드백 &nbsp; 〉 &nbsp;
                    수정 후 완성
                </div>
                <div className="s-small mt-30" style={{fontWeight:'400'}}>
                    제작하고자 하는 페이지에 대한 정보와 제작에 필요한 자료들을 바탕으로 의뢰서를 작성해주시면<br/>
                    Surfee가 직접 페이지를 제작해서 전달해드립니다.<br/>
                    시안을 보내드린 뒤 피드백을 받은 후 수정-보완하는 과정을 가지며,<br/>
                    직접 페이지를 제작하시는 수고를 덜어드립니다.
                </div>
                <div className="mt-30" style={{display:'flex', flexDirection:'row', marginTop:'90px'}}>
                    <FCard img={kmong} text="크몽 평균별점 5.0⭐️" />
                    <FCard img={currency} text="합리적인 가격 : 3 or 6 만원" />
                    <FCard img={time} text="오후 1시 이전 의뢰시 당일 제작" />
                    <FCard img={support} text="반응형 웹페이지" />
                    <FCard img={strategy} text="많은 디자인 리소스 보유" />
                </div>
            </div>
            <div className="sourcing__section3">
                <div className="s-small">
                    더 이상 비효율적인 외주 작업에 스트레스 받지마세요.
                </div>
                <div className="s-big">
                    <span style={{fontWeight:'400'}}>합리적인 가격으로</span>
                    <br/>
                    직접 수정 가능한 형태로 제공
                </div>
                <div className="mt-30 centero" style={{width:'100%', flexDirection:'column'}}>
                    <img src={ribon} style={{width:'250px'}} />
                    <div className="s-small">
                        Surfee가 제작해주는 페이지는 수정가능한 형태의 템플릿으로 제공되기때문에<br/>
                        의뢰자분께서 페이지를 받은 뒤 <strong>횟수제한 없이 얼마든지 문구, 디자인, 사진 등을 수정가능</strong>합니다.
                    </div>
                </div>
            </div>
            <div className="sourcing__section2">
                <div className="s-big" style={{fontSize:'2.5em'}}>
                    Surfee가 제작의뢰를 받는 이유
                </div>
                <div className="mt-30">
                    <div className="s-small" style={{fontSize:'0.9em'}}>
                        Surfee는 <strong>모든 사람들이 쉽고 빠르게 홍보페이지를 가질 수 있으면 좋겠다</strong>는 생각에서 시작된 서비스입니다.<br/>
                        그런 목표를 가지고 저희는 코딩없이 페이지 제작이 가능한 툴을 완성했습니다.<br/>
                        그리고 이후의 과정에서, 저희는 사람들이 툴과 별개로<br/>
                        <strong>원하는 문구를 작성하고 디자인하는데 어려움을 겪는다</strong>는 사실을 알게되었습니다.<br/><br/>
                        따라서 <strong>기존의 외주보다 혁신적인 가격</strong>으로 제작의뢰를 진행해주고,<br/>
                        사람들이 페이지 제작시 원하는 부분이 어떤 것인지에 대한 정보 또한 얻고자합니다.
                        <br/><br/>
                        더 궁금하신게 있다면 메일 : surfee.business@gmail.com로<br/>혹은 화면 가장 오른쪽 아래의 이모티콘을 클릭해 연락주세요!
                    </div>
                    <button className="fab-button uphover" onClick={() => {
                        window.open(
                            'https://bit.ly/3qUaVOW',
                            '_blank'
                        )
                    }} style={{marginTop:'60px', borderRadius:'6px', color:'white'}}>
                        📝 지금 바로 의뢰하기<br/>

                        <span style={{fontSize:'13px'}}>페이지 디자인부터 기획까지, 더 이상 고민하지 마세요.</span>
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default SourcingPage
