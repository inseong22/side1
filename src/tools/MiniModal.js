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
    z-index:23000;
    left:45vw;
`;

const Copy = styled('div')`
    border-radius:14px;
    background-color:white;
    color:black;
    padding:10px 18px;
    position: fixed;
    top:20px;
    z-index:23000;
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
    z-index:23000;
    left:30vw;
    box-shadow:2px 4px 14px #e2e2e2;
    text-align: center;
`

function MiniModal({open, setOpen, copy, deploy, history, text, long}) {

    useEffect(() => {
        if(open && !deploy){
            if(long){
                setTimeout(() => {
                    setOpen(false);
                }, 4100)
            }else{
                setTimeout(() => {
                    setOpen(false);
                }, 2100)
            }
        }
    })

    if(open){
        if(copy){
            return (
                <Copy data-aos="zoom-in-down" data-aos-duration="9000" >
                    π λ§ν¬κ° λ³΅μ¬λμμ΅λλ€.
                </Copy>
            )
        }
        else if(deploy){
            return(
                <Deploy>
                    <div className="modal-big-title">
                        μ²« λ°°ν¬κ° μλ£λμμ΅λλ€! 
                    </div>
                    <div className="modal-big-title sub">
                        νμ΄μ§ μμ μ μνμλ©΄ 'νΈμ§νκΈ°'λ₯Ό λλ¬ νΈμ§ ν 'μ μ₯νκΈ°'λ₯Ό λλ₯΄κ³ , <br />
                        κ΄λ¦¬ νμ΄μ§μμ 'λ°°ν¬νκΈ°'λ₯Ό λ€μ λλ¬μ£ΌμΈμ. <br />
                        μ μ₯λ§ ν κ²½μ° μμ μ¬ν­μ΄ λ°μλμ§ μμ΅λλ€. <br />
                    </div>
                    <div className="check_button" onClick={() => {
                    setOpen(false);
                    history.go();
                    }}>νμΈ</div>
                </Deploy>
            )
        }
        else if(text){
            return (
                <Alert data-aos="zoom-in-down" data-aos-duration="9000" >
                    {text}
                </Alert>
            )
        } else{
            return (
                <Alert data-aos="zoom-in-down" data-aos-duration="9000" >
                    πΎ μ μ₯λμμ΅λλ€.
                </Alert>
            )
        }
    }
    else{
        return(<></>)
    }
}

export default MiniModal
