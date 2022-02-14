import React, {useContext, useState} from 'react';
import { Input, Button } from 'antd';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import CheckModal from '../../../components/Make/Modal/CheckModal'
import {Monitor} from '@styled-icons/feather'
import { Phone } from '@styled-icons/bootstrap'
import {Fullscreen} from '@styled-icons/bootstrap'
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
import { dbService } from '../../../tools/fbase';
import { stService } from '../../../tools/fbase';

const NavBarInMakePage = (props) => {
    const [loginModal, setLoginModal] = useState(false)
    const {state, action} = useContext(MyContext)
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [deviceOpen, setDeviceOpen] = useState(false);
  
    const handleClick = () => {
        setDeviceOpen(!deviceOpen);
    };
  
    const handleClose = () => {
        setDeviceOpen(false);
    };

    const moveToMain = () => {
        
        window.location.replace('/');
    }
    
    const onSubmit = async () => {
        // 배포하기 클릭
        // 관리페이지에서 수정하기를 누른 거라면
        console.log(props.userObj)
        if(props.userObj === null){
            alert("로그인 하셔야 저장 후 배포하실 수 있습니다.");
            props.setLoading(false);
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
                            <span className={props.full ? "device-button clicked" : "device-button" } onClick={e => {props.setFull(true); handleClick()}}>
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
                    {/* <Button onClick={e => props.setOpen(!props.open)}>설명 다시보기</Button> */}
                    <span className={state.secNum === 52 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(52); 
                    }} >
                        기본설정
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
                {/* <ConfirmCustom open={open} setOpen={setOpen} message={"홈"} callback={deletePage}/> */}
                {/* <CheckModal ch={checkModalOpen} setCh={setCheckModalOpen} onSubmit2={onSubmitFromCheckModal}/> */}
            </div>
        </ChakraProvider>
    )
}

export default NavBarInMakePage
