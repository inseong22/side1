import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

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
  bgcolor: 'rgba(255,255,255,0.1)',
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
                  <iframe src="https://giphy.com/embed/tsX3YMWYzDPjAARfeg" width="150" height="230" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/tiktok-bear-tsX3YMWYzDPjAARfeg">via GIPHY</a></p>
                </Box>
            </StyledModal>
        </div>
    )
}

export default LoadingModal
