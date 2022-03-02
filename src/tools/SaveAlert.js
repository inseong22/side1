import React from 'react'
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

function SaveAlert({open}) {
    if(open){
        return (
            <Alert data-aos="zoom-in-down" data-aos-duration="9000" >
                💾 저장되었습니다.
            </Alert>
        )
    }else{
        return(<></>)
    }
}

export default SaveAlert
