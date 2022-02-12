import React from 'react'
import './ResponseNavBar.css'
import {Link} from 'react-router-dom'

function ResponseNavBar() {
    return (
        <div className="response-nav__container">
            <div className="response-nav-triple-start">관리 페이지</div>
            <Link to="/" className="response-nav-triple">Surfee</Link>
            <div className="response-nav-triple-end"></div>
        </div>
    )
}

export default ResponseNavBar
