import React, {useContext, useState} from 'react'
import {UserContext} from '../../Router'
import ConfirmCustom from '../../tools/ConfirmCustom'
import {
    ChakraProvider,
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuItem,
  } from '@chakra-ui/react'
import './Profile.css'
import profileImage from '../../tools/img/main/profile.png'
import {BarGraph} from '@styled-icons/entypo'
import {QuestionCircle} from '@styled-icons/bootstrap'
import {LogOutCircle} from '@styled-icons/boxicons-regular'
import {authService} from '../../tools/fbase'
import {Link} from 'react-router-dom'
import LoginModal from '../Login/LoginModal';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function Profile({make}) {
    const {state, action} = useContext(UserContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [loginModal, setLoginModal] = useState(false)
    const [confirm, setConfirm] = useState(false)

    console.log(state);

    const onLogout = () => {
        authService.signOut();
        alert("로그아웃 되셨습니다.");
        history.push('/');
        history.go();
    }

    const goResponse = async () => {
        // 관리페이지에서 수정하기를 누른 거라면
        const check = window.confirm("관리페이지로 돌아가시겠습니까?\n저장하기 버튼을 클릭하지 않으셨다면 저장이 되지 않았을 수 있습니다.")
        if(check === true){
            if(state.userObj === null){
                alert("로그인을 하셔야 관리 페이지로 접속하실 수 있습니다.");
                setLoginModal(true);
            }else{
                history.push('/#/response');
                history.go();
            }
        }else{
            return
        }
    }

    return (
        <ChakraProvider>
            {
                state.userObj !== undefined && state.userObj !== null &&
                <Menu style={{color:'black'}}>
                    <MenuButton aria-label='Options' variant='outline' style={{marginLeft:'10px'}}>
                        {
                            state.userObj.photoURL ? 
                            <img 
                                className="profile__image"
                                src={state.userObj.photoURL} />
                            :
                            <img
                                className="profile__image"
                                src={profileImage} />
                        }
                    </MenuButton>
                    <MenuList minWidth='200px' maxWidth='200px'>
                        <MenuItem className="profile__menu-item" style={{height:'80px', display: 'flex', alignItems: 'center',padding:'5px', justifyContent: 'center'}}>
                            <div>
                                {
                                    state.userObj.photoURL ? 
                                    <img className="profile__image" src={state.userObj.photoURL} />
                                    :
                                    <img className="profile__image" src={profileImage} />
                                }
                            </div>
                            <div className="flex-column" style={{marginLeft:'10px'}}>
                                <div>
                                    {state.userObj.displayName}
                                </div>
                                <div style={{fontSize:'0.8em'}}>
                                    {state.userObj.email}
                                </div>
                            </div>
                        </MenuItem>
                        <MenuItem className="profile__menu-item" onClick={() => {
                                window.open(
                                    'https://surfee.channel.io',
                                    '_blank'
                                )
                            }}> 
                            <QuestionCircle className="profile__icon"/> 문의하기
                        </MenuItem>
                        <MenuItem className="profile__menu-item"> 
                        {
                            make ? 
                            <div onClick={() => goResponse()}>
                                <BarGraph className="profile__icon" /> 관리페이지
                            </div>
                            :
                            <Link to="/response">
                                <BarGraph className="profile__icon" /> 관리페이지
                            </Link>
                        }
                        </MenuItem>
                        <MenuItem onClick={() => setConfirm(true)} className="profile__menu-item" style={{borderTop:'1px solid rgba(0,0,0,0.2)'}}> 
                            <LogOutCircle className="profile__icon"/> 로그아웃
                        </MenuItem>
                    </MenuList>
                </Menu>
            }
            <LoginModal open={loginModal} setOpen={setLoginModal} />
            <ConfirmCustom open={confirm} setOpen={setConfirm}  message={<div>
                <div style={{fontWeight: '800', fontSize:'1.1em', textAlign: 'center', width:'100%'}}>
                    로그아웃
                </div>
                <div style={{marginTop:'20px'}}>
                    로그아웃 하시겠습니까?
                </div>
            </div>} callback={onLogout}/>
        </ChakraProvider>
    )
}

export default Profile
