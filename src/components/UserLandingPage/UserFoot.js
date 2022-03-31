import React from 'react'
import { isMobile } from 'react-device-detect'
import {Youtube, Twitter, Instagram, FacebookSquare, LinkedinSquare} from '@styled-icons/boxicons-logos';
import {KakaoTalk} from '@styled-icons/remix-fill/KakaoTalk'
import { Notion } from '@styled-icons/simple-icons';
import TextareaAutosize from 'react-textarea-autosize';

function UserFoot({foot, setting}) {

    const returnLayout = {
        flexDirection: `${foot.layout === 1 ? 'row' : foot.layout === 2 ? 'column-reverse' : foot.layout === 3 ? 'column' : 'column-reverse'}`,
    }

    const returnIcons = () => {
        return(
            <>
        {foot.icon.facebook !== '' && 
                    <FacebookSquare color={foot.icon.color} className="footer-icon" 
                        onClick={()=>{
                            window.open(
                                foot.icon.facebook,
                                '_blank' // <- This is what makes it open in a new window.
                            );
                        }}
                    />
        }
        {foot.icon.instagram !== '' && 
                    <Instagram size="30" color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.instagram,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
        {foot.icon.twitter !== '' && 
                    <Twitter color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.twitter,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
         {foot.icon.kakaotalk !== '' && 
                    <KakaoTalk color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.kakaotalk,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
         {foot.icon.youtube !== '' && 
                    <Youtube color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.youtube,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
        {foot.icon.notion !== '' && 
                    <Notion size="30" color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.notion,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
        {foot.icon.linkedIn !== '' && 
                    <LinkedinSquare color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.linkedIn,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
            </>
        )
    }

    return (
        <div className="make-footer">
            <footer className="make-footer__container" 
            style={{backgroundColor:`${foot.backgroundColor}`, 
            padding:`${
                isMobile ? foot.paddingTop/2.5 : foot.paddingTop}vh 
                ${isMobile ? '15px' : 'calc(14vw + 30px)'}
                ${isMobile ? foot.paddingBottom/2.5 : foot.paddingBottom}vh 
                ${isMobile ? '15px' : 'calc(14vw + 30px)'}`
            }}>
                    <div className="footer-section" style={{fontSize:'0.5em'}}>
                    <div style={{display:'flex', ...returnLayout}} >
                        {foot.text.use && 
                            <div 
                                className="text-no-input"
                                dangerouslySetInnerHTML={{__html:foot.text.text}}
                                style={{
                                        fontFamily:`${setting.smallFont}`, 
                                        color: `${foot.text.color}`,
                                        textAlign:`${foot.text.align}`,
                                        backgroundColor: `${foot.backgroundColor}`,
                                        resize:'none',
                                        border:'none',
                                    }}
                                >
                            </div>
                            // <TextareaAutosize 
                            //     disabled 
                            //     className="text-no-input"
                            //     spellcheck="false"   
                            //     value = {foot.text.text}
                            //     style={{
                            //         fontFamily:`${setting.smallFont}`, 
                            //         color: `${foot.text.color}`,
                            //         textAlign:`${foot.text.align}`,
                            //         backgroundColor: `${foot.backgroundColor}`,
                            //         resize:'none',
                            //         border:'none',
                            //         WebkitTextFillColor: `${foot.text.color}`,
                            //         WebkitOpacity: 1,
                            //     }}>
                            // </TextareaAutosize>
                        }
                        {foot.icon.use && foot.layout === 1 && 
                            <div className="icon-box" style={{
                                flexDirection: 'column', justifyContent: 'center', marginLeft:'10%', width:'60%'}}>
                            {returnIcons()}
                            </div>
                        }
                        {foot.icon.use && foot.layout === 2 && 
                            <div className="icon-box" style={{flexDirection: 'row', justifyContent: `${foot.text.align}`}}>
                            {returnIcons()}
                            </div>
                        }
                        {foot.icon.use && foot.layout === 3 && 
                            <div className="icon-box" style={{flexDirection: 'row', justifyContent: `${foot.text.align}`}}>
                            {returnIcons()}
                            </div>
                        }
                    </div>
                    {foot.copyright.use && 
                        <div 
                            className='copyright-box'
                            style={{
                                color:`${foot.text.color}`,
                            }}>
                            Copyright 2022 {foot.copyright.text}
                        </div>
                    }
                </div>
            </footer>
        </div>
    )
}

export default UserFoot
