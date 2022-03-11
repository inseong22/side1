import React from 'react'
import NavBarV2 from '../NavAndFooter/NavBarV2'
import Footer from '../NavAndFooter/Footer'
import {Link} from 'react-router-dom'
import {ChakraProvider, Button} from '@chakra-ui/react'
import intro1 from '../../tools/img/tutorial/intro1.png'
import intro2 from '../../tools/img/tutorial/intro2.png'
import './CustomerPage.css'

function WhatIsSurfee({history, isLoggedIn}) {
    return (
        <ChakraProvider>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn} />
        <div className="main-page-container" style={{paddingTop:'60px'}}>
            <div className="what-inner__container">
                <div className="what-title">
                    Surfee는 무엇인가요?
                </div>
                <div className="what-desc">
                    Surfee는 코딩과 디자인을 몰라도 누구나 손쉽게<br/>하나의 예쁜 페이지를 만들 수 있게 해주는 서비스 입니다.<br/>
                    <Link className="underline" to="/surfeeexamples">템플릿을 골라서</Link> 시작하거나 <Link className="underline" to="/">직접 제작</Link>할 수 있어요!
                </div>
                <div className="what-title">
                    어떤 상황에서 사용해야 하나요?
                </div>
                <div className="what-desc">
                    서피는 아래와 같은 용도로 사용하기에 적합해요.<br/>
                    <br/>
                    👉 아직 서비스가 없지만 사전 신청을 받아 수요를 확인하기<br/>
                    👉 내 서비스 혹은 상품을 홍보하고 알리기 위해서 페이지를 만들어 사용하기<br/>
                    👉 간단한 설명을 페이지로 만들고 버튼 클릭을 유도하기<br/>
                    <br/>
                    지금 바로 서피와 함께하세요! 🤓
                </div>
                <div className="what-title">
                    어떤 장점이 있나요?
                </div>
                <div className="what-desc">
                    1️⃣ 서피는 세상! 그 어떤 것보다 쉽고 빠르게 제작할 수 있는 툴이에요.<br/>
                    하나의 페이지를 만드는데 소요되는 시간⏰과 노력이 아주 적어요.<br/>
                    처음 쓰는 사람도 3분안에 예쁜 페이지를 완성할 수 있어요.<br/>
                    <br/>
                    2️⃣ 내가 만든 페이지 안에서 들어온 사람에게 간단한 입력을 받을 수 있어요.<br/>
                    이 입력받은 정보는 📊관리페이지에서 확인이 가능하답니다.<br/>
                    <img src={intro1} alt="설명 1" />
                    <br/>
                    3️⃣ 몇명이 내 페이지로 들어왔는지, 그 중 몇명이 무슨 버튼을 눌렀고,<br/>어떤 응답을 했는지 볼 수 있어요!<br/>
                    <img src={intro2} alt="설명 2" />
                    <div stlye={{marginTop:'160px', display:'flex'}}>&nbsp;</div>
                    <Button colorScheme='red' onClick={() => {
                        window.open(
                            'https://surfee.co.kr',
                        )
                    }} style={{margin:'10px'}}>제작하기</Button>
                    <Button onClick={() => {
                        window.open(
                            'https://surfee.co.kr/surfeeexamples',
                        )
                    }} style={{margin:'10px'}}>템플릿으로 만들기</Button>
                </div>
                <div className="what-desc">
                    더 궁금하거나 문의하실게 있나요?<br/>아래 문의하기 페이지로 자유롭게 문의주세요 :)<br/><br/>
                    <Button href='https://tally.so/r/wMZ4Yn' target="_black">🧑🏻‍💻 문의하기</Button>
                </div>
            </div>
        </div>
        <div stlye={{marginTop:'160px'}}>---</div>
        <Footer />
        </ChakraProvider>
    )
}

export default WhatIsSurfee
