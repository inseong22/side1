import React from 'react';
import { Input, Tooltip, Button } from 'antd';
import Switch from '@mui/material/Switch';
import './MakeNavBar.css';

function NavBarInMakePage(props) {
    return (
        <div className="make-page-nav">
            <div className="make-page-nav-half" style={{justifyContent: 'start', marginLeft:'1%'}}>
                <Button onClick={e => props.setOpen(!props.open)}>설명 다시보기</Button>
                <span style={{marginLeft:'5%', width:'50%'}}>
                    <span>전체화면보기</span>
                    <Switch value={props.full} onChange={e => props.setFull(!props.full)}  style={{marginLeft:'3%'}}/>
                    <span>모바일 전환</span>
                    <Switch value={props.device} onChange={e => props.setDevice(!props.device)}  style={{marginLeft:'3%'}}/>
                    {/* <span style={{marginLeft:'5%'}}>모바일 화면 보기</span>
                    <Switch value={props.device} onChange={e => props.setDevice(!props.device)}  style={{marginLeft:'3%'}}/> */}
                </span>
            </div>
            <div className="make-page-nav-half" style={{justifyContent: 'end', marginRight:'1%'}}>
                <Input type="text" value={props.password} onChange={e => props.setPassword(e.currentTarget.value)} style={{width:'300px'}} placeholder="나의 페이지 코드를 입력하세요."/>
                <Button onClick={props.doSave} className="make-nav-left-text" style={{backgroundColor:'#6a63f75b'}}>
                    저장
                </Button>
                <Button onClick={props.doLoad} className="make-nav-left-text">
                    불러오기
                </Button>
                <Button style={{width:'120px', backgroundColor:'#6a63f75b'}} onClick={() => props.onSubmit()} className="make-nav-left-text">
                    배포하기
                </Button>
            </div>
        </div>
    )
}

export default NavBarInMakePage
