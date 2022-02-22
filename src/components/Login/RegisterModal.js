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
import {Check} from '@styled-icons/bootstrap'
import LoginModal from './LoginModal'
import {Infos} from './LoginModal'
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
  width: 400,
  height: 550,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:'10px',
  p: 2,
  px: 4,
  pb: 3,
};

function RegisterModal({open, setOpen, history}) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [loginOpen, setLoginOpen] = useState(false);

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
        setOpen(false)
    }

    const submit = async (e) => {
        var data = '';
        e.preventDefault();
        try{
            data = await authService.createUserWithEmailAndPassword(
                id, password
            )
            console.log(data)
        } catch (err){
            if(err.code === "auth/email-already-in-use"){
                alert("이미 존재하는 아이디입니다. 로그인 해 주세요.");
                setOpen(false)
                setLoginOpen(true)
            }else if(err.code === "auth/invalid-email"){
                alert("이메일 양식에 맞게 작성해 주세요.");
            }else{
                alert("옳바르지 않은 회원가입 시도입니다.");
            }
            return;
        }
        setOpen(false)
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
            console.log("회원가입 정보를 받습니다.");
        }
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
                            회원가입
                        </div>
                        <div style={{width:"5%", cursor:"pointer"}} onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <button className="google-login-button opacity-hover" name="googleLogin" onClick={e => socialLogin(e)} style={{marginTop:'2%'}}>
                        <img src={googlelogo} width={20}/>
                        <span style={{marginLeft:'5%'}}>구글아이디로 이용하기</span>
                    </button>
                    <div style={{fontSize:'12px', color:'rgba(150,150,150,1)', marginTop:'8px'}}>
                        위 버튼을 클릭하면 <a href="https://striped-cabin-4bf.notion.site/Surfee-be94494cf8c248e7b03a84e4c3966e1e" target="_blank">약관</a>에 동의한 것으로 간주하고<br/> 자동으로 회원가입/로그인이 진행됩니다.
                    </div>
                    <form onSubmit={e => submit(e)}>
                        <div className="login-label">
                            이메일
                        </div>
                        <Input 
                            className="login-input input-focus"
                            placeholder="이메일 주소를 입력해 주세요." 
                            required
                            value={id}   
                            onChange={e => setId(e.currentTarget.value)}
                        />
                        <div className="login-label">
                            비밀번호
                        </div>
                        <Input  
                            type="password" 
                            className="login-input input-focus"
                            placeholder="비밀번호를 입력해 주세요." 
                            required
                            value={password} 
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                        <div className="login-label">
                            <div>비밀번호 확인</div> {password === passwordCheck && passwordCheck !== '' && <Check size="20" style={{color:'#6C63FF'}} />}
                        </div>
                        <Input  
                            type="password" 
                            className="login-input input-focus"
                            placeholder="비밀번호를 입력해 주세요." 
                            required
                            value={passwordCheck} 
                            onChange={e => setPasswordCheck(e.currentTarget.value)}
                        />
                        <Input className="login-form-button our-hover" type="submit" value="회원가입" />
                    </form>
                    <Infos />
                </div>
            </Box>
        </StyledModal>
        </div>
    )
}

export default RegisterModal
