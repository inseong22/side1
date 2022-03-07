import React from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import './ConfirmCustom.css'

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
  border-radius:10px;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: '33vw',
  height: '30vh',
  bgcolor: 'rgba(255,255,255,1)',
  border: '0px solid #000',
  flexDirection:'column',
  p: 2,
  px: 4,
  pb: 3,
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:'5px',
  position:'relative',
  fontFamily:'Noto Sans KR'
}


function ConfirmCustom({open, setOpen, message, callback, warn}) {
    return (
        <div>
        <StyledModal    
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
                <div className="center-column confirm-message" style={{height:'80%'}}>
                    {
                        warn && 
                        <div style={{marginBottom:'12px'}}>
                            주의
                        </div>
                    }
                    <div>
                        {message}
                    </div>
                </div>
                {
                    warn ? 
                    <div className="center-row confirm-button__container">
                        <button className="confirm-button" style={{border:'1px solid #6C63FF', color:'#6C63FF'}} onClick={() => {callback(); setOpen(false)}}>
                            예
                        </button>
                        <button className="confirm-button" style={{backgroundColor:'#6C63FF', color:'white'}} onClick={() => {setOpen(false)}}>
                            아니오
                        </button>
                    </div>
                    :

                    <div className="center-row confirm-button__container">
                        <button className="confirm-button" style={{border:'1px solid #6C63FF', color:'#6C63FF'}} onClick={() => {setOpen(false)}}>
                            아니오
                        </button>
                        <button className="confirm-button" style={{backgroundColor:'#6C63FF', color:'white'}} onClick={() => {callback(); setOpen(false)}}>
                            예
                        </button>
                    </div>
                }
            </Box>
        </StyledModal>
        </div>
    )
}

export default ConfirmCustom
