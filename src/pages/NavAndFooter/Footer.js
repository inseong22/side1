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
                <a href="https://striped-cabin-4bf.notion.site/Surfee-be94494cf8c248e7b03a84e4c3966e1e" className="footer-text-click">
                  이용약관
                </a>
              </div>
              <div className="footer-item">
                <a href="https://striped-cabin-4bf.notion.site/Surfee-be94494cf8c248e7b03a84e4c3966e1e" className="footer-text-click">
                  개인정보 처리방침
                </a>
              </div>
            </div>
        </div>
    )
}

export default Footer
