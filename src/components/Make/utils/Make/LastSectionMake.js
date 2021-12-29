import React, {useState} from 'react'
import { Radio } from 'antd';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { Input, Tooltip } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

function LastSectionMake({title, link, setLink, desc,inf, setInf, lastapplyButton, setLastapplyButton, backgroundColor, setTitle, setDescSize, answers, lastdescColor, sectionHeight, setSectionHeight, setDescColor, setAnswers, setDesc, setTitleSize, setBackgroundColor, setTitleColor, titleSize, addInput, lastApplies, lasttitleColor, setLasttitleColor}) {
    let tt = "aa"
    const [num, setNum] = useState(1);
    const [newAnswer, setNewAnswer] = useState("")
    const [ts,setTs] = useState();
    const [ds,setDs] = useState();

    const returnAnswersInput = answers.map((item, index) => {
        return(
            <div className="added-answer">
                <span style={{display: "flex", justifyContent: "start", alignItems: "end", width:'50%'}}>
                    {item.name} <span style={{color:'gray', marginLeft:'2%'}}>입력받기</span>
                </span>
                <div style={{display: "flex", justifyContent: "end", alignItems: "end", width:'50%'}}>
                    <span className="answer-delete-button" onClick={e => setAnswers(answers.filter(i => i.name !== item.name))}>X</span>
                </div>
            </div>
        )
    })
    const handleSliderChange = (event, newValue) => {
        setTitleSize(newValue);
        setTs(newValue)
      };
    const handleSliderChange4 = (event, newValue) => {
        setDescSize(newValue);
        setDs(newValue)
    };

    const addInput2 = (e, newAnswer) => {
        e.preventDefault();
        if(newAnswer.length<1){
            alert("내용을 입력해주세요.");
        }else{
            setAnswers([...answers, {
                name:newAnswer,
                placeholder:"입력 도우미"
            }])
            setNewAnswer("")
        }
    }

    return (
        <div className="section-one-make">
            <div className="section-title">
                <span>
                    신청페이지 | 개요 - 내용
                </span>
                <span style={{display:'flex', justifyContent:'end', paddingRight:'5px'}}>
                    <Radio.Group defaultValue="1">
                        <Radio.Button value="1" onClick={e => setNum(1)}>
                            스타일
                        </Radio.Button>
                        <Radio.Button value="2" onClick={e => setNum(2)}>
                            신청방법
                        </Radio.Button>
                    </Radio.Group>
                </span>
            </div>
            { num === 1 ? 
            <>
            <div className="make-section-one-part">
            <div  className="make-section-title">
                        <span style={{fontSize:'16px', marginBottom:'5px'}}><span className="nemonemo">■</span> 색상</span>
                        <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row' }}>      
                            <span className="color-container">
                                <span>섹션 배경</span>
                                <input style={{marginLeft:'3px'}} type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.currentTarget.value)}/>
                            </span>       
                            <span className="color-container">
                                <span>타이틀</span>
                                <input style={{marginLeft:'3px'}} type="color" value={lasttitleColor} onChange={e => setLasttitleColor(e.currentTarget.value)}/>
                            </span>       
                            <span className="color-container">
                                <span>내용</span>
                                <input style={{marginLeft:'3px'}} type="color" value={lastdescColor} onChange={e => setDescColor(e.currentTarget.value)}/>
                            </span>
                        </div>
                    </div>
            </div>
            <div className="make-section-one-part">
                <div className="make-section-title" style={{marginTop:'0px'}}>
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 섹션 높이</span>                
                </div>
                <Slider
                    value={sectionHeight}
                    onChange={(e,v) => setSectionHeight(v)}
                    aria-labelledby="input-slider"
                    sx={{
                        color: '#6B63F7',
                        width:'90%',
                        '& .MuiSlider-thumb': {
                        borderRadius: '1px',
                        },
                    }}
                    min={10}
                    max={130}
                />
                <Input
                    placeholder="섹션 높이를 설정하세요."
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="100이 화면 세로 전체를 의미합니다.">
                         vh
                        </Tooltip>
                    }
                    value={sectionHeight} onChange={e => setSectionHeight(e.currentTarget.value)}
                    />
            </div>
            <div className="make-section-one-part">
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 타이틀</span>                
                </div>
                <div style={{display:'flex', justifyContent:'start', flexDirection:'column', marginTop:'10px', width:'90%'}}>
                    <TextField label="Title" multiline rows={3} value={title} onChange={e => setTitle(e.currentTarget.value)} className="section-one-title-input"/>
                    <div style={{display:'flex', justifyContent:'start', flexDirection:'column'}}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'start', flexDirection:'column'}}>
                            <span>- 타이틀 크기</span>                        
                            <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexDirection:'row', paddingLeft:'3%'}}>                     
                                <Slider
                                    value={ts}
                                    onChange={handleSliderChange}
                                    aria-labelledby="input-slider"
                                    sx={{
                                    color: '#6B63F7',
                                    width:200,
                                    '& .MuiSlider-thumb': {
                                        borderRadius: '1px',
                                    },
                                    }}
                                />
                                <Input
                                    placeholder="글씨 크기"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    suffix={
                                        <Tooltip title="글씨의 크기를 설정하세요.">
                                        px
                                        </Tooltip>
                                    }
                                    type="number"
                                    style={{marginLeft:'5%', width:'30%'}}
                                    value={ts} 
                                    onChange={e =>  {setTitleSize(e.currentTarget.value); setTs(e.currentTarget.value);}}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="make-section-one-part">
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 내용</span>                
                </div>
                <div style={{display:'flex', justifyContent:'start', flexDirection:'column', marginTop:'10px', width:'90%'}}>
                    <TextField label="Description" multiline rows={3} value={desc} onChange={e => { setDesc(e.currentTarget.value); }} className="section-one-title-input"/>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'start', flexDirection:'column'}}>
                        <span>- 내용 크기</span>                        
                        <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexDirection:'row', paddingLeft:'3%'}}>                     
                            <Slider
                                value={ds}
                                onChange={handleSliderChange4}
                                aria-labelledby="input-slider"
                                sx={{
                                color: '#6B63F7',
                                width:200,
                                '& .MuiSlider-thumb': {
                                    borderRadius: '1px',
                                },
                                }}
                            />
                            <Input
                                placeholder="글씨 크기"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                suffix={
                                    <Tooltip title="글씨의 크기를 설정하세요.">
                                    px
                                    </Tooltip>
                                }
                                type="number"
                                style={{marginLeft:'5%', width:'30%'}}
                                value={ds} 
                                onChange={e =>  {setDescSize(e.currentTarget.value); setDs(e.currentTarget.value);}}
                                />
                        </div>
                    </div>
                </div>
            </div>
            
            </> : 
            <>
            <div className="make-section-one-part" style={{alignItems: 'start', justifyContent:'start'}}>
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 입력받을 내용</span>  
                    <span className="title-desc-text">- 유저에게 받고 싶은 응답의 방식을 선택하세요.</span>  
                </div>
                <div>
                    <span style={{display:'flex', justifyContent:'end', paddingRight:'5px', marginTop:'8px'}}>
                        <Radio.Group defaultValue="1">
                            <Radio.Button value="1" onClick={e => setInf(1)}>
                                직접입력받기
                            </Radio.Button>
                            <Radio.Button value="2" onClick={e => setInf(2)}>
                                링크 연결
                            </Radio.Button>
                        </Radio.Group>
                    </span>      
                </div>
                <div  className="make-section-title">
                    <span className="title-desc-text">- 응답받고 싶은 내용을 입력해주세요.</span>  
                </div>
                { inf === 1 ? <>
                <div style={{width:'100%', marginTop:'0px'}}>
                    {
                        returnAnswersInput
                    }
                </div>
                <div className="answers-input">
                    <form onSubmit={(e) => addInput2(e, newAnswer)} className="answers-input">
                        <Input type="text" value={newAnswer} onChange={e => setNewAnswer(e.currentTarget.value)} />
                        <button className="answers-add-button" onSubmit={(e) => addInput2(e, newAnswer)}>추가</button>
                    </form>
                </div>
                </> : 
                <>
                <div className="make-section-title" style={{width:'100%', marginTop:'5%'}}>
                    <span style={{fontSize:'16px'}}>연결할 링크를 입력해주세요.</span>  
                    <Input value={link} onChange={e => setLink(e.currentTarget.value)} />
                </div>
                </>}
            </div>
            <div className="make-section-one-part" style={{alignItems: 'start', justifyContent:'start'}}>
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 버튼 텍스트</span>  
                    <span className="title-desc-text">- 버튼에 들어갈 텍스트를 입력하세요.</span>  
                </div>
                <div className="make-section-title" style={{width:'100%', marginTop:'1%'}}>
                    <Input value={lastapplyButton} onChange={e => setLastapplyButton(e.currentTarget.value)} />
                </div>
            </div>
            </>}
        </div>
    )
}

export default LastSectionMake
