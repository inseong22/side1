import React, {useState, useEffect} from 'react'
import NavBarV2 from '../../../pages/NavAndFooter/NavBarV2'
import Footer from '../../../pages/NavAndFooter/Footer'

import './SubmitPage.css'

function SubmitPage() {

    useEffect(() => {
    })

    return (
        <div className="after-page-one-container">
            <NavBarV2 />
            <div className="after-page">
                <div className="after-page-title">
                축하합니다!
                랜딩페이지는<br/>
                https://surfee.co.kr입력하신 urlID<br/>
                에서 확인하실 수 있습니다.
                </div>
                <div className="after-page-desc">
                데이터를 확인할 수 있는 페이지에 대한 비밀번호는 12시간 내에 이메일로 보내드리겠습니다.<br/>
                랜딩페이지에 대한 데이터는 매일 자정 경
                엑셀 파일로 정리하여 보내드릴 예정입니다.<br/><br/>
                최대한 빠른 시일 내에 자동화할 수 있도록 노력하겠습니다!<br/>
                저희 Surfee를 이용해주셔서 감사합니다 :)
                <br/><br/>
                👉 Surfee가 도움이 되었다면 / 개선을 바라는 점이 있다면<br/>
                피드백에 참여해 주세요!
                </div>
                <div className="after-page-button-container">
                    <a className="after-page-button" href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu">🙋🏻‍♂️ 피드백 하러 가기!</a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SubmitPage
