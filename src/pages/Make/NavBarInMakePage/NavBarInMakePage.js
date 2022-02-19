import React, {useContext, useState} from 'react';
import { Button } from 'antd';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import {Monitor} from '@styled-icons/feather'
import { Phone } from '@styled-icons/bootstrap'
import {Fullscreen} from '@styled-icons/bootstrap'
import LoginModal from '../../../components/Login/LoginModal'
import { dbService } from '../../../tools/fbase';
import { stService } from '../../../tools/fbase';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash'
import produce from 'immer'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
  } from '@chakra-ui/react'

const NavBarInMakePage = ({history, userObj, full, setFull, isPhone, setIsPhone, loading, foot, editing, editingId, setLoading, setting, navi, setNavi, saveLocalStorage}) => {
    const [loginModal, setLoginModal] = useState(false)
    const {state, action} = useContext(MyContext)
    const [deviceOpen, setDeviceOpen] = useState(false);
  
    const handleClick = () => {
        setDeviceOpen(!deviceOpen);
    };
  
    const handleClose = () => {
        setDeviceOpen(false);
    };

    const moveToMain = () => {
        window.open(
            'https://surfee.co.kr',
            '_blank' // <- This is what makes it open in a new window.
        );
    }



    const checkUnSaved = (attach) => {
        return attach.length > 1000;
    }


    const saveTo = async () => {
        // 로딩 시작
        setLoading(true);

        await saveImages()
        await afterSaveImage()
    }

const saveImages = async () => {

    if(navi.logo.use && navi.logo.image.use && checkUnSaved(navi.logo.image.attachment)){
        // 사진을 먼저 업로드하고 그 URL을 받아서 데이터로 넣어줘야한다.
        const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
        const response = await attachmentRef.putString(navi.logo.image.attachment, "data_url");
        const attachmentURL = await response.ref.getDownloadURL();
        
        setNavi(produce(navi, draft => {
            draft.logo.image.attachment = attachmentURL;
        }))
    }
    if(checkUnSaved(setting.faviconAttachment)){
        // 사진을 먼저 업로드하고 그 URL을 받아서 데이터로 넣어줘야한다.
        const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
        const response = await attachmentRef.putString(setting.faviconAttachment, "data_url");
        const attachmentURL = await response.ref.getDownloadURL();
        
        action.setSetting(produce(state.setting, draft => {
            draft.faviconAttachment = attachmentURL;
        }))
    }

    let contCopy = lodash.cloneDeep(state.contents)
    let deleteList = []

    for ( const [index, cont] of state.contents.entries() ){
        console.log(index, typeof index, cont )

        // 배경 이미지 업로드 배경은 다 있지?
        if(cont.backgroundType === "image" && checkUnSaved(cont.backgroundImage.attachment)){
            const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(cont.backgroundImage.attachment, "data_url");
            const attachmentURL = await response.ref.getDownloadURL();

            contCopy[index].backgroundImage.attachment = attachmentURL;
        }else if(cont.backgroundType === "color"){
            contCopy[index].backgroundImage.attachment = '';
        }

        if(cont.sectionTypeName === 'HeroSection' || cont.sectionTypeName === 'DetailSection' || cont.sectionTypeName === 'CtaSection' || cont.sectionTypeName === 'VideoSection' ||  cont.sectionTypeName === 'MockupSection'){

            // 이미지 업로드
            if(cont.contents.type === 'image') {
                contCopy[index].video.attachment = ''
                contCopy[index].slide_img.attachment1 = ''
                contCopy[index].slide_img.attachment2 = ''
                contCopy[index].slide_img.attachment3 = ''
                contCopy[index].mockup.attachment = ''
                contCopy[index].mockup.attachment2 = ''
            }
            // 이미지 업로드
            if(cont.contents.type === 'video') {
                contCopy[index].image.attachment = ''
                contCopy[index].slide_img.attachment1 = ''
                contCopy[index].slide_img.attachment2 = ''
                contCopy[index].slide_img.attachment3 = ''
                contCopy[index].mockup.attachment = ''
                contCopy[index].mockup.attachment2 = ''
            }

            if(cont.contents.type === 'slide') {
                contCopy[index].video.attachment = ''
                contCopy[index].image.attachment = ''
                contCopy[index].mockup.attachment = ''
                contCopy[index].mockup.attachment2 = ''
            }

            if(cont.contents.type === 'mockup') {
                contCopy[index].video.attachment = ''
                contCopy[index].image.attachment = ''
                contCopy[index].slide_img.attachment1 = ''
                contCopy[index].slide_img.attachment2 = ''
                contCopy[index].slide_img.attachment3 = ''
            }

            if(cont.contents.type === 'image' && checkUnSaved(cont.image.attachment)){

                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.image.attachment, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].image.attachment = attachmentURL;
            }

            // 목업 업로드
            if(cont.contents.type === 'mockup' && checkUnSaved(cont.mockup.attachment)){
                console.log("목업 한장 업로드")
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.mockup.attachment, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].mockup.attachment = attachmentURL;
            }
            if(cont.contents.type === 'mockup' && checkUnSaved(cont.mockup.attachment2)){
                console.log("목업 두장 업로드")
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.mockup.attachment2, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].mockup.attachment2 = attachmentURL;
            }

            // 슬라이드 업로드
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment1)){
                console.log("슬라이드 한장 업로드")
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment1, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment1 = attachmentURL;
            }
            // 슬라이드 업로드
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment2)){
                console.log("슬라이드 두장 업로드")
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment2, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment2 = attachmentURL;
            }
            // 슬라이드 업로드
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment3)){
                console.log("슬라이드 세장 업로드")
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment3, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment3 = attachmentURL;
            }
            // 슬라이드 업로드
            if(cont.contents.type === 'video' && cont.video.type === 'base' && checkUnSaved(cont.video.attachment)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.video.attachment, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].video.attachment = attachmentURL;
            }

        }

        // 엘리먼츠 업로드
        if(cont.sectionTypeName === 'FeaturesSection' || cont.sectionTypeName === 'ReviewSection' || cont.sectionTypeName === 'GallerySection'){
            if(cont.element.type === 'image'){
                for ( const [index2, value] of cont.elements.entries() ) {
                    if(checkUnSaved(value.attachment)){
                        const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                        const response = await attachmentRef.putString(value.attachment, "data_url");
                        const attachmentURL = await response.ref.getDownloadURL();
                        contCopy[index].elements[index2].attachment = attachmentURL;
                    }
                }
            }else if(cont.element.type === 'icon'){
                for ( const [index2, value] of cont.elements.entries() ) {
                    contCopy[index].elements[index2].attachment = '';
                }
            }
        }
        // 다른 이미지는 더 없는거겠지?
    }

    action.setContents(lodash.cloneDeep(contCopy))
}

