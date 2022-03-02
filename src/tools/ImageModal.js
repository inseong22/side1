import React from 'react'
import iconscouts from './img/iconscouts.json';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import OverflowScrolling from 'react-overflow-scrolling';

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
  width: 800,
  height: 500,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:2,
  p: 2,
  px: 4,
  pb: 3,
};

function ImageModal({open, setOpen}) {
    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={() => setOpen(!open)}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
            <OverflowScrolling className='overflow-scrolling'>
                {iconscouts.response.items.data.map((item) => {
                    return(
                        <img src={item.urls.svg} />
                    )
                })}
            </OverflowScrolling>
            </Box>
        </StyledModal>
    )
}

export default ImageModal
