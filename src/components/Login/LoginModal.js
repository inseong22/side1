import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import {Link} from 'react-router-dom'
import { authService } from '../../tools/fbase'
import { firebaseInstance } from '../../tools/fbase'
import { dbService } from '../../tools/fbase'
import { Input } from 'antd';
import googlelogo from '../../tools/img/googlelogo.png'
import './LoginModal.css'

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 450,
  height: 500,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:'20px',
  p: 2,
  px: 4,
  pb: 3,
};

function LoginModal({open, setOpen}) {
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


        // if(usersExist.length === 0){
        //     // 구글 아이디로 로그인했는데 회원가입에 정보가 없을 때
        //     console.log("회원가입 정보를 받습니다.");
        //     setDone(true);
        // }else{
        //     console.log("로그인 완료");
        //     localStorage.setItem("name", usersExist[0].name);
        //     localStorage.setItem("job", usersExist[0].job);
        // }
    }

    return (
        <div>
            <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={() => setOpen(!open)}
            BackdropComponent={Backdrop}>
            <Box sx={style}>
                <div className="login-modal__inner">
                    <div className="modal-top__title">
                        <div className="login-title" style={{width:"95%"}}>
                            로그인
                        </div>
                        <div style={{width:"5%", cursor:"pointer"}} onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <form onSubmit={e => submit(e)} className="center">
                        <span className="login-label">
                            Email
                        </span>
                        <Input 
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
                        <Input className="login-form-button hover-shadow" type="submit" value="로그인" />
                    </form>
                    <button className="google-login-button hover-shadow" name="googleLogin" onClick={e => socialLogin(e)} style={{marginTop:'2%'}}>
                        <img src={googlelogo} width={20}/>
                        <span style={{marginLeft:'5%'}}>구글 로그인</span>
                    </button>
                    <div style={{padding:'2% 0%', justifyContent:'flex-start', display:'flex', width:'100%'}}>
                        <a href="https://surfee.co.kr/#/customer" className="footer-text-click">
                            개인정보 처리방침
                        </a>
                        <a href="https://surfee.co.kr/#/customer" className="footer-text-click" style={{marginLeft:'2%'}}>
                            이용약관
                        </a>
                    </div>
                </div>
            </Box>
        </StyledModal>
        </div>
    )
}

export default LoginModal
