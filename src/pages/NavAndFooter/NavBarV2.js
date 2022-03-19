import React, {useState, useEffect} from 'react'
import './NavBarV2.css'
import {Link} from 'react-router-dom';
import {authService} from '../../tools/fbase'
import LoginModal from '../../components/Login/LoginModal'
import RegisterModal from '../../components/Login/RegisterModal'
import Profile from '../../components/NavAndFooter/Profile'
import {isMobile} from 'react-device-detect'

function NavBarV2({history, scrollPosition, isLoggedIn, buttonOpen}) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%'}}>
            {
                isMobile ? <>
                <div className="nav-bar-container-v2">
                    <div className="nav-bar-left-v2">
                        <Link to="/" className="nav-bar-title-v2" style={{cursor:'pointer', color:'#6a63f7'}}>
                            Surfee
                        </Link>
                    </div>
                </div>
                
                </> : <>
                    <div className="nav-bar-container-v2">
                        <div className="nav-bar-left-v2">
                            <Link to="/" className="nav-bar-title-v2" style={{cursor:'pointer', color:'#6a63f7'}}>
                                Surfee
                            </Link>
                            <Link to="/surfeeexamples" className="nav-left-text" style={{marginLeft:'4vw'}}>
                                템플릿
                            </Link>
                            <div className="nav-left-text" style={{marginLeft:'1vw'}} onClick={() => {
                                window.open(
                                    'https://www.notion.so/Surfee-903d24edba264a9e9a8245803f11db11',
                                    '_blank' // <- This is what makes it open in a new window.
                                );
                            }}>
                                Surfee 소개
                            </div>
                            <Link to="/vote" className="nav-left-text" style={{marginLeft:'1vw'}}>
                                신규 기능 투표
                            </Link>
                        </div>
                        {
                            !isMobile && 
                            <div className="nav-on-v2">
                                {isLoggedIn ? 
                                <>
                                {/* <span className="nav-left-text" onClick={() => onLogout()}>
                                    로그아웃
                                </span> */}
                                <Profile history={history} />
                                </> 
                                : 
                                <>
                                    <div className="nav-left-text" onClick={() => setLoginOpen(!loginOpen)}>
                                        로그인
                                    </div>
                                    <div className="nav-left-text" onClick={() => setRegisterOpen(!registerOpen)}>
                                        회원가입
                                    </div>
                                </>
                                }
                                {/* {
                                buttonOpen &&  
                                    <button className="nav-button-square" onClick={() => window.scrollTo(0,document.body.scrollHeight)}>무료로 체험하기</button>
                                } */}
                            </div>
                        }
                    </div>
                    <div style={{borderBottom: '2px solid black', width:`${(scrollPosition/window.innerHeight)*63}%`, position:'fixed', top:'58px', zIndex:'12'}}></div>
                </>
            }
            <LoginModal open={loginOpen} setOpen={setLoginOpen} />
            <RegisterModal open={registerOpen} setOpen={setRegisterOpen} history={history} loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
        </div>
    )
}

export default NavBarV2
