import React, {useState} from 'react'
import './ResponseNavBar.css'
import {Link} from 'react-router-dom'
import ResponseTutorialModal from '../../tools/ResponseTutorialModal'

function ResponseNavBar() {
    const [tutorialOpen, setTutorialOpen] = useState(false)

    return (
        <div className="response-nav__container">
            <div className="response-nav-triple-start">
                <div>관리 페이지</div>
                <span className="make-nav-button" onClick={e => {
                    setTutorialOpen(true);
                }} style={{boxShadow:'none', width:'90px', marginLeft:'30px'}}>
                    사용 방법
                </span>
            </div>
            <Link to="/" className="response-nav-triple">Surfee</Link>
            <div className="response-nav-triple-end"></div>
            <ResponseTutorialModal open={tutorialOpen} setOpen={setTutorialOpen} />
        </div>
    )
}

export default ResponseNavBar
