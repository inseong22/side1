import React from 'react'
import Editor from '../../tools/Editor'

function FTemplate1({foot, setFoot}) {

    const onChangeText = (data) => {
        let newContent = foot
        newContent.text = data
        setFoot(newContent);
    }

    return (
        <>
            <div className="footer-section" style={{fontSize:'0.5em'}}>
                <Editor
                    data={foot.text}
                    onChange={(e, editor) => {
                        const data = editor.getData();
                        onChangeText(data);
                    }}
                />
            </div>
            <div className="footer-section">
                <div>
                    <a href="https://surfee.co.kr/#/v2" target="_blank" className="insta" style={{color:'black', fontSize:'0.5em'}}>Surfee로 제작한 페이지입니다. 사용하러 가기 🖥</a>
                </div>
            </div>
        </>
    )
}

export default FTemplate1
