import React, {useState, useEffect} from 'react'
import { authService } from '../../../tools/fbase'
import { firebaseInstance } from '../../../tools/fbase'
import { dbService } from '../../../tools/fbase'

function RegisterPage({history}) {
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
            console.log("이건 뜨면 안되는 메세지.");
        }

        const data = await authService.signInWithPopup(provider);
        await checkRegister(data.user.multiFactor.user.email);
        setDone(true);

        console.log(data.user.multiFactor.user, "로그인");
    }

    const submit = async (e) => {
        var data = '';
        e.preventDefault();
        try{
            data = await authService.signInWithEmailAndPassword(
                id, password
            )
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

        if(usersExist.length === 0){
            // 구글 아이디로 로그인했는데 회원가입에 정보가 없을 때
            console.log("회원가입 정보를 받습니다.");
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
        {done ? 
        
        <div className="login-container">
            <div className="login__inner">
                <div>
                    회원가입 페이지에 오신 것을 환영합니다.
                </div>
                <form className="form-container" onSubmit={e => submitInfo(e)}>
                    <input 
                        type="text" 
                        placeholder="이름을 입력해주세요." 
                        required
                        value={name}   
                        onChange={e => setName(e.currentTarget.value)}
                    />
                    <input  
                        type="text" 
                        placeholder="직업을 입력해주세요." 
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
            <div className="login__inner">
                <div>
                    회원가입 페이지에 오신 것을 환영합니다.
                </div>
                <form className="form-container" onSubmit={e => submit(e)}>
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
                    <input type="submit" value="회원가입" />
                </form>
                <div>
                    <button onClick={e => socialLogin(e)} name="googleLogin">구글 회원가입</button>
                </div>
            </div>
        </div>}
        </>
    )
}

export default RegisterPage
