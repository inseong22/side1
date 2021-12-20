import React, {useEffect, useState, useRef} from 'react'
import './utils/MakePage.css'
import { dbService } from '../tools/fbase';
import { stService } from '../tools/fbase';
import {Link} from 'react-router-dom';
import Section from './utils/Section/Section'
import SectionMake from './utils/Make/SectionMake'
import LastSection from './utils/Section/LastSection'
import MakeNavBar from './utils/NavBar/MakeNavBar'
import MakeFooter from './utils/NavBar/MakeFooter'
import LastSectionMake from './utils/Make/LastSectionMake'
import MainSection from './utils/Make/MainSection'
import ModalMade from './utils/ModalMade'
import LoadingModal from './utils/Modal/LoadingModal'
import CheckModal from './utils/Modal/CheckModal'
import { Input, Tooltip, Button } from 'antd';
import './utils/MakeLanding.css'
import './utils/NavBar/MakeNavBar.css'
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import OverflowScrolling from 'react-overflow-scrolling';

import section0 from '../tools/img/section0.png';
import man from '../tools/img/005.png';
import section1 from '../tools/img/section1.png';
import section3 from '../tools/img/section3.png';
import surfeelogo from '../tools/img/surfeelogo.png';
import empty from '../tools/img/empty.png';
import { v4 as uuidv4 } from 'uuid';


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

