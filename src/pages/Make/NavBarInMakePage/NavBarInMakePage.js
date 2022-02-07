import React, {useContext, useState} from 'react';
import { Input, Button } from 'antd';
import Switch from '@mui/material/Switch';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import CheckModal from '../../../components/Make/Modal/CheckModal'
import {dbService} from '../../../tools/fbase'
import {Monitor} from '@styled-icons/feather'
import Popover from '@mui/material/Popover'
import { Phone } from '@styled-icons/bootstrap'
import {Fullscreen} from '@styled-icons/bootstrap'

const NavBarInMakePage = (props) => {
    const [open, setOpen] = useState(false)
    const {state, action} = useContext(MyContext)
    const [checkModalOpen, setCheckModalOpen] = useState(false);
    const [deviceOpen, setDeviceOpen] = useState(false);
  
    const handleClick = () => {
        setDeviceOpen(!deviceOpen);
    };
  
    const handleClose = () => {
        setDeviceOpen(true);
    };

    const moveToMain = () => {
        
        window.location.replace('/');
    }
    
    const onSubmit = async () => {
        console.log(props.userObj);
        // 배포하기 클릭
        // 관리페이지에서 수정하기를 누른 거라면
        if(typeof props.useObj === undefined){
            alert("로그인 하셔야 저장 후 배포하실 수 있습니다.");
            props.setLoading(false);
        }else if(props.nowState === 'edit'){
            props.setLoading(true);
            // 기존에 있는걸 업데이트 해야한다.
            const body = {
                contents:state.contents,
                navi:props.navi,
                foot:props.foot,
                setting:props.setting,
                created:Date.now(),
                makerEmail:props.userObj.email,
            }
            await dbService.doc(`made-page/${state.contents.id}`)
                .update(body)
            
            alert("업데이트된 정보로 배포하였습니다.");
            
            props.setLoading(false);
        }else{
            // 새로 업로드 해야한다.
            setCheckModalOpen(true);
        }
    }

    const onSubmitFromCheckModal = async () => {
        props.setLoading(true);

        const urlDatas = await dbService
            .collection("urlStores")
            .where("urlId", "==", props.setting.urlId)
            .get(); // uid를 creatorId로 줬었으니까.
        
        let urlData = urlDatas.docs.map(doc => {
            return({...doc.data(), id:doc.id})
        });

        if(urlData.length > 0){
            alert("이미 존재하는 url입니다. 다른 url을 사용해주세요.");
            props.setLoading(false);
        }else{
            const body = {
                contents:state.contents,
                navi:props.navi,
                foot:props.foot,
                setting:props.setting,
                created:Date.now(),
                makerEmail:props.userObj.email,
            }

            await dbService.collection("made-page").add(body);

            await dbService.collection("urlStores").add({urlId:body.setting.urlId});

            // 자동저장 하던 걸 지운다.
            window.localStorage.removeItem("temp");
            
            setTimeout(() => {
                props.setLoading(false);
                props.history.push('/#/submit');
                props.history.go();
            },1000)
        }
    }

    return (
        <div className="make-page-nav">
            <div className="make-page-nav-half" style={{justifyContent: 'start', marginLeft:'1%'}}>
                {/* <Button onClick={e => props.setOpen(!props.open)}>설명 다시보기</Button> */}
                <span className="nav-button" onClick={e => {
                    action.setSecNum(52); 
                }}
                style={{fontWeight: `${state.secNum === 52 ? 'bold' : ''}`}}
                >
                    기본설정
                </span>
                <span className="nav-button" onClick={e => {
                    action.setSecNum(53);
                }}
                style={{fontWeight: `${state.secNum === 53 ? 'bold' : ''}`}}
                >
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
                <span className="device-button" onClick={handleClick} style={{marginRight:'20px'}}>
                    {
                        props.isPhone ? <Phone size="25" /> : <Monitor size="25" />
                    }
                </span>
                {
                    deviceOpen && 
                    <div className="device__container">
                        <span className="device-button" onClick={e => {props.setIsPhone(true); handleClick()}}>
                            <Phone size="25" />
                        </span>
                        <span className="device-button" onClick={e => {props.setFull(!props.full); handleClick()}}>
                            <Fullscreen size="25" />
                        </span>
                        <span className="device-button" onClick={e => {props.setIsPhone(false); handleClick()}}>
                            <Monitor size="25" />
                        </span>
                    </div>
                }
                <Button onClick={() => onSubmit()} className="default-button-02">
                    배포하기
                </Button>
            </div>
            {/* <ConfirmCustom open={open} setOpen={setOpen} message={"홈"} callback={deletePage}/> */}
            <CheckModal ch={checkModalOpen} setCh={setCheckModalOpen} onSubmit2={onSubmitFromCheckModal}/>
        </div>
    )
}

export default NavBarInMakePage
