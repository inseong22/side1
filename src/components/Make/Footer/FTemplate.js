import React,{useContext} from 'react'
import produce from 'immer'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {FacebookCircle, FacebookSquare, Youtube, Twitter, InstagramAlt} from '@styled-icons/boxicons-logos';
import { Mail } from '@styled-icons/entypo';
import { Naver, Notion, Kakaotalk } from '@styled-icons/simple-icons';
import TextareaAutosize from 'react-textarea-autosize';

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
                    <FacebookCircle color={foot.icon.color} className="footer-icon" 
                        onClick={()=>{
                            window.open(
                                foot.icon.facebook,
                                '_blank' // <- This is what makes it open in a new window.
                            );
                        }}
                    />
        }
        {foot.icon.instagram !== '' && 
                    <InstagramAlt color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.instagram,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
        {foot.icon.naver !== '' && 
                    <Naver color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.naver,
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
        {foot.icon.mail !== '' && 
                    <Mail color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.mail,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}
                    />
        }
        {foot.icon.kakaotalk !== '' && 
                    <Kakaotalk color={foot.icon.color} className="footer-icon" 
                    onClick={()=>{
                        window.open(
                            foot.icon.kakaotalk,
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
                                fontFamily:`${state.setting.font}`, 
                                color: `${foot.text.color}`,
                                fontSize: `${foot.text.size}px`,
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
                            fontFamily:`${state.setting.font}`
                        }}>
                        2022 Copyright © {foot.copyright.text}
                    </div>
                }
            </div>
        </>
    )
}

export default FTemplate
