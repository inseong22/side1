import React, {useContext, useState, useEffect} from 'react';
// import { Button } from 'antd';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import {Monitor} from '@styled-icons/feather'
import { Phone } from '@styled-icons/bootstrap'
import {Fullscreen} from '@styled-icons/bootstrap'
import LoginModal from '../../../components/Login/LoginModal'
import { dbService } from '../../../tools/fbase';
import { stService } from '../../../tools/fbase';
import MakeTutorialModal from '../../../tools/MakeTutorialModal';
import ChoiceModal from '../../../components/Landing/ChoiceModal'
import MiniModal from '../../../tools/MiniModal';
import { v4 as uuidv4 } from 'uuid';
import {Settings} from '@styled-icons/ionicons-sharp'
import {DocumentOnePage} from '@styled-icons/fluentui-system-filled'
import lodash from 'lodash'
import "@lottiefiles/lottie-player";
import produce from 'immer'
import {
    ChakraProvider,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Button,
  } from '@chakra-ui/react'
import {QuestionCircle} from '@styled-icons/bootstrap'
import Profile from '../../../components/NavAndFooter/Profile'

const NavBarInMakePage = ({history, userObj, full, setFull, isPhone, setIsPhone, loading, foot, editing,setEditing, setEditingId, editingId, setLoading, setting, navi, setNavi, saveLocalStorage}) => {
    const [loginModal, setLoginModal] = useState(false)
    const {state, action} = useContext(MyContext)
    const [deviceOpen, setDeviceOpen] = useState(false);
    const [tutorialOpen, setTutorialOpen] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [miniOpen, setMiniOpen] = useState(false)

    useEffect(() => {
        setMiniOpen(true);
    }, [])
  
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


const saveImages = async () => {

    if(navi.logo.use && navi.logo.image.use && checkUnSaved(navi.logo.image.attachment)){
        // ????????? ?????? ??????????????? ??? URL??? ????????? ???????????? ??????????????????.
        const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
        const response = await attachmentRef.putString(navi.logo.image.attachment, "data_url");
        const attachmentURL = await response.ref.getDownloadURL();
        
        setNavi(produce(navi, draft => {
            draft.logo.image.attachment = attachmentURL;
        }))
    }
    if(checkUnSaved(setting.faviconAttachment)){
        // ????????? ?????? ??????????????? ??? URL??? ????????? ???????????? ??????????????????.
        const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
        const response = await attachmentRef.putString(setting.faviconAttachment, "data_url");
        const attachmentURL = await response.ref.getDownloadURL();
        
        action.setSetting(produce(state.setting, draft => {
            draft.faviconAttachment = attachmentURL;
        }))
    }

    let contCopy = lodash.cloneDeep(state.contents)

    for ( const [index, cont] of state.contents.entries() ){

        // ?????? ????????? ????????? ????????? ??? ???????
        if(cont.backgroundType === "image" && checkUnSaved(cont.backgroundImage.attachment)){
            const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await attachmentRef.putString(cont.backgroundImage.attachment, "data_url");
            const attachmentURL = await response.ref.getDownloadURL();

            contCopy[index].backgroundImage.attachment = attachmentURL;
        }else if(cont.backgroundType === "color"){
            contCopy[index].backgroundImage.attachment = '';
        }

        if(cont.sectionTypeName === 'HeroSection' || cont.sectionTypeName === 'DetailSection' || cont.sectionTypeName === 'CtaSection' || cont.sectionTypeName === 'VideoSection' ||  cont.sectionTypeName === 'MockupSection'){

            // ????????? ?????????
            if(cont.contents.type === 'image') {
                contCopy[index].video.attachment = ''
                contCopy[index].slide_img.attachment1 = ''
                contCopy[index].slide_img.attachment2 = ''
                contCopy[index].slide_img.attachment3 = ''
                contCopy[index].mockup.attachment = ''
                contCopy[index].mockup.attachment2 = ''
            }
            // ????????? ?????????
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

            // ?????? ?????????
            if(cont.contents.type === 'mockup' && checkUnSaved(cont.mockup.attachment)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.mockup.attachment, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].mockup.attachment = attachmentURL;
            }
            if(cont.contents.type === 'mockup' && checkUnSaved(cont.mockup.attachment2)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.mockup.attachment2, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].mockup.attachment2 = attachmentURL;
            }

            // ???????????? ?????????
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment1)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment1, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment1 = attachmentURL;
            }
            // ???????????? ?????????
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment2)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment2, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment2 = attachmentURL;
            }
            // ???????????? ?????????
            if(cont.contents.type === 'slide' && checkUnSaved(cont.slide_img.attachment3)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.slide_img.attachment3, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].slide_img.attachment3 = attachmentURL;
            }
            // ???????????? ?????????
            if(cont.contents.type === 'video' && cont.video.type === 'base' && checkUnSaved(cont.video.attachment)){
                const attachmentRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`)
                const response = await attachmentRef.putString(cont.video.attachment, "data_url");
                const attachmentURL = await response.ref.getDownloadURL();

                contCopy[index].video.attachment = attachmentURL;
            }

        }

        // ???????????? ?????????
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
        // ?????? ???????????? ??? ????????????????
    }
    return lodash.cloneDeep(contCopy);
}

const afterSaveImage = async (returned) => {
    if(editing){
        const savedPages = await dbService
            .collection("saved-page")
            .where("urlId", "==", setting.urlId)
            .get(); // uid??? creatorId??? ???????????????.
        
        let savedPage = savedPages.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(setting.urlId === ''){
            alert("url??? ???????????? ?????????.");
            setLoading(false);
        }else if(savedPage.length > 0 && savedPage[0].id !== editingId){
            alert("?????? ???????????? url?????????. ?????? url??? ????????? ?????????.");
            setLoading(false);
        }else{
            const body = {
                contents:returned,
                navi:navi,
                foot:foot,
                setting:setting,
                created:Date.now(),
                makerEmail:userObj.email,
                // makingTypeByUser:makingTypeByUser,
                urlId:setting.urlId,
            }

            await dbService.doc(`saved-page/${editingId}`).update(body);
            // ???????????? ?????? ??? ?????????.
            window.localStorage.removeItem("temp");
            setSaveOpen(true);
        }
    }else{
        const savedPages = await dbService
            .collection("saved-page")
            .where("urlId", "==", setting.urlId)
            .get(); // uid??? creatorId??? ???????????????.
        
        let savedPage = savedPages.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(setting.urlId === ''){
            alert("url??? ???????????? ?????????.");
            setLoading(false);
        }else if(savedPage.length > 0){
            alert("?????? ???????????? url?????????. ?????? url??? ????????? ?????????.");
            setLoading(false);
        }else{
            const body = {
                contents:returned,
                navi:navi,
                foot:foot,
                setting:setting,
                created:Date.now(),
                makerEmail:userObj.email,
                // makingTypeByUser:makingTypeByUser,
                urlId:setting.urlId,
            }

            const awssss = await dbService.collection("saved-page").add(body);
            
            setEditing(true);
            setEditingId(awssss.id);

            await dbService.collection("urlStores").add({
                urlId:body.urlId
            });

            // ???????????? ?????? ??? ?????????.
            window.localStorage.removeItem("temp");
            setSaveOpen(true);
        }
    }
}

    const onSubmit = async () => {
        // ???????????? ??????
        // ????????????????????? ??????????????? ?????? ?????????
        saveLocalStorage()
        if(userObj === null){
            alert("????????? ????????? ?????? ??? ???????????? ??? ????????????.");
            setLoginModal(true);
        }else{
            setSaveLoading(true);
            setTimeout(async () => {
                saveLocalStorage();
                const returned = await saveImages();
                await afterSaveImage(returned);
                setSaveLoading(false);
            }, 250)
        }
    }
    const goSetup = async () => {
        // ???????????? ??????
        // ????????????????????? ??????????????? ?????? ?????????
        const check = window.confirm("?????????????????? ?????????????????????????\n???????????? ????????? ???????????? ??????????????? ????????? ?????? ????????? ??? ????????????.")
        if(check === true){
            if(userObj === null){
                alert("???????????? ????????? ?????? ???????????? ???????????? ??? ????????????.");
                setLoginModal(true);
            }else{
                history.push('/response');
                history.go();
            }
        }else{
            return
        }
        // saveLocalStorage()
        // if(userObj === null){
        //     alert("????????? ????????? ?????? ??? ???????????? ??? ????????????.");
        //     setLoginModal(true);
        // }else{
        //     setLoading(true);        
        //     const returned = await saveImages();
        //     saveLocalStorage();
        //     await afterSaveImage(returned);
        //     setTimeout(() => {
        //         setLoading(false);
        //         history.push('/#/response');
        //         history.go();
        //     },200)
        // }
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
                                    ?????????
                                </div>
                                <div className="right">
                                    <Phone size="25" />
                                </div>
                            </span>
                            <span className={full ? "device-button clicked" : "device-button" } onClick={e => {
                                setIsPhone(false);
                                setFull(true); 
                                handleClick()
                                }   
                            }>
                                <div className="left">
                                    ????????????
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
                <div className="response-nav-triple-start" style={{justifyContent: 'start', marginLeft:'1%'}}>
                    <span className={state.secNum === 52 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(52); 
                    }} >
                        ?????? ?????? <Settings size="16" style={{ marginLeft:'5px'}} />
                    </span>
                    <span className={state.secNum === 53 ? "make-nav-button nb-clicked" : "make-nav-button"} onClick={e => {
                        action.setSecNum(53);
                    }} >
                        ????????? ?????? <DocumentOnePage size="16" style={{ marginLeft:'5px'}} />
                    </span>
                    <span className="make-nav-button" onClick={e => setTutorialOpen(true)} style={{boxShadow:'none', width:'180px', color:'#6C63FF', fontWeight:'700'}}>
                        ????????? ?????????????????? ?
                    </span>
                </div>
                <div className="response-nav-triple" style={{width:'35%'}}>
                    <div className="centera">
                        <div onClick={() => moveToMain()} className="edit-nav-home-button">
                            Surfee
                        </div>
                    </div>
                </div>
                <div className="response-nav-triple-end" style={{justifyContent: 'flex-end', marginRight:'1%'}}>
                    {deviceSelect()}
                    <Button fontSize="14px" colorScheme='#6c63ff' isLoading={saveLoading} onClick={() => onSubmit()} className="default-button-02">
                        ????????????
                    </Button>
                    <Button fontSize="14px" variant='outline' colorScheme='#6c63ff' onClick={() => goSetup()} className="default-button-01 opacity-hover" style={{margin:'0px 5px'}}>
                        ???????????????
                    </Button>
                    <Profile make />
                </div>
            </div>
            <LoginModal open={loginModal} setOpen={setLoginModal}/>
            <ChoiceModal open={tutorialOpen} setOpen={setTutorialOpen} newTab />
            {/* <MakeTutorialModal open={tutorialOpen} setOpen={setTutorialOpen} /> */}
            <MiniModal open={saveOpen} setOpen={setSaveOpen} />
            {/* <MiniModal open={miniOpen} setOpen={setMiniOpen} long text="??? ?????? ??? ???????????? ?????????????????? ??? ?????? ????????? ??? ????????????." /> */}
        </ChakraProvider>
    )
}

export default NavBarInMakePage
