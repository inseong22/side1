import React, {useState} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Close } from '@styled-icons/evaicons-solid';
import './FeedbackModal.css';
import {base} from '../components/Make/SectionTypes/baseTypes'
import lodash from 'lodash'

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
    width: 800,
    height: 620,
    bgcolor: 'white',
    boxShadow: '18px 18px 36px rgba(0, 0, 0, 0.15), inset 6px 4px 16px rgba(108, 99, 255, 0.1), inset -12px -8px 16px rgba(108, 99, 255, 0.25)',
    borderRadius:2,
    p: 2,
    px: 4,
    pb: 3,
  };

function FeedbackModal({open, setOpen, setFeedback, deploy}) {
    const [quest, goQuest] = useState(false);
    const [page, setPage] = useState(1);
    const [complete, setComplete] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [path, setPath] = useState('');
    const [difficul, setDifficul] = useState('');
    const [inconv, setInconv] = useState('');
    const [satisfy, setSatisfy] = useState('');
    const [time, setTime] = useState('');
    const [func, setFunc] = useState('');
    const [comment, setComment] = useState('');
    const [recom, setRecom] = useState('');

    const toPrev = () => {
        if(page>1)
            setPage(page-1)
        else
            return
    }

    const toNext = () => {
        if(page<8 && clicked)
           {
               setPage(page+1);
               setClicked(false);
           }
        else return
    }

    const toComplete = () => {
        if(clicked)
        {
            setComplete(true)
            goQuest(false)
            setClicked(false)
            
        }
        else return
    }

    const pathList = [
        {label: '카카오톡 오픈채팅방', value: 'Kakao'},
        {label: '디스콰이엇', value: 'Disquiet'},
        {label: '지인 추천', value: 'Recommend'},
        {label: '기타', value: 'etc'},
    ]

    const diffList = [
        {label: '1', value: '1'},{label: '2', value: '2'},{label: '3', value: '3'},{label: '4', value: '4'},{label: '5', value: '5'},
    ]

    const recommendList = [
        {label: '1', value: '1'}, {label: '2', value: '2'}, {label: '3', value: '3'}, {label: '4', value: '4'}, {label: '5', value: '5'}, {label: '6', value: '6'}, {label: '7', value: '7'},  {label: '8', value: '8'}, {label: '9', value: '9'}, {label: '10', value: '10'},
    ]

    const inconvList = [
        {label: '낮은 자유도', value: '낮은 자유도'},
        {label: '섹션 유형의 부족', value:'섹션 유형의 부족'},
        {label: '기능의 오류', value:'기능의 오류'},
        {label: '결과물이 만족스럽지 않음', value:'결과물이 만족스럽지 않음'},
        {label: '기타', value:'기타'},    
    ]

    const satisfyList = [
        {label:'사용이 쉬움', value:'사용이 쉬움'},
        {label:'섹션 유형이 다양함', value:'섹션 유형이 다양함'},
        {label:'결과물이 유용함', value:'결과물이 유용함'},
        {label:'결과물의 디자인', value:'결과물의 디자인'},
        {label:'기타', value:'기타'},
    ]

    const timeList = [
        {label:'5분 미만', value:'사용이 쉬움'},
        {label:'5분 이상 30분 미만', value:'5분 이상 30분 미만'},
        {label:'30분 이상 1시간 미만 ', value:'30분 이상 1시간 미만 '},
        {label:'1시간 이상 3시간 미만', value:'1시간 이상 3시간 미만'},
        {label:'3시간 이상', value:'3시간 이상'},
    ]

    const returnQuestions = () => {
        switch(page){
            case 1: return(
                <>
                <div className="big-title question">
                    어떤 경로를 통해 Surfee를 알게 되셨나요?
                </div>
                <div className="column-ans">
                    {pathList.map(item => (
                        <div className="round-ans-button" onClick={() => {setPath(item.value); setClicked(true);}}>
                        {item.label}
                    </div>
                    ))}
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 2: return(
                <>
                <div className="big-title question">
                Surfee를 통한 랜딩페이지 제작 과정은 어땠나요?
                </div>
                <div className="row-ans">
                    <div className="circle-text">어려움</div>
                    {diffList.map(item => (
                        <div className="circle-ans-button" onClick={() => {setDifficul(item.value); setClicked(true);}}>{item.label}</div>
                    ))}
                    <div className="circle-text">쉬움</div>
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 3: return(
                <>
                <div className="big-title question">
                Surfee를 사용하면서 가장 불편했던 점이 무엇인가요?
                </div>
                <div className="column-ans">
                    {inconvList.map(item=>(
                        <div className="round-ans-button" onClick={() => {setInconv(item.value); setClicked(true);}}>
                        {item.label}
                        </div>
                    ))}
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 4: return(
                <>
                <div className="big-title question">
                Surfee를 사용하면서 가장 만족했던 점이 무엇인가요?
                </div>
                <div className="column-ans">
                    {satisfyList.map(item => (
                        <div className="round-ans-button" onClick={() => {setSatisfy(item.value); setClicked(true);}}>
                        {item.label}
                        </div>
                    ))}
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 5: return(
                <>
                <div className="big-title question">
                제작하는 데 얼마의 시간이 소요되었나요?
                </div>
                <div className="column-ans">
                    {timeList.map(item => (
                        <div className="round-ans-button" onClick={() => {setTime(item.value); setClicked(true);}}>
                        {item.label}
                        </div>
                    ))}
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 6: return(
                <>
                <div className="big-title question">
                추가되면 좋겠다고 생각하는 기능을 자유롭게 남겨주세요!
                </div>
                <div className="text-input">
                <input className="text-input inputbox" onChange={(e)=>{setFunc(e.target.value); setClicked(true);}}/>
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 7: return(
                <>
                <div className="big-title question">
                Surfee를 위해, 여러분의 소중한 의견을 자유롭게 남겨주세요!
                </div>
                <div className="text-input">
                <input className="text-input inputbox" onChange={(e)=>{setComment(e.target.value); setClicked(true);}}/>
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toNext}>다음</div>
                </div>
                </>
            )
            case 8: return(
                <>
                <div className="big-title question">
                마지막으로, Surfee를 주위 친구, 동료, 지인에게 추천할 의향이 얼마나 있나요?
                </div>
                <div className="row-ans" style={{width: '700px'}}>
                    <div className="circle-text">전혀없음</div>
                    {recommendList.map(item => (
                        <div className="circle-ans-button" onClick={()=>{setRecom(item.value); setClicked(true);}}>{item.label}</div>
                    ))}
                    <div className="circle-text">완전있음</div>
                </div>
                <div className="prev-next-fbuttons">
                    <div className="prev-next-fbutton" onClick={toPrev}>이전</div>
                    <div className="prev-next-fbutton" onClick={toComplete}>완료</div>
                </div>
                </>
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
                        <div className="modal-close-button" onClick={() => setOpen(false)}>
                            <Close size="30" />
                        </div>
                        <div className="big-title">Surfee 제작 과정 피드백</div>
                    </div>
                    { quest ? (
                        <>
                            <div className="questnum">Q{page}</div>
                            {returnQuestions()}
                        </> 
                    ) :
                    (<>
                        {
                            complete ? (
                                <>
                                <div className="big-title" style={{color:'black', marginTop: '70px'}}>감사합니다!</div>
                                <div className="big-title sub">
                                    작성해 주신 피드백을 바탕으로 <br />
                                    더 발전하는 Surfee가 되겠습니다 :)
                                </div>
                                <div className="feed-button" style={{width: '167px'}} onClick={()=>{deploy(true)}}>
                                    배포하기
                                </div>
                                </>
                            ):
                            (
                                <>      
                                <div className="big-title" style={{color:'black', marginTop: '70px'}}>제작을 완료하셨나요?</div>
                                <div className="big-title sub">
                                    랜딩페이지를 <span style={{color:`var(--main-color)`}}>무료로 배포</span>하기 전에 <br />
                                    Surfee가 더 나은 서비스를 제공할 수 있도록,<br />
                                    제작 과정에서 느낀 점에 대한 피드백을 부탁드립니다 :)
                                </div>
                                <div className="big-title small-text">
                                    질문은 총 <span style={{color:`var(--main-color)`}}>8</span>개이며, 예상 소요시간은 <span style={{color:`var(--main-color)`}}>1</span>분입니다.
                                </div>
                                <div className="feed-button" onClick={()=>{goQuest(true)}}>
                                    피드백 하고 배포 완료하기
                                </div>
                                </>
                            )
                        }
                    </>)
                    }
                    
                </Box>
            </StyledModal>
        </div>
    )
}

export default FeedbackModal
