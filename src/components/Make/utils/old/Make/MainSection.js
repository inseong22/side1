import React, {useState} from 'react'
import { Input, Tooltip, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#6B63F7",
      '&:hover': {
        backgroundColor: alpha("#6B63F7", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#6B63F7",
    },
  }));

  const content = (
    <>
      <p>스크롤을 내려도 상단에 고정되어있는 바(bar)입니다.</p>
    </>
  );
  const contentf = (
    <>
      <p>사이트 하단에 회사 정보, 저작권 정보 등을 표기하는 바(bar)입니다.</p>
    </>
  );
  const contentTab = (
    <>
      <p>상단의 브라우저 탭에 표시되는 텍스트입니다.</p>
    </>
  );
  const content3 = (
    <>
    <span className="title-desc-text">내비게이션 오른쪽에 들어가는 버튼입니다!<br/></span>  
    <span className="title-desc-text">클릭 시 사이트 최하단으로 이동합니다.</span>  
    </>
  );

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function MainSection(props) {
    const [num, setNum] = useState(1);

    const changeColor = (e) => {
        const color = e.currentTarget.value;
        props.setMainColor(color)
        props.setS1backgroundColor(color)
        props.setLastbackgroundColor(color)
    }

    const changeTitleColor = (e) => {
        const color = e.currentTarget.value;
    
        props.setS1titleColor(color)
        props.setS1descColor(color)
        props.setLasttitleColor(color)
        props.setLastdescColor(color)
    }

    const onFileChange =  (e) => {
        console.log(e);
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            props.setFaviconAttachment(result);
        }
        reader.readAsDataURL(oneFile);
    }

    const uploadButton = (
        <div className="upload-button">
          {<PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
        <div className="section-one-make">
            <div className="section-title">
                <span>
                    기본설정
                </span>
                <span style={{display:'flex', justifyContent:'end', paddingRight:'5px'}}>
                    <Radio.Group defaultValue="1">
                        <Radio.Button value="1" onClick={e => setNum(1)}>
                            메인
                        </Radio.Button>
                        <Radio.Button value="2" onClick={e => setNum(2)}>
                            내비 바 | 푸터 바
                        </Radio.Button>
                    </Radio.Group>
                </span>
            </div>
            {num === 1 ? <> 
            <div className="make-section-one-part">
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 프로젝트 이름이 무엇인가요?</span>
                    <span style={{fontSize:'14px'}}>(프로젝트 이름은 url뒤에 들어가요.)</span>         
                </div>
                <div style={{display:'flex', justifyContent:'start', marginTop:'5px'}}>
                    <span>
                    https://surfee.co.kr/ 
                    </span>
                    <span style={{marginLeft:'2px'}}>
                        <Input type="text" value={props.urlId} onChange={e => props.setUrlId(e.currentTarget.value)} style={{width:'250px'}}/>
                    </span>
                </div>
                <div  className="make-section-title" style={{marginTop:'10px'}}>
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 로고(Favicon) 설정</span>    
                    <span style={{fontSize:'14px'}}>상단의 브라우저 탭에 표시되는 이미지입니다.</span>                
                </div>
                <div style={{display:'flex', justifyContent:'start', width:'100%', alignItems: 'center'}}>
                    <div className="filebox">
                        <label for="file">
                            {uploadButton}
                        </label> 
                        <input type="file" accept="image/*" id="file"  onChange={ e => onFileChange(e) } />
                    </div>
                    <img src={props.faviconAttachment} width={120} style={{marginLeft:'10px'}}/>
                </div>
                <div  className="make-section-title" style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 탭 타이틀 설정</span>        
                    <Popover placement="topLeft" title="설명" content={contentTab}>
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)', marginLeft:'2%' }} />
                    </Popover>        
                </div>
                <div style={{display:'flex', justifyContent:'start', width:'100%', alignItems: 'center'}}>
                    <Input value={props.urlTitle} onChange={e => props.setUrlTitle(e.currentTarget.value)} />
                </div>
            </div>
            {/* 폰트 설정 */}
            <div className="make-section-one-part">
                <div  className="make-section-title">
                    <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 폰트 설정</span>                
                </div>
                <Radio.Group style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItem:'center', width:'100%', marginTop:'2%'}}>
                    <Radio.Button value="1" className="fontSelection" onClick={e => {props.setFont("Noto Sans KRBO"); props.setDescFont("Noto Sans KRRE")}} style={{fontFamily:"Noto Sans KRRE"}}>
                    Noto Sans KR : 노코드 랜딩페이지 제작 툴, Surfee
                    </Radio.Button>
                    <Radio.Button value="2" className="fontSelection" onClick={e => {props.setFont("S-CoreDream-6Bold"); props.setDescFont("S-CoreDream-4Regular")}} style={{fontFamily:"S-CoreDream-4Regular"}}  >
                    에스코어드림 : 노코드 랜딩페이지 제작 툴, Surfee
                    </Radio.Button>
                    <Radio.Button value="3" className="fontSelection" onClick={e => {props.setFont("Pretendard-ExtraBold"); props.setDescFont("Pretendard-Regular")}} style={{fontFamily:"Pretendard-Regular"}} >
                    프리텐다드 : 노코드 랜딩페이지 제작 툴, Surfee
                    </Radio.Button>
                    <Radio.Button value="4" className="fontSelection" onClick={e => {props.setFont("GmarketSansBold"); props.setDescFont("GmarketSansMedium")}} style={{fontFamily:"GmarketSansMedium"}} >
                    Gmarket Sans : 노코드 랜딩페이지 제작 툴, Surfee
                    </Radio.Button>
                </Radio.Group>
            </div>
            {/* CTA 버튼 유무 */}
            {/* <div className="section-one-make-one">  
                CTA 버튼을 사용하시겠습니까? {props.ctaUse}
                <input type="checkbox" checked={props.ctaUse} onChange={e => props.setCtaUse(!props.ctaUse)}/>
                {props.ctaUse && 
                <div className="section-one-make-one">
                    <span>
                        CTA 버튼 색 조정  
                        <input type="color" onChange={e => props.setCtaColor(e.currentTarget.value)}/>
                    </span>  
                    <span>
                        CTA 버튼 이름 
                        <input type="text" value={props.ctaTitle} onChange={e => props.setCtaTitle(e.currentTarget.value)}/>
                    </span>  
                    <span>
                        CTA 버튼 길이
                    </span>  
                    <span>
                        CTA로 걸어둘 링크
                        <input type="text" value={props.ctaLink} onChange={e => props.setCtaLink(e.currentTarget.value)}/>
                    </span>  
                </div>
                }
            </div> */}
            </> 
            : 
            <> 
            <div style={{width: '100%'}}>
                <div className="section-one-make">
                    <div className="make-section-one-part" style={{alignItems:'start'}}>
                        <div  className="make-section-title" style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
                            <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 내비게이션</span>        
                            <Popover placement="topLeft" title="설명" content={content}>
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)', marginLeft:'2%' }} />
                            </Popover>        
                        </div>
                        {/* <Tooltip title="Extra information">
                        </Tooltip> */}
                        <div style={{marginTop:'15px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TextField id="outlined-basic" label="서비스 이름" variant="outlined" value={props.naviTitle} onChange={e => props.setNaviTitle(e.currentTarget.value)}/>
                            <div style={{width:'60px', height:'100%'}}>
                                <span style={{color:'gray', fontSize:'12px'}}>글자 색상</span>
                                <input type="color" style={{width:'36px', height:'36px', marginBottom:'4px'}} value={props.naviTitleColor} onChange={e => props.setNaviTitleColor(e.currentTarget.value)}/>
                            </div>
                        </div>
                        <div style={{marginTop:'15px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <TextField id="outlined-basic" label="내비게이션 배경 색" variant="outlined" value={props.naviColor} onChange={e => props.setNaviColor(e.currentTarget.value)}/>
                            <div style={{width:'60px', height:'100%'}}>
                                <input type="color" style={{width:'36px', height:'36px'}} value={props.naviColor} onChange={e => props.setNaviColor(e.currentTarget.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-one-make">
                    <div className="make-section-one-part" style={{alignItems:'start'}}>
                        <div  className="make-section-title" style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
                            <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> CTA</span>           
                            <Popover placement="topLeft" title="설명" content={content3}>
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)', marginLeft:'2%' }} />
                            </Popover>                    
                        </div>
                        <span className="title-desc-text"> 클릭을 유도할 수 있는 말을 작성 해주세요.</span>     
                        <div style={{marginTop:'5px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'90%'}}>
                            <Input style={{height:'50px', borderRadius:'5px', marginRight:'4px'}} maxLength="8" id="outlined-basic" label="CTA 버튼 이름" variant="outlined" value={props.naviButtonTitle} onChange={e => props.setNaviButtonTitle(e.currentTarget.value)}/>
                            <div style={{width:'60px', height:'100%'}}>
                                <span style={{color:'gray', fontSize:'12px'}}>글자 색상</span>
                                <input style={{width:'36px', height:'36px', marginBottom:'4px'}} type="color" value={props.naviButtonColor} onChange={e => props.setNaviButtonColor(e.currentTarget.value)}/>
                            </div>
                        </div>
                        <span className="title-desc-text" style={{color:'#6B63F7', fontSize:'0.8em'}}>* 최대 글자수는 8글자 입니다.</span>     
                    </div>
                </div>
                <div className="make-section-one-part">
                        <div style={{display:'flex', justifyContent:'start', alignItems: 'center', flexDirection:'row', textAlign:'left', marginTop:'10px'}}>
                            <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 푸터</span>        
                            <Popover placement="topLeft" title="설명" content={contentf}>
                                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)', marginLeft:'2%' }} />
                            </Popover>        
                            {/* <GreenSwitch {...label} defaultChecked value={props.footerOrNot} onClick={e => props.setFooterOrNot(!props.footerOrNot)}/> */}
                        </div>
                    <div>
                    
                    {props.footerOrNot ? <></> : <>
                        <div style={{width:'400px'}}>
                            <div className="footer-one-section">
                                <span style={{width:'30%'}}>
                                이메일 :
                                </span>
                                <span style={{width:'70%'}}>
                                <Input type="text" value={props.userEmail} onChange={e => props.setUserEmail(e.target.value)}/>
                                </span>
                            </div>
                            {/* <div className="footer-one-section">
                                <span style={{width:'30%'}}>
                                푸터 배경 색 :
                                </span>
                                <span style={{width:'70%'}}>
                                <input type="color" value={props.footerColor} onChange={e => props.setFooterColor(e.currentTarget.value)}/>
                                </span>
                            </div> */}
                        </div>
                    </>}
                    </div>
                </div>
            </div>
            </>}
            
        </div>
    )
}

export default MainSection
