import React from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {Link} from 'react-router-dom'
import invoice from '../../tools/img/main/invoice.webp'
import tablet from '../../tools/img/main/tablet.webp'

const Card = styled('div')`
    
`

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
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  height: 400,
  bgcolor: 'rgba(240,240,240,1)',
  color:'black',
  borderRadius:'6px',
  p: 2,
  px: 4,
  pb: 3,
  fontSize:'12px',
};

function ChoiceModal({open, setOpen, newTab}) {
    return (
        <div>
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={() => setOpen(!open)}
            BackdropComponent={Backdrop}>
            <Box sx={style}>
                <div className="centera" style={{fontFamily:'Pretendard', flexDirection:'column'}}>
                    <div style={{fontSize:'22px', textAlign:'center'}}>
                        제작이 어려우신가요?<br/>그렇다면 아래의 방법을 활용해보세요!
                    </div>
                    {
                        newTab ?
                        <div className="centero" style={{flexDirection:'row', marginTop:'20px'}}>
                            <button onClick={() => window.open('https://surfee.co.kr/surfeeexamples', '_blank')} className="main__button5 uphover" style={{width:'190px', display:'flex', flexDirection:'column', padding:'18px 10px'}}>
                                <img src={tablet} style={{width:'80%'}} />
                                <div style={{textAlign:'center', color:'black', fontWeight:'500'}}>
                                    디자인이 된 <strong>템플릿</strong>을<br/><strong>사용해서 완성</strong>하기
                                </div>
                            </button>
                            <button onClick={() => window.open('https://surfee.co.kr/sourcing', '_blank')} className="main__button5 uphover" style={{width:'190px', display:'flex', flexDirection:'column', padding:'18px 10px'}}>
                                <img src={invoice} style={{width:'80%'}} />
                                <div style={{textAlign:'center', color:'black', fontWeight:'500'}}>
                                    <strong>의뢰서만 작성</strong>하고<br/>Surfee에게 <strong>제작 의뢰</strong>하기
                                </div>
                            </button>  
                        </div>
                        :
                        <div className="centero" style={{flexDirection:'row', marginTop:'20px'}}>
                            <Link to='surfeeexamples' className="main__button5 uphover" style={{width:'190px', display:'flex', flexDirection:'column', padding:'18px 10px'}}>
                                <img src={tablet} style={{width:'80%'}} />
                                <div style={{textAlign:'center', color:'black', fontWeight:'500'}}>
                                    디자인이 된 <strong>템플릿</strong>을<br/><strong>사용해서 완성</strong>하기
                                </div>
                            </Link>
                            <Link to='/sourcing' className="main__button5 uphover" style={{width:'190px', display:'flex', flexDirection:'column', padding:'18px 10px'}}>
                                <img src={invoice} style={{width:'80%'}} />
                                <div style={{textAlign:'center', color:'black', fontWeight:'500'}}>
                                    <strong>의뢰서만 작성</strong>하고<br/>Surfee에게 <strong>제작 의뢰</strong>하기
                                </div>
                            </Link>  
                        </div>
                    }
                </div>
            </Box>
        </StyledModal>
        </div>
    )
}

export default ChoiceModal
