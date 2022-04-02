import React, {useState, useEffect, useContext} from 'react'
import { styled, Box } from '@mui/system';
import { MyContext } from '../Make/MakePageV2'
import ModalUnstyled from '@mui/base/ModalUnstyled';
import '../../components/Make/Modal/Modal.css';
import './FirstQuestions.css'
import {Link} from 'react-router-dom'
import {dbService} from '../../tools/fbase';
import MiniModal from '../../tools/MiniModal';
import OverflowScrolling from 'react-overflow-scrolling';
import { defaults } from '../../components/Make/SectionTypes/baseTypes'
import produce from 'immer';
import lodash from 'lodash'
import { Input } from 'antd';
import { base } from '../../components/Make/SectionTypes/baseTypes'
import ReactGa from 'react-ga'
import {
    ChakraProvider,
    Button
  } from '@chakra-ui/react'

const Div = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  box-sizing:border-box;
`;

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
        type:'appdownload',
    },
    {
        typequestion: "✍️ 사전신청",
        question : "사전신청을 많이 받고 싶어요",
        type:'application',
    },
    {
        typequestion: "💰 판매",
        question : "서비스/제품을 많이 팔고 싶어요",
        type:'sales',
    },
    {
        typequestion: "📚 개인적인 목적",
        question : "멋진 나를 알리고 싶어요",
        type:'portfolio',
    },
]

const fontList = [
    { label: '노토산스', value: 'Noto Sans KR' },
    { label: '프리텐다드', value: 'Pretendard-Bold' },
    { label: '나눔스퀘어 라운드', value: 'NanumSquareRound' },
    { label: '바른 공군', value: 'ROKAFSansBold' },
    { label: '지마켓 산스', value: 'GmarketSansBold' },
    { label: '고운 돋움', value: 'GowunDodum-Regular' },
    { label: '에스코어 드림', value: 'S-CoreDream-7ExtraBold' },
    { label: '함박눈체', value : 'SF_HambakSnow'},
    { label: '카페24 서라운드', value: 'Cafe24Ssurround'},
    { label: '레페리포인트-Black', value:'LeferiPoint-BlackA'},
    { label: '고운바탕', value : 'GowunBatang-Bold'},
    { label: '여기어때 잘난체', value: 'yg-jalnan'},
]

const colorList = [
    {name:'빨강', color:'#FF6464'},
    {name:'노랑',color:'#FFE162',},
    {name:'머스타드노랑',color:'#FFBD35',},
    {name:'초록',color:'#91C483',},
    {name:'하늘색',color:'#5D8BF4',},
    {name:'파란색',color:'#2D31FA',},
    {name:'연보라',color:'#BAABDA',},
    {name:'진한 보라색',color:'#3B185F',},
    {name:'검정',color:'#171717',},
    {name:'진한 회색',color:'#444444',},
    {name:'갈색',color:'#C99C75',},
    {name:'상아색',color:'#EEE6C4',},
]

function FirstQuestions({history}) {
    
    const [setting, setSetting] = useState(lodash.cloneDeep(defaults.setting));
    const arr = lodash.cloneDeep(base[0])
    const [contents, setContents] = useState([ arr, lodash.cloneDeep(base[1]), lodash.cloneDeep(base[4]), lodash.cloneDeep(base[5]), lodash.cloneDeep(base[6]) ])
    const [navi, setNavi] = useState(lodash.cloneDeep(defaults.navi));
    const [foot, setFoot] = useState(lodash.cloneDeep(defaults.foot));
    // 모달
    const [cnum, setCnum] = useState(1);
    const [title, setTitle] = useState("");
    const [device, setDevice] = useState("");
    const [font, setFont] = useState('');
    const [color, setColor] = useState('');
    const [alarm, setAlarm] = useState(false);
    const [urlId, setUrlId] = useState('');
    const [type, setType] = useState('');
    const [start, setStart] = useState(false);
    const [miniModal, setMiniModal] = useState(false);
    const [miniModalText, setMiniModalText] = useState('');

    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    useEffect(() => {
        // to report page view
        ReactGa.initialize('UA-213792742-1');
        ReactGa.pageview(`/questions`);
    },[])

    const handleClose = async () => {
        // 마지막에는 입력한 정보도 저장한다. 근데 한명껄 여러번 저장해서 헷갈리지 않게..!

        await dbService.collection('question_answers').add({
            createdAt: new Date(),
        })
        // setOpen(false)
    };

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

    const nextAndSetTemplates = async (e) => {
        if(type === ""){
            setMiniModal(true);
            setMiniModalText('위의 보기 중 한가지를 선택해 주세요.');
            return
        }else{
            setCnum(cnum + 1);
        }
    }

    const nextAndSetTemplate = async (e) => {
        if(device === ""){
            setMiniModal(true);
            setMiniModalText('위의 보기 중 한가지를 선택해 주세요.');
            return
        }else{
            setCnum(cnum + 1);
        }
    }

    const nextAndSetFont = async e => {
        if(font === '' || color === ''){
            setMiniModal(true);
            setMiniModalText('위의 보기 중 한가지를 선택해 주세요.');
            return
        }else{

            setCnum(cnum + 1);
        }
    }
    const nextAndSetDone = async e => {

        const urlDatas = await dbService
            .collection("saved-page")
            .where("urlId", "==", urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let urlData = urlDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(urlId === ''){
            e.stopPropagation()
            e.preventDefault()
            setMiniModal(true);
            setMiniModalText('URL을 입력해 주세요. 이후 페이지에서 수정가능합니다.');
            return
        }else if(urlData.length > 0){
            e.stopPropagation()
            e.preventDefault()
            setMiniModal(true);
            setMiniModalText('이미 존재하는 url입니다. 다른 url을 사용해 주세요.');
            return;
        }else{
            setStart(true);
            setMiniModal(true);
            setMiniModalText('사용 가능한 url입니다.');
            const defaults = await dbService
                .collection("saved-page")
                .where("urlId", "==", type)
                .get(); // ui

            let defaultTemplate = defaults.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            let opacityColor = color + '';
    
            defaultTemplate[0].navi.title = title;
            defaultTemplate[0].setting.title = title;
            defaultTemplate[0].setting.cta.backgroundColor = color;
            defaultTemplate[0].setting.color = opacityColor;
            defaultTemplate[0].setting.fta.backgroundColor = color;
            defaultTemplate[0].setting.ghost.borderColor = color;
            defaultTemplate[0].setting.ghost.color = color;
            defaultTemplate[0].setting.urlId = urlId;
            defaultTemplate[0].setting.font = font;
            defaultTemplate[0].foot.copyright.text = title;

            defaultTemplate[0].contents = defaultTemplate[0].contents.map((doc, index) => {
                if(doc.sectionTypeName === 'CtaSection' || doc.sectionTypeName === 'ApplySection' || doc.sectionTypeName === 'AppDownloadSection' ){
                    doc.backgroundColor = opacityColor;
                }
                if(index === 1 && doc.sectionTypeName === 'TextSection' ){
                    doc.backgroundColor = opacityColor;
                }
                return doc;
            })

            if(defaultTemplate){
                setContents(defaultTemplate[0].contents);
                setNavi(defaultTemplate[0].navi);
                setFoot(defaultTemplate[0].foot);
                setSetting(defaultTemplate[0].setting);
            }
            
            const body = {
                type: type,
                name: navi.title,
                font: font,
                color:color
            }

            const done = await dbService.collection('after-questions').add(body);

            if(JSON.stringify([defaultTemplate[0].contents, defaultTemplate[0].navi, defaultTemplate[0].foot, defaultTemplate[0].setting, false, '']).length > 48000){
                // 임시 방편으로 큰 데이터는 건너뛰도록 조치.
                handleClose()
            }else{
                localStorage.setItem('temp', JSON.stringify([defaultTemplate[0].contents, defaultTemplate[0].navi, defaultTemplate[0].foot, defaultTemplate[0].setting, false, '']));
                handleClose()
            }
        }
    }

    const ModalBox = (props) => {
        return(
            <div className="modal-flex-column" style={{paddingTop:`${props.small ? '80px' : '50px'}`}}>
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
        const regExp = /[a-z0-9]/g; 
        return regExp.test(v);
    }

    const content = () => {
        switch(cnum){
            case 1:
                return(
                    <div className="modal-flex-column" style={{paddingTop:'80px'}}>
                        <div className="modal-title">
                            안녕하세요, <span style={{color:'#6C63FF'}}>Surfee</span>에 오신 것을 환영합니다!<br/>
                            당신의 서비스 / 제품 명을 알려주세요.
                        </div>
                        <div className="modal-main-card">
                        <form onSubmit={() => setCnum(cnum + 1)} style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Input 
                                className="input-holder input-focus" 
                                placeholder="서비스/제품 명이 로고 자리에 들어갑니다." 
                                value={title} 
                                onChange={e => setTitle(e.currentTarget.value)} />
                        </form>
                        <div className="modal-mini-text">
                            수정 가능하니 편하게 정해주세요 :)
                        </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button"
                                onSubmit={e => setCnum(cnum + 1)} style={{visibility:`${title.length > 0 ? 'visible' : 'hidden'}`, display:'flex'}} 
                                onClick={e => setCnum(cnum + 1)}>다음<span style={{color:'rgba(0,0,0,0)'}}>1</span></div>  
                            </div>
                        </div>
                    </div>
                )
                break;

            case 2:
                return(
                    <ModalBox 
                        small
                        title={<><span style={{color:'#6C63FF'}}>{title}</span>의 랜딩페이지는 다음 중 어떤 목표를 향하고 있나요? 🚀</>}>
                        <>
                            <div className="modal-row1">
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
                                <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전<span style={{color:'rgba(0,0,0,0)'}}>2</span></div>
                                <div className="modal-move-button" onClick={e => nextAndSetTemplates()}>다음<span style={{color:'rgba(0,0,0,0)'}}>2</span></div>  
                            </div>
                        </>
                    </ModalBox>
                )
                break;

            case 3:
                return(
                    <ModalBox 
                    small
                    title={<>
                        <span style={{color:'#6C63FF'}}>{title}</span>의 랜딩페이지는 주로 어떤 화면으로 보여질까요?
                    </>}>
                        <div className="modal-row" style={{flexWrap:'nowrap'}}>
                            <div className="template__card uphover"
                                onClick={() => {
                                    setDevice('pc')
                                }}
                                style={{border: `${device === 'pc' ? '1px solid #A89AFF' : 'none'}`, textAlign: 'center', padding:'50px 30px'}} >
                                <div>
                                    🖥 PC<br/><br/> PC 화면을 중심으로 편집 가능해요.
                                </div>
                            </div>
                            <div className="template__card uphover"
                                onClick={() => {
                                    setDevice('mobile')
                                }}
                                style={{border: `${device === 'mobile' ? '1px solid #A89AFF' : 'none'}`, textAlign: 'center', padding:'50px 30px'}} >
                                <div>
                                    📱모바일<br/><br/> 모바일 화면을 중심으로 편집 가능해요.
                                </div>
                            </div>
                        </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전<span style={{color:'rgba(0,0,0,0)'}}>3</span></div>
                            <div className="modal-move-button" onClick={e => nextAndSetTemplate()}>다음<span style={{color:'rgba(0,0,0,0)'}}>3</span></div>  
                        </div>
                    </ModalBox>
                )

            case 4:
                return(
                    <OverflowScrolling className="scroll" style={{paddingBottom:'50px'}}>
                    <ModalBox title={<> 좋아요! 디자인은 어떻게 할까요? 🤔</>}>
                        <div className="modal-column">
                            <div className="modal-column">
                                <div className="modal-fc-select-title">
                                    폰트를 선택해 주세요.
                                </div>
                                <div className="font-selections__container">
                                    {fontList.map((item, index) => {
                                        return(
                                            <button className="template__card uphover" key={index}
                                                onClick={(e) => {
                                                    setFont(item.value);
                                                }}
                                                style={{border: `${font === item.value ? '1px solid #A89AFF' : 'none'}`, 
                                                fontFamily:`${item.value}`, 
                                                padding:'20px 3px',
                                                width:'20vw',
                                            }}
                                            >
                                                <div>
                                                    {item.label}
                                                </div>
                                                <div style={{marginTop:'2%'}}>
                                                    노코드 랜딩페이지 제작 툴, Surfee
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="modal-column" style={{marginLeft:'2vw'}}>
                                <div className="modal-fc-select-title">
                                    색상을 선택해 주세요.
                                </div>
                                <div className="font-selections__container">
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
                                                style={{border: `${bor}`, padding:'15px 3px',
                                                width:'20vw'}}>
                                                <div>
                                                    {item.color}
                                                </div>
                                                <div style={{backgroundColor:`${item.color}`, width:'50px', height:'50px', borderRadius:'10px'}}>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-button-container">
                            <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전<span style={{color:'rgba(0,0,0,0)'}}>4</span></div>
                            <div className="modal-move-button" onClick={() => nextAndSetFont()}>다음<span style={{color:'rgba(0,0,0,0)'}}>4</span></div>
                        </div>
                    </ModalBox>
                    </OverflowScrolling>
                )
                break;

            case 5:
                return(
                    <div className="modal-flex-column" style={{paddingTop:'80px'}}>
                        <div className="modal-title">
                            마지막으로, <span style={{color:'#6C63FF'}}>{title}</span> 랜딩페이지의 URL을 설정해 주세요.                            
                        </div>
                        <div className="modal-main-card">
                            <div className="url-input-box">
                                <div className="modal-title" style={{fontSize:'23px'}}>
                                    https://surfee.co.kr/<input className="input-holder input-focus" style={{width: '25vw', padding:'0px 15px', marginLeft: '10px'}} placeholder="영문 소문자와 숫자만 사용 가능합니다." value={urlId} 
                                    onChange={e => {
                                        setStart(false);
                                        onUrlChange(e);
                                    }} />
                                </div>
                                <Button colorScheme='#6c63ff' className="dup-button" onClick={nextAndSetDone}>
                                    중복 확인
                                </Button>
                            </div>
                            {alarm ? (
                                <div className="text-alarm">
                                    ⚠ 영문 소문자와 숫자만 사용가능합니다.
                                </div>
                            ):(<div className="text-alarm"> </div>)}
                            <div style={{color:'gray', paddingLeft:'0%',marginTop:'1%', fontSize:'14px', textAlign:'center', fontFamily:'Pretendard-Regular'}}>
                                개인 도메인 연결은 다음 버전에 업데이트할 예정입니다.
                                수정 가능하니 편하게 설정해 주세요 :)
                            </div>
                            <div className="modal-button-container">
                                <div className="modal-move-button-back" onClick={e => setCnum(cnum - 1)}>이전<span style={{color:'rgba(0,0,0,0)'}}>5</span></div>
                                {
                                    start ? 
                                    <Link to={{
                                        pathname: "/make", 
                                        state: {
                                            now: true,
                                            isPhone: device === 'mobile',
                                        }
                                    }} className="modal-move-button">시작하기</Link> 
                                    : 
                                    <div className="modal-move-button-back">시작하기</div>
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
        }
    }

    return (
        <Div>
            <div className="progress-bar__container">
                <div onClick={() => 
                    history.go(-1)} className="arrow-back">
                    ←
                </div> 
                {progressList.map((item, index) => {
                    let backColor = 'rgba(100,100,100,0)'
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
                            <span className="list-component" style={{background:`${backColor}`, color:`${fontColor}`}}>{item.num}</span>
                            <span style={{fontSize:'12px', color:`${fontColor2}`, marginTop:'7px'}}>{item.name}</span>
                        </span>
                    )
                })}
            </div>
            <ChakraProvider className="center-column">
                {content()}
            </ChakraProvider>
            <MiniModal open={miniModal} setOpen={setMiniModal} text={miniModalText} />
        </Div>
    )
}

export default FirstQuestions
