import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {Link} from 'react-router-dom'
import { Input } from 'antd';

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
  background-color: rgba(0, 0, 0, 0.5);
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


function TemplateModal({open, setOpen, url}) {
    const [alarm, setAlarm] = useState(false);
    const [urlId, setUrlId] = useState('')

    const isNotNumber = (v) => {
        const regExp = /[a-z0-9]/g; 
        return regExp.test(v);
    }

    const onUrlChange = e => {
        if (isNotNumber(e.nativeEvent.data)){ 
            setAlarm(false)
            setUrlId(e.currentTarget.value);
        }else{
            setAlarm(true)
            e.preventDefault(); 
            return null; 
        }
    }

    return (
        <div>
        <StyledModal    
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={() => {setOpen(!open); setUrlId('')}}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
                <div style={{fontWeight:'700'}}>
                    템플릿으로 페이지 제작
                </div>
                <div className="modal-title" style={{fontSize:'17px'}}>
                    surfee.co.kr/<input className="input-holder input-focus" style={{width: '18vw', padding:'10px 15px', marginLeft: '10px', fontSize:'15px'}} placeholder="URL" value={urlId} 
                    onChange={e => {
                        onUrlChange(e);
                    }} />
                </div>
                {alarm ? (
                    <div className="text-alarm">
                        ⚠ 영문 소문자와 숫자만 사용가능합니다.
                    </div>
                ):(<div className="text-alarm"> </div>)}
                {/* <Input 
                    className="input-holder input-focus" 
                    placeholder="사용할 url을 입력해주세요." 
                    value={urlId} 
                    onChange={e => setUrlId(e.currentTarget.value)} /> */}
                {
                    urlId.length === 0 ? 

                    <div className="section-add__button" onClick={() => alert("사용할 url을 입력해주세요.")}>
                        템플릿 생성하기
                    </div>
                    :
                    <Link className="section-add__button" to={{
                        pathname:`/make`,
                        state:{
                            template:true,
                            templateNum:url,
                            urlId:urlId
                        }}}>
                        템플릿 생성하기
                    </Link>

                }
            </Box>
        </StyledModal>
        </div>
    )
}

export default TemplateModal
