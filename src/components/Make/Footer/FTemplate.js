import React,{useContext} from 'react'
import produce from 'immer'
import { MyContext } from '../../../pages/Make/MakePageV2'
import {Youtube, Twitter,FacebookSquare, Instagram, LinkedinSquare} from '@styled-icons/boxicons-logos';
import {KakaoTalk} from '@styled-icons/remix-fill/KakaoTalk'
import { Notion } from '@styled-icons/simple-icons';
import TextareaAutosize from 'react-textarea-autosize';
import Editor from '../tools/Editor'

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
                    <FacebookSquare color={foot.icon.color} className="footer-icon" />
        }
        {foot.icon.instagram !== '' && 
                    <Instagram color={foot.icon.color} className="footer-icon" />
        }
        {foot.icon.twitter !== '' && 
                    <Twitter color={foot.icon.color} className="footer-icon" />
        }
         {foot.icon.kakaotalk !== '' && 
                    <KakaoTalk color={foot.icon.color} className="footer-icon" />
        }
         {foot.icon.youtube !== '' && 
                    <Youtube color={foot.icon.color} className="footer-icon" />
        }
        {foot.icon.notion !== '' && 
                    <Notion color={foot.icon.color} className="footer-icon" />
        }
        {foot.icon.linkedIn !== '' && 
                    <LinkedinSquare color={foot.icon.color} className="footer-icon" />
        }
            </>
        )
    }
    return (
        <>
            <div className="footer-section" style={{fontSize:'0.5em'}}>
                <div style={{display:'flex', ...returnLayout}} >
                    {foot.text.use && 
                        // <TextareaAutosize
                        //     onClick={() => {action.setFocus('footer-text'); action.setCategory(0)}}
                        //     // defaultValue={new Array(15).join('Line.')}
                        //     className="text-input"
                        //     value={foot.text.text}
                        //     style={{
                        //         fontFamily:`${state.setting.smallFont}`, 
                        //         color: `${foot.text.color}`,
                        //         textAlign:`${foot.text.align}`,
                        //         resize: 'none',
                        //         backgroundColor: `${foot.backgroundColor}`
                        //     }}
                        //     placeholder='회사 또는 팀 정보를 입력하세요.'
                        //     onChange={(e) => {
                        //         onChangeText(e.currentTarget.value);
                        //     }}
                        // />
                        <div
                            className={ foot.text.align === 'start' ? 'alignLeft' : 'alignCenter' }
                            style={{
                                color: `${foot.text.color}`,
                                textAlign:`${foot.text.align}`,
                                resize: 'none',
                                backgroundColor: `${foot.backgroundColor}`
                            }} onClick={() => {action.setFocus('footer-text'); action.setCategory(0)}}>
                                <Editor 
                                    placeholder='회사 또는 팀 정보를 입력하세요.'
                                    className="text-input"
                                    data={foot.text.text}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        onChangeText(data)
                                    }}
                                />
                        </div>
                    }
                    {foot.icon.use && foot.layout === 1 && 
                        <div className="icon-box" 
                            style={{flexDirection: 'column', justifyContent: 'center', marginLeft:'10%', width:'60%'}}
                            onClick={() => {action.setFocus('footer-icons'); action.setCategory(0)}}>
                        {returnIcons()}
                        </div>
                    }
                    {foot.icon.use && foot.layout === 2 && 
                        <div className="icon-box" 
                            style={{flexDirection: 'row', justifyContent: `${foot.text.align}`}}
                            onClick={() => {action.setFocus('footer-icons'); action.setCategory(0)}}>
                        {returnIcons()}
                        </div>
                    }
                    {foot.icon.use && foot.layout === 3 && 
                        <div className="icon-box" 
                            style={{flexDirection: 'row', justifyContent: `${foot.text.align}`}}
                            onClick={() => {action.setFocus('footer-icons'); action.setCategory(0)}}>
                        {returnIcons()}
                        </div>
                    }
                </div>
                {foot.copyright.use && 
                    <div onClick={() => { action.setFocus('footer-copyright'); action.setCategory(0)}}
                        className='copyright-box'
                        style={{
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
