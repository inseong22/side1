import React, {useState, useEffect, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import '../../components/Make/Modal/Modal.css';
import './FirstQuestions.css'
import {Link} from 'react-router-dom'
import {dbService} from '../../tools/fbase';
import OverflowScrolling from 'react-overflow-scrolling';
import produce from 'immer';
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
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: '100vw',
  height: '100vh',
  bgcolor: 'rgba(255,255,255,1)',
  border: '0px solid #000',
  flexDirection:'column',
  p: 2,
  px: 4,
  pb: 3,
  display:'flex',
  justifyContent: 'start',
  alignItems: 'center',
//   borderRadius:'20px',
  position:'relative',
}

const StyledModal2 = styled(ModalUnstyled)`
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

const Backdrop2 = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const style2 = {
  width: '30vw',
  height: '80vh',
  bgcolor: 'rgba(255,255,255,1)',
  border: '0px solid #000',
  flexDirection:'column',
  p: 2,
  px: 4,
  pb: 3,
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
//   borderRadius:'20px',
};

const progressList = [
    {
        num:1,
        name:'NAME',
    },
    {
        num:2,
        name:'GOAL',
    },
    {
        num:3,
        name:'DEVICE',
    },
    {
        num:4,
        name:'DESIGN',
    },
    {
        num:5,
        name:'URL',
    },
]

const secondQuestion = [
    {
        typequestion: "🍎 앱 다운로드",
        question : "많은 사람들이 우리의 앱을 다운로드 하면 좋겠어요",
        type:'app',
    },
    {
        typequestion: "✍️ 사전신청",
        question : "사전신청을 많이 받고 싶어요",
        type:'pre',
    },
    {
        typequestion: "💰 판매",
        question : "서비스/제품을 많이 팔고 싶어요",
        type:'sell',
    },
    {
        typequestion: "📚 개인적인 목적",
        question : "멋진 나를 알리고 싶어요",
        type:'portfolio',
    },
]

const fontList = [
    { label: '노토산스', value: 'Noto Sans KR' },
    { label: '프리텐다드', value: 'Pretendard-Regular' },
    { label: '나눔스퀘어 라운드', value: 'NanumSquareRound' },
    { label: '바른 공군', value: 'ROKAFSansBold' },
    { label: '지마켓 산스', value: 'GmarketSansMedium' },
    { label: '고운 돋움', value: 'GowunDodum-Regular' },
    { label: '에스코어 드림', value: 'S-CoreDream-4Regular' },
    { label: '함박눈체', value : 'SF_HambakSnow'},
    { label: '카페24 서라운드', value: 'Cafe24Ssurround'},
    { label: '레페리포인트-Black', value:'LeferiPoint-BlackA'},
    { label: '고운바탕', value : 'GowunBatang-Regular'},
    { label: '여기어때 잘난체', value: 'yg-jalnan'},
]
const colorList = [
    {
        name:'검',
        color:'rgba(0,0,0,1)',
    },
    {
        name:'차분',
        color:'rgba(255,255,255,1)',
    },
    {
        name:'노',
        color:'rgba(0,255,255,1)',
    },
    {
        name:'빨',
        color:'rgba(250,0,0,1)',
    },,
    {
        name:'초',
        color:'rgba(0,250,0,1)',
    },,
    {
        name:'파',
        color:'rgba(0,0,250,1)',
    },
]

function FirstQuestions({type, foot, setFoot, setType, open, setOpen, navi, setNavi, setting, setSetting}) {
    // 모달
    const [cnum, setCnum] = useState(1);
    const [title, setTitle] = useState("");
    const [device, setDevice] = useState("");
    const [font, setFont] = useState('');
    const [color, setColor] = useState('');
    const [tmodalOpen, setTmodalOpen] = useState(false);

    useEffect(() => {
        console.log("리렌더링")
    }, [])

    const handleClose = async () => {
        // 마지막에는 입력한 정보도 저장한다. 근데 한명껄 여러번 저장해서 헷갈리지 않게..!

        await dbService.collection('question_answers').add({
            createdAt: new Date(),
        })
        setOpen(false)
    };

    const onUrlChange = e => {
        if (isNotNumber(e.nativeEvent.data)){ 
            setSetting(produce(setting, draft => {
                draft.urlId = e.currentTarget.value
            }))
        }else{
            e.preventDefault(); 
            return null; 
        }
    }

    const nextAndSetTemplates = async (e) => {
        if(type === ""){
            alert("위의 보기 중 한가지를 선택해 주세요.");
            return
        }else{
            setCnum(cnum + 1);
        }
    }

    const nextAndSetTemplate = async (e) => {
        if(device === ""){
            alert("위의 보기 중 한가지를 선택해 주세요.");
            return
        }else{
            setCnum(cnum + 1);
        }
    }

    const nextAndSetFont = async e => {
        if(font === '' || color === ''){
            alert("위의 보기 중 한가지를 선택해주세요.");
            return
        }else{
            setSetting(produce(setting, draft => {
                draft.font = font;
                draft.color = color;
            }))
            setCnum(cnum + 1);
        }
    }
    const nextAndSetDone = async e => {

        const urlDatas = await dbService
            .collection("urlStores")
            .where("urlId", "==", setting.urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let urlData = urlDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(setting.urlId === ''){
            alert("URL을 입력해 주세요. 이후 페이지에서 수정가능합니다.");
            return
        }else if(urlData.length > 0){
            alert("이미 존재하는 url입니다. 다른 url을 사용해 주세요.");
            return;
        }else{
            
            const body = {
                type: type,
                name: navi.title,
                font: font,
                color:color
            }

            const done = await dbService.collection('after-questions').add(body);

            setNavi(produce(navi, draft => {
                draft.title = title;
            }))

            setSetting(produce(setting, draft => {
                draft.title = title;
            }))

            setFoot(produce(foot, draft => {
                draft.copyright.text = title;
            }))

            handleClose();
        }
    }

    const ModalBox = (props) => {
        return(
            <div className="modal-flex-column">
                <div className="modal-title">
                    {props.title}
                </div>
                <div className="modal-main-card">
                    {props.children}
                </div>
            </div>
        )
    }

    const isNotNumber = (v) => {
        const regExp = /[a-zA-Z0-9]/g; 
        return regExp.test(v);
    }

    const content = () => {
        switch(cnum){
            case 1:
                return(
                    <div className="modal-flex-column">
                        <div className="modal-title">
                            안녕하세요, <span style={{color:'#6C63FF'}}>Surfee</span>에 오신 것을 환영합니다!<br/>
                            당신의 서비스 / 제품 명을 알려주세요.
                        </div>
                        <div className="modal-main-card">
                        {/* <form onSubmit={() => setCnum(cnum + 1)} style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}> */}
                        <Input 
                            className="input-holder input-focus" 
                            placeholder="서비스/제품 명이 로고 자리에 들어갑니다." 
                            value={title} 
                            onChange={e => setTitle(e.currentTarget.value)} />
                        {/* </form> */}
                        <div className="modal-mini-text">
                            수정 가능하니 편하게 정해주세요 :)
                        </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button"
                                onSubmit={e => setCnum(cnum + 1)} style={{visibility:`${title.length > 0 ? 'visible' : 'hidden'}`, display:'flex'}} 
                                onClick={e => setCnum(cnum + 1)}>다음</div>  
                            </div>
                        </div>
                    </div>
                )
                break;

            case 2:
                return(
                    <ModalBox 
                        title={<><span style={{color:'#6C63FF'}}>{title}</span>의 랜딩페이지는 다음 중 어떤 목표를 향하고 있나요? 🚀</>}>
                        <>
                            <div className="modal-row">
                            {
                                secondQuestion.map((item, index) => {
                                    let color = 'none';
                                    if(item.type === type){
                                        color = '1px solid #A89AFF';
                                    }
                                    return(
                                        <div className="template__card uphover" onClick={() => {setType(item.type);}} key={index} 
                                            style={{border:`${color}`}}>
                                            <div style={{fontSize:'18px'}}>
                                                {item.typequestion}
                                            </div>
                                            <div style={{marginTop:'4%', fontSize:'16px'}}>
                                                {item.question}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className="modal-button-container">
                                <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전</div>
                                <div className="modal-move-button" onClick={e => nextAndSetTemplates()}>다음</div>  
                            </div>
                        </>
                    </ModalBox>
                )
                break;

            case 3:
                return(
                    <ModalBox title={<>
                        <span style={{color:'#6C63FF'}}>{title}</span>의 랜딩페이지는 주로 어떤 화면으로 보여질까요?
                    </>}>
                        <div className="modal-row" style={{flexWrap:'nowrap'}}>
                            <div className="template__card uphover"
                                onClick={() => {
                                    setDevice('pc')
                                }}
                                style={{border: `${device === 'pc' ? '1px solid #A89AFF' : 'none'}`, textAlign: 'center', padding:'50px 30px'}} >
                                <div>
                                    🖥 PC<br/><br/> PC 화면을 중심으로 편집하고<br/> 모바일 화면은 간단한 수정만 가능해요.
                                </div>
                            </div>
                            <div className="template__card uphover"
                                onClick={() => {
                                    setDevice('mobile')
                                }}
                                style={{border: `${device === 'mobile' ? '1px solid #A89AFF' : 'none'}`, textAlign: 'center', padding:'50px 30px'}} >
                                <div>
                                    📱모바일<br/><br/> 모바일 화면을 중심으로 편집하고<br/> PC 화면은 간단한 수정만 가능해요.
                                </div>
                            </div>
                        </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전</div>
                            <div className="modal-move-button" onClick={e => nextAndSetTemplate()}>다음</div>  
                        </div>
                    </ModalBox>
                )

            case 4:
                return(
                    <ModalBox title={<>
                        좋아요! 디자인은 어떻게 할까요? 🤔</>}>
                            <div className="modal-row" style={{flexWrap:'nowrap'}}>
                            <div className="modal-column">
                                <div>
                                    폰트를 선택해 주세요.
                                </div>
                                <OverflowScrolling className="font-selections__container">
                                    {fontList.map((item, index) => {
                                        return(
                                            <div className="template__card uphover" key={index}
                                                onClick={() => {
                                                    setFont(item.value);
                                                }}
                                                style={{border: `${font === item.value ? '1px solid #A89AFF' : 'none'}`, 
                                                fontFamily:`${item.value}`, 
                                                padding:'5% 3%'}}
                                            >
                                                <div>
                                                    {item.label}
                                                </div>
                                                <div style={{marginTop:'2%'}}>
                                                    노코드 랜딩페이지 제작 툴, Surfee
                                                </div>
                                            </div>
                                        )
                                    })}
                                </OverflowScrolling>
                            </div>
                            <div className="modal-column">
                                <div>
                                    색상을 선택해 주세요.
                                </div>
                                <OverflowScrolling className="font-selections__container">
                                    {colorList.map((item, index) => {
                                        let bor = 'none';
                                        if(item.color === color){
                                            bor = '1px solid #A89AFF';
                                        }
                                        return(
                                            <div className="template__card uphover" key={index}
                                                onClick={() => {
                                                    setColor(item.color);
                                                }}
                                                style={{border: `${bor}`, padding:'5% 3%'}}
                                            >
                                                <div style={{backgroundColor:`${item.color}`, width:'50px', height:'50px', borderRadius:'10px'}}>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })}
                                </OverflowScrolling>
                            </div>
                            </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전</div>
                            <div className="modal-move-button" onClick={() => nextAndSetFont()}>다음</div>
                        </div>
                    </ModalBox>
                )
                break;

            case 5:
                return(
                    <div className="modal-flex-column">
                        <div className="modal-title">
                            마지막으로, <span style={{color:'#6C63FF'}}>{title}</span> 랜딩페이지의 URL을 설정해 주세요.                            
                        </div>
                        <div className="modal-main-card">
                            <div className="modal-title" style={{fontSize:'25px'}}>
                                <input className="input-holder input-focus" placeholder="영문 소문자와 숫자만 사용 가능합니다." value={setting.urlId} onChange={e => onUrlChange(e)} />.surfee.co.kr
                            </div>
                            <div style={{color:'gray', paddingLeft:'0%',marginTop:'1%', fontSize:'14px', textAlign:'center', fontFamily:'Pretendard-Regular'}}>
                                개인 도메인 연결은 다음 버전에 업데이트할 예정입니다.
                                수정 가능하니 편하게 설정해 주세요 :)
                            </div>
                            <div className="modal-button-container">
                                <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전</div>
                                <div className="modal-move-button" onClick={() => {
                                    nextAndSetDone();
                                }}>시작하기</div>
                            </div>
                        </div>
                    </div>
                )
                break;
        }
    }

    return (
        <div>
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
                <Link to="/" className="arrow-back">
                    ←
                </Link> 
                <div className="progress-bar__container">
                    {progressList.map((item, index) => {
                        let backColor = 'rgba(100,100,100,0.2)'
                        let fontColor = '#C4C4C4'
                        let fontColor2 = 'rgba(0,0,0,0.6)'

                        if(item.num < cnum){
                            backColor = 'linear-gradient(180deg, #9281FF 0%, #6C63FF 100%)'
                            fontColor = "white"
                            fontColor2 = 'black'
                        }else if(item.num === cnum){
                            backColor = 'white'
                            fontColor = "#6C63FF"
                            fontColor2 = "#6C63FF"
                        }

                        return(
                            <span style={{display:'flex', flexDirection:'column', margin:'3%', alignItems: 'center', justifyContent: 'center'}}>
                                <span className="list-component" style={{background:`${backColor}`, color:`${fontColor}`, border:`1px solid ${fontColor}`}}>{item.num}</span>
                                <span style={{fontSize:'12px', color:`${fontColor2}`, marginTop:'7px'}}>{item.name}</span>
                            </span>
                        )
                    })}
                </div>
                <div className="center-column">
                    {content()}
                </div>
            </Box>
        </StyledModal>

        <StyledModal2
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={tmodalOpen}
            onClose={() => setTmodalOpen(false)}
            BackdropComponent={Backdrop2}
        >
            <Box sx={style2}>
                <>
                템플릿
                </>
            </Box>
        </StyledModal2>

        </div>
    )
}

export default FirstQuestions
