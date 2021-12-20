import React from 'react'
import './utils/CouponPage.css'

function CouponPage() {
    return (
        <div className="coupon-page-one-container">
            <div className="coupon-page-message-container">
                <span className="coupon-info-message">
                <span style={{fontWeight:'700', fontSize:'25px'}}>저희 서비스에 관심을 가져주셔서 감사합니다.</span> <br/> <br/>
                아래에 쿠폰을 받을 이메일을 제출해주시면 2022년 2월 28일까지 ~~하게 쓸 수 있는 
                쿠폰을 메일로 보내드리겠습니다. <br/> <br/>
                앞으로 템플릿은 계속해서 업데이트될예정이니
                많은 관심 부탁드립니다.
                </span>

                <div className="info-input">
                    <span>
                    이름
                    </span>
                    <span>
                    이메일
                    </span>
                    <span>
                    직업
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CouponPage
