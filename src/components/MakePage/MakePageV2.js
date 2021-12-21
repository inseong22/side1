import React, {useEffect, useState, useRef, createContext} from 'react'
import './utils/MakePage.css'
import { dbService } from '../tools/fbase';
import { stService } from '../tools/fbase';
import {Link} from 'react-router-dom';
import NewSection from './Section/NewSection'
import SectionMake from './utils/Make/SectionMake'
import NewSectionMake from './utils/Make/NewSectionMake'
import MakeNavBar from './utils/NavBar/MakeNavBar'
import MakeNavigation from './utils/NavBar/MakeNavigation'
import MakeFooter from './utils/NavBar/MakeFooter'
import LastSectionMake from './utils/Make/LastSectionMake'
import MainSection from './utils/Make/MainSection'
import ModalMade from './utils/ModalMade'
import LoadingModal from './utils/Modal/LoadingModal'
import CheckModal from './utils/Modal/CheckModal'
import './utils/MakeLanding.css'
import './utils/NavBar/MakeNavBar.css'
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import OverflowScrolling from 'react-overflow-scrolling';
import empty from '../tools/img/empty.png';
import { v4 as uuidv4 } from 'uuid';

export const MyContext = React.createContext({
    state : {addingSectionAt : 1000},
    action : {setAddingSectionAt : () => {}}
});

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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const smallfont = `28px`;
const bigfont = '50px';
const rate = 0.63;

