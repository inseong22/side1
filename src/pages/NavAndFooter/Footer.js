import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-more">
              <div className="footer-item">
                <a href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu" className="insta" style={{fontSize:'21px'}}>Surfee</a>
                <a href="https://6cetqycakbc.typeform.com/to/oRcv6Qdu" className="insta" style={{marginLeft:'3%'}}>Contact Us</a>
              </div>
              <div className="footer-item">
                Phone : 010-4690-5086
              </div>
              <div className="footer-item">
                E-mail : surfee.business@gmail.com 
              </div>
              <div className="footer-item">
                {new Date().getFullYear()} Copyright Surfee, All rights reserved
              </div>
            </div>
            <div className="footer-more">
              <div className="footer-item">
                <Link to="/customer" className="footer-text-click">
                  이용약관
                </Link>
              </div>
              <div className="footer-item">
                <Link to="/customer" className="footer-text-click">
                  개인정보 처리방침
                </Link>
              </div>
            </div>
        </div>
    )
}

export default Footer
