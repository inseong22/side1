import React, {useEffect} from 'react'
import styled from 'styled-components'

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

function MiniModal({open, setOpen, copy}) {

    useEffect(() => {
        if(open){
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
        }else{
            return (
                <Alert data-aos="zoom-in-down" data-aos-duration="9000" >
                    💾 저장되었습니다.
                </Alert>
            )
        }
    }else{
        return(<></>)
    }
}

export default MiniModal
