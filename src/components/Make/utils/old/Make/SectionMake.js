// import { title } from 'process';
// import React, {useState, useEffect} from 'react'
// import TextField from '@mui/material/TextField';
// import left from'../../../tools/img/left.png';
// import right from'../../../tools/img/right.png';
// import no from'../../../tools/img/no.png';
// import center from'../../../tools/img/center.png';

// import { Radio } from 'antd';
// import { Input, Tooltip } from 'antd';
// import { PlusOutlined, UserOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
// import Slider from '@mui/material/Slider';
// import MuiInput from '@mui/material/Input';
// import Switch from '@mui/material/Switch';
// import { alpha, styled } from '@mui/material/styles';
// import { InfoCircleOutlined } from '@ant-design/icons';
// import { Popover } from 'antd';

// const content3 = (
//     <>
//     <span className="title-desc-text">내용 하단에 들어가는 버튼입니다!</span>  
//     </>
//   );

// //https://mui.com/components/slider/
// const MInput = styled(MuiInput)`
//   width: 42px;
// `;
// const label = { inputProps: { 'aria-label': 'Switch demo' } };
// const GreenSwitch = styled(Switch)(({ theme }) => ({
//     '& .MuiSwitch-switchBase.Mui-checked': {
//       color: "#6B63F7",
//       '&:hover': {
//         backgroundColor: alpha("#6B63F7", theme.palette.action.hoverOpacity),
//       },
//     },
//     '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//       backgroundColor: "#6B63F7",
//     },
//   }));

// function SectionMake(props) {
//     var numOfThisSection = parseInt(props.secNum);
//     const [num, setNum] = useState(2);
//     const [ts,setTs] = useState();
//     const [ds,setDs] = useState();
//     const [ws,setWs] = useState();

//     useEffect(() => {
//     },[])

//       const handleSliderChange2 = (event, newValue) => {
//         props.setDescSize(newValue);
//         setDs(newValue)
//     };

//     const onFileChangeBack = e => {
        
//         const {target:{files},} = e;
//         const oneFile = files[0];
//         const reader = new FileReader();
//         reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
//             const {currentTarget:{result}} = finishedEvent;
//             props.setBackgroundImage(result);
//         }
//         reader.readAsDataURL(oneFile);
//     }

//     const uploadButton = (
//         <div className="upload-button">
//         {<PlusOutlined />}
//         <div style={{ marginTop: 8 }}>Upload</div>
//         </div>
//     );

