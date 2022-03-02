import React from 'react'
import { isMobile } from 'react-device-detect'
import {Youtube, Twitter} from '@styled-icons/boxicons-logos';
import {Facebook} from '@styled-icons/entypo-social/Facebook'
import {Instagram} from '@styled-icons/boxicons-logos/Instagram'
import {KakaoTalk} from '@styled-icons/remix-fill/KakaoTalk'
import { Notion } from '@styled-icons/simple-icons';
import {Linkedin} from '@styled-icons/fa-brands/Linkedin'
import TextareaAutosize from 'react-textarea-autosize';

function UserFoot({foot, setting}) {

    const returnLayout = {
        flexDirection: `${foot.layout === 1 ? 'row' : foot.layout === 2 ? 'column-reverse' : foot.layout === 3 ? 'column' : 'column-reverse'}`,
    }

    const returnIcons = () => {
        return(
            <>
        {foot.icon.facebook !== '' && 
                    <Facebook color={foot.icon.color} className="footer-icon" 
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
                    <Linkedin color={foot.icon.color} className="footer-icon" 
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
                            <TextareaAutosize className="footer-text-input"
                                value = {foot.text.text}
                                style={{
                                    fontFamily:`${setting.smallFont}`, 
                                    color: `${foot.text.color}`,
                                    textAlign:`${foot.text.align}`,
                                    backgroundColor: `${foot.backgroundColor}`,
                                    resize:'none',
                                    border:'none',
                                }}>
                            </TextareaAutosize>
                        }
                        {foot.icon.use && foot.layout === 1 && 
                            <div className="icon-box" style={{flexDirection: 'column', justifyContent: 'center'}}>
                            {returnIcons()}
                            </div>
                        }
                        {foot.icon.use && foot.layout === 2 && 
                            <div className="icon-box" style={{flexDirection: 'row', justifyContent: 'start'}}>
                            {returnIcons()}
                            </div>
                        }
                        {foot.icon.use && foot.layout === 3 && 
                            <div className="icon-box" style={{flexDirection: 'row', justifyContent: 'start'}}>
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
