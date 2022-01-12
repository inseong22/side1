import React from 'react'
import Editor from '../../tools/Editor'
import {FacebookCircle, FacebookSquare, Youtube, Twitter, InstagramAlt} from '@styled-icons/boxicons-logos';
import { Mail } from '@styled-icons/entypo';
import { Naver, Notion, Kakaotalk } from '@styled-icons/simple-icons';

function FTemplate1({foot, setFoot, history}) {

    const onChangeText = (data) => {
        let newContent = foot
        newContent.text = data
        setFoot(newContent);
    }

    const returnIcons = foot.icons.map((item, index) => {
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
                    <Editor
                        data={foot.text}
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            onChangeText(data);
                        }}
                    />  
                </div>
            </div>
        </>
    )
}

export default FTemplate1
