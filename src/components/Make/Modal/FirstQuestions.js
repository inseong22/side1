import React, {useState, useEffect, useContext} from 'react'
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import '../Modal/Modal.css'
import './FirstQuestions.css'
import {Link} from 'react-router-dom'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {dbService} from '../../../tools/fbase';

import info1 from '../../../tools/info/info1.png';
import info2 from '../../../tools/info/info2.png';
import info3 from '../../../tools/info/info3.png';
import smile from '../../../tools/info/smile3d.png';
import good from '../../../tools/info/good3d.png';

import { Input } from 'antd';

const { TextArea } = Input;

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
  justifyContent: 'end',
  alignItems: 'center',
//   borderRadius:'20px',
};

const secondQuestion = [
    {
        question : "사업 아이템 검증?",
        type:'pre',
    },
    {
        question : "앱 홍보",
        type:'app',
    },
    {
        question : "이벤트?",
        type:'event',
    },
]

function FirstQuestions({open, setOpen, navi, setNavi, editing, setEditing}) {
    // 모달
    const [cnum, setCnum] = useState(1);
    const [type, setType] = useState("");
    const [templates, setTemplates] = useState([]);
    const [templateNum, setTemplateNum] = useState(0);
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const handleOpen = () => setOpen(true);
    const handleClose = async () => {
        // 마지막에는 입력한 정보도 저장한다. 근데 한명껄 여러번 저장해서 헷갈리지 않게..!

        await dbService.collection('question_answers').add({
            createdAt: new Date(),
        })
        setOpen(false)
    };

    useEffect(() => {
        
        setCnum(1);
    },[open]);

    const onChangeTitle = e => {
        let newNavi = Object.assign({}, navi)
        newNavi.title = e.currentTarget.value
        setNavi(newNavi)
    }

    const nextAndSetTemplates = async (e) => {
        if(type === ""){
            alert("위의 보기 중 한가지를 선택해주세요.");
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
            alert("위의 보기 중 한가지를 선택해주세요.");
            return
        }else if(editing === true){
            const real = window.confirm("템플릿을 새로 설정하면 이전에 작성한 내용이 사라집니다. 괜찮으신가요?")
            if(real){
                {
                    // templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0]
                    // 이걸 set Contents에.
                    action.setContents(templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0])
        
                    setCnum(cnum + 1);
                }
            }else{
                return
            }
        }else{
            // templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0]
            // 이걸 set Contents에.
            action.setContents(templates.filter(doc => doc.type === type && doc.templateNum === templateNum)[0])

            setCnum(cnum + 1);
        }
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

    const content = () => {
        switch(cnum){
            case 1:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <form onSubmit={() => setCnum(cnum + 1)}>
                        <div className="modal-main-card">
                            <img src={smile} className="modal-image"/>
                            <div className="modal-title">
                                안녕하세요! <br/><span style={{color:'#6C63FF'}}>Surfee</span>에 오신 것을  환영합니다 :)
                            </div>
                            <Input type="text" placeholder="프로젝트 이름이 어떻게 되나요?" value={navi.title} onChange={e => onChangeTitle(e)} />
                        </div>
                        <div className="modal-button-container">
                            <button onSubmit={e => setCnum(cnum + 1)} className="modal-move-button" style={{display:`${navi.title.length > 0 ? 'flex' : 'none'}`}} onClick={e => setCnum(cnum + 1)}>다음</button>  
                        </div>
                        </form>
                    </div>
                )
                break;

            case 2:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', flexDirection:'column', marginBottom:'5%'}}>
                            <div>{navi.title}님 환영합니다!</div>
                            {/* <div className="modal-main-card">
                                <div className="modal-title">
                                    Step 1
                                </div>
                                <img src={info1} style={{width:'300px', boxShadow:'2px 2px 4px rgba(0,0,0,0.3)'}}/>
                                <div className="modal-title" style={{fontSize:'1.4em'}}>
                                    우측 제작창에서 내용을 입력하세요.
                                </div>
                                <div className="modal-desc">
                                    Section을 하나씩 설정하여<br/>쉽고 간편하게 랜딩페이지를 제작해 보세요.
                                </div>
                            </div> */}
                            {
                                secondQuestion.map((item, index) => {
                                    let color = 'white';
                                    if(item.type === type){
                                        color = 'black';
                                    }
                                    return(
                                        <div className="button1" onClick={() => {
                                            setType(item.type);
                                        }} key={index} 
                                        style={{backgroundColor: `${color}`}}
                                        >{item.question}</div>
                                    )
                                })
                            }
                            {/* <div className="modal-main-card">
                                <div className="modal-title">
                                    Step 2
                                </div>
                                <img src={info2} style={{width:'300px', boxShadow:'2px 2px 4px rgba(0,0,0,0.3)'}}/>
                                <div className="modal-title" style={{fontSize:'1.4em'}}>
                                    섹션을 추가하고, 유저의 응답을 유도하세요.
                                </div>
                                <div className="modal-desc">
                                당신의 프로젝트에 흥미를 느낀 <br/>
                                유저가 버튼을 누를 수 있도록 꾸며보세요!
                                </div>
                            </div> */}
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
                        <div className="modal-main-card">
                            {/* <img src={info3} style={{width:'400px', marginBottom:'5%', boxShadow:'2px 2px 4px rgba(0,0,0,0.3)'}}/>
                            <div className="modal-title" style={{fontSize:'3em'}}>
                                <span style={{color:'#6C63FF'}}>Surfee</span> <span style={{color:'gray', fontSize:"0.5em"}}>beta</span> 주의사항!
                            </div>
                            <div className="modal-desc" style={{fontSize:'1.3em', textAlign:'left'}}>
                                1. 새로고침시 작업사항이 모두 날아갈 수 있습니다.<br/>수시로 저장하세요.
                                <br/>
                                2. 한번 '제출 완료'시 수정이 어려우니,<br/>신중하게 제출해주세요.
                                <br />
                                3. 제작 완료시 우측 상단의 '제작완료 후 신청'을 눌러주세요. <br/>마지막으로 안내창을 꼼꼼히 읽고 제출해주세요.
                            </div> */}
                            {
                                templates.map((item, index) => {
                                    let color = 'white';
                                    if(item.templateNum === templateNum && item.type === type){
                                        color = 'black';
                                    }
                                    return(
                                        <div>
                                            {
                                                item.type === type && <div>추천</div>
                                            }
                                            <div className="template__card" key={index}
                                                onClick={() => {
                                                    setTemplateNum(item.templateNum);
                                                    setType(item.type);
                                                }}
                                                style={{backgroundColor: `${color}`}}
                                            >{item.type}{item.templateName}</div>
                                        </div>
                                    )
                                })
                            }
                            <button className="modal-move-button" onClick={e => getAllTemplates(e)}>전체보기</button>
                        </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={e => nextAndSetTemplate()}>다음</button>  
                        </div>
                    </div>
                )

            case 4:
                return(
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div className="modal-main-card">
                            <div className="modal-title">
                                준비 끝!
                            </div>
                            <div className="modal-title" style={{marginTop:'4%'}}>
                                이제 <span style={{color:'#6C63FF'}}>Surfee</span>와 함께
                                랜딩페이지를 제작해 보아요!
                            </div>
                            <img src={good} className="modal-image"/>
                            <div className="modal-title" style={{fontSize:'1.4em'}}>
                                쉽고 간편하게 제작하는 랜딩페이지 제작 툴, Surfee
                            </div>
                        </div>
                        <div className="modal-button-container">
                            <button className="modal-move-button" onClick={e => setCnum(cnum - 1)}>이전</button>
                            <button className="modal-move-button" onClick={() => {
                                setEditing(true);
                                handleClose()
                            }} style={{backgroundColor:'rgba(255,0,0,0.7)'}}>시작하기</button>
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
                    {editing ? 
                        <span onClick={() => handleClose()} className="arrow-hover" style={{position:'absolute', top:'10px', left:'20px', fontSize:'30px', border:'none', backgroundColor:'#ffffffff', cursor:'pointer', color:'black'}}>
                            ←
                        </span>
                         :
                        <Link to="/" className="arrow-hover" style={{position:'absolute', top:'10px', left:'20px', fontSize:'30px', border:'none', backgroundColor:'#ffffffff', cursor:'pointer', color:'black'}}>
                            ←
                        </Link> 
                    }
                    <div style={{width:'50%', marginBottom:'10%'}}>
                        {content()}
                    </div>
                </Box>
            </StyledModal>
        </div>
    )
}

export default FirstQuestions
