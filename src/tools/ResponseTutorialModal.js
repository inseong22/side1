import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import rt1 from './img/tutorial/rt1.png'
import rt2 from './img/tutorial/rt2.png'
import rt3 from './img/tutorial/rt3.png'
import rt4 from './img/tutorial/rt4.png'

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
  width: 600,
  height: 550,
  bgcolor: 'rgba(255,255,255,1)',
  borderRadius:2,
  p: 2,
  px: 4,
  pb: 3,
};
const Desc = styled('div')`
    margin-top:12px;
    font-size:14px;
    text-align:center;
`;

const Bold = styled('span')`
    color:var(--main-color);
`

function MakeTutorialModal({open, setOpen}) {
    const [page, setPage] = useState(1)

    const ModalBody = (props) => {
        return(
            <div className="center-row">
                <div className="center-column" style={{fontSize:'16px'}}>
                    {props.children}
                </div>
            </div>
        )
    }

    const returnTutorials = () => {
        switch(page){
            case 1: return ( 
                <ModalBody>
                    <div style={{textAlign:'center', margin:'12px 0px'}}>
                    안녕하세요 관리페이지에 오신 것을 환영합니다!<br/>
                    관리페이지에서는 <Bold>페이지 생성 및 삭제</Bold> 그리고 배포한 페이지에 대한 <br/>
                    <Bold>데이터를 확인</Bold>할 수 있습니다.
                    </div>
                    <img src={rt1} style={{width:'60%', border:'1px solid var(--main-light-gray-02', boxShadow:'2px 4px 20px #E8F0F9'}}/>
                    <Desc>
                        우선, 새로운 랜딩페이지 만들기 버튼을 눌러 페이지 제작을 시작합니다.
                    </Desc>
                </ModalBody>
            )

            case 2: return ( 
                <ModalBody>
                    <img src={rt2} style={{width:'70%', border:'1px solid var(--main-light-gray-02', boxShadow:'2px 4px 20px #E8F0F9'}}/>
                    <Desc>
                        제작을 완료한 페이지가 있다면 '배포하기' 버튼을 클릭한 뒤<br/>
                        실제 페이지로 사용할 수 있습니다.
                    </Desc>
                </ModalBody>)

            case 3: return ( 
                <ModalBody>
                    <img src={rt3} style={{width:'70%', border:'1px solid var(--main-light-gray-02', boxShadow:'2px 4px 20px #E8F0F9'}}/>
                    <Desc>
                        페이지와 관련된 데이터들은 <br/>
                        구글 애널리틱스의 업데이트 주기에 맞춰 30분 마다 갱신됩니다.<br/>
                        내 랜딩페이지에 접속한 유저가 행동한 데이터는 실시간으로 확인이 가능합니다.
                    </Desc>
                </ModalBody>)

            case 4: return ( 
                <ModalBody>
                    <img src={rt4} style={{width:'70%', border:'1px solid var(--main-light-gray-02', boxShadow:'2px 4px 20px #E8F0F9'}}/>
                    <Desc>
                        한 계정당 최대 3개의 페이지를 제작할 수 있습니다. <br/>
                        같은 서비스라도 각기 다른 내용으로 여러개의 페이지를 만들고,<br/>
                        각각에 대한 전환율을 확인해보세요!
                    </Desc>
                </ModalBody>)

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
                            Surfee 사용방법
                        </div>
                        <div className="modal-close-button" onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <div className="centera" style={{height:'70%'}}>
                        {returnTutorials()}
                    </div>
                    <div className="modal-button-container">
                        {
                            page === 4 ? 
                            <>
                                <div className="modal-move-button-back uphover" onClick={e => setPage(page - 1)} style={{visibility:`${page === 1 ? 'hidden' : 'visible'}`}}>이전</div>
                                <div className="modal-move-button uphover" onClick={() => {setOpen(false); setPage(1)}}>Surfee와 함께하기</div>
                            </>
                            :
                            <>
                                <div className="modal-move-button-back uphover" onClick={e => setPage(page - 1)} style={{visibility:`${page === 1 ? 'hidden' : 'visible'}`}}>이전</div>
                                <div className="modal-move-button uphover" onClick={e => setPage(page + 1)}>다음</div>  
                            </>
                        }
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default MakeTutorialModal
