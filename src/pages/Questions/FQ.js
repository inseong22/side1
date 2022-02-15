import React, {useState, useEffect, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import '../../components/Make/Modal/Modal.css';
import './FirstQuestions.css'
import {Link} from 'react-router-dom'
import { MyContext } from '../Make/MakePageV2'
import {dbService} from '../../tools/fbase';
import OverflowScrolling from 'react-overflow-scrolling';

import good from '../../tools/info/good3d.png';

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
  marginTop: '-60px',
  flexDirection:'column',
  p: 2,
  px: 4,
  pb: 3,
  zIndex:'10000099',
  display:'flex',
  justifyContent: 'center',
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
        name:'TEMPLATE',
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
        typequestion: "🎁 이벤트",
        question : "이벤트를 널리 알리고 싶어요",
        type:'event',
    },
    {
        typequestion: "📚 포트폴리오",
        question : "멋진 나를 알리고 싶어요",
        type:'portfolio',
    },
    {
        typequestion: "🎸 기타",
        question : "다른 목표를 향하고 있습니다",
        type:'etc',
    },
]

const fontList = [
    {
        name:'Noto Sans KR',
        font:'Noto Sans KR',
    },
    {
        name:'Pretendard',
        font:'Pretendard-Regular',
    },
    {
        name:'에스코어드림',
        font:'Noto Sans KR',
    },
    {
        name:'Noto Sans KR',
        font:'Noto Sans KR',
    },,
    {
        name:'Noto Sans KR',
        font:'Noto Sans KR',
    },,
    {
        name:'Noto Sans KR',
        font:'Noto Sans KR',
    },
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

function FQ(props) {
    // 모달
    const [cnum, setCnum] = useState(1);
    const [type, setType] = useState("");
    const [templates, setTemplates] = useState([]);
    const [templateNum, setTemplateNum] = useState(0);
    const [title, setTitle] = useState('');
    const [urlId, setUrlId] = useState('');
    const [font, setFont] = useState('');
    const [color, setColor] = useState('');
    const [tmodalOpen, setTmodalOpen] = useState(false);
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    // const handleOpen = () => setOpen(true);
    // const handleClose = async () => {
    //     // 마지막에는 입력한 정보도 저장한다. 근데 한명껄 여러번 저장해서 헷갈리지 않게..!

    //     await dbService.collection('question_answers').add({
    //         createdAt: new Date(),
    //     })
    //     setOpen(false)
    // };

    useEffect(() => {
    }, []);

    const nextAndSetTemplates = async (e) => {
        if(type === ""){
            alert("위의 보기 중 한가지를 선택해 주세요.");
            return
        }else{
            const typeTemplatesdata = await dbService
                .collection("templates")
                .where("type", "==", type)
                .get(); // uid를 creatorId로 줬었으니까.

            let typeTemplates = typeTemplatesdata.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            setTemplates(typeTemplates);
            setCnum(cnum + 1);
        }
    }

    const nextAndSetTemplate = async (e) => {
        if(templateNum === 0){
            alert("위의 보기 중 한가지를 선택해 주세요.");
            return
        }else{
            // templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0]
            // 이걸 set Contents에.
            // action.setContents(templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0])

            setCnum(cnum + 1);
        }
    }

    const nextAndSetFont = async e => {
        if(font === ''){
            alert("위의 보기 중 한가지를 선택해 주세요.");
            return
        }else{
            setCnum(cnum + 1);
        }
    }
    const nextAndSetDone = async e => {
        const urlDatas = await dbService
            .collection("urlStores")
            .where("urlId", "==", urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let urlData = urlDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(urlId === ''){
            alert("URL을 입력해 주세요. 이후 페이지에서 수정가능합니다.");
            return
        }else if(urlData.length > 0){
            alert("이미 존재하는 url입니다. 다른 url을 사용해 주세요.");
            return;
        }
        
        // if(urlId === ''){
        //     alert("URL을 입력해 주세요. 이후 페이지에서 수정가능합니다.");
        //     return
        // }else if(editing === true){
        //     const real = window.confirm("템플릿을 새로 설정하면 이전에 작성한 내용이 사라집니다. 괜찮으신가요?")
        //     if(real){
        //         {
        //             // templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0]
        //             // 이걸 set Contents에.
        //             action.setContents(templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0])
        
        //             setEditing(true);
        //             handleClose();
        //         }
        //     }else{
        //         return;
        //     }
        // }else{
        //     action.setContents(templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0])

        //     setEditing(true);
        //     handleClose();
        // }
    }

    const getAllTemplates = async(e) => {
        const typeTemplatesdata = await dbService
            .collection("templates")
            .get(); // uid를 creatorId로 줬었으니까.

        let typeTemplates = typeTemplatesdata.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        setTemplates(typeTemplates);
    }

    const showTemplateModal = () => {
        setTmodalOpen(true);
    }

    const content = () => {
        switch(cnum){
            case 1:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <form onSubmit={() => setCnum(cnum + 1)} style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div className="modal-main-card">
                                <div className="modal-title">
                                    안녕하세요! <span style={{color:'#6C63FF'}}>Surfee</span>에 오신 것을 환영합니다! <br/>
                                    당신의 서비스 / 제품 명을 알려주세요. 😊
                                </div>
                            </div>
                            <Input className="input-holder" type="text" placeholder="한글은 8자 이내, 영문 10자 이내일 때 가장 이뻐요!" value={title} onChange={e => setTitle(e.currentTarget.value)} />
                            <div className="modal-button-container">
                                <button className="modal-move-button" onSubmit={e => setCnum(cnum + 1)} style={{visibility:`${title.length > 0 ? 'visible' : 'hidden'}`, display:'flex'}} 
                                    onClick={e => setCnum(cnum + 1)}>확인</button>  
                            </div>
                        </form>
                    </div>
                )
                break;

            case 2:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>   
                        <div className="modal-title">
                            <span style={{color:'#6C63FF'}}>{title}</span>의 랜딩페이지는 다음 중 어떤 목표를 향하고 있나요? 🚀
                        </div>                     
                        <div className="modal-main-card">
                            {
                                secondQuestion.map((item, index) => {
                                    let color = 'none';
                                    if(item.type === type){
                                        color = '1px solid #6C63FF';
                                    }
                                    return(
                                        <div className="button1" onClick={() => {setType(item.type);}} key={index} 
                                            style={{border:`${color}`}}>
                                            <div style={{fontSize:'20px'}}>
                                                {item.typequestion}
                                            </div>
                                            <div style={{marginTop:'4%'}}>
                                                {item.question}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={e => nextAndSetTemplates(e)}>다음</button>  
                        </div>
                    </div>
                )
                break;

            case 3:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}> 
                        <div className="modal-title">
                            그렇다면 이런 템플릿을 추천해드릴게요 😎
                        </div>
                        <div className="modal-main-card">
                            {
                                templates.map((item, index) => {
                                    let color = 'none';
                                    if(item.type === type && templateNum === item.templateNum){
                                        color = '1px solid #6C63FF';
                                    }
                                    return(
                                        <div>
                                            <div className="template__card" key={index}
                                                onClick={() => {
                                                    setTemplateNum(item.templateNum);
                                                    setType(item.type);
                                                }}
                                                style={{border: `${color}`}} >

                                                <span className="magnify-button" onClick={() => showTemplateModal()}>↗</span>
                                                
                                                <img src={good} width={240} />
                                                
                                                <div>
                                                    {item.type}
                                                    {item.templateName}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={e => nextAndSetTemplate()}>다음</button>  
                        </div>
                        <div style={{width:'100%', display: 'flex', justifyContent:'center'}}>
                            <span className="ask-another-template" onClick={e => getAllTemplates(e)}>
                                앗, 다른 템플릿을 원하시나요?
                            </span>
                        </div>
                    </div>
                )

            case 4:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div className="modal-title">
                            멋져요! 디자인은 어떻게 할까요? 🤔
                        </div>
                        <div className="modal-main-card">
                            <div style={{width:'48%'}}>
                                <div style={{width:'100%', textAlign:'center', margin:'2% 0%'}}>
                                    폰트를 선택해 주세요.
                                </div>
                                <OverflowScrolling className="font-selections__container">
                                    {fontList.map((item, index) => {
                                        let color = 'none';
                                        if(item.font === font){
                                            color = '1px solid #6C63FF';
                                        }
                                        return(
                                            <div className="template__card" key={index}
                                                onClick={() => {
                                                    setFont(item.font);
                                                }}
                                                style={{border: `${color}`, fontFamily:`${item.font}`, padding:'5% 3%'}}
                                            >
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div style={{marginTop:'2%'}}>
                                                    노코드 랜딩페이지 제작 툴, Surfee
                                                </div>
                                            </div>
                                        )
                                    })}
                                </OverflowScrolling>
                            </div>
                            <div style={{width:'48%', marginLeft:'2%'}}>
                                <div style={{width:'100%', textAlign:'center', margin:'2% 0%'}}>
                                    색상을 선택해 주세요.
                                </div>
                                <OverflowScrolling className="font-selections__container">
                                    {colorList.map((item, index) => {
                                        let bor = 'none';
                                        if(item.color === color){
                                            bor = '1px solid #6C63FF';
                                        }
                                        return(
                                            <div className="template__card" key={index}
                                                onClick={() => {
                                                    setColor(item.color);
                                                }}
                                                style={{border: `${bor}`, padding:'5% 3%'}}
                                            >
                                                <div>
                                                    {item.name}
                                                </div>
                                                <div style={{backgroundColor:`${item.color}`}}>
                                                    색
                                                </div>
                                            </div>
                                        )
                                    })}
                                </OverflowScrolling>
                            </div>
                        </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={() => nextAndSetFont()}>다음</button>
                        </div>
                    </div>
                )
                break;

            case 5:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div className="modal-title">
                            마지막으로, <span style={{color:'#6C63FF'}}>{title}</span> 랜딩페이지의 URL을 설정해 주세요!
                        </div>
                        <div className="modal-title" style={{fontSize:'25px'}}>
                            <Input className="input-holder" type="text" value={urlId} onChange={e => setUrlId(e.currentTarget.value)} />.surfee.co.kr
                        </div>
                            <div style={{color:'gray', paddingLeft:'6%',marginTop:'3%', fontSize:'18px', textAlign:'left', fontFamily:'Pretendard-Regular'}}>
                                <div>
                                    - 영문과 숫자만 사용 가능합니다.<br/><br/>
                                    - 개인 도메인 연결은 다음 버전에 빠르게 업데이트 해올게요!<br/><br/>
                                    - 수정 가능하니 편하게 설정해 주세요 :)<br/><br/>
                                </div>
                            </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={() => {
                                nextAndSetDone();
                            }} style={{backgroundColor:'rgba(255,0,0,0.7)'}}>시작하기</button>
                        </div>
                    </div>
                )
                break;
        }
    }

    return (
        <div>
            <Box sx={style}>
                {/* {editing ? 
                    <span onClick={() => handleClose()} className="arrow-hover" style={{position:'absolute', top:'10px', left:'20px', fontSize:'30px', border:'none', backgroundColor:'#ffffffff', cursor:'pointer', color:'black'}}>
                        ←
                    </span>
                     : */}
                    <Link to="/" className="arrow-back">
                        ←
                    </Link> 
                {/* } */}
                <div className="progress-bar__container">
                    {progressList.map((item, index) => {
                        let backColor = 'rgba(0,0,0,0.3)'
                        let fontColor = 'rgba(0,0,0,0.6)'
                        let fontColor2 = 'rgba(0,0,0,0.6)'

                        if(item.num < cnum){
                            backColor = '#6C63FF'
                            fontColor = "white"
                            fontColor2 = 'black'
                        }else if(item.num === cnum){
                            backColor = 'white'
                            fontColor = "#6C63FF"
                            fontColor2 = "#6C63FF"
                        }

                        return(
                            <span style={{display:'flex', flexDirection:'column', margin:'3%', alignItems: 'center', justifyContent: 'center'}}>
                                <span className="list-component" style={{backgroundColor:`${backColor}`, color:`${fontColor}`, border:`1px solid ${fontColor}`}}>{item.num}</span>
                                <span style={{fontSize:'12px', color:`${fontColor2}`, marginTop:'12px'}}>{item.name}</span>
                            </span>
                        )
                    })}
                </div>
                <div style={{width:'60%'}}>
                    {content()}
                </div>
            </Box>
        </div>
    )
}

export default FQ