const afterSaveImage = async () => {
    if(editing){

        let savedPage
    
        const savedPages = await dbService
            .collection(`saved-page`)
            .doc(editingId)
            .get()
            .then(snapshot => savedPage = {...snapshot.data(), id:snapshot.id})
        
        if( !savedPage ){
            alert("잘못된 접근입니다.")
            setLoading(false);
            return
        }

        const body = {
            contents:state.contents,
            navi:navi,
            foot:foot,
            setting:setting,
            created:Date.now(),
            makerEmail:userObj.email,
            // makingTypeByUser:makingTypeByUser,
            urlId:setting.urlId,
        }

        await dbService.doc(`saved-page/${editingId}`).update(body);
        // 자동저장 하던 걸 지운다.
        window.localStorage.removeItem("temp");
        
        setTimeout(() => {
            setLoading(false);
            history.push('/#/response');
            history.go();
        },200)
    }else{
        console.log( '수정 중이 아니다' );

        const savedPages = await dbService
            .collection("saved-page")
            .where("urlId", "==", setting.urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let savedPage = savedPages.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(setting.urlId === ''){
            alert("url을 설정해야 합니다.");
            setLoading(false);
        }else if(savedPage.length > 0){
            alert("이미 존재하는 url입니다. 다른 url을 사용해 주세요.");
            setLoading(false);
        }else{
            const body = {
                contents:state.contents,
                navi:navi,
                foot:foot,
                setting:setting,
                created:Date.now(),
                makerEmail:userObj.email,
                // makingTypeByUser:makingTypeByUser,
                urlId:setting.urlId,
            }
            // const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)

            // const response = await attachmentRef.putString(attachment, "data_url");
            // const attachmentURL = await response.ref.getDownloadURL();

            await dbService.collection("saved-page").add(body);

            await dbService.collection("urlStores").add({urlId:body.urlId});

            // 자동저장 하던 걸 지운다.
            window.localStorage.removeItem("temp");
            
            setTimeout(() => {
                setLoading(false);
                history.push('/#/response');
                history.go();
            },200)
        }
    }
}

    
    const onSubmit = async () => {
        // 배포하기 클릭
        // 관리페이지에서 수정하기를 누른 거라면
        
        saveLocalStorage()

        if(userObj === null){
            alert("로그인 하셔야 저장 후 배포하실 수 있습니다.");
            setLoginModal(true);
        }else{
            // 새로 업로드 해야한다.
            // 파이어 베이스에 저장한다.
            saveTo();
            // setCheckModalOpen(true);
        }
    }

    const deviceSelect = () => {
        return(
            <div style={{width:'15%', paddingRight:'20px'}}>
                <Popover
                    placement='bottom'
                    closeOnBlur={false}
                    isOpen={deviceOpen}
                    onClose={handleClose}
                >
                <PopoverTrigger>
                    <div className="device-button" onClick={handleClick} style={{marginRight:'20px'}}>
                        {
                            isPhone ? <Phone size="25" /> : <Monitor size="25" />
                        }
                    </div>
                </PopoverTrigger>
                <PopoverContent style={{width:'200px', borderRadius:'20px'}}>
                    <PopoverArrow />
                    
                    <PopoverBody>
                        <div className="device__container">
                            <span className={isPhone && !full ? "device-button clicked" : "device-button" } onClick={e => {setIsPhone(true);setFull(false); handleClick()}}>
                                <div className="left">
                                    모바일
                                </div>
                                <div className="right">
                                    <Phone size="25" />
                                </div>
                            </span>
                            <span className={full ? "device-button clicked" : "device-button" } onClick={e => {
                                if(state.isPhone){
                                    return
                                }else{
                                setFull(true); 
                                handleClick()
                                }   
                            }}>
                                <div className="left">
                                    전체화면
                                </div>
                                <div className="right">
                                    <Fullscreen size="25" />
                                </div>
                            </span>
                            <span className={!isPhone && !full ? "device-button clicked" : "device-button" } onClick={e => {setIsPhone(false);setFull(false); handleClick()}}>
                                <div className="left">
                                    PC
                                </div>
                                <div className="right">
                                    <Monitor size="25" />
                                </div>
                            </span>
                        </div>
                    </PopoverBody>
                </PopoverContent>
                </Popover>
            </div>
            )
    }

    return (
        <ChakraProvider>
            <div className="make-page-nav">
                <div className="make-page-nav-half" style={{justifyContent: 'start', marginLeft:'1%'}}>
                    <span className={state.secNum === 52 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(52); 
                    }} >
                        기본 설정
                    </span>
                    <span className={state.secNum === 53 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(53);
                    }} >
                        페이지 구성
                    </span>
                </div>
                <div className="make-page-nav-half">
                    <div className="centera">
                        <Button onClick={() => moveToMain()} className="edit-nav-home-button">
                            Surfee
                        </Button>
                    </div>
                </div>
                <div className="make-page-nav-half" style={{justifyContent: 'end', marginRight:'1%'}}>
                    {deviceSelect()}
                    <Button onClick={() => saveTo()} className="default-button-02">
                        저장하기
                    </Button>
                </div>
            </div>
            <LoginModal open={loginModal} setOpen={setLoginModal} />
        </ChakraProvider>
    )
}

export default NavBarInMakePage
