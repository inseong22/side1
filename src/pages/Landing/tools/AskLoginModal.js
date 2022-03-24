import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import {Link} from 'react-router-dom'
import d1 from '../../../tools/img/main/3d1.png'
import d2 from '../../../tools/img/main/3d2.png'
import d3 from '../../../tools/img/main/3d3.png'
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
  height: 400,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:'10px',
  p: 2,
  px: 4,
  pb: 3,
};

function AskLoginModal({open, setOpen, SomeoneClickMoveToMake, setRegisterOpen}) {
    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => setOpen(!open)}
                BackdropComponent={Backdrop}>
                <Box sx={style}>
                <div className="ask-modal__inner">
                    <div className="modal-top__title">
                        <div className="login-title" style={{width:"95%"}}>
                            로그인
                        </div>
                        <div style={{width:"5%", cursor:"pointer"}} onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <div className="modal-body">
                        로그인 하시면 만들던 페이지를 나중에 <br/>이어서 만들 수 있습니다.<br/><br/>
                        로그인 하시겠습니까?
                    </div>
                    <div className="center-row" style={{height:'30%', marginTop:'40px'}}>
                        <button className="ask-modal-button uphover" onClick={() => {setRegisterOpen(true); setOpen(false)}}>
                            <img src={d1} width={140} /> 
                            <div>
                                네 <br/>( 로그인/회원가입 하러 가기 ) 
                            </div>
                        </button>
                        <Link to={{
                            pathname:`/questions`,
                            state:{
                                newMake:true,
                            }}}  
                            className="ask-modal-button button-second uphover" onClick={() => SomeoneClickMoveToMake()}>
                            <img src={d2} width={140} /> 
                            <div>
                                오늘은 구경만 할게요 <br/>( 비회원으로 이용하기 )
                            </div>
                        </Link>
                    </div>
                </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default AskLoginModal
