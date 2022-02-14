import React from 'react'
import produce from 'immer'
import {FacebookCircle, FacebookSquare, Youtube, Twitter, InstagramAlt} from '@styled-icons/boxicons-logos';
import { Mail } from '@styled-icons/entypo';
import { Naver, Notion, Kakaotalk } from '@styled-icons/simple-icons';

function FTemplate({foot, setFoot, history}) {

    const onChangeText = (data) => {
        setFoot(produce(foot, draft => {
            draft.text.text = data;
        }));
    }

    const returnIcons = foot.icon.icons.map((item, index) => {
        switch(item.value){
            case 'facebook':
                return(
                    <FacebookCircle color={foot.iconColor} className="footer-icon" />
                )
            case 'instagram':
                return(
                    <InstagramAlt color={foot.iconColor} className="footer-icon" />
                )
            case 'naver':
                return(
                    <Naver color={foot.iconColor} className="footer-icon" />
                )
            case 'notion':
                return(
                    <Notion color={foot.iconColor} className="footer-icon" />
                )
            case 'mail':
                return(
                    <Mail color={foot.iconColor} className="footer-icon" />
                )
            case 'kakaotalk':
                return(
                    <Kakaotalk color={foot.iconColor} className="footer-icon" />
                )
            case 'twitter':
                return(
                    <Twitter color={foot.iconColor} className="footer-icon" />
                )
            case 'youtube':
                return(
                    <Youtube color={foot.iconColor} className="footer-icon" />
                )
            default:
                return(
                    <FacebookCircle color={foot.iconColor} className="footer-icon" />
                )

        }
    })

    return (
        <>
            <div className="footer-section" style={{fontSize:'0.5em'}}>
                <div>
                    
                </div>
                {
                    foot.iconUse && 
                        <div className="center-row" style={{justifyContent:`${foot.iconAlign}`}}>
                            {returnIcons}
                        </div>
                }
                <div>
                    <input
                        className="text-input"
                        value={foot.text.text}
                        onChange={(e) => {
                            onChangeText(e.currentTarget.value);
                        }}
                    />  
                </div>
            </div>
        </>
    )
}

export default FTemplate
