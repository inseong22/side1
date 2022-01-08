import React, {useContext} from 'react';
import { Input, Button } from 'antd';
import Switch from '@mui/material/Switch';
import './MakeNavBar.css';
import { MyContext } from '../MakePageV2'

const NavBarInMakePage = (props) => {
    const {state, action} = useContext(MyContext)

    return (
        <div className="make-page-nav">
            <div className="make-page-nav-half" style={{justifyContent: 'start', marginLeft:'1%'}}>
                <Button onClick={e => props.setOpen(!props.open)}>설명 다시보기</Button>
                <Button onClick={e => {console.log(state);action.setIsWidget(true); action.setSecNum(52); action.setAddingSectionAt(1000)}}>기본설정</Button>
                <span style={{marginLeft:'5%', width:'50%'}}>
                    <span>전체화면보기</span>
                    <Switch value={props.full} onChange={e => props.setFull(!props.full)}  style={{marginLeft:'3%'}}/>
                    <span>모바일 전환</span>
                    <Switch value={props.isPhone} onChange={e => props.setIsPhone(!props.isPhone)}  style={{marginLeft:'3%'}}/>
                </span>
            </div>
            <div className="make-page-nav-half" style={{justifyContent: 'end', marginRight:'1%'}}>
                <Button style={{width:'120px', backgroundColor:'#6a63f75b'}} onClick={() => props.onSubmit()} className="make-nav-left-text">
                    배포하기
                </Button>
            </div>
        </div>
    )
}

export default NavBarInMakePage
