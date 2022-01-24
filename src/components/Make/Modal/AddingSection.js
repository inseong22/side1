import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {base} from '../SectionTypes/baseTypes'
import './AddingSection.css'

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
  width: 700,
  height: 500,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:2,
  p: 2,
  px: 4,
  pb: 3,
};

function AddingSection({open, setOpen}) {
    const [cnum, setCnum] = useState(1);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={() => setOpen(!open)}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <div className="modal-top__title">
                        <div className="centera" style={{width:"99%"}}>
                            섹션 추가
                        </div>
                        <div style={{width:"1%", cursor:"pointer"}} onClick={() => setOpen(false)}>
                            x
                        </div>
                    </div>
                    <div className="section-modal__container">
                        {base.map((item,index) => {
                            return(
                                <div className="section-modal__button" key={index}>
                                    {item.sectionTypeName}
                                </div>
                            )
                        })} 
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default AddingSection
