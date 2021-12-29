import React from 'react'

function MakeFooter(props) {
    return (
        <footer className="make-footer" style={{
                // backgroundColor:`${props.footerColor}`, 
                backgroundColor:`${props.footerColor}`, 
                fontSize:`${props.full ? props.bigfont : props.smallfont }`, 
                height:`${props.full ? 180 : 180*props.rate }px`
            }}>
                <div className="footer-more" style={{fontSize:'0.31em', fontFamily:'Noto Sans KR', fontWeight:'400', marginLeft:'-6%'}}>
                    <div className="footer-item">
                        <a href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu" className="insta">{props.naviTitle}</a>
                    </div>
                    <div className="footer-item" style={{flexDirection:'column', alignItems:'start'}}>
                        <span>
                        E-mail : {props.userEmail}
                        </span>
                    </div>
                    <div className="footer-item" style={{fontWeight:'bold'}}>
                        {new Date().getFullYear()} Copyright © {props.naviTitle}, All rights reserved
                    </div>
                </div>
                <div className="footer-more" style={{fontSize:'0.31em', fontFamily:'Noto Sans KR', fontWeight:'400'}}>
                    <div> 
                    </div>
                    <div> 
                    </div>
                    <div>
                        <a href="https://surfee.co.kr/#/v2" className="insta" style={{color:'black'}}>Surfee로 제작한 페이지입니다. 사용하러 가기 🖥</a>
                    </div>
                </div>
            </footer>
    )
}

export default MakeFooter
