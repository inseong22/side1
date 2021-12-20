import React from 'react'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-more">
              <div className="footer-item">
                <a href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu" className="insta" style={{fontSize:'25px'}}>Surfee</a>
                <a href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu" className="insta" style={{marginLeft:'3%', color:'black'}}>🙋🏻‍♂️ 문의하기 클릭</a>
              </div>
              <div className="footer-item" style={{flexDirection:'column', alignItems:'start'}}>
                <span>
                Phone : 010-4690-5086
                </span>
                <span>
                E-mail : surfee.business@gmail.com 
                </span>
              </div>
              <div className="footer-item" style={{color:"black"}}>
                {new Date().getFullYear()} Copyright © Surfee, All rights reserved</div>
            </div>
            <div className="footer-more">
                <div>
                  이용약관
                </div>
                <div>
                  개인정보 처리방침
                </div>
            </div>
        </footer>
    )
}

export default Footer
