import React from 'react'
import surfeelogo from '../../tools/img/surfeelogo.png'

function ChromeTapBar({content}) {
    return (
        <div className="make-tab-preseen" style={{
                cursor:'default',
                borderRadius: '10px 10px 10px 10px'
            }}>
            <div className="left">
                <div className="make-tab-circle" style={{marginLeft:'15px', backgroundColor:'red'}}></div>
                <div className="make-tab-circle"></div>
                <div className="make-tab-circle" style={{backgroundColor:'green'}}></div>
                <div className="make-tab-one-tab">
                    {
                        content.setting.faviconAttachment === '' ? 
                        <img src={surfeelogo} className='make-tab-favicon' />
                        :
                        <img src={content.setting.faviconAttachment} className='make-tab-favicon' />
                    }
                    {content.setting.title}
                </div>
            </div>
            <div className="right" style={{paddingRight:'23px'}}>
                <div className="make-tab-url">
                    https://surfee.co.kr/#/{content.setting.urlId}
                </div>
            </div>
        </div>
    )
}

export default ChromeTapBar
