import React,{useContext} from 'react'
import produce from 'immer'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {Youtube, Twitter} from '@styled-icons/boxicons-logos';
import {Facebook} from '@styled-icons/entypo-social/Facebook'
import {Instagram} from '@styled-icons/boxicons-logos/Instagram'
import {KakaoTalk} from '@styled-icons/remix-fill/KakaoTalk'
import { Notion } from '@styled-icons/simple-icons';
import TextareaAutosize from 'react-textarea-autosize';
import {Linkedin} from '@styled-icons/fa-brands/Linkedin'

function FTemplate({foot, setFoot, history }) {
    const {state, action} = useContext(MyContext) //ContextAPI로 state와 action을 넘겨받는다.

    const returnLayout = {
        flexDirection: `${foot.layout === 1 ? 'row' : foot.layout === 2 ? 'column-reverse' : foot.layout === 3 ? 'column' : 'column-reverse'}`,
    }

    const onChangeText = (data) => {
        setFoot(produce(foot, draft => {
            draft.text.text = data;
        }));
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
                    <Instagram color={foot.icon.color} className="footer-icon" 
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
                    <Notion color={foot.icon.color} className="footer-icon" 
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
        <>
            <div className="footer-section" style={{fontSize:'0.5em'}}>
                <div
                    style={{display:'flex', ...returnLayout}}
                >
                    {foot.text.use && 
                        <TextareaAutosize
                            // defaultValue={new Array(15).join('Line.')}
                            className="footer-text-input"
                            value={foot.text.text}
                            style={{
                                fontFamily:`${state.setting.smallFont}`, 
                                color: `${foot.text.color}`,
                                textAlign:`${foot.text.align}`,
                                resize: 'none',
                                backgroundColor: `${foot.backgroundColor}`
                            }}
                            placeholder='회사 또는 팀 정보를 입력하세요.'
                            onChange={(e) => {
                                onChangeText(e.currentTarget.value);
                            }}
                        /> 
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
                            fontFamily:`${state.setting.font}`,
                            color:`${foot.text.color}`,
                        }}>
                        Copyright 2022 {foot.copyright.text}
                    </div>
                }
            </div>
        </>
    )
}

export default FTemplate
