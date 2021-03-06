import React, {useState, useEffect} from 'react'
import { authService } from '../../../tools/fbase'
import { firebaseInstance } from '../../../tools/fbase'
import { dbService } from '../../../tools/fbase'
import { Input } from 'antd';
import googlelogo from '../../../tools/img/googlelogo.png'
import s1 from '../../../tools/img/surfee1.png';
import {Link} from 'react-router-dom';
import NavBarV2 from '../../NavAndFooter/NavBarV2'

function RegisterPage({history, isLoggedIn}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [done, setDone] = useState(false);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const socialLogin = async (e) => {
        const { 
            target : { name }, 
        } = e;
        let provider;
        if (name === "googleLogin"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else{
        }

        const data = await authService.signInWithPopup(provider);
        await checkRegister(data.user.multiFactor.user.email);
        setDone(true);

    }

    const submit = async (e) => {
        var data = '';
        e.preventDefault();
        try{
            data = await authService.createUserWithEmailAndPassword(
                id, password
            )
        } catch (err){
            if(err.code === "auth/email-already-in-use"){
                alert("이미 존재하는 아이디입니다. 로그인 해 주세요.");
                history.push('/login');
                history.go();
            }else if(err.code === "auth/invalid-email"){
                alert("이메일 양식에 맞게 작성해 주세요.");
            }else{
                alert("옳바르지 않은 회원가입 시도입니다.");
            }
            return;
        }
        history.push('/');
        history.go();
    }

    const checkRegister = async (email) => {
        const usersCollections = await dbService
            .collection("users")
            .where("email", "==", email)
            .get();
        
        const usersExist = usersCollections.docs.map(doc => {
            return({...doc.data(), id: doc.id})
        })

        if(usersExist.length === 0){
            // 구글 아이디로 로그인했는데 회원가입에 정보가 없을 때
        }
    }

    const submitInfo = async () => {
        await dbService.collection("users").add({
            name:name,
            job:job,
        })
        alert("회원가입이 완료되었습니다.");
        history.push('/');
        history.go();
    }

    return (
        <>
        <NavBarV2 history={history} isLoggedIn={isLoggedIn}/>
        {done ? 
        <div className="login-container">
            <div className="login__inner">
                <div>
                    회원가입 페이지에 오신 것을 환영합니다.
                </div>
                <form className="form-container" onSubmit={e => submitInfo(e)}>
                    <input 
                        type="text" 
                        placeholder="이름을 입력해 주세요." 
                        required
                        value={name}   
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <input  
                        type="text" 
                        placeholder="직업을 입력해 주세요." 
                        required
                        value={job} 
                        onChange={e => setJob(e.currentTarget.value)}
                    />
                    <input type="submit" value="회원가입 완료" />
                </form>
            </div>
        </div>
        : 

        <div className="login-container">
            <div className="login-container__container">
                <div className="login__inner">
                    <div className="login-title" style={{color:'#6a63f7'}}>
                        Surfee
                    </div>
                    <div className="login-title">
                        회원가입 페이지에 오신 것을 환영합니다.
                    </div>
                    <form onSubmit={e => submit(e)} className="center">
                        <span className="login-label">
                            Email
                        </span>
                        <Input 
                            type="text" 
                            className="login-input"
                            placeholder="아이디를 입력해 주세요." 
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
                            placeholder="비밀번호를 입력해 주세요." 
                            required
                            value={password} 
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                        <Input className="login-form-button" type="submit" value="회원가입" />
                    </form>
                    <button className="google-login-button" onClick={e => socialLogin(e)} style={{marginTop:'2%'}}>
                        <img src={googlelogo} width={20}/>
                        <span style={{marginLeft:'5%'}}>구글 회원가입</span>
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
        </div>}
        </>
    )
}

export default RegisterPage
