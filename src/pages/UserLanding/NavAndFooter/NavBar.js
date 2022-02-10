import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import './NavBar.css'

import logo from './logo.png'

function NavBar({scrollDown}) {

    return (
        <>
        <div className="nav-bar-container-top22" >
            <div className="nav-bar-title22" style={{cursor:'pointer'}}>
                <div>
                    <img src={logo} width={160} />
                </div>
            </div>
            <div className="nav-on">
                <button className="apply-button22" onClick={scrollDown}>무료 PDF 신청</button>
            </div>
        </div>
        </>
    )
}

export default NavBar
