import React, {useState, useEffect} from 'react';
import './LoginRegister.css'
import { authService } from '../tools/fbase'
import { firebaseInstance } from '../tools/fbase'
import { dbService } from '../tools/fbase'

function LoginPage({history}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [done, setDone] = useState(false);

    const socialLogin = async (e) => {
        const { 
            target : { name }, 
        } = e;
        let provider;
        if (name === "googleLogin"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else{
            console.log("이건 뜨면 안되는 메세지.");
        }

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
        <div className="login-container">
            <div className="login__inner">
                <div>
                    로그인 페이지에 오신 것을 환영합니다.
                </div>
                <form onSubmit={e => submit(e)}>
                    <input 
                        type="text" 
                        placeholder="아이디를 입력해주세요." 
                        required
                        value={id}   
                        onChange={e => setId(e.currentTarget.value)}
                    />
                    <input  
                        type="password" 
                        placeholder="비밀번호를 입력해주세요." 
                        required
                        value={password} 
                        onChange={e => setPassword(e.currentTarget.value)}
                    />
                    <input type="submit" value="Log In" />
                </form>
                <div>
                    <button onClick={e => socialLogin(e)} name="googleLogin">구글 로그인</button>
                </div>
            </div>
        </div>
     }</>
        
    )
}

export default LoginPage
