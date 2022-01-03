import React, {useState, useEffect} from 'react';
import './LoginRegister.css'
import { authService } from '../../../tools/fbase'
import { firebaseInstance } from '../../../tools/fbase'
import { dbService } from '../../../tools/fbase'
import { Input } from 'antd';
import googlelogo from '../googlelogo.png'
import s1 from '../../../tools/img/surfee1.png';
import Footer from '../../NavAndFooter/Footer';
import {Link} from 'react-router-dom';

function LoginPage({history}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [done, setDone] = useState(false);

    const socialLogin = async (e) => {
        const { 
            target : { name }, 
        } = e;
        let provider;
        // if (name === "googleLogin"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        // }else{
        //     console.log("이건 뜨면 안되는 메세지.");
        // }

        const data = await authService.signInWithPopup(provider);
        await checkRegister(data.user.multiFactor.user.email);
        history.push('/');
        history.go();
    }

    const submit = async (e) => {
        var data = '';
        e.preventDefault();
        try{
            data = await authService.signInWithEmailAndPassword(
                id, password
            )
            checkRegister(data.user.multiFactor.user.email)
        } catch (err){
            console.log(err)
        }
        console.log(data)
    }

    const checkRegister = async (email) => {
        const usersCollections = await dbService
            .collection("users")
            .where("email", "==", email)
            .get();
        
        const usersExist = usersCollections.docs.map(doc => {
            return({...doc.data(), id: doc.id})
        })

        console.log("일단 로그인 성공", email, usersExist)


        if(usersExist.length === 0){
            // 구글 아이디로 로그인했는데 회원가입에 정보가 없을 때
            console.log("회원가입 정보를 받습니다.");
            setDone(true);
        }else{
            console.log("로그인 완료");
            localStorage.setItem("name", usersExist[0].name);
            localStorage.setItem("job", usersExist[0].job);

            history.push('/');
            history.go();
        }
    }

    return (
        <>
        {done ? 
        <div>
            Initializing... 
            {/* 여기에 회원가입 페이지랑 똑같이 입력받는걸 넣어야 하는 건가..? */}
        </div>
        :
        <div>
        <div className="login-container">
            <div className="login-container__container">
                <div className="login__inner">
                    <div className="login-title" style={{color:'#6a63f7'}}>
                        Surfee
                    </div>
                    <div className="login-title">
                        로그인 페이지에 오신 것을 환영합니다.
                    </div>
                    <form onSubmit={e => submit(e)} className="center">
                        <span className="login-label">
                            Email
                        </span>
                        <Input 
                            type="text" 
                            className="login-input"
                            placeholder="아이디를 입력해주세요." 
                            required
                            value={id}   
                            onChange={e => setId(e.currentTarget.value)}
                        />
                        <span className="login-label">
                            Password
                        </span>
                        <Input  
                            type="password" 
                            className="login-input"
                            placeholder="비밀번호를 입력해주세요." 
                            required
                            value={password} 
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                        <Input className="login-form-button" type="submit" value="로그인" />
                    </form>
                    <button className="google-login-button" name="googleLogin" onClick={e => socialLogin(e)} style={{marginTop:'2%'}}>
                        <img src={googlelogo} width={20}/>
                        <span style={{marginLeft:'5%'}}>구글 로그인</span>
                    </button>
                    <div style={{padding:'2% 0%', justifyContent:'flex-start', display:'flex', width:'100%'}}>
                        <Link to="/customer" className="footer-text-click">
                            개인정보 처리방침
                        </Link>
                        <Link to="/customer" className="footer-text-click" style={{marginLeft:'2%'}}>
                            이용약관
                        </Link>
                    </div>
                </div>
            </div>
            <div className="login-background">
                <img src={s1} width={600} />
                <div className="login-background__desc" style={{fontFamily:'Pretendard-ExtraBold', marginTop:'2%'}}>
                    Surfee와 함께 1분만에 완성하는 랜딩페이지
                </div>
                <div className="login-background__desc">
                    Surfee와 함께 1분만에 완성하는 랜딩페이지
                </div>
            </div>
        </div>
        <Footer />
        </div>
     }</>
        
    )
}

export default LoginPage
