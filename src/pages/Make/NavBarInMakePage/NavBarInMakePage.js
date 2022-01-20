import React, {useContext, useState} from 'react';
import { Input, Button } from 'antd';
import Switch from '@mui/material/Switch';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'
import CheckModal from '../../../components/Make/Modal/CheckModal'
import {dbService} from '../../../tools/fbase'

const NavBarInMakePage = (props) => {
    const [open, setOpen] = useState(false)
    const {state, action} = useContext(MyContext)
    const [checkModalOpen, setCheckModalOpen] = useState(false);
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
                <Button onClick={e => {
                    action.setIsWidget(true); 
                    action.setSecNum(52); 
                    action.setAddingSectionAt(1000)
                    }}>
                    기본설정
                </Button>
                <Button onClick={e => {
                    action.setIsWidget(true); 
                    action.setSecNum(53); 
                    action.setAddingSectionAt(1000)
                    }}>
                    컨텐츠
                </Button>
                <span style={{marginLeft:'5%', width:'50%'}}>
                    <span>전체화면보기</span>
                    <Switch value={props.full} onChange={e => props.setFull(!props.full)}  style={{marginLeft:'3%'}}/>
                    <span>모바일 전환</span>
                    <Switch value={props.isPhone} onChange={e => props.setIsPhone(!props.isPhone)}  style={{marginLeft:'3%'}}/>
                </span>
            </div>
            <div className="make-page-nav-half" style={{justifyContent: 'end', marginRight:'1%'}}>
                <Button onClick={() => moveToMain()}>
                    Surfee
                </Button>
                <Button style={{width:'120px', backgroundColor:'#6a63f75b'}} onClick={() => onSubmit()} className="make-nav-left-text">
                    저장 후 배포하기
                </Button>
            </div>
            {/* <ConfirmCustom open={open} setOpen={setOpen} message={"홈"} callback={deletePage}/> */}
            <CheckModal ch={checkModalOpen} setCh={setCheckModalOpen} onSubmit2={onSubmitFromCheckModal}/>
        </div>
    )
}

export default NavBarInMakePage
