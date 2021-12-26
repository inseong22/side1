import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Input } from 'antd';
import Checkbox from '@mui/material/Checkbox';
import {dbService} from '../../../tools/fbase'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
  width: '600px',
  height: '500px',
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius: '5px',
  p: 2,
  px: 4,
  pb: 3,
};

function CheckModal({ch, setCh, onSubmit2}) {
    const [myYes, setMyYes] = useState(false);
    const [email, setEmail] = useState("");
    const [feedback1, setFeedback1] = useState("");

    const submitDone = () => {
        if(!myYes){
            alert("상기의 사항에 대해서 동의한 경우에만 신청이 진행될 수 있습니다!")
            return;
        }else if(email.length < 3){
            alert("이메일 양식에 맞게 작성해주시기 바랍니다.")
            return;
        }else{
            // 피드백 입력 받아서 저장. 입력한 내용이랑 현재 유저의 이메일, 현재 제작한 랜딩페이지의 아이디
            dbService.collection('make-feedback').add({
                feedback1:feedback1
            })

            onSubmit2();
            setCh(!ch);
        }
    }

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={ch}
                onClose={() => setCh(!ch)}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <div className="check-container">
                        <div className="check-title">
                        안내창
                        </div>

                        <div className="check-desc">
                            이메일을 기입하고 체크박스 체크 후 ‘제출하기’를 누르면 <br/>
                            12시간 내에 완성된 페이지와 데이터 분석 페이지를 메일로 보내드립니다. <br/>
                            페이지는 Surfee 베타 서비스 기간인 12월00일까지 무료로 제공되며 <br/>
                            00일부터 디벨롭 과정을 거친 후 빠른 시일 내에 다시 돌아오겠습니다!
                        </div>

                        <div className="check-form-container">
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <span>이메일</span>
                                <Input style={{width:'60%'}} tyle="text" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                            </div>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <span>피드백 질문 1</span>
                                <Input style={{width:'60%'}} tyle="text" value={feedback1} onChange={e => setFeedback1(e.currentTarget.value)}/>
                            </div>
                            <div style={{marginTop:'20px', display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Checkbox color="secondary" type="checkbox" value={myYes} onChange={e => setMyYes(!myYes)}/>
                                <span style={{marginLeft:'10px'}}> 개인정보 수집/이용에 동의합니다.</span>
                            </div>
                        </div>
                        <div>
                            <button className="check-button" onClick={e => submitDone()}>제출하기</button>
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default CheckModal
