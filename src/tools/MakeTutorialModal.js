import React, {useState, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import Info1 from '../tools/info/editTutorial/1.png'
import Info2 from '../tools/info/editTutorial/2.png'
import Info3 from '../tools/info/editTutorial/3.png'
import Info4 from '../tools/info/editTutorial/4.png'
import Info5 from '../tools/info/editTutorial/5.png'
import Info6 from '../tools/info/editTutorial/6.png'
import Info7 from '../tools/info/editTutorial/7.png'

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
  width: 700,
  height: 500,
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

function MakeTutorialModal({open, setOpen}) {
    const [page, setPage] = useState(1)

    const toPrev = () => {
        if(page>1)
            setPage(page-1)
        else
            return
    }

    const toNext = () => {
        if(page<4)
            setPage(page+1)
        else return
    }

    const returnTutorials = () => {
        switch(page){
            case 1: return ( 
                <div>
                    <div className="sub-text">
                        안녕하세요! Surfee를 사용해주셔서 감사합니다.
                    </div>
                    <div className="card-container">
                        <div className="card">
                            <img className="card-img" src={Info1} alt="1" />
                            <Desc>하나의 페이지는 여러 개의 섹션으로 구성되며,</Desc>
                        </div>
                        <div className="card">
                            <img className="card-img" src={Info2} alt="2" />
                            <Desc>페이지 구성에서 섹션을 생성하고 삭제할 수 있습니다.</Desc>
                        </div>
                    </div>
                </div>)

            case 2: return ( <div>
                <div className="sub-text" />
                    <div className="card-container">
                        <div className="card">
                            <img className="card-img" src={Info3} alt="3" />
                            <Desc>페이지 수정을 위해서 디자인은 왼쪽의 제작화면에서,</Desc>
                        </div>
                        <div className="card">
                            <img className="card-img" src={Info4} alt="4" />
                            <Desc>글과 아이콘 등은 오른쪽의 화면에서 수정할 수 있습니다.</Desc>
                        </div>
                    </div>
                </div>)

            case 3: return ( <div>
                <div className="sub-text" />
                    <div className="card-container">
                        <div className="card">
                            <img className="card-img" src={Info5} alt="5" />
                            <Desc>기본 설정에서 사이트 제작에 필수적인 정보와</Desc>
                        </div>
                        <div className="card">
                            <img className="card-img" src={Info6} alt="6" />
                            <Desc>폰트 및 버튼 디자인을 수정할 수 있습니다.</Desc>
                        </div>
                    </div>
                </div>)

            case 4: return ( <div>
                    <div className="card-container">
                        <div className="card">
                            <img className="card-img" src={Info7} alt="7" />
                            <Desc>제작 완료 시 오른쪽 위의 저장하기를 눌러 페이지를 저장하면 제작이 완료됩니다.</Desc>
                        </div>
                    </div>
                <div className="sub-text">
                Surfee와 함께 3분 만에 쉽고 빠르게 랜딩페이지 제작을 완료해보세요!
                </div>
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
                            <div className="modal-text-title">
                                사용 방법
                            </div>
                        </div>
                        <div className="modal-close-button" onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                    </div>
                    <div className="tutorial-box">
                        {returnTutorials()}
                    </div>
                    <div className="prev-next-buttons">
                        {
                            page === 4 ? 
                            <>
                                <div className="modal-move-button-back uphover" onClick={e => setPage(page - 1)} style={{visibility:`${page === 1 ? 'hidden' : 'visible'}`}}>이전</div>
                                <div className="modal-move-button uphover" onClick={() => {setOpen(false); setPage(1)}}>제작하러 가기</div>
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