const MakePageV2 = ({history}) => {
    const targets = useRef(null)
    const [device, setDevice] = useState(true)
    const [full, setFull] = useState(false)
    const [password, setPassword] = useState("");
    const [ch, setCh] = useState(false);
    // 새로운 세팅
    const [content, setContent] = useState([
        {
            sectionTemplateNumber:1,
            titles:{
                title:'여기서 타이틀을 입력하세요.',
                font:'Pretendard-Regular',
            },
            descs:{
                desc:'여기서 설명을 입력하세요.',
                font:'Pretendard-Regular',
            }
        },
        {
            sectionTemplateNumber:2,
            titles:{
                title:'여기서 타2222세요.',
                font:'Pretendard-Regular',
            },
            descs:{
                desc:'여기서 설22222하세요.',
                font:'Pretendard-Regular',
            }
        }
    ])
    const [addingSectionAt, setAddingSectionAt] = useState(1000);

    // 메인 세팅
    const [mainColor, setMainColor] = useState("#6B63F7");
    const [mainTitleColor, setMainTitleColor] = useState("#000000");
    const [urlId, setUrlId] = useState("");
    const [urlTitle, setUrlTitle] = useState("Surfee | Landing Page Saas");
    const [font, setFont] = useState("Pretendard-ExptraBold");
    const [descFont, setDescFont] = useState("Pretendard-Regular");
    const [faviconAttachment, setFaviconAttachment] = useState("");

    // 섹션 1
    const [s1title, setS1title] = useState("Surfee에 오신 것을 환영합니다.\n프로젝트의 타이틀 설명을\n적어보세요.");
    const [s1titleColor, setS1titleColor] = useState("rgba(255,255,255,1)");
    const [s1desc, setS1desc] = useState("여기는 타이틀에 대한 세부 내용을 적어보세요.\n신규 서비스와 이벤트부터 스타트업 아이템 검증까지,\n코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해\n최고의 고객 전환율을 경험해 보세요.");
    const [s1descColor, setS1descColor] = useState("rgba(255,255,255,1)");
    const [s1descSize, setS1descSize] = useState(20);
    const [s1titleSize, setS1titleSize] = useState(40);
    const [attachment1, setAttachment1] = useState(`${empty}`);
    const [imageWidth1, setImageWidth1] = useState(400);
    const [s1template, setS1template] = useState(1);
    const [s1backgroundColor, setS1backgroundColor] = useState("#6B63F7")
    const [backgroundImage1, setBackgroundImage1] = useState("")
    const [sectionHeight1, setSectionHeight1] = useState(100)
    const [s1applyButton, setS1applyButton] = useState("지금바로 시작하기");
    const [s1applyButtonUse, setS1applyButtonUse] = useState(false);
    const [s1applyButtonColor, setS1applyButtonColor] = useState("rgba(255,255,255,1)");

    // 라스트 신청 부분
    const [useLastSection, setUseLastSection] = useState(0);
    const [lasttitle, setLasttitle] = useState("One-stop 랜딩페이지 제작 툴,\n가장 먼저 이용해 보세요");
    const [lastdesc, setLastdesc] = useState("사전신청하신 분들에겐 오픈 시 사용 가능한\n일주일 무료 이용권이 제공됩니다.");
    const [lasttitleColor, setLasttitleColor] = useState("rgba(252,252,252,1)");
    const [lastdescColor, setLastdescColor] = useState("rgba(252,252,252,1)");
    const [lasttitleSize, setLasttitleSize] = useState(30);
    const [lastDescSize, setLastDescSize] = useState(20);
    const [lasttemplate, setLasttemplate] = useState(1);
    const [lastbackgroundColor, setLastbackgroundColor] = useState("black")
    const [lastapplyButton, setLastapplyButton] = useState("사전신청하고 혜택받기");
    const [lastApplies, setLastApplies] = useState(1);
    const [answers, setAnswers] = useState([])
    const [lastSectionHeight, setLastSectionHeight] = useState(100);
    const [link, setLink] = useState("www.naver.com")
    const [inf, setInf] = useState(1);

    // 네비게이션
    const [naviTitle, setNaviTitle] = useState("")
    const [naviColor, setNaviColor] = useState("rgba(255,255,255,0)")
    const [naviTitleColor, setNaviTitleColor] = useState("rgba(255,255,255,1)")
    const [naviButtonTitle, setNaviButtonTitle] = useState("사전신청 하기")
    const [naviButtonColor, setNaviButtonColor] = useState("white")

    // 푸터
    const [footerOrNot, setFooterOrNot] = useState(false);
    const [footerColor, setFooterColor] = useState("white");
    const [userEmail, setUserEmail] = useState("surfee.business@gmail.com");
    const [userPhoneNumber, setUserPhoneNumber] = useState("010-4690-5086");

    // 사진들 아래는 기타
    const [secNum, setSecNum] = useState(1);
    const [secNums, setSecNums] = useState([0,1]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const contextValue = {
        state:{addingSectionAt},
        action : {setAddingSectionAt}
    }

    const onSubmit = () => {
        setCh(true);
    }

    const onSubmit2 = async () => {
            setLoading(true);

            const oneLandingPage = {};

            await dbService.collection("apply-landing-data").add(oneLandingPage);
            
            setTimeout(() => {
                setLoading(false);
                history.push('/#/submit');
                history.go();
            },2000)
    }

    const onFileChange =  (e, num) => {
        console.log("e", num);
        const {target:{files},} = e;
        const oneFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => { // 로딩이 끝날 때 실행한다는 뜻.
            const {currentTarget:{result}} = finishedEvent;
            switch (num){
                case 1:
                    setAttachment1(result);
                    break;
            }
        }
        reader.readAsDataURL(oneFile);
    }

    const doSave = async () => {
        // 저장하기
        if(password.length < 4){
            alert("4글자 이상 입력해주시기 바랍니다.");
            return;
        }else{
            setLoading(true);
            const checkDatas = await dbService
                .collection("apply-landing")
                .where("password", "==", password)
                .get(); // uid를 creatorId로 줬었으니까.
            let checkData = checkDatas.docs.map(doc => {
                return({...doc.data(), id:doc.id})
            });

            const attachmentRef = stService.ref().child(`${urlId}/${uuidv4()}`)

            const oneLandingPage = {

            }

            if(checkData.length === 0){
                // 없으면 새로 저장
                await dbService.collection("apply-landing").add(oneLandingPage);
                alert("저장되었습니다!");
                setLoading(false);
                return;
            }else{
                // 있으면 업데이트                
                await dbService.doc(`apply-landing/${checkData[0].id}`)
                .update(oneLandingPage)
                alert("저장되었습니다!");
                setLoading(false);
                return;
            }
        }
    }

    const addSection = () => {
        if(secNums.length > 4){
            alert("제작가능한 최대 섹션 개수에 한계가 있습니다!");
        }else{
            setSecNums([...secNums, secNums.length]);
        }
    }

    const deleteSection = () => {
        const secNumsTemp = secNums;
        secNumsTemp.pop();
        setSecNums(secNumsTemp);
    }

    const addInput = () => {
        setLastApplies(lastApplies + 1);
        console.log(lastApplies + 1);
    }

    const selectorList = secNums.map((item,index) => {
        
    })

    const doLoad = async () => {
        setLoading(true);
        const checkDatas = await dbService
            .collection("apply-landing")
            .where("password", "==", password)
            .get(); // uid를 creatorId로 줬었으니까.
        let checkData = checkDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(checkData.length === 0){
            alert("해당하는 불러오기 정보가 없습니다!");
            return;
        }else{

        }
    }

    const selectorTable = () => {
        return(
            <NewSectionMake secNum={secNum} content={content} item={content[secNum-1]} setContent={setContent} />
        )
    }

    const sectionsReturn = content.map((item, index) => {
        return(
            <>
                <NewSection content={item} index={index} setSecNum={setSecNum} />
            </>
        )
    })

    return (<>
       <MakeNavBar 
            doLoad={doLoad}
            open={open} setOpen={setOpen}
            full={full} setFull={setFull}
            device={device} setDevice={setDevice} doSave={doSave}
            naviColor={naviColor}
            password={password} setPassword={setPassword}
            onSubmit={onSubmit}
       />
       <MyContext.Provider value={contextValue}>
            <OverflowScrolling className="make-page-container" style={{marginTop:'-10px'}}>
                    {/* 여기서부터 메인페이지 베껴옴 */}
                    <div  className="make-left-landing" style={{width:`${full ? '100%' : '70%' }`}}>
                        <div className="make-left-top-container" style={{display:`${full ? 'none' : 'flex'}`, justifyContent:`${device ? 'start':'center'}`}}>
                            Let's Building Your Web site! {device ?  <></> : <span> in Mobile</span>}
                        </div>
                        <OverflowScrolling className="scroll-container" style={{ width:`${full ? '100%' : '80%' }`, height:`${full ? '94vh' : '63vh'}`}}>
                        
                        <div className="make-main-page-container" style={{fontSize:`${full ? `${bigfont}` : `${smallfont}`}`, backgroundColor:`${s1backgroundColor}`}}>  

                            <MakeNavigation
                                full={full} naviColor={naviColor} naviTitle={naviTitle}
                                font={font} urlId={urlId} naviButtonColor={naviButtonColor}
                                descFont={descFont} naviButtonTitle={naviButtonTitle}
                                history={history}
                            />
                            {/* 새로운 섹션 방식 */}
                            {sectionsReturn}
                            {/* 새로운 섹션 방식 끝 */}
                            {footerOrNot ?  <></> : 
                                <MakeFooter 
                                    userPhoneNumber={userPhoneNumber}
                                    userEmail={userEmail}
                                    naviTitle={naviTitle}
                                    footerColor={footerColor}
                                    full={full} bigfont={bigfont} smallfont={smallfont}
                                    rate={rate}
                                />
                            } 
                        </div> 
                        </OverflowScrolling>

                        {/* 섹션 추가 및 선택 및 제거를 위한 버튼 컨테이너 */}
                    
                        <div className="make-left-bottom-container" style={{display:`${full ? 'none' : 'flex'}`}}>
                            <div className="section-selector-container">
                                {selectorList}
                                {
                                    useLastSection !== 0 && 
                                    <span style={{backgroundColor:`${secNum === 10 ? "#6B63F7a2" : "white"}`}} className="make-page-section-selector" onClick={(e) => setSecNum(10)}>
                                        <span style={{width:'70%'}}>신청</span>
                                    </span>
                                }
                                <button onClick={() => addSection()} className="make-which-section-making-add-button">+</button>
                                <button onClick={() => deleteSection()} className="make-which-section-making-add-button">-</button>
                                <button onClick={() => {
                                    if(useLastSection === 0){
                                        setUseLastSection(10);
                                    }else{
                                        setUseLastSection(0);
                                    }
                                }} className="make-which-section-making-add-button" style={{backgroundColor:`${useLastSection !== 0 ? 'rgba(255,0,0,0.4)' : "#6a63f76e"}`}}>{useLastSection ? <span>신청 섹션 제거</span> : <span>신청 섹션 추가</span>}</button>
                            </div>
                        </div>
                    </div>
                {/* 여기까지 메인페이지 베껴옴 */}
                <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', backgroundColor:'white'}}>
                    <OverflowScrolling className='overflow-scrolling'>
                        <div className="make-page-make-space" style={{display:`${full ? 'none' : 'flex'}`}}>
                            <div className="section-table-container" style={{width:'100%'}}>
                                {selectorTable()}
                            </div>
                            <div style={{display: 'flex', width:'80%', justifyContent: 'center', alignItems:'center', marginTop:'10%', position:'absolute', bottom:'70px'}}>
                                <ModalMade open={open} setOpen={setOpen} naviTitle={naviTitle} setNaviTitle={setNaviTitle} s1title={s1title} setS1title={setS1title} />
                                <LoadingModal loading={loading} />
                                <CheckModal ch={ch} setCh={setCh} onSubmit2={onSubmit2}/>
                            </div>
                        </div>
                    </OverflowScrolling>
                </div>
                    {/* 모바일 제한 페이지 */}
                    <div className="mobile-hide">
                        <div>
                            본 사이트는 PC환경에 최적화되어있습니다. <br />
                            PC로 이동해서 랜딩페이지 제작을 시작해보세요. 😁
                        </div>
                    </div>
                    {/* 로딩창 */}
                </OverflowScrolling>
        </MyContext.Provider>
        </>)
}

export default MakePageV2
