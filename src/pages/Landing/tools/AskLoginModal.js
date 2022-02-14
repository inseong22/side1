import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import {Link} from 'react-router-dom'
import './AskLoginModal.css'

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
  height: 300,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:'20px',
  p: 2,
  px: 4,
  pb: 3,
};

function AskLoginModal({open, setOpen, SomeoneClickMoveToMake}) {
    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => setOpen(!open)}
                BackdropComponent={Backdrop}>
                <Box sx={style}>
                    <div className="modal-top__title">
                        <div className="centera" style={{width:"95%"}}>
                            
                        </div>
                        <div style={{width:"5%", cursor:"pointer"}} onClick={() => setOpen(false)}>
                            <Close size="30" color="#C4CACF"/>
                        </div>
                    </div>
                    <div className="centeras">
                        <div className="section-login-modal__container">
                            <div className="modal-body">
                                로그인 하시면 만들던 페이지를 나중에 <br/>이어서 만들 수 있습니다.<br/><br/>
                                로그인 하시겠습니까?
                            </div>
                            <div className="center-column" style={{height:'30%'}}>
                                <Link to='/login' className="ask-modal-button">
                                    네 ( 로그인/회원가입 하러 가기 ) 
                                </Link>
                                <Link to={{
                                    pathname:`/make`,
                                    state:{
                                        newMake:true,
                                    }}}  
                                    className="ask-modal-button button-second" onClick={() => SomeoneClickMoveToMake()}>
                                    오늘은 구경만 할게요 ( 비회원으로 이용하기 )
                                </Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default AskLoginModal
