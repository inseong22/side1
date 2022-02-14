import React from 'react'

function ChromeTapBar({content}) {
    return (
        <div className="make-tab-preseen" style={{
                borderRadius: '10px 10px 10px 10px'
            }}>
            <div className="left">
                <div className="make-tab-circle" style={{marginLeft:'15px'}}></div>
                <div className="make-tab-circle"></div>
                <div className="make-tab-circle"></div>
                <div className="make-tab-one-tab">
                    <img src={content.setting.faviconAttachment} className='make-tab-favicon' alt="x" />
                    {content.setting.title}
                </div>
            </div>
            <div className="right" style={{paddingRight:'23px'}}>
                <div className="make-tab-url">
                    https://{content.setting.urlId}.surfee.co.kr
                </div>
            </div>
        </div>
    )
}

export default ChromeTapBar
