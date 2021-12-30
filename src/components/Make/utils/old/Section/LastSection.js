import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import { dbService } from '../../../../../tools/fbase'

function LastSection(props) {

    const returnAnswerTable = props.answers.map((answer, index) => {
        let placehold = answer.name + "을 입력해주세요."
        return(
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:`${props.full ? props.bigfont:props.smallfont}`}}>
                <input type="text" id={answer.name} placeholder={placehold} className="make-input-text" style={{marginTop:'2%', 
                    width:`${props.full ? 350 : parseInt(350*props.rate)}px`, height:`${props.full ? 40 : 40*props.rate}px`, fontFamily:`${props.descFont}`

                }}/>
            </div>
        )
    })

    const submit = async () => {
        await dbService.collection("applies-from-user-page").add({
            "email":'khj'
        });
    }

    return (
        <div ref={props.targets} style={{backgroundColor:`${props.backgroundColor}`, fontSize:`${props.full ? props.bigfont:props.smallfont}px`, width:'100%', height:`${props.full ? props.sectionHeight : props.sectionHeight*props.rate }vh`}} className="last-section-container">
            <span className="make-last-one-component" style={{width:'100%'}}>
                <div className="make-section-last-title" style={{color:`${props.titleColor}`, fontSize:`${props.full ? props.bigfont:props.smallfont}`}}>
                    <pre style={{fontFamily:`${props.font}`, fontSize:`${props.titleSize/50}em`}}>{props.title}</pre>
                </div>
                <form onSubmit={e => submit()}>
                    <div>
                        {props.inf === 1 ?returnAnswerTable:null}
                    </div>
                    <button className="make-apply-button-last" style={{ width:`${props.full ? 250 : parseInt(250*props.rate)}px`,
                        height:`${props.full ? 40 : 40*props.rate}px`, fontFamily:`${props.descFont}`, fontSize:`${props.full ? 15 : 15*props.rate}px`, 
                        boxShadow:'1px 1xp 3px rgba(0,0,0,0.3)'}} 
                        onClick={e => submit()} onSubmit={e => submit()}
                    >
                            {props.applyButtonText}
                    </button>
                    </form>
                <div className="make-section-last-desc" style={{color:`${props.lastdescColor}`, marginTop:'3%', fontSize:`${props.full ? props.bigfont:props.smallfont}`}}>
                    <pre style={{fontFamily:`${props.descFont}`, fontSize:`${props.descSize/40}em`}}>
                        {props.desc}
                    </pre>
                    {/* <br/> <p style={{color:'rgb(30,30,30)', fontFamily:'OTWelcomeBA'}}>기간 : 21.11.20 ~ 21.12.20</p> */}
                </div>
            </span>
        </div>
    )
}

export default LastSection
