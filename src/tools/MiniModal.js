import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Close } from '@styled-icons/evaicons-solid';
import './MiniModal.css'

const Alert = styled('div')`
    border-radius:14px;
    background-color:black;
    color:white;
    padding:10px 18px;
    position: fixed;
    top:20px;
    z-index:3000;
    left:45vw;
`;

const Copy = styled('div')`
    border-radius:14px;
    background-color:white;
    color:black;
    padding:10px 18px;
    position: fixed;
    top:20px;
    z-index:3000;
    left:45vw;
    box-shadow:2px 4px 14px #e2e2e2;
`;

const Deploy = styled('div')`
    background: #FFFFFF;
    margin-top: 10px;
    box-shadow: 2px 4px 20px #E5E5E5;
    border-radius: 20px;
    color:black;
    padding:10px 18px;
    position: fixed;
    top:20px;
    z-index:3000;
    left:30vw;
    box-shadow:2px 4px 14px #e2e2e2;
    text-align: center;
`

function MiniModal({open, setOpen, copy, deploy, history}) {

    useEffect(() => {
        if(open && !deploy){
            setTimeout(() => {
                setOpen(false);
            }, 2100)
        }
    })

    if(open){
        if(copy){
            return (
                <Copy data-aos="zoom-in-down" data-aos-duration="9000" >
                    🔗 링크가 복사되었습니다.
                </Copy>
            )
        }
        else if(deploy){
            return(
                <Deploy>
                    <div className="big-title">
                    첫 배포가 완료되었습니다! 
                    </div>
                    <div className="big-title sub">
                    페이지 수정을 원하시면 '편집하기'를 눌러 편집 후 '저장하기'를 누르고, <br />
                    관리 페이지에서 '배포하기'를 다시 눌러주세요. <br />
                    저장만 한 경우 수정사항이 반영되지 않습니다. <br />
                    </div>
                    <div className="check_button" onClick={() => {
                    setOpen(false);
                    history.go();
                    }}>확인</div>
                </Deploy>
            )
        }
        else{
            return (
                <Alert data-aos="zoom-in-down" data-aos-duration="9000" >
                    💾 저장되었습니다.
                </Alert>
            )
        }
    }
    else{
        return(<></>)
    }
}

export default MiniModal
