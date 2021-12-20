import React, {useState} from 'react'
import './Section.css'
import { isMobile } from 'react-device-detect';

function SectionInMaking({sectionHeight, descFont, setDescFont,backgroundImage, descSize, title, desc, imageWidth, attachment, templateNum, font, backgroundColor,sectionNumber, titleColor, full, bigfont, smallfont, descColor, rate, titleSize, applyButtonUse, applyButtonText, applyButtonColor, targets}) {
    const scrollDown = () => {
        targets.current.scrollIntoView({behavior: 'smooth'})
    };
    const imageW = full ? imageWidth/5 : imageWidth*rate/5;
    const [addSection, setAddSection] = useState(false);

    const returnSwitch = () => {
        switch(parseInt(templateNum)){
            case 1:
                return (
                <div className="make-main-page-section" style={{backgroundImage:`url(${backgroundImage})`, backgroundPosition:'center', backgroundColor:`${backgroundColor}`, width:'100%', height:`${full ? sectionHeight : sectionHeight*rate }vh`, fontSize:`${full ? bigfont :smallfont}px`
                , marginTop:`${parseInt(sectionNumber) === 1 ? full ? '-11vh' : '-6.5vh' : '0px'}`, flexDirection : `${isMobile ? 'column' : 'row'}`}}>
                    <div className="make-main-section-image">       
                            {attachment && 
                            <div>
                                <img src={attachment} className="make-col-image" style={{width:`${imageW}%`}}/>
                            </div>
                            }
                    </div>
                    <div className="make-main-section-text">
                        <div className="make-middle-section" style={{marginTop:'10%', marginLeft:'5%'}}>
                            <span className="make-one-section-big" style={{fontFamily:`${font}`, color:`${titleColor}`}}>
                                <pre style={{fontFamily:`${font}`, lineHeight:'1.2', fontSize:`${titleSize/50}em`, textAlign:'start'}}>
                                    {title}
                                </pre>
                            </span>
                            <span className="make-one-section-small" style={{marginTop:'0%'}}>
                                <pre style={{color:`${descColor}`, fontFamily:`${descFont}`, fontSize:`${(descSize/40)}em`, marginTop:`${full ? 1 : 1*rate}%`, textAlign:'start'}} >
                                    {desc}
                                </pre>
                            </span>
                            {applyButtonUse && 
                                <span className="landing-apply-button" style={{backgroundColor:`${applyButtonColor}`, padding:`${full ? 7 : 7*rate }px ${full ? 30 : 30*rate}px`, fontFamily:`${descFont}`, fontSize:`${full ? 15 : 15*rate}px`}} onClick={e => scrollDown}>
                                    {applyButtonText}
                                </span>
                            }
                        </div>  
                    </div>
                </div>
                )
            case 2:
                return (
                    <div className="make-main-page-section" style={{backgroundImage:`url(${backgroundImage})`, backgroundPosition:'center', backgroundColor:`${backgroundColor}`, width:'100%', height:`${full ? sectionHeight : sectionHeight*rate }vh`, fontSize:`${full ? bigfont:smallfont}px`, marginTop:`${parseInt(sectionNumber) === 1 ? full ? '-11vh' : '-6.5vh' : '0px'}`}}>
                        <div className="make-main-section-text" style={{textAlign:'center'}}>
                            <div className="make-middle-section" style={{justifyContent:'center',alignItems:'center'}}>
                                <span className="make-one-section-big" style={{fontFamily:`${font}`, textAlign:'center', color:`${titleColor}`}}>
                                    <pre style={{fontFamily:`${font}`, lineHeight:'1.2', fontSize:`${titleSize/50}em`, textAlign:'center'}}>
                                        {title}
                                    </pre>
                                </span>
                                <span className="make-one-section-small" style={{marginTop:'0%'}}>
                                    <pre style={{color:`${descColor}`, fontFamily:`${descFont}`, fontSize:`${(descSize/40)}em`, marginTop:`${full ? 1 : 1*rate}%`, textAlign:'center'}} >
                                        {desc}
                                    </pre>
                                </span>
                                {applyButtonUse && 
                                <span className="make-apply-button" style={{backgroundColor:`${applyButtonColor}`, width:`${full ? 250 : parseInt(250*rate)}px`,
                                height:`${full ? 40 : 40*rate}px`, fontFamily:`${descFont}`, fontSize:`${full ? 15 : 15*rate}px`}} onClick={e => scrollDown}>
                                    {applyButtonText}
                                </span>
                                }
                            </div>  
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="make-main-page-section" style={{backgroundImage:`url(${backgroundImage})`, backgroundPosition:'center', backgroundColor:`${backgroundColor}`, width:'100%', height:`${full ? sectionHeight : sectionHeight*rate }vh`, fontSize:`${full ? bigfont:smallfont}px`, flexDirection : `${isMobile ? 'column' : 'row'}`, marginTop:`${parseInt(sectionNumber) === 1 ? full ? '-11vh' : '-6.5vh' : '0px'}`}}>
                        <div className="make-main-section-text">
                            <div className="make-middle-section" style={{marginTop:'10%', marginLeft:'25%'}}>
                                <span className="make-one-section-big" style={{fontFamily:`${font}`, color:`${titleColor}`}}>
                                    <pre style={{fontFamily:`${font}`, lineHeight:'1.2', fontSize:`${titleSize/50}em`, textAlign:'start'}}>
                                        {title}
                                    </pre>
                                </span>
                                <span className="make-one-section-small" style={{marginTop:'0%'}}>
                                    <pre style={{color:`${descColor}`, fontFamily:`${descFont}`, fontSize:`${(descSize/40)}em`, marginTop:`${full ? 1 : 1*rate}%`, textAlign:'start'}} >
                                        {desc}
                                    </pre>
                                </span>
                                {applyButtonUse && 
                                <span className="make-apply-button" style={{backgroundColor:`${applyButtonColor}`, width:`${full ? 250 : parseInt(250*rate)}px`,
                                height:`${full ? 40 : 40*rate}px`, fontFamily:`${descFont}`, fontSize:`${full ? 15 : 15*rate}px`}} onClick={e => scrollDown}>
                                    {applyButtonText}
                                </span>
                                }
                            </div>  
                        </div>
                        <div className="make-main-section-image">       
                                {attachment && 
                                <div>
                                    <img src={attachment} className="make-col-image" style={{width:`${imageW }%`}}/>
                                </div>
                                }
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="make-main-page-section" style={{flexDirection:'column', backgroundImage:`url(${backgroundImage})`, backgroundPosition:'center', backgroundColor:`${backgroundColor}`, width:'100%', height:`${full ? sectionHeight : sectionHeight*rate }vh`, fontSize:`${full ? bigfont:smallfont}px`, 
                    marginTop:`${parseInt(sectionNumber) === 1 ? full ? '-11vh' : '-6.5vh' : '0px'}`}}>
                        <div className="make-main-section-text" style={{marginTop:'4%'}}>
                            <div className="make-middle-section" style={{justifyContent:'center',alignItems:'center'}}>
                                <span className="make-one-section-big" style={{fontFamily:`${font}`, color:`${titleColor}`, textAlign:'center'}}>
                                    <pre style={{fontFamily:`${font}`, lineHeight:'1.2', fontSize:`${titleSize/50}em`, textAlign:'center'}}>
                                        {title}
                                    </pre>
                                </span>
                                <span className="make-one-section-small" style={{marginTop:'0%'}}>
                                    <pre style={{color:`${descColor}`, fontFamily:`${descFont}`, fontSize:`${(descSize/40)}em`, marginTop:`${full ? 1 : 1*rate}%`, textAlign:'center'}} >
                                        {desc}
                                    </pre>
                                </span>
                                {applyButtonUse && 
                                <span className="make-apply-button" style={{backgroundColor:`${applyButtonColor}`, width:`${full ? 250 : parseInt(250*rate)}px`,
                                height:`${full ? 40 : 40*rate}px`, fontFamily:`${descFont}`, fontSize:`${full ? 15 : 15*rate}px`}} onClick={e => scrollDown}>
                                    {applyButtonText}
                                </span>
                                }
                            </div>  
                        </div>
                        <div className="make-main-section-image" style={{paddingTop:'0px', justifyContent:'start'}}>       
                                {attachment && 
                                <div>
                                    <img src={attachment} className="make-col-image" style={{width:`${ imageW/2 }%`}}/>
                                </div>
                                }
                        </div>
                    </div>
                )
        }
    }
    return (
        <>
        <div className="make-hover-section">
            {returnSwitch()}
        </div>
        <span className="make-section-button" onClick={() => setAddSection(!addSection)}>
            {addSection ? <>- 섹션 제거하기</> : <>+ 섹션 추가하기</>}
        </span>
        {addSection && 
        <div className="select-section-template-container">
            템플릿 1 , 템플릿 2
        </div>
        }
        
        </>
    )
}

export default SectionInMaking
