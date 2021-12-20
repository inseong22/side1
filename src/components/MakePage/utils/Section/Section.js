import React, {useState} from 'react'
import './Section.css'
import { isMobile } from 'react-device-detect';

function Section({state}) {
    const scrollDown = () => {
        state.targets.current.scrollIntoView({behavior: 'smooth'})
    };
    const imageW = state.full ? state.imageWidth/5 : state.imageWidth*state.rate/5;
    const [addSection, setAddSection] = useState(false);

    const returnSwitch = () => {
        switch(parseInt(state.templateNum)){
            case 1:
                return (
                <div className="make-main-page-section" style={{backgroundImage:`url(${state.backgroundImage})`, 
                backgroundPosition:'center', backgroundColor:`${state.backgroundColor}`, width:'100%', 
                height:`${state.full ? state.sectionHeight : state.sectionHeight*state.rate }vh`, fontSize:`${state.full ? state.bigfont : state.smallfont}px`
                , marginTop:`${parseInt(state.sectionNumber) === 1 ? state.full ? '-11vh' : '-6.5vh' : '0px'}`, flexDirection : `${isMobile ? 'column' : 'row'}`}}>
                    <div className="make-main-section-image">       
                            {state.attachment && 
                            <div>
                                <img src={state.attachment} className="make-col-image" style={{width:`${imageW}%`}}/>
                            </div>
                            }
                    </div>
                    <div className="make-main-section-text">
                        <div className="make-middle-section" style={{marginTop:'10%', marginLeft:'5%'}}>
                            <span className="make-one-section-big" style={{fontFamily:`${state.font}`, color:`${state.titleColor}`}}>
                                <pre style={{fontFamily:`${state.font}`, lineHeight:'1.2', fontSize:`${state.titleSize/50}em`, textAlign:'start'}}>
                                    {state.title}
                                </pre>
                            </span>
                            <span className="make-one-section-small" style={{marginTop:'0%'}}>
                                <pre style={{color:`${state.descColor}`, fontFamily:`${state.descFont}`, fontSize:`${(state.descSize/40)}em`, marginTop:`${state.full ? 1 : 1*state.rate}%`, textAlign:'start'}} >
                                    {state.desc}
                                </pre>
                            </span>
                            {state.applyButtonUse && 
                                <span className="landing-apply-button" style={{backgroundColor:`${state.applyButtonColor}`, padding:`${state.full ? 7 : 7*state.rate }px ${state.full ? 30 : 30*state.rate}px`, fontFamily:`${state.descFont}`, fontSize:`${state.full ? 15 : 15*state.rate}px`}} onClick={e => scrollDown}>
                                    {state.applyButtonText}
                                </span>
                            }
                        </div>  
                    </div>
                </div>
                )
        }
    }
    return (
        <>
            {returnSwitch()}
        </>
    )
}

export default Section