const MakePage = ({history}) => {
    const targets = useRef(null)
    const [device, setDevice] = useState(true)
    const [full, setFull] = useState(false)
    const [password, setPassword] = useState("");
    const [ch, setCh] = useState(false);
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

    // 섹션 1
    const [s2title, setS2title] = useState("Surfee에 오신 것을 환영합니다.\n프로젝트의 타이틀 설명을\n적어보세요.");
    const [s2titleColor, setS2titleColor] = useState("rgba(255,255,255,1)");
    const [s2desc, setS2desc] = useState("여기는 타이틀에 대한 세부 내용을 적어보세요.\n신규 서비스와 이벤트부터 스타트업 아이템 검증까지,\n코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해\n최고의 고객 전환율을 경험해 보세요.");
    const [s2descColor, setS2descColor] = useState("rgba(255,255,255,1)");
    const [s2descSize, setS2descSize] = useState(20);
    const [s2titleSize, setS2titleSize] = useState(40);
    const [attachment2, setAttachment2] = useState("");
    const [imageWidth2, setImageWidth2] = useState(400);
    const [s2template, setS2template] = useState(1);
    const [s2backgroundColor, setS2backgroundColor] = useState("#6B63F7")
    const [backgroundImage2, setBackgroundImage2] = useState("")
    const [sectionHeight2, setSectionHeight2] = useState(100)
    const [s2applyButton, setS2applyButton] = useState("지금바로 시작하기");
    const [s2applyButtonUse, setS2applyButtonUse] = useState(false);
    const [s2applyButtonColor, setS2applyButtonColor] = useState("rgba(255,255,255,1)");

    // 섹션 1
    const [s3title, setS3title] = useState("Surfee에 오신 것을 환영합니다.\n프로젝트의 타이틀 설명을\n적어보세요.");
    const [s3titleColor, setS3titleColor] = useState("rgba(255,255,255,1)");
    const [s3desc, setS3desc] = useState("여기는 타이틀에 대한 세부 내용을 적어보세요.\n신규 서비스와 이벤트부터 스타트업 아이템 검증까지,\n코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해\n최고의 고객 전환율을 경험해 보세요.");
    const [s3descColor, setS3descColor] = useState("rgba(255,255,255,1)");
    const [s3descSize, setS3descSize] = useState(20);
    const [s3titleSize, setS3titleSize] = useState(40);
    const [attachment3, setAttachment3] = useState("");
    const [imageWidth3, setImageWidth3] = useState(400);
    const [s3template, setS3template] = useState(1);
    const [s3backgroundColor, setS3backgroundColor] = useState("#6B63F7")
    const [backgroundImage3, setBackgroundImage3] = useState("")
    const [sectionHeight3, setSectionHeight3] = useState(100)
    const [s3applyButton, setS3applyButton] = useState("지금바로 시작하기");
    const [s3applyButtonUse, setS3applyButtonUse] = useState(false);
    const [s3applyButtonColor, setS3applyButtonColor] = useState("rgba(255,255,255,1)");

    // 섹션 1
    const [s4title, setS4title] = useState("Surfee에 오신 것을 환영합니다.\n프로젝트의 타이틀 설명을\n적어보세요.");
    const [s4titleColor, setS4titleColor] = useState("rgba(255,255,255,1)");
    const [s4desc, setS4desc] = useState("여기는 타이틀에 대한 세부 내용을 적어보세요.\n신규 서비스와 이벤트부터 스타트업 아이템 검증까지,\n코딩없이 랜딩페이지를 만들고 실시간 데이터 분석을 통해\n최고의 고객 전환율을 경험해 보세요.");
    const [s4descColor, setS4descColor] = useState("rgba(255,255,255,1)");
    const [s4descSize, setS4descSize] = useState(20);
    const [s4titleSize, setS4titleSize] = useState(40);
    const [attachment4, setAttachment4] = useState("");
    const [imageWidth4, setImageWidth4] = useState(400);
    const [s4template, setS4template] = useState(1);
    const [s4backgroundColor, setS4backgroundColor] = useState("#6B63F7")
    const [backgroundImage4, setBackgroundImage4] = useState("")
    const [sectionHeight4, setSectionHeight4] = useState(100)
    const [s4applyButton, setS4applyButton] = useState("지금바로 시작하기");
    const [s4applyButtonUse, setS4applyButtonUse] = useState(false);
    const [s4applyButtonColor, setS4applyButtonColor] = useState("rgba(255,255,255,1)");

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
    const [open, setOpen] = useState(true);
    // CTA
    const [ctaUse, setCtaUse] = useState(false);
    const [ctaTitle, setCtaTitle] = useState("CTA 버튼");
    const [ctaColor, setCtaColor] = useState("rgba(0,0,0,1)");
    const [ctaLink, setCtaLink] = useState("www.naver.com");

    const onSubmit = () => {
        setCh(true);
    }

    const onSubmit2 = async () => {
            setLoading(true);

            // 사진을 먼저 업로드하고 그 URL을 받아서 데이터로 넣어줘야한다.
            console.log("sa", stService);


            const attachmentRef = stService.ref().child(`${urlId}/${uuidv4()}`)

            let response;
            let attachmentURL1 = ""
            if(attachment1.length > 1){
                const response1 = await attachmentRef.putString(attachment1, "data_url");
                attachmentURL1 = await response1.ref.getDownloadURL();
            }


            const attachmentRef2 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let attachmentURL2 = ""
            if(attachment2.length > 1){
                const response2 = await attachmentRef2.putString(attachment2, "data_url");
                attachmentURL2 = await response2.ref.getDownloadURL();
            }
            

            const attachmentRef3 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let attachmentURL3 = "";
            if(attachment3.length > 1){
                const response3 = await attachmentRef3.putString(attachment3, "data_url");
                attachmentURL3 = await response3.ref.getDownloadURL();
            }

            let attachmentURL4 = ""
            if(attachment4.length > 1){
                const response4 = await attachmentRef.putString(attachment4, "data_url");
                attachmentURL4 = await response4.ref.getDownloadURL();
            }


            const attachmentRef4 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let faviconAttachmentURL = ""
            if(faviconAttachment.length>1){
                const response5 = await attachmentRef4.putString(faviconAttachment, "data_url");
                faviconAttachmentURL = await response5.ref.getDownloadURL();
            }


            const attachmentRef5 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL1 = "";
            if(backgroundImage1.length>1){
                const response6 = await attachmentRef5.putString(backgroundImage1, "data_url");
                backgroundImageURL1 = await response6.ref.getDownloadURL();
            }


            const attachmentRef6 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL2 = "";
            if(backgroundImage2.length>1){
                const response7 = await attachmentRef6.putString(backgroundImage2, "data_url");
                backgroundImageURL2 = await response7.ref.getDownloadURL();
            }


            const attachmentRef7 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL3 = "";
            if(backgroundImage3.length>1){
                const response8 = await attachmentRef7.putString(backgroundImage3, "data_url");
                backgroundImageURL3 = await response8.ref.getDownloadURL();
            }


            const attachmentRef8 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL4 = ""
            if(backgroundImage4.length>1){
                const response9 = await attachmentRef8.putString(backgroundImage4, "data_url");
                backgroundImageURL4 = await response9.ref.getDownloadURL();
            }


            const oneLandingPage = {
                device,
                full,
                password,
                mainColor,
                mainTitleColor,
                urlId,
                urlTitle,
                font,
                descFont,
                faviconAttachment:faviconAttachmentURL,
                s1title,
                s1titleColor,
                s1desc,
                s1descColor,
                s1descSize,
                s1titleSize,
                attachment1:attachmentURL1,
                imageWidth1,
                s1template,
                s1backgroundColor,
                backgroundImage1:backgroundImageURL1,
                sectionHeight1,
                s1applyButton,
                s1applyButtonUse,
                s1applyButtonColor,
                s2title,
                s2titleColor,
                s2desc,
                s2descColor,
                s2descSize,
                s2titleSize,
                attachment2:attachmentURL2,
                imageWidth2,
                s2template,
                s2backgroundColor,
                backgroundImage2:backgroundImageURL2,
                sectionHeight2,
                s2applyButton,
                s2applyButtonUse,
                s2applyButtonColor,
                s3title,
                s3titleColor,
                s3desc,
                s3descColor,
                s3descSize,
                s3titleSize,
                attachment3:attachmentURL3,
                imageWidth3,
                s3template,
                s3backgroundColor,
                backgroundImage3:backgroundImageURL3,
                sectionHeight3,
                s3applyButton,
                s3applyButtonUse,
                s3applyButtonColor,
                s4title,
                s4titleColor,
                s4desc,
                s4descColor,
                s4descSize,
                s4titleSize,
                attachment4:attachmentURL4,
                imageWidth4,
                s4template,
                s4backgroundColor,
                backgroundImage4:backgroundImageURL4,
                sectionHeight4,
                s4applyButton,
                s4applyButtonUse,
                s4applyButtonColor,
                useLastSection,
                lasttitle,
                lastdesc,
                lasttitleColor,
                lastdescColor,
                lasttitleSize,
                lastDescSize,
                lastbackgroundColor,
                lastapplyButton,
                lastApplies,
                answers,
                lastSectionHeight,
                link,
                inf,
                naviTitle,
                naviColor,
                naviTitleColor,
                naviButtonTitle,
                naviButtonColor,
                footerOrNot,
                footerColor,
                userEmail,
                userPhoneNumber,
                secNum,
                secNums,
                loading,
                open,
                ctaUse,
                ctaTitle,
                ctaColor,
                ctaLink,
                created:Date.now(),
            };

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
                case 2:
                    setAttachment2(result);
                    break;
                case 3:
                    setAttachment3(result);
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

            let response;
            let attachmentURL1 = ""
            if(attachment1.length > 1){
                const response1 = await attachmentRef.putString(attachment1, "data_url");
                attachmentURL1 = await response1.ref.getDownloadURL();
            }


            const attachmentRef2 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let attachmentURL2 = ""
            if(attachment2.length > 1){
                const response2 = await attachmentRef2.putString(attachment2, "data_url");
                attachmentURL2 = await response2.ref.getDownloadURL();
            }
            

            const attachmentRef3 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let attachmentURL3 = "";
            if(attachment3.length > 1){
                const response3 = await attachmentRef3.putString(attachment3, "data_url");
                attachmentURL3 = await response3.ref.getDownloadURL();
            }

            let attachmentURL4 = ""
            if(attachment4.length > 1){
                const response4 = await attachmentRef.putString(attachment4, "data_url");
                attachmentURL4 = await response4.ref.getDownloadURL();
            }


            const attachmentRef4 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let faviconAttachmentURL = ""
            if(faviconAttachment.length>1){
                const response5 = await attachmentRef4.putString(faviconAttachment, "data_url");
                faviconAttachmentURL = await response5.ref.getDownloadURL();
            }


            const attachmentRef5 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL1 = "";
            if(backgroundImage1.length>1){
                const response6 = await attachmentRef5.putString(backgroundImage1, "data_url");
                backgroundImageURL1 = await response6.ref.getDownloadURL();
            }


            const attachmentRef6 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL2 = "";
            if(backgroundImage2.length>1){
                const response7 = await attachmentRef6.putString(backgroundImage2, "data_url");
                backgroundImageURL2 = await response7.ref.getDownloadURL();
            }


            const attachmentRef7 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL3 = "";
            if(backgroundImage3.length>1){
                const response8 = await attachmentRef7.putString(backgroundImage3, "data_url");
                backgroundImageURL3 = await response8.ref.getDownloadURL();
            }


            const attachmentRef8 = stService.ref().child(`${urlId}/${uuidv4()}`)
            let backgroundImageURL4 = ""
            if(backgroundImage4.length>1){
                const response9 = await attachmentRef8.putString(backgroundImage4, "data_url");
                backgroundImageURL4 = await response9.ref.getDownloadURL();
            }

            const oneLandingPage = {
                device,
                full,
                password,
                mainColor,
                mainTitleColor,
                urlId,
                urlTitle,
                font,
                descFont,
                faviconAttachment:faviconAttachmentURL,
                s1title,
                s1titleColor,
                s1desc,
                s1descColor,
                s1descSize,
                s1titleSize,
                attachment1:attachmentURL1,
                imageWidth1,
                s1template,
                s1backgroundColor,
                backgroundImage1:backgroundImageURL1,
                sectionHeight1,
                s1applyButton,
                s1applyButtonUse,
                s1applyButtonColor,
                s2title,
                s2titleColor,
                s2desc,
                s2descColor,
                s2descSize,
                s2titleSize,
                attachment2:attachmentURL2,
                imageWidth2,
                s2template,
                s2backgroundColor,
                backgroundImage2:backgroundImageURL2,
                sectionHeight2,
                s2applyButton,
                s2applyButtonUse,
                s2applyButtonColor,
                s3title,
                s3titleColor,
                s3desc,
                s3descColor,
                s3descSize,
                s3titleSize,
                attachment3:attachmentURL3,
                imageWidth3,
                s3template,
                s3backgroundColor,
                backgroundImage3:backgroundImageURL3,
                sectionHeight3,
                s3applyButton,
                s3applyButtonUse,
                s3applyButtonColor,
                s4title,
                s4titleColor,
                s4desc,
                s4descColor,
                s4descSize,
                s4titleSize,
                attachment4:attachmentURL4,
                imageWidth4,
                s4template,
                s4backgroundColor,
                backgroundImage4:backgroundImageURL4,
                sectionHeight4,
                s4applyButton,
                s4applyButtonUse,
                s4applyButtonColor,
                useLastSection,
                lasttitle,
                lastdesc,
                lasttitleColor,
                lastdescColor,
                lasttitleSize,
                lastDescSize,
                lastbackgroundColor,
                lastapplyButton,
                lastApplies,
                answers,
                lastSectionHeight,
                link,
                inf,
                naviTitle,
                naviColor,
                naviTitleColor,
                naviButtonTitle,
                naviButtonColor,
                footerOrNot,
                footerColor,
                userEmail,
                userPhoneNumber,
                secNum,
                secNums,
                loading,
                open,
                ctaUse,
                ctaTitle,
                ctaColor,
                ctaLink,
                created:Date.now(),
            };

            console.log(checkData,"Ad");

            if(checkData.length == 0){
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
        if(item === secNum){
            var backColor = '#6B63F7a2';
        }else{
            var backColor = 'white';
        }

        if(item === 0){
            return (
                <span index={index} style={{backgroundColor:`${backColor}`}} className="make-page-section-selector" onClick={(e) => {
                    setSecNum(item);
                    }}>
                    기본설정
                </span>
            )
        }else{
            return(
                <span index={index} style={{backgroundColor:`${backColor}`}} className="make-page-section-selector" onClick={(e) => setSecNum(item)}>
                    <span style={{width:'70%'}}>섹션 {item}</span>
                </span>
                )
        }
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
            alert("해당하는 불러오기 정보가 없습니다!")
            return;
        }else{
            setDevice(checkData[0].device)
            setFull(checkData[0].full)
            setPassword(checkData[0].password)
            setMainColor(checkData[0].mainColor)
            setMainTitleColor(checkData[0].mainTitleColor)
            setUrlId(checkData[0].urlId)
            setUrlTitle(checkData[0].urlTitle)
            setFont(checkData[0].font)
            setDescFont(checkData[0].descFont)
            setFaviconAttachment(checkData[0].faviconAttachment)
            setS1title(checkData[0].s1title)
            setS1titleColor(checkData[0].s1titleColor)
            setS1desc(checkData[0].s1desc)
            setS1descColor(checkData[0].s1descColor)
            setS1descSize(checkData[0].s1descSize)
            setS1titleSize(checkData[0].s1titleSize)
            setAttachment1(checkData[0].attachment1)
            setImageWidth1(checkData[0].imageWidth1)
            setS1template(checkData[0].s1template)
            setS1backgroundColor(checkData[0].s1backgroundColor)
            setBackgroundImage1(checkData[0].backgroundImage1)
            setSectionHeight1(checkData[0].sectionHeight1)
            setS1applyButton(checkData[0].s1applyButton)
            setS1applyButtonUse(checkData[0].s1applyButtonUse)
            setS1applyButtonColor(checkData[0].s1applyButtonColor)
            setS2title(checkData[0].s2title)
            setS2titleColor(checkData[0].s2titleColor)
            setS2desc(checkData[0].s2desc)
            setS2descColor(checkData[0].s2descColor)
            setS2descSize(checkData[0].s2descSize)
            setS2titleSize(checkData[0].s2titleSize)
            setAttachment2(checkData[0].attachment2)
            setImageWidth2(checkData[0].imageWidth2)
            setS2template(checkData[0].s2template)
            setS2backgroundColor(checkData[0].s2backgroundColor)
            setBackgroundImage2(checkData[0].backgroundImage2)
            setSectionHeight2(checkData[0].sectionHeight2)
            setS2applyButton(checkData[0].s2applyButton)
            setS2applyButtonUse(checkData[0].s2applyButtonUse)
            setS2applyButtonColor(checkData[0].s2applyButtonColor)
            setS3title(checkData[0].s3title)
            setS3titleColor(checkData[0].s3titleColor)
            setS3desc(checkData[0].s3desc)
            setS3descColor(checkData[0].s3descColor)
            setS3descSize(checkData[0].s3descSize)
            setS3titleSize(checkData[0].s3titleSize)
            setAttachment3(checkData[0].attachment3)
            setImageWidth3(checkData[0].imageWidth3)
            setS3template(checkData[0].s3template)
            setS3backgroundColor(checkData[0].s3backgroundColor)
            setBackgroundImage3(checkData[0].backgroundImage3)
            setSectionHeight3(checkData[0].sectionHeight3)
            setS3applyButton(checkData[0].s3applyButton)
            setS3applyButtonUse(checkData[0].s3applyButtonUse)
            setS3applyButtonColor(checkData[0].s3applyButtonColor)
            setS4title(checkData[0].s4title)
            setS4titleColor(checkData[0].s4titleColor)
            setS4desc(checkData[0].s4desc)
            setS4descColor(checkData[0].s4descColor)
            setS4descSize(checkData[0].s4descSize)
            setS4titleSize(checkData[0].s4titleSize)
            setAttachment4(checkData[0].attachment4)
            setImageWidth4(checkData[0].imageWidth4)
            setS4template(checkData[0].s4template)
            setS4backgroundColor(checkData[0].s4backgroundColor)
            setBackgroundImage4(checkData[0].backgroundImage4)
            setSectionHeight4(checkData[0].sectionHeight4)
            setS4applyButton(checkData[0].s4applyButton)
            setS4applyButtonUse(checkData[0].s4applyButtonUse)
            setS4applyButtonColor(checkData[0].s4applyButtonColor)
            setUseLastSection(checkData[0].useLastSection)
            setLasttitle(checkData[0].lasttitle)
            setLastdesc(checkData[0].lastdesc)
            setLasttitleColor(checkData[0].lasttitleColor)
            setLastdescColor(checkData[0].lastdescColor)
            setLasttitleSize(checkData[0].lasttitleSize)
            setLastDescSize(checkData[0].lastDescSize)
            setLastbackgroundColor(checkData[0].lastbackgroundColor)
            setLastapplyButton(checkData[0].lastapplyButton)
            setLastApplies(checkData[0].lastApplies)
            setAnswers(checkData[0].answers)
            setLastSectionHeight(checkData[0].lastSectionHeight)
            setLink(checkData[0].link)
            setInf(checkData[0].inf)
            setNaviTitle(checkData[0].naviTitle)
            setNaviColor(checkData[0].naviColor)
            setNaviTitleColor(checkData[0].naviTitleColor)
            setNaviButtonTitle(checkData[0].naviButtonTitle)
            setNaviButtonColor(checkData[0].naviButtonColor)
            setFooterOrNot(checkData[0].footerOrNot)
            setFooterColor(checkData[0].footerColor)
            setUserEmail(checkData[0].userEmail)
            setUserPhoneNumber(checkData[0].userPhoneNumber)
            setSecNum(checkData[0].secNum)
            setSecNums(checkData[0].secNums)
            setLoading(checkData[0].loading)
            setOpen(checkData[0].open)
            setCtaUse(checkData[0].ctaUse)
            setCtaTitle(checkData[0].ctaTitle)
            setCtaColor(checkData[0].ctaColor)
            setCtaLink(checkData[0].ctaLink)          
            setTimeout( () => {
                setLoading(false);
            }, 4000)
        }

    }

    const selectorTable = () => {
        switch (secNum){
            case 0: // 기본 세팅
                return <>
                <MainSection
                    ctaUse={ctaUse} ctaLink={ctaLink} ctaTitle={ctaTitle} ctaUse={ctaUse} urlId={urlId} naviButtonColor={naviButtonColor} footerOrNot={footerOrNot}
                    mainColor={mainColor} naviTitle={naviTitle} naviTitleColor={naviTitleColor} naviButtonTitle={naviButtonTitle} mainTitleColor={mainTitleColor}
                    userEmail={userEmail} userPhoneNumber={userPhoneNumber} faviconAttachment={faviconAttachment} urlTitle={urlTitle}
                    naviColor={naviColor} setNaviColor={setNaviColor} footerColor={footerColor} setFooterColor={setFooterColor}
                    setFont={setFont} setCtaUse={setCtaUse} setCtaLink={setCtaLink} setMainColor={setMainColor}
                    setCtaColor={setCtaColor} setCtaTitle={setCtaTitle} setUrlId={setUrlId} setNaviButtonColor={setNaviButtonColor}
                    setNaviTitle={setNaviTitle} setNaviTitleColor={setNaviTitleColor} setNaviButtonTitle={setNaviButtonTitle}
                    setS1backgroundColor={setS1backgroundColor} setLastbackgroundColor={setLastbackgroundColor}
                    setS1titleColor={setS1titleColor} setS1descColor={setS1descColor}
                    setLasttitleColor={setLasttitleColor} setLastdescColor={setLastdescColor}
                    setMainTitleColor={setMainTitleColor} setFooterOrNot={setFooterOrNot} setUrlTitle={setUrlTitle}
                    setUserEmail={setUserEmail} setUserPhoneNumber={setUserPhoneNumber} setFaviconAttachment={setFaviconAttachment}
                    descFont={descFont} setDescFont={setDescFont} 
                />
                </>
            case 1:
                return <>
                <SectionMake 
                    title={s1title} desc={s1desc}  secNum="1" sectionHeight={sectionHeight1} descColor={s1descColor}
                    attachment={attachment1} titleColor={s1titleColor} backgroundColor={s1backgroundColor} descSize={s1descSize}
                    setTitleColor={setS1titleColor} setTitleSize={setS1titleSize}
                    setTitle={setS1title} setDesc={setS1desc} setDescColor={setS1descColor}
                    onFileChange={onFileChange} setTemplate={setS1template} setDescSize={setS1descSize}
                    setBackgroundColor={setS1backgroundColor} setSectionHeight={setSectionHeight1}
                    s1applyButtonUse={s1applyButtonUse} setS1applyButtonUse={setS1applyButtonUse}
                    s1applyButton={s1applyButton} setS1applyButton={setS1applyButton}
                    s1applyButtonColor={s1applyButtonColor} setS1applyButtonColor={setS1applyButtonColor}
                    imageWidth={imageWidth1} setImageWidth={setImageWidth1} setAttachment={setAttachment1}
                    backgroundImage={backgroundImage1} setBackgroundImage={setBackgroundImage1}
                    />
                </>
            case 2:
                return <>
                <SectionMake 
                    title={s2title} desc={s2desc}  secNum="2" sectionHeight={sectionHeight2} descColor={s2descColor}
                    attachment={attachment2} titleColor={s2titleColor} backgroundColor={s2backgroundColor} descSize={s2descSize}
                    setTitleColor={setS2titleColor} setTitleSize={setS2titleSize}
                    setTitle={setS2title} setDesc={setS2desc} setDescColor={setS2descColor}
                    onFileChange={onFileChange} setTemplate={setS2template} setDescSize={setS2descSize}
                    setBackgroundColor={setS2backgroundColor} setSectionHeight={setSectionHeight2}
                    s2applyButtonUse={s2applyButtonUse} setS2applyButtonUse={setS2applyButtonUse}
                    s2applyButton={s2applyButton} setS2applyButton={setS2applyButton}
                    s2applyButtonColor={s2applyButtonColor} setS2applyButtonColor={setS2applyButtonColor}
                    imageWidth={imageWidth2} setImageWidth={setImageWidth2} setAttachment={setAttachment2}
                    backgroundImage={backgroundImage2} setBackgroundImage={setBackgroundImage2}
                    />
                </>
            case 3:
                return <>
                <SectionMake 
                    title={s3title} desc={s3desc}  secNum="3" sectionHeight={sectionHeight3} descColor={s3descColor}
                    attachment={attachment3} titleColor={s3titleColor} backgroundColor={s3backgroundColor} descSize={s3descSize}
                    setTitleColor={setS3titleColor} setTitleSize={setS3titleSize}
                    setTitle={setS3title} setDesc={setS3desc} setDescColor={setS3descColor}
                    onFileChange={onFileChange} setTemplate={setS3template} setDescSize={setS3descSize}
                    setBackgroundColor={setS3backgroundColor} setSectionHeight={setSectionHeight3}
                    s3applyButtonUse={s3applyButtonUse} setS3applyButtonUse={setS3applyButtonUse}
                    s3applyButton={s3applyButton} setS3applyButton={setS3applyButton}
                    s3applyButtonColor={s3applyButtonColor} setS3applyButtonColor={setS3applyButtonColor}
                    imageWidth={imageWidth3} setImageWidth={setImageWidth3} setAttachment={setAttachment3}
                    backgroundImage={backgroundImage3} setBackgroundImage={setBackgroundImage3}
                    />
                </>
            case 4:
                return <>
                <SectionMake 
                    title={s4title} desc={s4desc}  secNum="4" sectionHeight={sectionHeight4} descColor={s4descColor}
                    attachment={attachment4} titleColor={s4titleColor} backgroundColor={s4backgroundColor} descSize={s4descSize}
                    setTitleColor={setS4titleColor} setTitleSize={setS4titleSize}
                    setTitle={setS4title} setDesc={setS4desc} setDescColor={setS4descColor}
                    onFileChange={onFileChange} setTemplate={setS4template} setDescSize={setS4descSize}
                    setBackgroundColor={setS4backgroundColor} setSectionHeight={setSectionHeight4}
                    s4applyButtonUse={s4applyButtonUse} setS4applyButtonUse={setS4applyButtonUse}
                    s4applyButton={s4applyButton} setS4applyButton={setS4applyButton}
                    s4applyButtonColor={s4applyButtonColor} setS4applyButtonColor={setS4applyButtonColor}
                    imageWidth={imageWidth4} setImageWidth={setImageWidth4} setAttachment={setAttachment4}
                    backgroundImage={backgroundImage4} setBackgroundImage={setBackgroundImage4}
                    />
                </>
            case 10:
                return(
                    <LastSectionMake 
                        title={lasttitle} desc={lastdesc}  lastApplies={lastApplies} answers={answers} lasttitleColor={lasttitleColor}
                        sectionHeight={lastSectionHeight} link={link} font={font} descFont={descFont} backgroundColor={lastbackgroundColor}
                        setTitleColor={setLasttitleColor} setTitleSize={setLasttitleSize}
                        setTitle={setLasttitle} setDesc={setLastdesc} setSectionHeight={setLastSectionHeight}
                        setBackgroundColor={setLastbackgroundColor} setAnswers={setAnswers} 
                        addInput={addInput} setLasttitleColor={setLasttitleColor} setDescColor={setLastdescColor}
                        setLink={setLink} descSize={lastDescSize} setDescSize={setLastDescSize}
                        inf={inf} setInf={setInf} lastapplyButton={lastapplyButton} setLastapplyButton={setLastapplyButton}
                    />
                )
        }
    }

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
       <OverflowScrolling className="make-page-container" style={{marginTop:'-10px'}}>
        {/* <div className="make-page-container" style={{marginTop:'-10px', overflow: 'hidden'}}> */}
            {/* 여기서부터 메인페이지 베껴옴 */}
            <div  className="make-left-landing" style={{width:`${full ? '100%' : '70%' }`}}>
            {/* <div className="make-left-landing" style={{width:`${full ? '100%' : '70%' }`}}>
                <span style={{backgroundColor:'red', width:'5px', height:`${rate*100}vh`}}></span>
                <div className="main-page-container" style={{width:`${full ? '100%' : '70%' }`,}}>   */}
                <div className="make-left-top-container" style={{display:`${full ? 'none' : 'flex'}`, justifyContent:`${device ? 'start':'center'}`}}>
                    Let's Building Your Web site! {device ?  <></> : <span> in Mobile</span>}
                </div>
                <OverflowScrolling className="scroll-container" style={{ width:`${full ? '100%' : '80%' }`, height:`${full ? '94vh' : '63vh'}`}}>
                <div className="make-main-page-container" style={{fontSize:`${full ? `${bigfont}` : `${smallfont}`}`, backgroundColor:`${s1backgroundColor}`}}>  
                    <div className="make-navigation" style={{width:`${full ? '100%' : '100%'}`, backgroundColor:`${naviColor}`}}>
                        <span className="make-nav-bar-title" onClick={() => {history.push(`/#/${urlId}`); history.go();}} style={{fontFamily:`${font}`, cursor:'pointer', color:`${naviTitleColor}`}}>
                            {naviTitle}
                        </span>
                        <span className="make-nav-on">
                            <button className="make-nav-button" style={{color:`${naviButtonColor}`,fontFamily:`${descFont}`, cursor:'pointer'}} onClick={() => window.scrollTo(0,document.body.scrollHeight)}>{naviButtonTitle}</button>
                        </span>
                    </div>
                    { secNums.length > 1 && 
                        <Section device={device}
                            sectionNumber={1}
                            title={s1title} desc={s1desc} attachment={attachment1} full={full} bigfont={bigfont} smallfont={smallfont}
                            templateNum={s1template} font={font} backgroundColor={s1backgroundColor}
                            titleColor={s1titleColor} titleSize={s1titleSize} descColor={s1descColor} descSize={s1descSize}
                            applyButtonUse={s1applyButtonUse} applyButtonText={s1applyButton} applyButtonColor={s1applyButtonColor}
                            targets={targets} sectionHeight={sectionHeight1} rate={rate}
                            descFont={descFont} imageWidth={imageWidth1} backgroundImage={backgroundImage1}
                        />
                    }
                    { secNums.length > 2 && 
                        <Section device={device}
                            sectionNumber={2}
                            title={s2title} desc={s2desc} attachment={attachment2} full={full} bigfont={bigfont} smallfont={smallfont}
                            templateNum={s2template} font={font} backgroundColor={s2backgroundColor}
                            titleColor={s2titleColor} titleSize={s2titleSize} descColor={s2descColor} descSize={s2descSize}
                            applyButtonUse={s2applyButtonUse} applyButtonText={s2applyButton} applyButtonColor={s2applyButtonColor}
                            targets={targets} sectionHeight={sectionHeight2} rate={rate}
                            descFont={descFont} imageWidth={imageWidth2} backgroundImage={backgroundImage2}
                        />
                    }
                    { secNums.length > 3 && 
                        <Section device={device}
                            sectionNumber={3}
                            title={s3title} desc={s3desc} attachment={attachment3} full={full} bigfont={bigfont} smallfont={smallfont}
                            templateNum={s3template} font={font} backgroundColor={s3backgroundColor}
                            titleColor={s3titleColor} titleSize={s3titleSize} descColor={s3descColor} descSize={s3descSize}
                            applyButtonUse={s3applyButtonUse} applyButtonText={s3applyButton} applyButtonColor={s3applyButtonColor}
                            targets={targets} sectionHeight={sectionHeight3} rate={rate}
                            descFont={descFont} imageWidth={imageWidth3} backgroundImage={backgroundImage3}
                        />
                    }
                    { secNums.length > 4 && 
                        <Section device={device}
                            sectionNumber={4}
                            title={s4title} desc={s4desc} attachment={attachment4} full={full} bigfont={bigfont} smallfont={smallfont}
                            templateNum={s4template} font={font} backgroundColor={s4backgroundColor}
                            titleColor={s4titleColor} titleSize={s4titleSize} descColor={s4descColor} descSize={s4descSize}
                            applyButtonUse={s4applyButtonUse} applyButtonText={s4applyButton} applyButtonColor={s4applyButtonColor}
                            targets={targets} sectionHeight={sectionHeight4} rate={rate}
                            descFont={descFont} imageWidth={imageWidth4} backgroundImage={backgroundImage4}
                        />
                    }

                    { useLastSection !== 0 && 
                        <LastSection 
                            targets={targets} lasttitleColor={lasttitleColor} full={full} rate={rate}
                            title={lasttitle} desc={lastdesc} sectionHeight={lastSectionHeight}
                            font={font} backgroundColor={lastbackgroundColor} descSize={lastDescSize}
                            titleColor={lasttitleColor} titleSize={lasttitleSize} font={font} descFont={descFont}
                            applyButtonText={lastapplyButton} answers={answers} lastdescColor={lastdescColor}
                            bigfont={bigfont} smallfont={smallfont} inf={inf}
                        />
                    }

                    {ctaUse && 
                    <div className="make-cta-button" style={{backgroundColor:`${ctaColor}`}}>{ctaTitle}</div>
                    }
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
        <div className="mobile-hide">
            <div>
                본 사이트는 PC환경에 최적화되어있습니다. <br />
                PC로 이동해서 랜딩페이지 제작을 시작해보세요. 😁
            </div>
        </div>
            {/* 로딩창 */}
        </OverflowScrolling>
        </>)
}

export default MakePage