//     return (
//         <div className="section-one-make">
//             <div className="section-title">
//                 <span>
//                     섹션 {numOfThisSection}
//                 </span>
//                 <span style={{display:'flex', justifyContent:'end', paddingRight:'5px'}}>
//                     <Radio.Group defaultValue="2">
//                         <Radio.Button value="1" onClick={e => setNum(1)} className="radio-button-one">
//                             스타일
//                         </Radio.Button>
//                         <Radio.Button value="2" onClick={e => setNum(2)} className="radio-button-one">
//                             내용
//                         </Radio.Button>
//                     </Radio.Group>
//                 </span>
//             </div>
//             { num === 2 ? 
//             <>
//             <div className="make-section-one-part">
//                     <div className="make-section-title">
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■ </span> 타이틀</span> 
//                         <span style={{fontSize:'14px'}}>- 잠재유저에게 첫 인상을 각인시켜 주세요!</span>                
//                     </div>
//                     <div  className="make-section-title">
//                    <div style={{display:'flex', justifyContent:'start', flexDirection:'column', marginTop:'10px', width:'90%'}}>
//                         <TextField label="Title" multiline rows={3} value={props.title} onChange={e => props.setTitle(e.currentTarget.value)} className="section-one-title-input"/>
//                     </div>
//                     <div style={{display:'flex', justifyContent:'start', flexDirection:'column'}}>
//                         <div  className="make-section-title">
//                             <span style={{marginTop:'5px'}}>- 타이틀 크기</span>   
//                             <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexDirection:'row', paddingLeft:'3%'}}>                     
//                                 <Input
//                                     placeholder="글씨 크기"
//                                     prefix={<UserOutlined className="site-form-item-icon" />}
//                                     suffix={
//                                         <Tooltip title="글씨의 크기를 설정하세요.">
//                                         px
//                                         </Tooltip>
//                                     }
//                                     type="number"
//                                     style={{marginLeft:'5%', width:'30%'}}
//                                     value={props.titleSize} 
//                                     onChange={e =>  {props.setTitleSize(e.currentTarget.value)}}
//                                     />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="make-section-one-part">
//                 <div  className="make-section-title">
//                     <span style={{fontSize:'16px'}}><span className="nemonemo">■</span>  내용</span>          
//                         <span style={{fontSize:'14px'}}>- 잠재유저에게 프로젝트에 대해 설명해주세요.</span>  
//                 </div>
//                     <div  className="make-section-title">
//                    <div style={{display:'flex', justifyContent:'start', flexDirection:'column', marginTop:'10px', width:'90%'}}>
//                         <TextField label="Desc" multiline rows={3} value={props.desc} onChange={e => props.setDesc(e.currentTarget.value)} className="section-one-title-input"/>
//                     </div>
//                     <div style={{display:'flex', justifyContent:'start', flexDirection:'column'}}>
//                         <div  className="make-section-title">
//                             <span style={{marginTop:'5px'}}>- 내용 크기</span>   
//                             <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexDirection:'row', paddingLeft:'3%'}}>                     
//                                 <Input
//                                     placeholder="글씨 크기"
//                                     prefix={<UserOutlined className="site-form-item-icon" />}
//                                     suffix={
//                                         <Tooltip title="글씨의 크기를 설정하세요.">
//                                         px
//                                         </Tooltip>
//                                     }
//                                     type="number"
//                                     style={{marginLeft:'5%', width:'30%'}}
//                                     value={props.descSize} 
//                                     onChange={e =>  {props.setDescSize(e.currentTarget.value);}}
//                                     />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//                 <div className="make-section-one-part">
//                     <div style={{display:'flex', justifyContent:'start', flexDirection:'column', textAlign:'left', marginTop:'10px'}}>
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 사진</span>                
//                     </div>
//                     <div style={{display:'flex', justifyContent:'start', width:'100%', alignItems: 'center'}}>
//                         <div className="filebox">
//                             <label for="file">
//                                 {uploadButton}
//                             </label> 
//                             <input type="file" accept="image/*" id="file" onChange={ e => props.onFileChange(e,numOfThisSection) } />
//                         </div>
//                         <img src={props.attachment} className="image-hover" onClick={e => props.setAttachment("")} width={120} style={{marginLeft:'10px', borderRadius:'3px'}}/>
//                     </div>
//                     <div style={{display:'flex', justifyContent:'start', flexDirection:'column'}}>
//                         <div  className="make-section-title">
//                             <span style={{marginTop:'5px'}}>- 사진 크기</span>   
//                             <div style={{display:'flex', justifyContent:'start', alignItems:'center', flexDirection:'row', paddingLeft:'3%'}}>                     
//                                 <Input
//                                     placeholder="사진 크기"
//                                     prefix={<UserOutlined className="site-form-item-icon" />}
//                                     suffix={
//                                         <Tooltip title="사진의 크기를 설정하세요.">
//                                         px
//                                         </Tooltip>
//                                     }
//                                     type="number"
//                                     style={{marginLeft:'5%', width:'30%'}}
//                                     value={props.imageWidth} 
//                                     onChange={e =>  {props.setImageWidth(e.currentTarget.value); setWs(e.currentTarget.value);}}
//                                     />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//             :
//             <>
//             <div className="make-section-one-part">
//                     <div  className="make-section-title">
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 템플릿</span>                
//                     </div>
//                     <Radio.Group defaultValue="1" style={{display:'flex', flexDirection:'column', justifyContent:'space-between', paddingTop:'6px'}}>
//                         <div style={{display:'flex', flexDirection:'row'}}>
//                             <div className="template-card">
//                                 <Radio.Button value="1" className="templateSelection" onClick={e => props.setTemplate(1)} clicked>
//                                     <img src={right} />
//                                 </Radio.Button>
//                                 <span style={{fontSize:'13px'}}>⓵ 글 좌측, 이미지 우측</span>
//                             </div>
//                             <div className="template-card">
//                                 <Radio.Button value="2" className="templateSelection" onClick={e => {props.setTemplate(2); props.setAttachment("")}} clicked>
//                                     <img src={no}/>
//                                 </Radio.Button>
//                                 <span style={{fontSize:'13px'}}>② 글 좌측, 이미지 X</span>
//                             </div>
//                         </div>
//                         <div style={{display:'flex', flexDirection:'row'}}>
//                             <div className="template-card">
//                                 <Radio.Button value="3" className="templateSelection" onClick={e => props.setTemplate(3)} clicked>
//                                     <img src={left}/>
//                                 </Radio.Button>
//                                 <span style={{fontSize:'13px'}}>⓷ 이미지 좌측, 글 우측</span>
//                             </div>
//                             <div className="template-card">
//                                 <Radio.Button value="4" className="templateSelection" onClick={e => props.setTemplate(4)} clicked>
//                                     <img src={center}/>
//                                 </Radio.Button>
//                                 <span style={{fontSize:'13px'}}>④ 글, 이미지 중앙</span>
//                             </div>
//                         </div>
//                     </Radio.Group>
//                 </div>
//                 <div className="make-section-one-part">
//                     <div  className="make-section-title">
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 색상</span>
//                         <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row' }}>      
//                             <span className="color-container">
//                                 <span>섹션 배경</span>
//                                 <input style={{marginLeft:'3px'}} type="color" value={props.backgroundColor} onChange={e => props.setBackgroundColor(e.currentTarget.value)}/>
//                             </span>       
//                             <span className="color-container">
//                                 <span>타이틀</span>
//                                 <input style={{marginLeft:'3px'}} type="color" value={props.titleColor} onChange={e => props.setTitleColor(e.currentTarget.value)}/>
//                             </span>       
//                             <span className="color-container">
//                                 <span>내용</span>
//                                 <input style={{marginLeft:'3px'}} type="color" value={props.descColor} onChange={e => props.setDescColor(e.currentTarget.value)}/>
//                             </span>
//                         </div>
//                     </div>
//                     <div className="make-section-title" style={{marginTop:'15px'}}>
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 섹션 높이</span>                
//                     </div>
//                     <Slider
//                         value={props.sectionHeight}
//                         onChange={(e,v) => props.setSectionHeight(v)}
//                         aria-labelledby="input-slider"
//                         sx={{
//                             color: '#6B63F7',
//                             width:'90%',
//                             '& .MuiSlider-thumb': {
//                             borderRadius: '1px',
//                             },
//                         }}
//                         min={30}
//                         max={150}
//                     />
//                     <Input
//                         placeholder="섹션 높이를 설정하세요."
//                         prefix={<UserOutlined className="site-form-item-icon" />}
//                         suffix={
//                             <Tooltip title="100이 화면 세로 전체를 의미합니다.">
//                              vh
//                             </Tooltip>
//                         }
//                         value={props.sectionHeight} onChange={e => props.setSectionHeight(e.currentTarget.value)}
//                         />
//                 </div>
//                 <div className="make-section-one-part">
//                     <div style={{display:'flex', justifyContent:'start', flexDirection:'column', textAlign:'left', marginTop:'10px'}}>
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> 섹션 배경 사진</span>                
//                         <span className="title-desc-text">-  섹션에 배경이미지를 넣고 싶다면 사진을 선택해주세요.</span>                
//                     </div>
//                     <div style={{display:'flex', justifyContent:'start', width:'100%', alignItems: 'center', marginTop:'2%'}}>
//                         <div className="filebox">
//                             <label for="file">
//                                 {uploadButton}
//                             </label> 
//                             <input type="file" accept="image/*" id="file"  onChange={ e => onFileChangeBack(e) } />
//                         </div>
//                         <img src={props.backgroundImage} width={120} style={{marginLeft:'10px'}} className="image-hover" onClick={e => props.setBackgroundImage("")}/>
//                     </div>
//                 </div>
//                 {parseInt(props.secNum) === 1 &&
//                 <div className="make-section-one-part" style={{alignItems:'start'}}>
//                     <div  className="make-section-title" style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
//                         <span style={{fontSize:'16px'}}><span className="nemonemo">■</span> CTA</span>           
//                         <Popover placement="topLeft" title="설명" content={content3}>
//                             <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)', marginLeft:'2%' }} />
//                         </Popover>                    
//                         <GreenSwitch {...label} value={props.s1applyButtonUse} onChange={e => props.setS1applyButtonUse(!props.s1applyButtonUse)} />
//                     </div>   
//                 {props.s1applyButtonUse && <>
//                 <div style={{marginTop:'15px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
//                         <TextField id="outlined-basic" label="CTA 버튼 이름" variant="outlined" value={props.s1applyButton} onChange={e => props.setS1applyButton(e.currentTarget.value)}/>
//                         <div style={{width:'60px', height:'100%'}}>
//                             <span style={{color:'gray', fontSize:'12px'}}>글자 색상</span>
//                             <input style={{width:'36px', height:'36px', marginBottom:'4px'}} type="color" value={props.s1applyButtonColor} onChange={e => props.setS1applyButtonColor(e.currentTarget.value)}/>
//                         </div>
//                     </div>
//                     <span className="title-desc-text">클릭을 유도할 수 있는 말을 작성 해주세요.</span>  
//                 </>
//                 }
//                 </div>
//                 }
//             </>
//             }
//         </div>
//     )
// }

// export default SectionMake
