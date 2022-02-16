import React, {useContext, useState} from 'react';
import { Button } from 'antd';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import {Monitor} from '@styled-icons/feather'
import { Phone } from '@styled-icons/bootstrap'
import {Fullscreen} from '@styled-icons/bootstrap'
import LoginModal from '../../../components/Login/LoginModal'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    ButtonGroup,
    Portal,
  } from '@chakra-ui/react'

const NavBarInMakePage = (props) => {
    const [loginModal, setLoginModal] = useState(false)
    const {state, action} = useContext(MyContext)
    const [deviceOpen, setDeviceOpen] = useState(false);
  
    const handleClick = () => {
        setDeviceOpen(!deviceOpen);
    };
  
    const handleClose = () => {
        setDeviceOpen(false);
    };

    const moveToMain = () => {
        window.open(
            'https://surfee.co.kr',
            '_blank' // <- This is what makes it open in a new window.
        );
    }
    
    const onSubmit = async () => {
        // 배포하기 클릭
        // 관리페이지에서 수정하기를 누른 거라면
        
        props.saveLocalStorage()

        if(props.userObj === null){
            alert("로그인 하셔야 저장 후 배포하실 수 있습니다.");
            setLoginModal(true);
        }else{
            // 새로 업로드 해야한다.
            // 파이어 베이스에 저장한다.
            props.saveTo();
            // setCheckModalOpen(true);
        }
    }

    const deviceSelect = () => {
        return(
            <div style={{width:'15%', paddingRight:'20px'}}>
                <Popover
                    placement='bottom'
                    closeOnBlur={false}
                    isOpen={deviceOpen}
                    onClose={handleClose}
                >
                <PopoverTrigger>
                    <div className="device-button" onClick={handleClick} style={{marginRight:'20px'}}>
                        {
                            props.isPhone ? <Phone size="25" /> : <Monitor size="25" />
                        }
                    </div>
                </PopoverTrigger>
                <PopoverContent style={{width:'200px', borderRadius:'20px'}}>
                    <PopoverArrow />
                    
                    <PopoverBody>
                        <div className="device__container">
                            <span className={props.isPhone && !props.full ? "device-button clicked" : "device-button" } onClick={e => {props.setIsPhone(true);props.setFull(false); handleClick()}}>
                                <div className="left">
                                    모바일
                                </div>
                                <div className="right">
                                    <Phone size="25" />
                                </div>
                            </span>
                            <span className={props.full ? "device-button clicked" : "device-button" } onClick={e => {
                                if(state.isPhone){
                                    return
                                }else{
                                props.setFull(true); 
                                handleClick()
                                }   
                            }}>
                                <div className="left">
                                    전체화면
                                </div>
                                <div className="right">
                                    <Fullscreen size="25" />
                                </div>
                            </span>
                            <span className={!props.isPhone && !props.full ? "device-button clicked" : "device-button" } onClick={e => {props.setIsPhone(false);props.setFull(false); handleClick()}}>
                                <div className="left">
                                    PC
                                </div>
                                <div className="right">
                                    <Monitor size="25" />
                                </div>
                            </span>
                        </div>
                    </PopoverBody>
                </PopoverContent>
                </Popover>
            </div>
            )
    }

    return (
        <ChakraProvider>
            <div className="make-page-nav">
                <div className="make-page-nav-half" style={{justifyContent: 'start', marginLeft:'1%'}}>
                    <span className={state.secNum === 52 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(52); 
                    }} >
                        기본 설정
                    </span>
                    <span className={state.secNum === 53 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(53);
                    }} >
                        페이지 구성
                    </span>
                </div>
                <div className="make-page-nav-half">
                    <div className="centera">
                        <Button onClick={() => moveToMain()} className="edit-nav-home-button">
                            Surfee
                        </Button>
                    </div>
                </div>
                <div className="make-page-nav-half" style={{justifyContent: 'end', marginRight:'1%'}}>
                    {deviceSelect()}
                    <Button onClick={() => onSubmit()} className="default-button-02">
                        저장하기
                    </Button>
                </div>
            </div>
            <LoginModal open={loginModal} setOpen={setLoginModal} />
        </ChakraProvider>
    )
}

export default NavBarInMakePage
