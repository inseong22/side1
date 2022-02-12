import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import "@lottiefiles/lottie-player";

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
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 300,
  width: 300,
  bgcolor: 'rgba(255,255,255,0)',
  border: '0px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

function LoadingModal({loading, setLoading}) {

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={loading}
                BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets7.lottiefiles.com/packages/lf20_8y9IYf.json"
                    style={{width:'320px'}}
                >
                </lottie-player>
              </Box>
            </StyledModal>
        </div>
    )
}

export default LoadingModal
