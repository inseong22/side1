import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';

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
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  height: 400,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:2,
  p: 2,
  px: 4,
  pb: 3,
};

function MakeTutorialModal({open, setOpen}) {
    const [page, setPage] = useState(1)

    const returnTutorials = () => {
        switch(page){
            case 1: return ( <div>
                    
                </div>)

            case 2: return ( <div>
                
                </div>)

            case 3: return ( <div>
                
                </div>)

            case 4: return ( <div>
                
                </div>)

            default:
                return(
                    <div>
    
                    </div>
                )
        }
    }

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
                        <div className="centera">
                            사용방법
                        </div>
                        <div className="modal-close-button" onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <div>
                        {returnTutorials()}
                    </div>
                    <div>
                        <div>이전</div>
                        <div>다음</div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default MakeTutorialModal
