import React, {useState, useEffect} from 'react'
import './NavBarV2.css'
import {Link} from 'react-router-dom';
import {authService} from '../../tools/fbase'
import LoginModal from '../../components/Login/LoginModal'
import RegisterModal from '../../components/Login/RegisterModal'

function NavBarV2({history, scrollPosition, isLoggedIn, buttonOpen}) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)

    const onLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('job');
        authService.signOut();
        alert("로그아웃 되셨습니다.");
        history.push('/');
        history.go();
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%'}}>
            <div className="nav-bar-container-v2">
                <div className="nav-bar-left-v2">
                    <Link to="/v2" className="nav-bar-title-v2" style={{cursor:'pointer', color:'#6a63f7'}}>
                        Surfee
                    </Link>
                    {/* <Link to="/info" className="nav-left-text" style={{marginLeft:'4vw'}}>
                        제품소개
                    </Link> */}
                </div>
                <div className="nav-on-v2">
                    {isLoggedIn ? 
                    <>
                    <span className="nav-left-text" onClick={() => onLogout()}>
                        로그아웃
                    </span>
                    </> : 
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
            </div>
            <div style={{borderBottom: '2px solid black', width:`${(scrollPosition/window.innerHeight)*63}%`, position:'fixed', top:'58px', zIndex:'12'}}></div>
            <LoginModal open={loginOpen} setOpen={setLoginOpen} />
            <RegisterModal open={registerOpen} setOpen={setRegisterOpen} history={history} loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
        </div>
    )
}

export default NavBarV2
